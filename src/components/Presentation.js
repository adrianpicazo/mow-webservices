import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import OneSignal from 'react-native-onesignal';
import { Actions } from 'react-native-router-flux';
import { analyticsTracker } from '../App';
import { Template, Card, CardSection, Button, Spinner } from './common/index';
import { colors } from '../res/Colors';
import { userAccountFetchFromAsyncStorage } from '../actions/index';
import { notificationCenter } from '../utils/NotificationCenter';
import { I18nUtils } from '../utils/I18nUtils';
import { TR_APP_NAME, TR_BUTTON_LOGIN, TR_WELCOME } from '../i18n/constants';

import I18n, { getLanguages } from 'react-native-i18n';


class Presentation extends Component {

    constructor(props, context) {
        super(props, context);

        this.onReceived = this.onReceived.bind(this);
        this.onOpened = this.onOpened.bind(this);
        this.onButtonPress = this.onButtonPress.bind(this);
    }

    componentWillMount() {
        this.props.userAccountFetchFromAsyncStorage(() => {
            OneSignal.addEventListener('received', this.onReceived);
            OneSignal.addEventListener('opened', this.onOpened);
            OneSignal.addEventListener('ids', this.onIds);
        });
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('Presentation');
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log('Notification received: ', notification);
    }

    onOpened(openResult) {
        const { uid } = this.props;

        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);

        notificationCenter(uid, openResult);
    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    onButtonPress() {
        const { uid } = this.props;

        if (uid === '')
            Actions.push('login');
        else Actions.push('main');
    }

    render() {
        const {
            textContainerStyle,
            textStyle
        } = styles;

        const { loading } = this.props;

        return (
            <Template>
                {loading ? <Spinner size="large" /> : (
                    <View style={{ flex: 1 }}>
                        {/* Espaciado */}
                        <View style={{ flex: 1 }} />

                        <Card>
                            <CardSection>
                                <View style={textContainerStyle}>
                                    <Text style={[textStyle, { fontSize: 35 }]}>
                                        {I18nUtils.tr(TR_APP_NAME)}
                                    </Text>
                                    <Text style={textStyle}>
                                        {I18nUtils.tr(TR_WELCOME)}
                                    </Text>
                                </View>
                            </CardSection>
                        </Card>

                        {/* Espaciado */}
                        <View style={{ flex: 1 }} />

                        <Card>
                            <CardSection>
                                <Button onPress={this.onButtonPress}>
                                    {I18nUtils.tr(TR_BUTTON_LOGIN)}
                                </Button>
                            </CardSection>
                        </Card>
                    </View>
                )}
            </Template>
        );
    }
}

const styles = {
    textContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 24,
        padding: 5,
        fontWeight: 'bold',
        color: colors.BLUE.N900
    }
};

const stateMapToProps = ({ presentation, account }) => {
    const { loading, error } = presentation;
    const { uid } = account;

    return { loading, error, uid };
};

export default connect(stateMapToProps, { userAccountFetchFromAsyncStorage })(Presentation);
