import React from 'react';
import { View } from 'react-native';

const BaseTemplate = ({ children, newBaseTemplateStyle }) => {
    const { baseTemplateStyle } = styles;

    return (
        <View style={[baseTemplateStyle, newBaseTemplateStyle]}>
            {children}
        </View>
    );
};

const styles = {
    baseTemplateStyle: {
        flex: 1,
        backgroundColor: '#48ff63'
    }
};

export { BaseTemplate };
