import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../headers/Header';
import {
    Card,
    CardSection,
    Button,
    InputColumn,
    Spinner,
    Information,
    Failure,
    Success
} from '../../common/index';
import {
    addressFormReset,
    addressFormChange,
    addressUpdate,
    addressFormFailure
} from '../../../actions/index';

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

    renderFeedbackAlert() {
        const {
            cardStyle,
            cardSectionStyle,
        } = styles;

        const { updated, error } = this.props;
        const { address } = this.props.account;

        if (address === '') {
            return (
                <Card style={cardStyle}>
                    <CardSection style={cardSectionStyle}>
                        <Information>
                            No se ha registrado ninguna dirección todavía.
                        </Information>
                    </CardSection>
                </Card>
            );
        } else if (updated) {
            return (
                <Card style={cardStyle}>
                    <CardSection style={cardSectionStyle}>
                        <Success title={'ÉXITO DE ACTUALIZACIÓN'}>
                            La dirección se ha actualizado correctamente.
                        </Success>
                    </CardSection>
                </Card>
            );
        } else if (error !== '') {
            return (
                <Card style={cardStyle}>
                    <CardSection style={cardSectionStyle}>
                        <Failure title={'FALLO DE ACTUALIZACIÓN'}>
                            {error}
                        </Failure>
                    </CardSection>
                </Card>
            );
        }
    }

    renderActualAddress() {
        const {
            cardStyle,
            cardSectionStyle,
            labelStyle,
            textStyle
        } = styles;

        const { loading } = this.props;
        const { address } = this.props.account;

        if (loading) {
            return <Spinner size="large" />;
        }

        return (
            <Card style={cardStyle}>
                <CardSection style={cardSectionStyle}>
                    <Text style={labelStyle}>
                        Dirección actual
                    </Text>
                    <Text style={textStyle}>
                        { address || '-' }
                    </Text>
                </CardSection>
            </Card>
        );
    }

    render() {
        const {
            cardStyle,
            cardSectionStyle,
        } = styles;

        const { address } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <Header
                    renderBackButton
                    renderUserAccountMenuButton
                    headerTitle="Tu pedido"
                />

                {this.renderFeedbackAlert()}
                {this.renderActualAddress()}

                <Card style={[cardStyle, { marginBottom: 10 }]}>
                    <CardSection style={cardSectionStyle}>
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

                    <CardSection style={cardSectionStyle}>
                        <Button onPress={this.onRegisterButtonPress}>
                            Registrar
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
