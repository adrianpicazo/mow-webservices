import * as React from 'react';
import { Platform, StatusBar, View } from 'react-native';
export var COStatusBarStyle;
(function (COStatusBarStyle) {
    COStatusBarStyle['DEFAULT'] = 'default';
    COStatusBarStyle['LIGHT'] = 'light-content';
    COStatusBarStyle['DARK'] = 'dark-content';
})(COStatusBarStyle || (COStatusBarStyle = {}));
export var COStatusBarHideType;
(function (COStatusBarHideType) {
    COStatusBarHideType['FADE'] = 'fade';
    COStatusBarHideType['SLIDE'] = 'slide';
})(COStatusBarHideType || (COStatusBarHideType = {}));
export default class COStatusBar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const isAndroid4 = Platform.OS === 'android' && Platform.Version < 21;
        const forceIOSBackgroundColor = this.props.forceIOSBackgroundColor && Platform.OS === 'ios';
        return (<View style={{ width: '100%',
            height: isAndroid4 ? 0 : this.props.statusBarHeight,
            backgroundColor: forceIOSBackgroundColor ? (this.props.iosBackgroundColor ? this.props.iosBackgroundColor : this.props.backgroundColor) : 'transparent',
        }}>
            <StatusBar animated={this.props.animated} hidden={this.props.hidden} translucent={this.props.translucent} backgroundColor={this.props.backgroundColor} networkActivityIndicatorVisible={this.props.networkActivityIndicatorVisible} barStyle={Platform.OS === 'ios' ? this.props.iosBarStyle : this.props.androidBarStyle} showHideTransition={this.props.hideTransitionType}/>
        </View>);
    }
}
COStatusBar.defaultProps = {
    animated: true,
    hidden: false,
    iosBarStyle: COStatusBarStyle.DARK,
    androidBarStyle: COStatusBarStyle.LIGHT,
    translucent: true,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    hideTransitionType: COStatusBarHideType.FADE,
    networkActivityIndicatorVisible: false,
    statusBarHeight: Platform.OS === 'ios' ? 20 : 25,
    forceIOSBackgroundColor: false,
};
