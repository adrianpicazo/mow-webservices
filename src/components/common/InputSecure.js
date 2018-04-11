import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, Text, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../res/Colors';
import { IC_BLACK_EYE } from '../../res/images';

class InputSecure extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            secured: true
        };

        this.onButtonPress = this.onButtonPress.bind(this);
    }

    onButtonPress() {
        this.setState({ secured: !this.state.secured });
    }

    render() {
        const {
            inputStyle,
            labelContainerStyle,
            labelStyle,
            columnContainerStyle,
            buttonStyle,
            imageStyle
        } = styles;
        const { label, value, onChangeText, placeholder } = this.props;
        const { secured } = this.state;

        return (
            <View style={columnContainerStyle}>
                <View style={labelContainerStyle}>
                    <Text style={labelStyle}>
                        {label}
                    </Text>
                    <TouchableOpacity
                        style={buttonStyle}
                        onPress={this.onButtonPress}
                    >
                        <Image
                            style={imageStyle}
                            source={IC_BLACK_EYE}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
                <TextInput
                    secureTextEntry={secured}
                    placeholder={placeholder}
                    autoCorrect={false}
                    style={[inputStyle, { width: '100%' }]}
                    value={value}
                    onChangeText={onChangeText}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={colors.BLUE_GREY.N200}
                />
            </View>
        );
    }
}

InputSecure.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string
};

const styles = {
    inputStyle: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: colors.BLUE.N700,
        borderWidth: 1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    labelContainerStyle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.BLUE.N700,
        padding: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    labelStyle: {
        fontSize: 18,
        color: colors.WHITE,
        paddingLeft: 5,
        paddingRight: 5,
    },
    columnContainerStyle: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    imageStyle: {
        height: '100%',
        width: undefined,
        tintColor: colors.WHITE
    },
    buttonStyle: {
        height: 23,
        width: 23,
        marginRight: 5,
        marginLeft: 5,
        padding: 3,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: colors.WHITE
    }
};

export default InputSecure;
