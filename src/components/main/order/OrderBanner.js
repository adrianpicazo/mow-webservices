import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card } from '../../common/Card';
import { CardSection } from '../../common/CardSection';
import { IC_WHITE_SHOPPING_BASKET } from '../../../res/images/index';

class OrderBanner extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {
            bannerStyle,
            bannerComponentStyle,
            imageContainerStyle,
            bannerTextStyle,
            imageStyle
        } = styles;

        const { numProducts, totalPrice } = this.props;

        return (
            <TouchableOpacity onPress={() => Actions.push('orderInfo')}>
                <Card style={{ borderWidth: 0, marginBottom: 5 }}>
                    <CardSection style={bannerStyle}>
                        <View style={[bannerComponentStyle, { marginLeft: 10 }]}>
                            <View style={imageContainerStyle}>
                                <Image
                                    style={imageStyle}
                                    source={IC_WHITE_SHOPPING_BASKET}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={bannerTextStyle}>{numProducts}</Text>
                        </View>

                        <View style={[bannerComponentStyle, { marginRight: 10 }]}>
                            <Text style={bannerTextStyle}>Total: € {totalPrice}</Text>
                        </View>
                    </CardSection>
                </Card>
            </TouchableOpacity>
        );
    }
}

const styles = {
    bannerTextStyle: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    bannerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#7998ff',
        borderStyle: 'solid',
        borderRadius: 15,
        borderBottomWidth: 0
    },
    bannerComponentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    imageContainerStyle: {
        height: 30,
        width: 30,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
    },
    imageStyle: {
        flex: 1,
        height: undefined,
        width: undefined,
    }
};

const mapStateToProps = ({ order }) => {
    const { numProducts, totalPrice } = order;

    return { numProducts, totalPrice };
};

export default connect(mapStateToProps, { })(OrderBanner);
