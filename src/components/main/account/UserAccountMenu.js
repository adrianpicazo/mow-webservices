import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Template, Card, CardSection } from '../../common/index';
import { logoutUser } from '../../../actions/index';
import {
    IC_BLACK_CONTACT,
    IC_BLACK_ACCOUNT_LOGOUT,
    IC_BLACK_SETTINGS,
    IC_BLACK_VIEW_DETAILS,
    IC_BLACK_HOME
} from '../../../res/images/index';
import { colors } from '../../../res/Colors';
import { UserAccountMenuItem } from './UserAccountMenuItem';
import { fonts } from '../../../res/Fonts';
import { analyticsTracker } from '../../../App';
import { I18nUtils } from '../../../utils/I18nUtils';
import {
    TR_MENU_ADDRESSES,
    TR_MENU_LOGOUT,
    TR_MENU_ORDERS,
    TR_MENU_SETTINGS
} from '../../../i18n/constants';

class UserAccountMenu extends Component {

    constructor(props, context) {
        super(props, context);

        this.onDisconnectButtonPress = this.onDisconnectButtonPress.bind(this);
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('User Account Menu');
    }

    onDisconnectButtonPress() {
        this.props.logoutUser();
    }

    renderHeader() {
        const { headerStyle, imageStyle } = headerStyles;

        const { name, surnames, email } = this.props;

        return (
            <Card style={headerStyle}>
                <CardSection>
                    <Image
                        style={imageStyle}
                        source={IC_BLACK_CONTACT}
                        resizeMode="contain"
                    />
                </CardSection>
                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={[fonts.HUGE, { color: colors.WHITE }]}>
                        {name} {surnames}
                    </Text>
                    <Text style={[fonts.BIG, { color: colors.WHITE }]}>
                        {email}
                    </Text>
                </CardSection>
            </Card>
        );
    }

    renderMenuList() {
        return (
            <Card style={{ width: '100%', alignItems: 'flex-start' }}>
                <UserAccountMenuItem
                    image={IC_BLACK_HOME}
                    label={I18nUtils.tr(TR_MENU_ADDRESSES)}
                    onPress={() => Actions.push('userAccountAddress')}
                />
                <UserAccountMenuItem
                    image={IC_BLACK_VIEW_DETAILS}
                    label={I18nUtils.tr(TR_MENU_ORDERS)}
                    onPress={() => Actions.push('userAccountOrder')}
                />
                <UserAccountMenuItem
                    image={IC_BLACK_SETTINGS}
                    label={I18nUtils.tr(TR_MENU_SETTINGS)}
                    onPress={() => Actions.push('userAccountSettings')}
                />
                <UserAccountMenuItem
                    image={IC_BLACK_ACCOUNT_LOGOUT}
                    label={I18nUtils.tr(TR_MENU_LOGOUT)}
                    onPress={() => this.onDisconnectButtonPress()}
                />
            </Card>
        );
    }

    render() {
        return (
            <Template key={this.props.language}>
                {this.renderHeader()}
                {this.renderMenuList()}
            </Template>
        );
    }
}

const headerStyles = {
    imageStyle: {
        width: 100,
        height: 100,
        tintColor: colors.WHITE
    },
    headerStyle: {
        width: '100%',
        backgroundColor: colors.BLUE.N900,
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
    const { language, name, surnames, email } = account;

    return { language, name, surnames, email };
};

export default connect(mapStateToProps, { logoutUser })(UserAccountMenu);
