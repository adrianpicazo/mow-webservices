import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Header from '../../headers/Header';
import {
    Card,
    CardSection,
    Button,
    InputColumn,
    Failure,
    Template,
    Spinner,
    Warning
} from '../../common/index';
import {
    orderAddressesFetch,
    orderAddressFormReset,
    orderAddressFormChange,
    orderAddressFormFailure,
    orderAddressAddition
} from '../../../actions/index';
import { OrderAddressItem } from './OrderAddressItem';
import { fonts } from '../../../res/Fonts';
import { analyticsTracker } from '../../../App';
import { I18nUtils } from '../../../utils/I18nUtils';
import {
    TR_BODY_ORDER_SHIPPING_ADDRESS,
    TR_BODY_REGISTERED_ADDRESSES,
    TR_BUTTON_COMPLETE_ORDER,
    TR_ERROR_EMPTY_FIELDS,
    TR_ERROR_NO_ADDRESSES,
    TR_LABEL_ENTER_ADDRESS,
    TR_PLACEHOLDER_ADDRESS,
    TR_TITLE_FAILURE_FORM
} from '../../../i18n/constants';

class OrderAddress extends Component {

    constructor(props, context) {
        super(props, context);

        this.onPressButton = this.onPressButton.bind(this);
    }

    componentWillMount() {
        this.props.orderAddressFormReset();
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('Order Address');

        const { uid, addresses } = this.props;

        if (addresses === null)
            this.props.orderAddressesFetch(uid);
    }

    onPressButton() {
        const { formAddress } = this.props;

        if (formAddress === '') {
            this.props.orderAddressFormFailure(I18nUtils.tr(TR_ERROR_EMPTY_FIELDS));
        } else {
            analyticsTracker.trackEvent('FinishOrder Button', 'Pressed');

            this.props.orderAddressAddition(formAddress);
            Actions.push('orderDone');
        }
    }

    renderAddressList() {
        const { flatListStyle } = styles;
        const { addresses, fetchLoading, fetchFailure } = this.props;

        if (fetchLoading) {
            return (
                <Spinner size="large" />
            );
        }

        if (fetchFailure || (addresses !== null && addresses.length === 0)) {
            return (
                <CardSection>
                    <Warning>
                        {I18nUtils.tr(TR_ERROR_NO_ADDRESSES)}
                    </Warning>
                </CardSection>
            );
        }

        return (
            <FlatList
                data={addresses}
                renderItem={({ item }) => <OrderAddressItem
                    address={item}
                    onPress={() => this.props.orderAddressFormChange({
                        prop: 'formAddress',
                        value: item
                    })}
                />}
                keyExtractor={(item, index) => index.toString()}
                style={flatListStyle}
                extraData={this.props}
                ItemSeparatorComponent={() => <View style={{ padding: 2 }} />}
            />
        );
    }

    renderOrderAddressForm() {
        const { formAddress, formError } = this.props;

        return (
            <Card>
                <CardSection>
                    <InputColumn
                        label={I18nUtils.tr(TR_LABEL_ENTER_ADDRESS)}
                        placeholder={I18nUtils.tr(TR_PLACEHOLDER_ADDRESS)}
                        value={formAddress}
                        onChangeText={value => this.props.orderAddressFormChange({
                            prop: 'formAddress',
                            value
                        })}
                    />
                </CardSection>

                {formError ? (
                    <CardSection>
                        <Failure title={I18nUtils.tr(TR_TITLE_FAILURE_FORM)}>
                            {formError}
                        </Failure>
                    </CardSection>
                ) : null }
            </Card>
        );
    }

    renderCompleteOrderButton() {
        return (
            <Card>
                <CardSection>
                    <Button onPress={this.onPressButton}>
                        {I18nUtils.tr(TR_BUTTON_COMPLETE_ORDER)}
                    </Button>
                </CardSection>
            </Card>
        );
    }

    render() {
        return (
            <Template>
                <Header
                    renderBackButton
                    headerTitle={I18nUtils.tr(TR_BODY_ORDER_SHIPPING_ADDRESS)}
                    newHeaderTextStyle={{ fontSize: 20 }}
                />

                {this.renderOrderAddressForm()}

                <Card style={{ width: '100%', flex: 1 }}>
                    <CardSection style={{ width: '100%' }}>
                        <Text style={fonts.HUGE}>
                            {I18nUtils.tr(TR_BODY_REGISTERED_ADDRESSES)}
                        </Text>
                    </CardSection>

                    {this.renderAddressList()}
                </Card>

                {this.renderCompleteOrderButton()}
            </Template>
        );
    }
}

const styles = {
    flatListStyle: {
        position: 'relative',
        width: '100%',
        marginTop: 5,
        marginBottom: 5
    }
};

const mapStateToProps = ({ account, orderAddressForm }) => {
    const { uid, addresses } = account;
    const { fetchLoading, fetchFailure, formAddress, formError } = orderAddressForm;

    return { uid, addresses, fetchLoading, fetchFailure, formAddress, formError };
};

export default connect(mapStateToProps, {
    orderAddressesFetch,
    orderAddressFormReset,
    orderAddressFormChange,
    orderAddressFormFailure,
    orderAddressAddition
})(OrderAddress);
