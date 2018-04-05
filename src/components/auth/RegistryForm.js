import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
    BaseTemplate,
    Card,
    CardSection,
    InputColumn,
    Button,
    Failure,
    Spinner
} from '../common/index';
import Header from '../headers/Header';
import {
    registryReset,
    registryFieldsChanged,
    registryUserError,
    registryUser
} from '../../actions/index';

class RegistryForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.onRegistryButtonPress = this.onRegistryButtonPress.bind(this);
    }

    componentWillMount() {
        this.props.registryReset();
    }

    onRegistryButtonPress() {
        if (this.areThereEmptyFields()) {
            this.props.registryUserError({ error: 'Existen campos vacíos.' });
        } else if (this.areTheyDifferentPasswords()) {
            this.props.registryUserError({ error: 'Las contraseñas no coinciden.' });
            this.props.registryFieldsChanged({ prop: 'repeatedPassword', value: '' });
        } else {
            const { name, surnames, email, password } = this.props.formFields;

            this.props.registryUser({ name, surnames, email, password });
        }
    }

    areThereEmptyFields() {
        const index = _.findIndex(Object.values(this.props.formFields), value => {
            return value === '';
        });

        return index >= 0;
    }

    areTheyDifferentPasswords() {
        const { password, repeatedPassword } = this.props.formFields;

        return password !== repeatedPassword;
    }

    renderRegistryError() {
        if (this.props.error) {
            return (
                <CardSection style={styles.cardSectionStyle}>
                    <Failure title={'FALLO DE REGISTRO'}>
                        {this.props.error}
                    </Failure>
                </CardSection>
            );
        }
    }

    renderRegistryButton() {
        const { viewStyle, cardSectionStyle } = styles;

        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <View style={viewStyle}>
                <CardSection style={cardSectionStyle}>
                    <Button onPress={this.onRegistryButtonPress}>
                        Registrar
                    </Button>
                </CardSection>
            </View>
        );
    }

    render() {
        const { cardStyle, cardSectionStyle, viewStyle } = styles;

        const { name, surnames, email, password, repeatedPassword } = this.props.formFields;

        return (
            <BaseTemplate>
                <Header
                    renderBackButton
                    headerTitle="Registro"
                />

                <Card style={cardStyle}>
                    <View style={viewStyle}>
                        <CardSection style={cardSectionStyle}>
                            <InputColumn
                                label="Nombre"
                                placeholder="Adrián"
                                value={name}
                                onChangeText={value => this.props.registryFieldsChanged({
                                    prop: 'name',
                                    value
                                })}
                            />
                        </CardSection>

                        <CardSection style={cardSectionStyle}>
                            <InputColumn
                                label="Apellidos"
                                placeholder="Picazo Marín"
                                value={surnames}
                                onChangeText={value => this.props.registryFieldsChanged({
                                    prop: 'surnames',
                                    value
                                })}
                            />
                        </CardSection>

                        <CardSection style={cardSectionStyle}>
                            <InputColumn
                                label="Correo electrónico"
                                placeholder="email@gmail.com"
                                value={email}
                                onChangeText={value => this.props.registryFieldsChanged({
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
                                value={password}
                                onChangeText={value => this.props.registryFieldsChanged({
                                    prop: 'password',
                                    value
                                })}
                            />
                        </CardSection>

                        <CardSection style={cardSectionStyle}>
                            <InputColumn
                                secureTextEntry
                                label="Repita contraseña"
                                placeholder="*******"
                                value={repeatedPassword}
                                onChangeText={value => this.props.registryFieldsChanged({
                                    prop: 'repeatedPassword',
                                    value
                                })}
                            />
                        </CardSection>

                        {this.renderRegistryError()}
                    </View>

                    {this.renderRegistryButton()}
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
        marginBottom: 10,
        backgroundColor: '#ffffff',
        padding: 5
    },
    cardSectionStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 0,
    }
};

const mapStateToProps = ({ registry }) => {
    const { name, surnames, email, password, repeatedPassword, error, loading } = registry;

    return { formFields: { name, surnames, email, password, repeatedPassword }, error, loading };
};

export default connect(mapStateToProps, {
    registryReset,
    registryFieldsChanged,
    registryUserError,
    registryUser
})(RegistryForm);
