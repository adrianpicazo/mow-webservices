import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import OneSignal from 'react-native-onesignal';
import { Template, Card, CardSection, Button, Spinner } from './common/index';
import { colors } from '../res/Colors';
import { skipLoginUser } from '../actions/index';
import AsyncStorage, { AUTH_DATA } from '../utils/AsyncStorage';
import { notificationCenter } from '../utils/NotificationCenter';

class Presentation extends Component {

    constructor(props, context) {
        super(props, context);

        this.onReceived = this.onReceived.bind(this);
        this.onOpened = this.onOpened.bind(this);
        this.onButtonPress = this.onButtonPress.bind(this);
    }

    componentWillMount() {
        console.warn('hola');
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
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
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);

        AsyncStorage.get(AUTH_DATA).then(user => notificationCenter(user, openResult));
    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    onButtonPress() {
        this.props.skipLoginUser();
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
                                        Wheels On Meals
                                    </Text>
                                    <Text style={textStyle}>
                                        Bienvenido
                                    </Text>
                                </View>
                            </CardSection>
                        </Card>

                        {/* Espaciado */}
                        <View style={{ flex: 1 }} />

                        <Card>
                            <CardSection>
                                <Button onPress={this.onButtonPress}>
                                    Acceder
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

const stateMapToProps = ({ presentation }) => {
    const { loading } = presentation;

    return { loading };
};

export default connect(stateMapToProps, { skipLoginUser })(Presentation);
