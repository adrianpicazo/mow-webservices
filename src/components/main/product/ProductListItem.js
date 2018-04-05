import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from '../../common/CardSection';
import { IC_WHITE_PLUS } from '../../../res/images/index';
import { addProductToOrder } from '../../../actions/index';

class ProductListItem extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {
            productRowStyle,
            productRowTextContainerStyle,
            productRowTextStyle,
            imageContainerStyle,
            imageStyle
        } = styles;

        const { name, priceEuros } = this.props.product;

        return (
            <CardSection style={productRowStyle}>
                <View>
                    <TouchableOpacity
                        style={imageContainerStyle}
                        onPress={() => this.props.addProductToOrder({
                            prop: 'product',
                            value: { name, priceEuros }
                        })}
                    >
                        <Image
                            style={imageStyle}
                            source={IC_WHITE_PLUS}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
                <View style={productRowTextContainerStyle}>
                    <Text style={productRowTextStyle}>
                        {name}
                    </Text>
                    <Text style={productRowTextStyle}>
                        € {priceEuros}
                    </Text>
                </View>
            </CardSection>
        );
    }
}

const styles = {
    productRowStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    productRowTextContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    productRowTextStyle: {
        fontSize: 14
    },
    imageContainerStyle: {
        height: 25,
        width: 25,
        backgroundColor: '#7998ff',
        padding: 5,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5
    },
    imageStyle: {
        flex: 1,
        height: undefined,
        width: undefined,
    }
};

export default connect(null, { addProductToOrder })(ProductListItem);
