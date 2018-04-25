import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../res/Colors';
import { fonts } from '../../res/Fonts';

const SettingsOption = (options) => {
    const {
        containerStyle,
        headerStyle,
        bodyStyle,
        buttonStyle
    } = styles;

    const { textHeader, textButton, textBody, onButtonPress } = options;

    return (
        <View style={containerStyle}>
            <View style={headerStyle}>
                <Text style={[fonts.BIG, { color: colors.WHITE }]}>
                    {textHeader}
                </Text>
                <TouchableOpacity
                    style={buttonStyle}
                    onPress={onButtonPress}
                >
                    <Text style={[fonts.NORMAL, { color: colors.WHITE }]}>
                        {textButton}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={bodyStyle}>
                <Text style={[fonts.BIG, { color: colors.BLUE.N800 }]}>
                    {textBody}
                </Text>
            </View>
        </View>
    );
};

const styles = {
    containerStyle: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderColor: colors.BLUE.N700,
        borderWidth: 1,
        borderRadius: 5,
    },
    headerStyle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.BLUE.N700,
        padding: 7,
        paddingLeft: 10,
    },
    bodyStyle: {
        width: '100%',
        padding: 7,
        paddingLeft: 10,
        paddingRight: 10
    },
    buttonStyle: {
        padding: 3,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: colors.WHITE
    }
};

export default SettingsOption;
