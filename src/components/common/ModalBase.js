import React from 'react';
import { View, Modal, Text } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const ModalBase = ({ title, children, visible, onAccept, onDecline }) => {
    const {
        modalStyle,
        cardSectionTitleStyle,
        textStyle,
        containerStyle
    } = styles;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onDecline}
        >
            <View style={containerStyle}>
                <View style={modalStyle}>
                    <CardSection style={cardSectionTitleStyle}>
                        <Text style={textStyle}>
                            {title}
                        </Text>
                    </CardSection>

                    {children}

                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Button onPress={onAccept}>Aceptar</Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={onDecline}>Cancelar</Button>
                    </CardSection>
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    cardSectionTitleStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    modalStyle: {
        justifyContent: 'center',
        flex: 1,
        margin: 25
    }
};

export { ModalBase };
