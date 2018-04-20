import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Header from '../../headers/Header';
import {
    Card,
    CardSection,
    Button,
    InputColumn,
    Failure,
    Template,
    Spinner,
    Warning
} from '../../common/index';
import {
    orderAddressesFetch,
    orderAddressFormReset,
    orderAddressFormChange,
    orderAddressFormFailure,
    orderAddressAddition
} from '../../../actions/index';
import { OrderAddressItem } from './OrderAddressItem';
import { fonts } from '../../../res/Fonts';

class OrderAddress extends Component {

    constructor(props, context) {
        super(props, context);

        this.onPressButton = this.onPressButton.bind(this);
    }

    componentWillMount() {
        this.props.orderAddressFormReset();
    }

    componentDidMount() {
        const { uid, addresses } = this.props;

        if (addresses === null)
            this.props.orderAddressesFetch(uid);
    }

    onPressButton() {
        const { formAddress } = this.props;

        if (formAddress === '') {
            this.props.orderAddressFormFailure('Existen campos vacíos.');
        } else {
            this.props.orderAddressAddition(formAddress);
            Actions.push('orderDone');
        }
    }

    renderAddressList() {
        const { flatListStyle } = styles;
        const { addresses, fetchLoading, fetchFailure } = this.props;

        if (fetchLoading) {
            return (
                <Spinner size="large" />
            );
        }

        if (fetchFailure || (addresses !== null && addresses.length === 0)) {
            return (
                <CardSection>
                    <Warning>
                        No existen direcciones registradas.
                    </Warning>
                </CardSection>
            );
        }

        return (
            <FlatList
                data={addresses}
                renderItem={({ item }) => <OrderAddressItem
                    address={item}
                    onPress={() => this.props.orderAddressFormChange({
                        prop: 'formAddress',
                        value: item
                    })}
                />}
                keyExtractor={(item, index) => index.toString()}
                style={flatListStyle}
                extraData={this.props}
                ItemSeparatorComponent={() => <View style={{ padding: 2 }} />}
            />
        );
    }

    renderOrderAddressForm() {
        const { formAddress, formError } = this.props;

        return (
            <Card>
                <CardSection>
                    <InputColumn
                        label="Introduzca su dirección:"
                        placeholder="Partida Benadresa, 90, Castelló de la Plana"
                        value={formAddress}
                        onChangeText={value => this.props.orderAddressFormChange({
                            prop: 'formAddress',
                            value
                        })}
                    />
                </CardSection>

                {formError ? (
                    <CardSection>
                        <Failure title={'FALLO DE FORMULARIO'}>
                            {formError}
                        </Failure>
                    </CardSection>
                ) : null }
            </Card>
        );
    }

    renderCompleteOrderButton() {
        return (
            <Card>
                <CardSection>
                    <Button onPress={this.onPressButton}>
                        Finalizar pedido
                    </Button>
                </CardSection>
            </Card>
        );
    }

    render() {
        return (
            <Template>
                <Header
                    renderBackButton
                    headerTitle="Dirección del pedido"
                    newHeaderTextStyle={{ fontSize: 20 }}
                />

                {this.renderOrderAddressForm()}

                <Card style={{ width: '100%', flex: 1 }}>
                    <CardSection style={{ width: '100%' }}>
                        <Text style={fonts.HUGE}>
                            Direcciones registradas
                        </Text>
                    </CardSection>

                    {this.renderAddressList()}
                </Card>

                {this.renderCompleteOrderButton()}
            </Template>
        );
    }
}

const styles = {
    flatListStyle: {
        position: 'relative',
        width: '100%',
        marginTop: 5,
        marginBottom: 5
    }
};

const mapStateToProps = ({ account, orderAddressForm }) => {
    const { uid, addresses } = account;
    const { fetchLoading, fetchFailure, formAddress, formError } = orderAddressForm;

    return { uid, addresses, fetchLoading, fetchFailure, formAddress, formError };
};

export default connect(mapStateToProps, {
    orderAddressesFetch,
    orderAddressFormReset,
    orderAddressFormChange,
    orderAddressFormFailure,
    orderAddressAddition
})(OrderAddress);
