import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../headers/Header';
import {
    Template,
    Card,
    CardSection,
    Button,
    InputColumn,
    Spinner,
    Warning,
    Failure,
    Success
} from '../../common/index';
import {
    addressFormReset,
    addressFormChange,
    addressUpdate,
    addressFormFailure
} from '../../../actions/index';
import { fonts } from '../../../res/Fonts';

class UserAccountAddress extends Component {

    constructor(props, context) {
        super(props, context);

        this.onRegisterButtonPress = this.onRegisterButtonPress.bind(this);
    }

    componentWillMount() {
        this.props.addressFormReset();
    }

    onRegisterButtonPress() {
        const { address } = this.props;

        if (address === '') {
            this.props.addressFormFailure('Existen campos vacíos.');
        } else {
            this.props.addressUpdate(address);
        }
    }

    renderFormSuccess() {
        const { updated } = this.props;

        if (updated) {
            return (
                <CardSection>
                    <Success title={'ÉXITO DE ACTUALIZACIÓN'}>
                        La dirección se ha actualizado correctamente.
                    </Success>
                </CardSection>
            );
        }
    }

    renderFormFailure() {
        const { error } = this.props;

        if (error) {
            return (
                <CardSection>
                    <Failure title={'FALLO DE ACTUALIZACIÓN'}>
                        {error}
                    </Failure>
                </CardSection>
            );
        }
    }

    renderActualAddress() {
        const { address } = this.props.account;

        if (address) {
            return (
                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={fonts.HUGE_FONT}>
                        Dirección actual
                    </Text>
                    <Text style={fonts.BIG_FONT}>
                        {address}
                    </Text>
                </CardSection>
            );
        }

        return (
            <CardSection>
                <Warning>
                    No se ha registrado ninguna dirección todavía.
                </Warning>
            </CardSection>
        );
    }

    renderRegistryButton() {
        const { loading } = this.props;

        if (loading) {
            return <Spinner size="large" />;
        }

        return (
            <Card>
                <CardSection>
                    <Button onPress={this.onRegisterButtonPress}>
                        Añadir
                    </Button>
                </CardSection>
            </Card>
        );
    }

    render() {
        const { address } = this.props;

        return (
            <Template>
                <Header
                    renderBackButton
                    renderUserAccountMenuButton
                    headerTitle="Tu dirección"
                />

                <Card>
                    {this.renderActualAddress()}
                </Card>

                <Card>
                    <CardSection>
                        <InputColumn
                            label="Introduzca una dirección:"
                            placeholder="Partida Benadresa, 90, Castelló de la Plana"
                            value={address}
                            onChangeText={value => this.props.addressFormChange({
                                prop: 'address',
                                value
                            })}
                        />
                    </CardSection>

                    {this.renderFormSuccess()}
                    {this.renderFormFailure()}
                </Card>

                {/* Espacio */}
                <View style={{ flex: 1 }} />

                {this.renderRegistryButton()}
            </Template>
        );
    }
}

const mapStateToProps = ({ account, addressForm }) => {
    const { address, error, loading, updated } = addressForm;

    return { account, address, error, loading, updated };
};

export default connect(mapStateToProps, {
    addressFormReset,
    addressFormChange,
    addressUpdate,
    addressFormFailure
})(UserAccountAddress);
