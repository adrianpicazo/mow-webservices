import React from 'react';
import { Modal, Text } from 'react-native';
import { ModalTemplate, SectionTemplate, Card, CardSection, Button } from './index';
import { colors } from '../../res/Colors';
import { I18nUtils } from '../../utils/I18nUtils';
import {
    TR_BUTTON_ACCEPT,
    TR_BUTTON_CANCEL,
} from '../../i18n/constants';

// TODO: solucionar tamaño de los modales
const ModalBase = ({ title, titleSize, children, visible, onAccept, onDecline }) => {
    const { sectionTemplateStyle } = styles;
    const { textStyle, cardStyle } = styles.title;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onDecline}
        >
            <ModalTemplate>
                <SectionTemplate style={sectionTemplateStyle}>
                    <Card style={cardStyle}>
                        <CardSection>
                            <Text style={[textStyle, { fontSize: titleSize }]}>
                                {title}
                            </Text>
                        </CardSection>
                    </Card>

                    {children}

                    <Card>
                        <CardSection>
                            <Button onPress={onAccept}>
                                {I18nUtils.tr(TR_BUTTON_ACCEPT)}
                            </Button>
                        </CardSection>
                        <CardSection>
                            <Button onPress={onDecline}>
                                {I18nUtils.tr(TR_BUTTON_CANCEL)}
                            </Button>
                        </CardSection>
                    </Card>
                </SectionTemplate>
            </ModalTemplate>
        </Modal>
    );
};

const styles = {
    sectionTemplateStyle: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: colors.BLUE.N700,
        paddingTop: 0
    },
    title: {
        cardStyle: {
            backgroundColor: colors.BLUE.N700,
            width: '100%'
        },
        textStyle: {
            textAlign: 'center',
            fontWeight: 'bold',
            color: colors.WHITE
        }
    },
    containerStyle: {
        backgroundColor: colors.BLACK_MODAL,
        position: 'relative',
        justifyContent: 'center'
    },
    modalStyle: {
        justifyContent: 'center',
        margin: 25
    }
};

export { ModalBase };
