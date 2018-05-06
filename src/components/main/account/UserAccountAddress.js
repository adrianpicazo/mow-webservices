import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../headers/Header';
import UserAccountAddressItem from './UserAccountAddressItem';
import {
    Template,
    ScrollTemplate,
    Card,
    CardSection,
    IconButton,
    Spinner,
    Failure
} from '../../common/index';
import { addressesFetch } from '../../../actions/index';
import { fonts } from '../../../res/Fonts';
import { IC_WHITE_PLUS } from '../../../res/images';
import { colors } from '../../../res/Colors';
import { analyticsTracker } from '../../../App';
import { I18nUtils } from '../../../utils/I18nUtils';
import {
    TR_BODY_REGISTERED_ADDRESSES,
    TR_HEADER_USER_ADDRESSES,
    TR_TITLE_FAILURE_ERASING,
    TR_TITLE_FAILURE_OBTAINING_DATA,
    TR_TITLE_FAILURE_REGISTRATION
} from '../../../i18n/constants';

class UserAccountAddress extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('User Account Address');

        const { uid, token } = this.props;

        this.props.addressesFetch(token || uid);
    }

    renderFailure() {
        const { addFailure, removeFailure } = this.props;

        if (addFailure) {
            return (
                <CardSection>
                    <Failure title={I18nUtils.tr(TR_TITLE_FAILURE_REGISTRATION)}>
                        {addFailure}
                    </Failure>
                </CardSection>
            );
        }

        if (removeFailure) {
            return (
                <CardSection>
                    <Failure title={I18nUtils.tr(TR_TITLE_FAILURE_ERASING)}>
                        {removeFailure}
                    </Failure>
                </CardSection>
            );
        }
    }

    renderAddressList() {
        const { flatListStyle } = styles;
        const { addresses, fetchLoading, fetchFailure, addLoading, removeSuccess } = this.props;

        if (fetchLoading || addLoading) {
            return (
                <Spinner size="large" />
            );
        }

        if (!removeSuccess && fetchFailure) {
            return (
                <CardSection>
                    <Failure title={I18nUtils.tr(TR_TITLE_FAILURE_OBTAINING_DATA)}>
                        {fetchFailure}
                    </Failure>
                </CardSection>
            );
        }

        return (
            <FlatList
                data={addresses}
                renderItem={({ item }) => <UserAccountAddressItem address={item} index />}
                keyExtractor={(item, index) => index.toString()}
                style={flatListStyle}
                extraData={this.props}
            />
        );
    }

    renderAddButton() {
        return (
            <CardSection style={{ alignSelf: 'flex-end' }}>
                <IconButton
                    onPress={() => Actions.push('userAccountAddressForm')}
                    image={IC_WHITE_PLUS}
                    buttonStyle={styles.buttonStyle}
                    imageStyle={{ tintColor: colors.BLUE.N700 }}
                />
            </CardSection>
        );
    }

    render() {
        return (
            <Template>
                <Header
                    renderBackButton
                    headerTitle={I18nUtils.tr(TR_HEADER_USER_ADDRESSES)}
                />

                <ScrollTemplate>
                    <Card style={{ width: '100%' }}>
                        <CardSection style={{ alignSelf: 'flex-start' }}>
                            <Text style={fonts.HUGE}>
                                {I18nUtils.tr(TR_BODY_REGISTERED_ADDRESSES)}
                            </Text>
                        </CardSection>

                        {this.renderAddressList()}
                        {this.renderAddButton()}
                        {this.renderFailure()}
                    </Card>
                </ScrollTemplate>
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
    },
    buttonStyle: {
        height: 35,
        width: 35,
        padding: 6,
        borderColor: colors.BLUE.N700
    }
};

const mapStateToProps = ({ userAddresses, account }) => {
    const { uid, token, addresses } = account;
    const {
        fetchLoading,
        fetchFailure,
        removeFailure,
        removeSuccess,
        addSuccess,
        addFailure,
        addLoading
    } = userAddresses;

    return {
        uid,
        token,
        addresses,
        fetchLoading,
        fetchFailure,
        removeFailure,
        removeSuccess,
        addSuccess,
        addFailure,
        addLoading
    };
};

export default connect(mapStateToProps, { addressesFetch })(UserAccountAddress);
