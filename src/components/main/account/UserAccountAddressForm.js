import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { TextInput } from 'react-native';
import { ModalBase, Card, CardSection, Failure } from '../../common/index';
import {
    addressFormReset,
    addressFormChange,
    addressFormError,
    addressAdd
} from '../../../actions/index';
import { colors } from '../../../res/Colors';
import { analyticsTracker } from '../../../App';
import { I18nUtils } from '../../../utils/I18nUtils';
import {
    TR_ERROR_EMPTY_FIELDS,
    TR_HEADER_MODAL_ADDRESS_FORM,
    TR_PLACEHOLDER_ADDRESS,
    TR_TITLE_FAILURE_FORM
} from '../../../i18n/constants';

class UserAccountAddressForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.onAccept = this.onAccept.bind(this);
        this.onDecline = this.onDecline.bind(this);
    }

    componentWillMount() {
        this.props.addressFormReset();
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('User Account Address Form');
    }

    onAccept() {
        const { uid, addresses, formAddress } = this.props;

        if (formAddress === '') {
            this.props.addressFormError(I18nUtils.tr(TR_ERROR_EMPTY_FIELDS));
            return;
        }

        this.props.addressAdd(uid, addresses, formAddress);

        Actions.pop();
    }

    onDecline() {
        Actions.pop();
    }

    renderFormFailure() {
        const { formError } = this.props;

        if (formError) {
            return (
                <CardSection>
                    <Failure title={I18nUtils.tr(TR_TITLE_FAILURE_FORM)}>
                        {formError}
                    </Failure>
                </CardSection>
            );
        }
    }

    render() {
        const { inputStyle } = styles;
        const { formAddress } = this.props;

        return (
            <ModalBase
                visible
                title={I18nUtils.tr(TR_HEADER_MODAL_ADDRESS_FORM)}
                onAccept={this.onAccept}
                onDecline={this.onDecline}
                titleSize={22}
            >
                <Card>
                    <CardSection>
                        <TextInput
                            placeholder={I18nUtils.tr(TR_PLACEHOLDER_ADDRESS)}
                            autoCorrect={false}
                            style={[inputStyle, { width: '100%' }]}
                            value={formAddress}
                            onChangeText={value => this.props.addressFormChange({
                                prop: 'formAddress',
                                value
                            })}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.BLUE_GREY.N200}
                        />
                    </CardSection>

                    {this.renderFormFailure()}
                </Card>
            </ModalBase>
        );
    }
}

const styles = {
    inputStyle: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10
    }
};

const mapStateToProps = ({ userAddressForm, account }) => {
    const { uid, addresses } = account;
    const { formAddress, formError } = userAddressForm;

    return { uid, addresses, formAddress, formError };
};

export default connect(mapStateToProps, {
    addressFormReset,
    addressFormChange,
    addressFormError,
    addressAdd
})(UserAccountAddressForm);
