import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    Template,
    ScrollTemplate,
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
                <CardSection>
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
                <CardSection>
                    <Success title={'ÉXITO DE REGISTRO'}>
                        {'Se ha registrado satisfactoriamente.'}
                    </Success>
                </CardSection>
            );
        }
    }

    renderLoginButtons() {
        if (this.props.loading) {
            return (
                <Spinner size="large" />
            );
        }

        return (
            <Card>
                <CardSection>
                    <Button onPress={this.onLoginButtonPress}>
                        Acceder
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onRegisterButtonPress}>
                        Registrarse
                    </Button>
                </CardSection>
            </Card>
        );
    }

    render() {
        return (
            <Template>
                <Header headerTitle="Acceso" />

                <ScrollTemplate>
                    <Card>
                        <CardSection>
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

                        <CardSection>
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
                    </Card>

                    {/* Espacio */}
                    <View style={{ flex: 1 }} />

                    {this.renderLoginButtons()}
                </ScrollTemplate>
            </Template>
        );
    }
}

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
