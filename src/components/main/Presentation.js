import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Card, CardSection, Button } from '../common/index';
import { IC_BLACK_HAMBURGER_MENU_1 } from '../../res/images/index';

class Presentation extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {
            cardStyle,
            cardSectionStyle,
            buttonStyle,
            imageStyle,
            textContainerStyle,
            textStyle
        } = styles;

        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <Card style={cardStyle}>
                    <CardSection style={cardSectionStyle}>
                        <TouchableOpacity
                            style={buttonStyle}
                            onPress={() => Actions.drawerOpen()}
                        >
                            <Image
                                style={imageStyle}
                                source={IC_BLACK_HAMBURGER_MENU_1}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </CardSection>

                    <CardSection style={[cardSectionStyle, { flex: 1 }]}>
                        <View style={textContainerStyle}>
                            <Text style={[textStyle, { fontSize: 35 }]}>
                                Wheels On Meals
                            </Text>
                            <Text style={textStyle}>
                                Bienvenido
                            </Text>
                        </View>
                    </CardSection>

                    <CardSection style={cardSectionStyle}>
                        <Button onPress={() => Actions.push('restaurantList')}>
                            Restaurantes
                        </Button>
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const styles = {
    cardStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        padding: 5,
        borderWidth: 0,
        shadowOffset: { width: 0, height: 0 }
    },
    cardSectionStyle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 0,
    },
    imageStyle: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    buttonStyle: {
        marginRight: 15,
        height: 35,
        width: 35
    },
    textContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 24,
        padding: 5,
        fontWeight: 'bold'
    }
};

export default Presentation;
