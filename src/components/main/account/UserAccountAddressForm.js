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
        const { addresses, formAddress } = this.props;

        if (formAddress === '') {
            this.props.addressFormError('Existen campos vacíos.');
            return;
        }

        this.props.addressAdd(addresses, formAddress);

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
                    <Failure title={'FALLO DE FORMULARIO'}>
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
                title="Introduzca una dirección"
                onAccept={this.onAccept}
                onDecline={this.onDecline}
                titleSize={22}
            >
                <Card>
                    <CardSection>
                        <TextInput
                            placeholder="Partida Benadresa, 90, Castelló de la Plana"
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
    const { addresses } = account;
    const { formAddress, formError } = userAddressForm;

    return { addresses, formAddress, formError };
};

export default connect(mapStateToProps, {
    addressFormReset,
    addressFormChange,
    addressFormError,
    addressAdd
})(UserAccountAddressForm);
