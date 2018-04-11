import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { colors } from '../../res/Colors';

const InputRow = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const {
        inputStyle,
        labelStyle,
        rowContainerStyle
    } = styles;

    return (
        <View style={rowContainerStyle}>
            <Text style={[labelStyle, { width: '35%' }]}>
                {label}
            </Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={[inputStyle, { width: '65%' }]}
                value={value}
                onChangeText={onChangeText}
                underlineColorAndroid="transparent"
                placeholderTextColor={colors.BLUE_GREY.N200}
            />
        </View>
    );
};

const InputColumn = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const {
        inputStyle,
        labelStyle,
        columnContainerStyle
    } = styles;

    return (
        <View style={columnContainerStyle}>
            <Text style={[labelStyle, { width: '100%' }]}>
                {label}
            </Text>
            <TextInput
                secureTextEntry={secureTextEntry}
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
    labelStyle: {
        fontSize: 18,
        color: colors.WHITE,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: colors.BLUE.N700,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    rowContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    columnContainerStyle: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    }
};

export { InputRow, InputColumn };
