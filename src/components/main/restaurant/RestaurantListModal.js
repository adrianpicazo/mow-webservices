import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ModalBase } from '../../common/ModalBase';
import { CardSection } from '../../common/CardSection';
import { Button } from '../../common/Button';
import {
    selectRestaurantType,
    selectAllRestaurantTypes,
    filterRestaurantsByType
} from '../../../actions/index';

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
            <CheckBox
                key={index}
                title={label}
                onPress={() => this.props.selectRestaurantType({
                    prop: propKey,
                    value: !value
                })}
                checked={value}
            />
        );
    }

    render() {
        const { cardSectionCheckBoxesStyle } = styles;

        return (
            <ModalBase
                visible
                title="Tipos de restaurante"
                onAccept={this.onAccept}
                onDecline={this.onDecline}
            >
                <CardSection style={{ borderBottomWidth: 0 }}>
                    <Button onPress={() => this.props.selectAllRestaurantTypes(true)}>
                        Selecciona todos
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={() => this.props.selectAllRestaurantTypes(false)}>
                        Deselecciona todos
                    </Button>
                </CardSection>

                <ScrollView style={{ flex: 1 }}>
                    <CardSection style={cardSectionCheckBoxesStyle}>
                        {this.renderRestaurantTypeCheckBoxes()}
                    </CardSection>
                </ScrollView>
            </ModalBase>
        );
    }
}

const styles = {
    cardSectionCheckBoxesStyle: {
        flexDirection: 'column'
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
