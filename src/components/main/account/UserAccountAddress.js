import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../headers/Header';
import UserAccountAddressItem from './UserAccountAddressItem';
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
    addressFormFailure,
    addressesFetch
} from '../../../actions/index';
import { fonts } from '../../../res/Fonts';

class UserAccountAddress extends Component {

    constructor(props, context) {
        super(props, context);

        this.onRegisterButtonPress = this.onRegisterButtonPress.bind(this);
    }

    componentWillMount() {
        //this.props.addressFormReset();
    }

    componentDidMount() {
        this.props.addressesFetch();
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
        /*
        const { address } = this.props.account;

        if (address) {
            return (
                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={fonts.HUGE}>
                        Dirección actual
                    </Text>
                    <Text style={fonts.BIG}>
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
        */
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
        const { flatListStyle } = styles;
        const { addresses } = this.props;

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

                <Card style={{ width: '100%' }}>
                    {/*
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
                    */}

                    <FlatList
                        data={addresses}
                        renderItem={({ item }) => <UserAccountAddressItem address={item} />}
                        keyExtractor={(item, index) => index.toString()}
                        style={flatListStyle}
                    />

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

const styles = {
    flatListStyle: {
        position: 'relative',
        width: '100%',
        marginTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 10
    }
};

const mapStateToProps = ({ account, addressForm }) => {
    const { addresses, error, loading, updated } = addressForm;

    return { account, addresses, error, loading, updated };
};

export default connect(mapStateToProps, {
    addressFormReset,
    addressFormChange,
    addressUpdate,
    addressFormFailure,
    addressesFetch
})(UserAccountAddress);
