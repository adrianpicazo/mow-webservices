import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from '../../common/index';
import COStatusBar from '../../auxiliar/COStatusBar';
import { userAccountFetch, logoutUser } from '../../../actions/index';
import {
    IC_BLACK_CONTACT,
    IC_BLACK_ACCOUNT_LOGOUT,
    IC_BLACK_SETTINGS,
    IC_BLACK_VIEW_DETAILS,
    IC_BLACK_HOME
} from '../../../res/images/index';

class UserAccountMenu extends Component {

    constructor(props, context) {
        super(props, context);

        this.onDisconnectButtonPress = this.onDisconnectButtonPress.bind(this);
    }

    componentWillMount() {
        this.props.userAccountFetch();
    }

    onDisconnectButtonPress() {
        this.props.logoutUser();
    }

    renderHeader() {
        const {
            titleTextStyle,
            subtitleTextStyle,
            containerTextStyle,
            imageStyle,
            containerImageStyle,
            headerStyle
        } = headerStyles;

        const { name, surnames, email } = this.props;

        return (
            <Card style={headerStyle}>
                <CardSection style={containerImageStyle}>
                    <Image
                        style={imageStyle}
                        source={IC_BLACK_CONTACT}
                        resizeMode="contain"
                    />
                </CardSection>
                <CardSection style={containerTextStyle}>
                    <Text style={titleTextStyle}>
                        {name} {surnames}
                    </Text>
                    <Text style={subtitleTextStyle}>
                        {email}
                    </Text>
                </CardSection>
            </Card>
        );
    }

    renderMenuItem(image, label, onPress) {
        const {
            itemLabelStyle,
            itemImageStyle,
            itemContainerStyle,
            itemContainerTouchableStyle
        } = menuListStyles;

        return (
            <CardSection style={itemContainerStyle}>
                <TouchableHighlight
                    style={{ width: '100%' }}
                    onPress={onPress}
                    underlayColor={'#dddddd'}
                >
                    <View style={itemContainerTouchableStyle}>
                        <Image
                            style={itemImageStyle}
                            source={image}
                            resizeMode="contain"
                        />
                        <Text style={itemLabelStyle}>
                            {label}
                        </Text>
                    </View>
                </TouchableHighlight>
            </CardSection>
        );
    }

    renderMenuList() {
        const { itemListStyle } = menuListStyles;

        return (
            <Card style={itemListStyle}>
                {this.renderMenuItem(
                    IC_BLACK_HOME,
                    'Dirección',
                    () => Actions.push('userAccountAddress'))
                }
                {this.renderMenuItem(
                    IC_BLACK_VIEW_DETAILS,
                    'Pedidos',
                    () => { console.log('Pedidos'); })
                }
                {this.renderMenuItem(
                    IC_BLACK_SETTINGS,
                    'Configuración',
                    () => { console.log('Configuración'); })
                }
                {this.renderMenuItem(
                    IC_BLACK_ACCOUNT_LOGOUT,
                    'Desconectar',
                    this.onDisconnectButtonPress
                )}
            </Card>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <COStatusBar />
                {this.renderHeader()}
                {this.renderMenuList()}
            </View>
        );
    }
}

const menuListStyles = {
    itemLabelStyle: {
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'left',
        marginLeft: 20
    },
    itemImageStyle: {
        height: 30,
        width: 30
    },
    itemContainerStyle: {
        width: '100%',
        padding: 0
    },
    itemContainerTouchableStyle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20
    },
    itemListStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        borderWidth: 0,
        borderRadius: 0,
        shadowOffset: { width: 0, height: 0 },
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        elevation: 0,
        paddingTop: 15
    }
};

const headerStyles = {
    titleTextStyle: {
        backgroundColor: '#d0d0d0',
        width: '100%',
        color: '#ffffff',
        fontSize: 22,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitleTextStyle: {
        backgroundColor: '#d0d0d0',
        width: '100%',
        color: '#ffffff',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'center',
    },
    containerTextStyle: {
        backgroundColor: '#d0d0d0',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    imageStyle: {
        backgroundColor: '#d0d0d0',
        width: '100%',
        height: 100,
        tintColor: '#ffffff'
    },
    containerImageStyle: {
        backgroundColor: '#d0d0d0',
        padding: 10
    },
    headerStyle: {
        backgroundColor: '#d0d0d0',
        borderWidth: 0,
        borderRadius: 0,
        shadowOffset: { width: 0, height: 0 },
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        elevation: 0,
        paddingTop: 10,
        paddingBottom: 10
    }
};

const mapStateToProps = ({ account }) => {
    const { name, surnames, email } = account;

    return { name, surnames, email };
};

export default connect(mapStateToProps, {
    userAccountFetch,
    logoutUser
})(UserAccountMenu);
