import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ModalBase, Card, CardSection } from '../../common/index';
import { resetOrder } from '../../../actions/index';
import { fonts } from '../../../res/Fonts';
import { analyticsTracker } from '../../../App';

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
                title="Pedido pendiente"
                onAccept={this.onAccept}
                onDecline={this.onDecline}
                titleSize={24}
            >
                <Card>
                    <CardSection>
                        <Text style={fonts.BIG}>
                            Todavía tiene un pedido pendiente con otro restaurante.
                            Si accede a otro restaurante el pedido pendiente se cancelará.
                        </Text>
                    </CardSection>
                    <CardSection>
                        <Text style={fonts.BIG}>
                            ¿Desea continuar y cancelar el pedido pendiente?
                        </Text>
                    </CardSection>
                </Card>

                <View style={{ flex: 1 }} />
            </ModalBase>
        );
    }
}

export default connect(null, { resetOrder })(OrderResetWarning);
