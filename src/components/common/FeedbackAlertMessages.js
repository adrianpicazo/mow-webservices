import React from 'react';
import { View, Text } from 'react-native';

const Success = ({ title, children }) => {
    const {
        containerStyle,
        titleContainerStyle,
        titleStyle,
        textStyle
    } = styles;

    return (
        <View style={[containerStyle, { backgroundColor: '#DFF0D4', borderColor: '#D6E9C4' }]}>
            <View style={[titleContainerStyle, { borderBottomColor: '#D6E9C4' }]}>
                <Text style={[titleStyle, { color: '#2C7635' }]}>
                    { title || 'ÉXITO' }
                </Text>
            </View>
            <Text style={[textStyle, { color: '#2C7635' }]}>
                {children}
            </Text>
        </View>
    );
};

const Information = ({ title, children }) => {
    const {
        containerStyle,
        titleContainerStyle,
        titleStyle,
        textStyle
    } = styles;

    return (
        <View style={[containerStyle, { backgroundColor: '#D1E4F1', borderColor: '#B9DFEF' }]}>
            <View style={[titleContainerStyle, { borderBottomColor: '#B9DFEF' }]}>
                <Text style={[titleStyle, { color: '#31708C' }]}>
                    { title || 'INFORMACIÓN' }
                </Text>
            </View>
            <Text style={[textStyle, { color: '#31708C' }]}>
                {children}
            </Text>
        </View>
    );
};

const Warning = ({ title, children }) => {
    const {
        containerStyle,
        titleContainerStyle,
        titleStyle,
        textStyle
    } = styles;

    return (
        <View style={[containerStyle, { backgroundColor: '#FCF8E1', borderColor: '#FAEBCA' }]}>
            <View style={[titleContainerStyle, { borderBottomColor: '#FAEBCA' }]}>
                <Text style={[titleStyle, { color: '#8A6D39' }]}>
                    { title || 'ADVERTENCIA' }
                </Text>
            </View>
            <Text style={[textStyle, { color: '#8A6D39' }]}>
                {children}
            </Text>
        </View>
    );
};

const Failure = ({ title, children }) => {
    const {
        containerStyle,
        titleContainerStyle,
        titleStyle,
        textStyle
    } = styles;

    return (
        <View style={[containerStyle, { backgroundColor: '#F2DEDC', borderColor: '#EBCCCF' }]}>
            <View style={[titleContainerStyle, { borderBottomColor: '#EBCCCF' }]}>
                <Text style={[titleStyle, { color: '#AC260D' }]}>
                    { title || 'FALLO' }
                </Text>
            </View>
            <Text style={[textStyle, { color: '#AC260D' }]}>
                {children}
            </Text>
        </View>
    );
};

const styles = {
    containerStyle: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 5,
        flexDirection: 'column'
    },
    titleContainerStyle: {
        borderBottomWidth: 2,
        borderStyle: 'solid',
        margin: 5
    },
    titleStyle: {
        padding: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    textStyle: {
        padding: 10,
        paddingTop: 5
    }
};

export { Success, Information, Warning, Failure };
