import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, IconButton } from '../../common/index';
import { IC_WHITE_PLUS } from '../../../res/images/index';
import { addProductToOrder } from '../../../actions/index';
import { fonts } from '../../../res/Fonts';

class ProductListItem extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { name, priceEuros } = this.props.product;

        return (
            <CardSection>
                <IconButton
                    buttonStyle={{ height: 25, width: 25 }}
                    image={IC_WHITE_PLUS}
                    onPress={() => this.props.addProductToOrder({
                        prop: 'product',
                        value: { name, priceEuros }
                    })}
                />

                <Text style={[fonts.BIG_FONT, { marginLeft: 10, padding: 5 }]}>
                    {name}
                </Text>

                {/* Espaciado */}
                <View style={{ flex: 1 }} />

                <Text style={fonts.BIG_FONT}>
                    € {priceEuros}
                </Text>
            </CardSection>
        );
    }
}

export default connect(null, { addProductToOrder })(ProductListItem);
