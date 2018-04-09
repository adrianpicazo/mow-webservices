import React, { Component } from 'react';
import { Text, ScrollView, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ModalBase } from '../../common/ModalBase';
import { Card, CardSection, Button } from '../../common/index';
import {
    selectRestaurantType,
    selectAllRestaurantTypes,
    filterRestaurantsByType
} from '../../../actions/index';
import { colors } from '../../../res/Colors';
import CheckButton from '../../common/CheckButton';

class RestaurantListModal extends Component {

    constructor(props, context) {
        super(props, context);

        this.onAccept = this.onAccept.bind(this);
        this.onDecline = this.onDecline.bind(this);
    }

    onAccept() {
        const restaurantTypesSelected = Object.values(this.props.selectedRestaurantTypes)
            .filter(propValue => propValue.value)
            .map(propValue => propValue.label);

        this.props.filterRestaurantsByType(restaurantTypesSelected);
        Actions.pop();
    }

    onDecline() {
        Actions.pop();
    }

    renderRestaurantTypeCheckBoxes() {
        return Object.keys(this.props.selectedRestaurantTypes)
            .map((propKey, index) => this.renderRestaurantCheckBox(propKey, index));
    }

    renderRestaurantCheckBox(propKey, index) {
        const { label, value } = this.props.selectedRestaurantTypes[propKey];

        return (
            <CardSection key={index} style={{ backgroundColor: '#72ff7d', width: '100%' }}>
                <CheckButton
                    checked={value}
                    onPress={() => this.props.selectRestaurantType({
                        prop: propKey,
                        value: !value
                    })}
                />
                <Text>
                    {label}
                </Text>
            </CardSection>
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
                        onPress={() => this.props.selectAllRestaurantTypes(true)}
                    >
                        Todos
                    </Button>
                    <Button
                        textStyle={textStyle}
                        buttonStyle={buttonStyle}
                        onPress={() => this.props.selectAllRestaurantTypes(false)}
                    >
                        Ninguno
                    </Button>
                </CardSection>

                <ScrollView style={{ flex: 1, backgroundColor: '#fff930' }}>
                    <Card style={{ backgroundColor: '#ff4645', width: '100%' }}>
                        {this.renderRestaurantTypeCheckBoxes()}
                    </Card>
                </ScrollView>
            </ModalBase>
        );
    }
}

const styles = {
    cardSectionCheckBoxesStyle: {
        flexDirection: 'column'
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
            borderRadius: 5,
            marginLeft: '5%',
            marginRight: '5%',
        }
    }
};

const mapStateToProps = (state) => {
    const { selectedRestaurantTypes } = state;

    return { selectedRestaurantTypes };
};

export default connect(mapStateToProps, {
    selectRestaurantType,
    selectAllRestaurantTypes,
    filterRestaurantsByType
})(RestaurantListModal);
