import _ from 'lodash';
import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ModalBase, Card, CardSection, Button, Spinner } from '../../common/index';
import {
    restaurantTypesFetch,
    restaurantTypeSelection,
    restaurantTypeAllSelection,
    restaurantFiltrationByType
} from '../../../actions/index';
import { colors } from '../../../res/Colors';
import RestaurantTypesModalItem from './RestaurantTypeSelectionItem';
import { analyticsTracker } from '../../../App';
import { I18nUtils } from '../../../utils/I18nUtils';
import {
    TR_BUTTON_ALL,
    TR_BUTTON_NONE,
    TR_HEADER_MODAL_RESTAURANT_TYPES
} from '../../../i18n/constants';

class RestaurantTypeSelection extends Component {

    constructor(props, context) {
        super(props, context);

        this.onAccept = this.onAccept.bind(this);
        this.onDecline = this.onDecline.bind(this);
        this.onAllChecked = this.onAllSelection.bind(this, true);
        this.onAllUnchecked = this.onAllSelection.bind(this, false);
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('Restaurant Type Selection');

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
                <Spinner size="large" style={{ height: '50%' }} />
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
                title={I18nUtils.tr(TR_HEADER_MODAL_RESTAURANT_TYPES)}
                onAccept={this.onAccept}
                onDecline={this.onDecline}
                titleSize={24}
            >
                <Card style={{ width: '100%', marginTop: 5, marginBottom: -10 }}>
                    <CardSection style={cardSection}>
                        <Button
                            textStyle={textStyle}
                            buttonStyle={buttonStyle}
                            onPress={this.onAllChecked}
                        >
                            {I18nUtils.tr(TR_BUTTON_ALL)}
                        </Button>
                        <Button
                            textStyle={textStyle}
                            buttonStyle={buttonStyle}
                            onPress={this.onAllUnchecked}
                        >
                            {I18nUtils.tr(TR_BUTTON_NONE)}
                        </Button>
                    </CardSection>

                    {this.renderRestaurantTypeList()}
                </Card>

                <View style={{ flex: 1 }} />
            </ModalBase>
        );
    }
}

const styles = {
    flatListStyle: {
        position: 'relative',
        width: '100%',
        height: 270,
        marginTop: 15,
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
