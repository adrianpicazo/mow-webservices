import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
    Template,
    ScrollTemplate,
    Card,
    CardSection,
    InputColumn,
    Button,
    Failure,
    Spinner
} from '../common/index';
import Header from '../headers/Header';
import InputSecure from '../common/InputSecure';
import {
    registryReset,
    registryFieldsChanged,
    registryUserError,
    registryUser
} from '../../actions/index';
import { analyticsTracker } from '../../App';
import { I18nUtils } from '../../utils/I18nUtils';
import {
    TR_BUTTON_SIGN_IN,
    TR_ERROR_EMPTY_FIELDS, TR_ERROR_PASSWORDS_NOT_MATCH,
    TR_FEEDBACK_TITLE_SIGN_IN_FAILURE,
    TR_HEADER_SIGN_IN_TITLE,
    TR_LABEL_EMAIL,
    TR_LABEL_NAME,
    TR_LABEL_PASSWORD,
    TR_LABEL_REPEAT_PASSWORD,
    TR_LABEL_SURNAMES,
    TR_PLACEHOLDER_EMAIL,
    TR_PLACEHOLDER_NAME,
    TR_PLACEHOLDER_PASSWORD,
    TR_PLACEHOLDER_REPEAT_PASSWORD,
    TR_PLACEHOLDER_SURNAMES
} from '../../i18n/constants';

class RegistryForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.onRegistryButtonPress = this.onRegistryButtonPress.bind(this);
    }

    componentWillMount() {
        this.props.registryReset();
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('Registry');
    }

    onRegistryButtonPress() {
        if (this.areThereEmptyFields()) {
            this.props.registryUserError({ error: I18nUtils.tr(TR_ERROR_EMPTY_FIELDS) });
        } else if (this.areTheyDifferentPasswords()) {
            this.props.registryUserError({ error: I18nUtils.tr(TR_ERROR_PASSWORDS_NOT_MATCH) });
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
        const { error } = this.props;

        if (error) {
            return (
                <CardSection>
                    <Failure title={I18nUtils.tr(TR_FEEDBACK_TITLE_SIGN_IN_FAILURE)}>
                        {error}
                    </Failure>
                </CardSection>
            );
        }
    }

    renderRegistryButton() {
        const { loading } = this.props;

        if (loading) {
            return <Spinner size="large" />;
        }

        return (
            <Card>
                <CardSection>
                    <Button onPress={this.onRegistryButtonPress}>
                        {I18nUtils.tr(TR_BUTTON_SIGN_IN)}
                    </Button>
                </CardSection>
            </Card>
        );
    }

    render() {
        const { name, surnames, email, password, repeatedPassword } = this.props.formFields;

        return (
            <Template>
                <Header
                    renderBackButton
                    headerTitle={I18nUtils.tr(TR_HEADER_SIGN_IN_TITLE)}
                />

                <ScrollTemplate>
                    <Card>
                        <CardSection>
                            <InputColumn
                                label={I18nUtils.tr(TR_LABEL_NAME)}
                                placeholder={I18nUtils.tr(TR_PLACEHOLDER_NAME)}
                                value={name}
                                onChangeText={value => this.props.registryFieldsChanged({
                                    prop: 'name',
                                    value
                                })}
                            />
                        </CardSection>

                        <CardSection>
                            <InputColumn
                                label={I18nUtils.tr(TR_LABEL_SURNAMES)}
                                placeholder={I18nUtils.tr(TR_PLACEHOLDER_SURNAMES)}
                                value={surnames}
                                onChangeText={value => this.props.registryFieldsChanged({
                                    prop: 'surnames',
                                    value
                                })}
                            />
                        </CardSection>

                        <CardSection>
                            <InputColumn
                                llabel={I18nUtils.tr(TR_LABEL_EMAIL)}
                                placeholder={I18nUtils.tr(TR_PLACEHOLDER_EMAIL)}
                                value={email}
                                onChangeText={value => this.props.registryFieldsChanged({
                                    prop: 'email',
                                    value
                                })}
                            />
                        </CardSection>

                        <CardSection>
                            <InputSecure
                                label={I18nUtils.tr(TR_LABEL_PASSWORD)}
                                placeholder={I18nUtils.tr(TR_PLACEHOLDER_PASSWORD)}
                                value={password}
                                onChangeText={value => this.props.registryFieldsChanged({
                                    prop: 'password',
                                    value
                                })}
                            />
                        </CardSection>

                        <CardSection>
                            <InputSecure
                                label={I18nUtils.tr(TR_LABEL_REPEAT_PASSWORD)}
                                placeholder={I18nUtils.tr(TR_PLACEHOLDER_REPEAT_PASSWORD)}
                                value={repeatedPassword}
                                onChangeText={value => this.props.registryFieldsChanged({
                                    prop: 'repeatedPassword',
                                    value
                                })}
                            />
                        </CardSection>

                        {this.renderRegistryError()}
                    </Card>

                    {/* Espacio */}
                    <View style={{ flex: 1 }} />

                    {this.renderRegistryButton()}
                </ScrollTemplate>
            </Template>
        );
    }
}

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
