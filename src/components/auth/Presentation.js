import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import { Template, Card, CardSection, Button } from '../common/index';
import { colors } from '../../res/Colors';

class Presentation extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {
            textContainerStyle,
            textStyle
        } = styles;

        return (
            <Template>
                {/* Espaciado */}
                <View style={{ flex: 1 }} />

                <Card>
                    <CardSection>
                        <View style={textContainerStyle}>
                            <Text style={[textStyle, { fontSize: 35 }]}>
                                Wheels On Meals
                            </Text>
                            <Text style={textStyle}>
                                Bienvenido
                            </Text>
                        </View>
                    </CardSection>
                </Card>

                {/* Espaciado */}
                <View style={{ flex: 1 }} />

                <Card>
                    <CardSection>
                        <Button onPress={() => Actions.push('login')}>
                            Acceder
                        </Button>
                    </CardSection>
                </Card>
            </Template>
        );
    }
}

const styles = {
    textContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 24,
        padding: 5,
        fontWeight: 'bold',
        color: colors.BLUE.N900
    }
};

export default Presentation;
