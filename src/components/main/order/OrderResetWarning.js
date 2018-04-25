import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ModalBase, Card, CardSection } from '../../common/index';
import { resetOrder } from '../../../actions/index';
import { fonts } from '../../../res/Fonts';
import { analyticsTracker } from '../../../App';
import { I18nUtils } from '../../../utils/I18nUtils';
import {
    TR_BODY_MODAL_ORDER_RESET_1,
    TR_BODY_MODAL_ORDER_RESET_2,
    TR_HEADER_MODAL_ORDER_RESET,
} from '../../../i18n/constants';

class OrderResetWarning extends Component {

    constructor(props, context) {
        super(props, context);

        this.onAccept = this.onAccept.bind(this);
        this.onDecline = this.onDecline.bind(this);
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('Order Reset Warning');
    }

    onAccept() {
        this.props.resetOrder();

        Actions.push('restaurantInfo', { restaurant: this.props.restaurant });
    }

    onDecline() {
        Actions.pop();
    }

    render() {
        return (
            <ModalBase
                visible
                title={I18nUtils.tr(TR_HEADER_MODAL_ORDER_RESET)}
                onAccept={this.onAccept}
                onDecline={this.onDecline}
                titleSize={24}
            >
                <Card>
                    <CardSection>
                        <Text style={fonts.BIG}>
                            {I18nUtils.tr(TR_BODY_MODAL_ORDER_RESET_1)}
                        </Text>
                    </CardSection>
                    <CardSection>
                        <Text style={fonts.BIG}>
                            {I18nUtils.tr(TR_BODY_MODAL_ORDER_RESET_2)}
                        </Text>
                    </CardSection>
                </Card>

                <View style={{ flex: 1 }} />
            </ModalBase>
        );
    }
}

export default connect(null, { resetOrder })(OrderResetWarning);
