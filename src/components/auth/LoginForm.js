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
import InputSecure from '../common/InputSecure';
import {
    loginReset,
    loginFieldsChanged,
    loginUserError,
    loginUser
} from '../../actions/index';
import { analyticsTracker } from '../../App';
import { I18nUtils } from '../../utils/I18nUtils';
import {
    TR_BUTTON_LOG_IN,
    TR_BUTTON_SIGN_IN,
    TR_ERROR_EMPTY_FIELDS,
    TR_FEEDBACK_BODY_SIGN_IN_SUCCESS,
    TR_FEEDBACK_TITLE_LOG_IN_FAILURE,
    TR_FEEDBACK_TITLE_SIGN_IN_SUCCESS,
    TR_HEADER_LOGIN_TITLE,
    TR_LABEL_EMAIL,
    TR_LABEL_PASSWORD,
    TR_PLACEHOLDER_EMAIL,
    TR_PLACEHOLDER_PASSWORD
} from '../../i18n/constants';

class LoginForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.onLoginButtonPress = this.onLoginButtonPress.bind(this);
        this.onRegisterButtonPress = this.onRegisterButtonPress.bind(this);
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('Login');
    }

    onLoginButtonPress() {
        const { email, password } = this.props;

        if (email === '' || password === '') {
            this.props.loginUserError({ error: I18nUtils.tr(TR_ERROR_EMPTY_FIELDS) });
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
                    <Failure title={I18nUtils.tr(TR_FEEDBACK_TITLE_LOG_IN_FAILURE)}>
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
                    <Success title={I18nUtils.tr(TR_FEEDBACK_TITLE_SIGN_IN_SUCCESS)}>
                        {I18nUtils.tr(TR_FEEDBACK_BODY_SIGN_IN_SUCCESS)}
                    </Success>
                </CardSection>
            );
        }
    }

    renderLoginButtons() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Card>
                <CardSection>
                    <Button onPress={this.onLoginButtonPress}>
                        {I18nUtils.tr(TR_BUTTON_LOG_IN)}
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onRegisterButtonPress}>
                        {I18nUtils.tr(TR_BUTTON_SIGN_IN)}
                    </Button>
                </CardSection>
            </Card>
        );
    }

    render() {
        return (
            <Template>
                <Header headerTitle={I18nUtils.tr(TR_HEADER_LOGIN_TITLE)} />

                <ScrollTemplate>
                    <Card>
                        <CardSection>
                            <InputColumn
                                label={I18nUtils.tr(TR_LABEL_EMAIL)}
                                placeholder={I18nUtils.tr(TR_PLACEHOLDER_EMAIL)}
                                value={this.props.email}
                                onChangeText={value => this.props.loginFieldsChanged({
                                    prop: 'email',
                                    value
                                })}
                            />
                        </CardSection>

                        <CardSection>
                            <InputSecure
                                label={I18nUtils.tr(TR_LABEL_PASSWORD)}
                                placeholder={I18nUtils.tr(TR_PLACEHOLDER_PASSWORD)}
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
