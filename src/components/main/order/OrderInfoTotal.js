import React, { Component } from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection } from '../../common/index';
import { Button } from '../../common/Buttons';
import { colors } from '../../../res/Colors';
import { fonts } from '../../../res/Fonts';
import { I18nUtils } from '../../../utils/I18nUtils';
import {
    TR_BODY_ORDER_CHOOSE_SOMETHING,
    TR_BODY_ORDER_EMPTY,
    TR_BODY_ORDER_PRODUCTS,
    TR_BODY_ORDER_TOTAL_TITLE,
    TR_BUTTON_ADD_DISHES
} from '../../../i18n/constants';

class OrderInfoTotal extends Component {

    constructor(props, context) {
        super(props, context);
    }

    renderEmptyOrder() {
        const { orderCardStyle } = styles;

        return (
            <Card style={orderCardStyle}>
                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={fonts.HUGE}>
                        {I18nUtils.tr(TR_BODY_ORDER_EMPTY).toUpperCase()}
                    </Text>
                    <Text style={fonts.NORMAL}>
                        {I18nUtils.tr(TR_BODY_ORDER_CHOOSE_SOMETHING).toUpperCase()}
                    </Text>
                </CardSection>

                <CardSection>
                    <Button onPress={() => Actions.pop()}>
                        {I18nUtils.tr(TR_BUTTON_ADD_DISHES)}
                    </Button>
                </CardSection>
            </Card>
        );
    }

    renderOrder() {
        const { orderCardStyle } = styles;

        const { numProducts, totalPrice } = this.props;

        return (
            <Card style={orderCardStyle}>
                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={fonts.HUGE}>
                        {I18nUtils.tr(TR_BODY_ORDER_TOTAL_TITLE).toUpperCase()}
                    </Text>
                    <Text style={fonts.NORMAL}>
                        {`${numProducts} `}
                        {I18nUtils.tr(TR_BODY_ORDER_PRODUCTS).toUpperCase()}
                    </Text>
                </CardSection>

                <CardSection>
                    <Text
                        style={{
                            fontSize: 22,
                            color: '#47dd97',
                            fontWeight: 'bold'
                        }}
                    >
                        € {totalPrice}
                    </Text>
                </CardSection>

                <CardSection>
                    <Button onPress={() => Actions.pop()}>
                        {I18nUtils.tr(TR_BUTTON_ADD_DISHES)}
                    </Button>
                </CardSection>
            </Card>
        );
    }

    render() {
        if (this.props.numProducts === 0)
            return this.renderEmptyOrder();
        return this.renderOrder();
    }
}

const styles = {
    orderCardStyle: {
        borderWidth: 2,
        borderStyle: 'dotted',
        borderColor: colors.BLUE.N700,
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 10,
        marginRight: 15,
        marginLeft: 15
    }
};

const mapStateToProps = ({ userOrder }) => {
    const { numProducts, totalPrice } = userOrder;

    return { numProducts, totalPrice };
};

export default connect(mapStateToProps, { })(OrderInfoTotal);
