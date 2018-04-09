import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { colors } from '../../res/Colors';
import { IC_BLACK_CHECK_MARK_2 } from '../../res/images';

class CheckButton extends Component {

    constructor(props, context) {
        super(props, context);

        this.onButtonPress = this.onButtonPress.bind(this);
    }

    state = { checked: this.props.checked || false };

    onButtonPress = () => {
        this.setState({
            checked: !this.state.checked
        });

        this.props.onPress();
    }

    renderImage() {
        const { defaultImageStyle } = styles;

        if (this.state.checked) {
            return (
                <Image
                    style={defaultImageStyle}
                    source={IC_BLACK_CHECK_MARK_2}
                    resizeMode="contain"
                />
            );
        }
    }

    render() {
        const { defaultButtonStyle } = styles;

        return (
            <TouchableOpacity onPress={this.onButtonPress} style={defaultButtonStyle}>
                {this.renderImage()}
            </TouchableOpacity>
        );
    }
}

const styles = {
    defaultImageStyle: {
        height: '100%',
        width: undefined,
        tintColor: colors.BLUE.N700
    },
    defaultButtonStyle: {
        height: 30,
        width: 30,
        marginRight: 5,
        marginLeft: 5,
        padding: 3,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: colors.BLUE.N700
    }
};

export default CheckButton;
