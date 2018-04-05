import React from 'react';
import { View } from 'react-native';
import COStatusBar from '../auxiliar/COStatusBar';
import { colors } from '../../res/Colors';

const BaseTemplate = ({ children, newBaseTemplateStyle }) => {
    const { baseTemplateStyle } = styles;

    return (
        <View style={[baseTemplateStyle, newBaseTemplateStyle]}>
            <COStatusBar />
            {children}
        </View>
    );
};

const styles = {
    baseTemplateStyle: {
        flex: 1,
        backgroundColor: colors.BLUE.N050
    }
};

export { BaseTemplate };
