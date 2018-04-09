import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection } from '../../common/index';
import { IC_WHITE_SHOPPING_BASKET } from '../../../res/images/index';
import { colors } from '../../../res/Colors';

class OrderBanner extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {
            bannerCardStyle,
            bannerStyle,
            imageContainerStyle,
            bannerTextStyle,
            imageStyle
        } = styles;

        const { numProducts, totalPrice } = this.props;

        return (
            <Card style={bannerCardStyle}>
                <TouchableOpacity
                    onPress={() => Actions.push('orderInfo')}
                    style={bannerStyle}
                >
                    <CardSection>
                        <View style={imageContainerStyle}>
                            <Image
                                style={imageStyle}
                                source={IC_WHITE_SHOPPING_BASKET}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={bannerTextStyle}>{numProducts}</Text>
                    </CardSection>

                    <CardSection>
                        <Text style={bannerTextStyle}>Total: € {totalPrice}</Text>
                    </CardSection>
                </TouchableOpacity>
            </Card>
        );
    }
}

const styles = {
    bannerCardStyle: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    bannerTextStyle: {
        fontSize: 20,
        color: colors.WHITE,
        fontWeight: 'bold'
    },
    bannerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.BLUE.N500,
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.WHITE
    },
    imageContainerStyle: {
        height: 30,
        width: 30,
        marginRight: 5,
        padding: 3
    },
    imageStyle: {
        height: '100%',
        width: undefined
    }
};

const mapStateToProps = ({ order }) => {
    const { numProducts, totalPrice } = order;

    return { numProducts, totalPrice };
};

export default connect(mapStateToProps, { })(OrderBanner);
