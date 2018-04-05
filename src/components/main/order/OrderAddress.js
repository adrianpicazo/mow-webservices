import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Header from '../../headers/Header';
import { Card, CardSection, Button, InputColumn, Failure } from '../../common/index';
import {
    orderAddressFormReset,
    orderAddressFormChange,
    orderAddressFormFailure,
    orderAddressAddition
} from '../../../actions/index';

class OrderAddress extends Component {

    constructor(props, context) {
        super(props, context);

        this.onContinueButtonPress = this.onContinueButtonPress.bind(this);
    }

    componentWillMount() {
        const { address } = this.props.account;

        this.props.orderAddressFormReset(address);
    }

    onContinueButtonPress() {
        const { address } = this.props;

        if (address === '') {
            this.props.orderAddressFormFailure('Existen campos vacíos.');
        } else {
            this.props.orderAddressAddition(address);

            Actions.push('orderDoneOverview');
        }
    }

    renderFeedbackAlert() {
        const {
            cardStyle,
            cardSectionStyle,
        } = styles;

        const { error } = this.props;

        if (error !== '') {
            return (
                <Card style={cardStyle}>
                    <CardSection style={cardSectionStyle}>
                        <Failure title={'FALLO DE FORMULARIO'}>
                            {error}
                        </Failure>
                    </CardSection>
                </Card>
            );
        }
    }

    render() {
        const {
            cardSectionStyle
        } = styles;

        const { address } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <Header
                    renderBackButton
                    headerTitle="Dirección del pedido"
                    newHeaderTextStyle={{ fontSize: 20 }}
                />

                {this.renderFeedbackAlert()}

                <Card>
                    <CardSection style={cardSectionStyle}>
                        <InputColumn
                            label="Introduzca su dirección:"
                            placeholder="Partida Benadresa, 90, Castelló de la Plana"
                            value={address}
                            onChangeText={value => this.props.orderAddressFormChange({
                                prop: 'address',
                                value
                            })}
                        />
                    </CardSection>

                    <CardSection style={cardSectionStyle}>
                        <Button onPress={this.onContinueButtonPress}>
                            Continuar
                        </Button>
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const styles = {
    cardStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 0,
        padding: 0
    },
    cardSectionStyle: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderBottomWidth: 0,
    },
    labelStyle: {
        fontSize: 18,
        color: '#ffffff',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#d0d0d0'
    },
    textStyle: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    }
};

const mapStateToProps = ({ account, orderAddressForm }) => {
    const { address, error } = orderAddressForm;

    return { account, address, error };
};

export default connect(mapStateToProps, {
    orderAddressFormReset,
    orderAddressFormChange,
    orderAddressFormFailure,
    orderAddressAddition
})(OrderAddress);
