import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Header from '../../headers/Header';
import { Card, CardSection, Button, InputColumn, Failure, Template } from '../../common/index';
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

    renderOrderAddressError() {
        const { error } = this.props;

        if (error) {
            return (
                <CardSection>
                    <Failure title={'FALLO DE FORMULARIO'}>
                        {error}
                    </Failure>
                </CardSection>
            );
        }
    }

    render() {
        const { address } = this.props;

        return (
            <Template>
                <Header
                    renderBackButton
                    headerTitle="Dirección del pedido"
                    newHeaderTextStyle={{ fontSize: 20 }}
                />

                <Card>
                    <CardSection>
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

                    {this.renderOrderAddressError()}
                </Card>

                <Card>
                    <CardSection>
                        <Button onPress={this.onContinueButtonPress}>
                            Finalizar pedido
                        </Button>
                    </CardSection>
                </Card>
            </Template>
        );
    }
}

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
