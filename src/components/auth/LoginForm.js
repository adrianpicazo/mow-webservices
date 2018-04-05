import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
BaseTemplate,
Card,
CardSection,
InputColumn,
Button,
Spinner,
Failure,
Success
} from '../common/index';
import Header from '../headers/Header';
import {
    loginReset,
    loginFieldsChanged,
    loginUserError,
    loginUser
} from '../../actions/index';
import { colors } from '../../res/Colors';

class LoginForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.onLoginButtonPress = this.onLoginButtonPress.bind(this);
        this.onRegisterButtonPress = this.onRegisterButtonPress.bind(this);
    }

    onLoginButtonPress() {
        const { email, password } = this.props;

        if (email === '' || password === '') {
            this.props.loginUserError({ error: 'Existen campos vacíos.' });
        } else {
            this.props.loginUser({ email, password });
        }
    }

    onRegisterButtonPress() {
        this.props.loginReset();

        Actions.push('registry');
    }

    renderLoginError() {
        if (this.props.error) {
            return (
                <CardSection style={styles.cardSectionStyle}>
                    <Failure title={'FALLO DE AUTENTICACIÓN'}>
                        {this.props.error}
                    </Failure>
                </CardSection>
            );
        }
    }

    renderRegistrySuccess() {
        if (this.props.registrySuccess) {
            return (
                <CardSection style={styles.cardSectionStyle}>
                    <Success title={'ÉXITO DE REGISTRO'}>
                        {'Se ha registrado satisfactoriamente.'}
                    </Success>
                </CardSection>
            );
        }
    }

    renderLoginButtons() {
        const { viewStyle, cardSectionStyle } = styles;

        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <View style={viewStyle}>
                <CardSection style={cardSectionStyle}>
                    <Button onPress={this.onLoginButtonPress}>
                        Acceder
                    </Button>
                </CardSection>
                <CardSection style={cardSectionStyle}>
                    <Button onPress={this.onRegisterButtonPress}>
                        Registrarse
                    </Button>
                </CardSection>
            </View>
        );
    }

    render() {
        const { cardStyle, cardSectionStyle, viewStyle } = styles;

        return (
            <BaseTemplate>
                <Header headerTitle="Acceso" />

                <Card style={cardStyle}>
                    <View style={viewStyle}>
                        <CardSection style={cardSectionStyle}>
                            <InputColumn
                                label="Correo electrónico"
                                placeholder="email@gmail.com"
                                value={this.props.email}
                                onChangeText={value => this.props.loginFieldsChanged({
                                    prop: 'email',
                                    value
                                })}
                            />
                        </CardSection>

                        <CardSection style={cardSectionStyle}>
                            <InputColumn
                                secureTextEntry
                                label="Contraseña"
                                placeholder="*******"
                                value={this.props.password}
                                onChangeText={value => this.props.loginFieldsChanged({
                                    prop: 'password',
                                    value
                                })}
                            />
                        </CardSection>

                        {this.renderLoginError()}
                        {this.renderRegistrySuccess()}
                    </View>

                    {this.renderLoginButtons()}
                </Card>
            </BaseTemplate>
        );
    }
}

const styles = {
    viewStyle: {
        flexDirection: 'column',
    },
    cardStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    cardSectionStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 0,
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, registrySuccess } = auth;

    return { email, password, error, loading, registrySuccess };
};

export default connect(mapStateToProps, {
    loginReset,
    loginFieldsChanged,
    loginUserError,
    loginUser
})(LoginForm);
