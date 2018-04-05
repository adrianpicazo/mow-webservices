import * as _ from "lodash";
import * as React from "react";
import {Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {IC_ARROW_BACK, IC_ARROW_RIGHT, IC_ARROW_LEFT_CIRCLE, IC_ARROW_WHITE_BACK, IC_CROSS_WHITE, IC_GRADIENT_RED_ROSE} from "../res/images";
import NavigationUtils from "../utils/NavigationUtils";
import COStatusBar from "./COStatusBar";
import Fonts from "../res/fonts/Fonts";
import Colors from "../res/styles/Colors";
import Sizes from "../res/styles/Sizes";

const screenWidth = Dimensions.get("window").width;

export enum ToolbarLeftButton {
    NONE,
    CROSS,
    ARROW_BACK,
    ARROW_CIRCLE_BACK,
    ARROW,
}

export enum ToolbarLeftButtonAction {
    GO_BACK,
}

interface ToolbarPropTypes {
    rightButtonAction?: Function,
    leftButtonAction?: ToolbarLeftButtonAction | Function,
    middleContent?: any,
    rightButton?: any,
    leftButton?: ToolbarLeftButton | typeof Image.propTypes.source,
    background?: string | number,
    floating?: boolean,
    title?: string,
}

export default class Toolbar extends React.Component<ToolbarPropTypes, {}> {

    constructor(props, context) {
        super(props, context);

        this.onLeftButtonPressed = this.onLeftButtonPressed.bind(this);
        this.onRightButtonPressed = this.onRightButtonPressed.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <View style={{position: this.props.floating ? "absolute" : "relative"}}>
                <ImageBackground
                    source={typeof this.props.background === "number" ? this.props.background : undefined}
                    style={{backgroundColor: typeof this.props.background === "string" ? this.props.background : "transparent"}}>
                    <COStatusBar />
                    <View style={styles.containerRootStyle}>
                        {this.renderLeftButton()}
                        {this.renderCenterContent()}
                        {this.renderRightButton()}
                    </View>
                </ImageBackground>
            </View>
        );
    }

    private renderLeftButton() {
        return this.props.leftButton && this.props.leftButton === ToolbarLeftButton.NONE ? null :
            (
                <TouchableOpacity
                    style={styles.buttonLeftStyle}
                    onPress={this.onLeftButtonPressed}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Image style={styles.imageLeftStyle} source={this.getLeftButtonIcon()}/>
                </TouchableOpacity>
            );
    }

    private getLeftButtonIcon() {
        switch (this.props.leftButton) {
            case ToolbarLeftButton.CROSS:
                return IC_CROSS_WHITE;
            case ToolbarLeftButton.ARROW_BACK:
                return IC_ARROW_WHITE_BACK;
            case ToolbarLeftButton.ARROW_CIRCLE_BACK:
                return IC_ARROW_LEFT_CIRCLE;
            case ToolbarLeftButton.ARROW:
                return IC_ARROW_BACK;
            default:
                if (_.isUndefined(this.props.leftButton)) return IC_CROSS_WHITE;
                else return this.props.leftButton as any;
        }
    }

    private onLeftButtonPressed() {
        switch (this.props.leftButtonAction) {
            case ToolbarLeftButtonAction.GO_BACK:
                NavigationUtils.back();
                break;
            default:
                if (_.isUndefined(this.props.leftButtonAction)) NavigationUtils.back();
                else this.props.leftButtonAction();
                break;
        }
    }

    private renderRightButton() {
        return !this.props.rightButton ? null :
            (
                <TouchableOpacity
                    style={styles.buttonRightStyle}
                    onPress={this.onRightButtonPressed}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    {typeof this.props.rightButton === "number" ?
                        <Image style={[styles.imageRightStyle, this.props.rightButton === IC_CROSS_WHITE ? {height: 16, width: 16} : {
                            height: 19,
                            width: 19,
                        }]}
                               source={this.getRightButtonIcon()}/> : this.props.rightButton}
                </TouchableOpacity>
            );
    }

    private onRightButtonPressed() {
        if (this.props.rightButtonAction) this.props.rightButtonAction();
    }

    private renderCenterContent() {
        return (
            <View style={{flex: 1, justifyContent: 'center', marginTop: 7 }}>
                {this.props.middleContent ? this.props.middleContent : this.props.title ?
                    <Text style={styles.textTitleStyle} numberOfLines={1}>{this.props.title}</Text> : null}
            </View>
        );
    }

    private getRightButtonIcon() {
        switch (this.props.rightButton) {
            case ToolbarLeftButton.CROSS:
                return IC_CROSS_WHITE;
            default:
                if (_.isUndefined(this.props.rightButton)) return IC_CROSS_WHITE;
                else return this.props.rightButton as any;
        }
    }
};

const styles = StyleSheet.create({
    imageRightStyle: {
        resizeMode: "contain",
    },
    textTitleStyle: {
        flex: 1,
        justifyContent: 'center',
        includeFontPadding: false,
        marginLeft: 18,
        ...Fonts.GOTHAM_RND_MEDIUM,
        color: Colors.COLOR_FFFFFF,
        fontSize: Sizes.TEXT_SIZE_16PX,
    },
    buttonRightStyle: {
        alignItems: "center",
    },
    buttonLeftStyle: {
        alignItems: "center",
    },
    imageLeftStyle: {
        height: 16,
        width: 16,
    },
    containerRootStyle: {
        width: screenWidth,
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        paddingLeft: 22,
        paddingRight: 22,
        height: 56, // ?attr/actionBarSize = 56dp
    },
});