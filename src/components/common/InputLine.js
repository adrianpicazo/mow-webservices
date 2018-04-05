import React from 'react';
import { TextInput, View, Text } from 'react-native';

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
        borderColor: '#d0d0d0',
        borderWidth: 1,
    },
    labelStyle: {
        fontSize: 18,
        color: '#ffffff',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#d0d0d0'
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
