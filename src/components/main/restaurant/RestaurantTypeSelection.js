import _ from 'lodash';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ModalBase } from '../../common/ModalBase';
import { CardSection, Button, Spinner } from '../../common/index';
import {
    restaurantTypesFetch,
    restaurantTypeSelection,
    restaurantTypeAllSelection,
    restaurantFiltrationByType
} from '../../../actions/index';
import { colors } from '../../../res/Colors';
import RestaurantTypesModalItem from './RestaurantTypeSelectionItem';

class RestaurantTypeSelection extends Component {

    constructor(props, context) {
        super(props, context);

        this.onAccept = this.onAccept.bind(this);
        this.onDecline = this.onDecline.bind(this);
        this.onAllChecked = this.onAllSelection.bind(this, true);
        this.onAllUnchecked = this.onAllSelection.bind(this, false);
    }

    componentDidMount() {
        const { fetched } = this.props;

        if (!fetched)
            this.props.restaurantTypesFetch();
    }

    onAccept() {
        const { types } = this.props;
        const restaurantTypesSelected = _.map(_.filter(types, 'selected'), type => type.name);

        this.props.restaurantFiltrationByType(restaurantTypesSelected);

        Actions.pop();
    }

    onDecline() {
        Actions.pop();
    }

    onAllSelection(value) {
        this.props.restaurantTypeAllSelection(value);
    }

    renderRestaurantTypeList() {
        const { flatListStyle } = styles;
        const { types, fetched } = this.props;

        if (!fetched) {
            return (
                <Spinner size="large" />
            );
        }

        return (
            <FlatList
                data={types}
                renderItem={({ item }) => <RestaurantTypesModalItem type={item} />}
                keyExtractor={(item, index) => index.toString()}
                style={flatListStyle}
                extraData={this.props}
            />
        );
    }

    render() {
        const { cardSection, buttonStyle, textStyle } = styles.topButtonsSection;

        return (
            <ModalBase
                visible
                title="Tipos de restaurante"
                onAccept={this.onAccept}
                onDecline={this.onDecline}
                titleSize={24}
            >
                <CardSection style={cardSection}>
                    <Button
                        textStyle={textStyle}
                        buttonStyle={buttonStyle}
                        onPress={this.onAllChecked}
                    >
                        Todos
                    </Button>
                    <Button
                        textStyle={textStyle}
                        buttonStyle={buttonStyle}
                        onPress={this.onAllUnchecked}
                    >
                        Ninguno
                    </Button>
                </CardSection>

                {this.renderRestaurantTypeList()}
            </ModalBase>
        );
    }
}

const styles = {
    flatListStyle: {
        position: 'relative',
        width: '100%',
        marginTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 0
    },
    topButtonsSection: {
        cardSection: {
            padding: 0,
            width: '100%'
        },
        textStyle: {
            alignSelf: 'center',
            color: colors.BLUE_GREY.N500,
            fontSize: 14,
            fontWeight: '800',
            paddingTop: 10,
            paddingBottom: 10
        },
        buttonStyle: {
            width: '40%',
            alignSelf: 'center',
            backgroundColor: colors.BLUE.N050,
            borderWidth: 0,
            marginLeft: '5%',
            marginRight: '5%',
        }
    }
};

const mapStateToProps = ({ restaurantTypes }) => {
    const { types, fetched } = restaurantTypes;

    return { types, fetched };
};

export default connect(mapStateToProps, {
    restaurantTypesFetch,
    restaurantTypeSelection,
    restaurantTypeAllSelection,
    restaurantFiltrationByType
})(RestaurantTypeSelection);
