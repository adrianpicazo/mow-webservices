import React from 'react';
import { ScrollView, View } from 'react-native';
import COStatusBar from '../auxiliar/COStatusBar';
import { colors } from '../../res/Colors';

const Template = ({ children, style }) => {
    const { defaultStyle } = styles.template;

    return (
        <View style={[defaultStyle, style]}>
            <COStatusBar />
            {children}
        </View>
    );
};

const ScrollTemplate = ({ children, style, containerStyle }) => {
    const { defaultStyle, defaultContentContainerStyle } = styles.scrollTemplate;

    return (
        <ScrollView
            style={[defaultStyle, style]}
            contentContainerStyle={[defaultContentContainerStyle, containerStyle]}
        >
            {children}
        </ScrollView>
    );
};

const ModalTemplate = ({ children, style }) => {
    const { defaultStyle } = styles.modalTemplate;

    return (
        <View style={[defaultStyle, style]}>
            {children}
        </View>
    );
};

const SectionTemplate = ({ children, style }) => {
    const { defaultStyle } = styles.sectionTemplate;

    return (
        <View style={[defaultStyle, style]}>
            {children}
        </View>
    );
};

const styles = {
    template: {
        defaultStyle: {
            flex: 1,
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: colors.BLUE.N050
        }
    },
    scrollTemplate: {
        defaultStyle: {
            width: '100%'
        },
        defaultContentContainerStyle: {
            flexGrow: 1,
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: colors.BLUE.N050
        }
    },
    modalTemplate: {
        defaultStyle: {
            flex: 1,
            backgroundColor: colors.BLACK_MODAL,
            position: 'relative',
            justifyContent: 'center',
            padding: 25
        }
    },
    sectionTemplate: {
        defaultStyle: {
            flex: 1,
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: colors.BLUE.N050
        }
    }
};

export { Template, ScrollTemplate, ModalTemplate, SectionTemplate };
