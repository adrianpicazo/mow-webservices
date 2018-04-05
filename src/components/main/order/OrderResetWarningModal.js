import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ModalBase } from '../../common/ModalBase';
import { CardSection } from '../../common/index';
import { resetOrder } from '../../../actions/index';

class OrderResetWarningModal extends Component {

    constructor(props, context) {
        super(props, context);

        this.onAccept = this.onAccept.bind(this);
        this.onDecline = this.onDecline.bind(this);
    }

    onAccept() {
        this.props.resetOrder();

        Actions.push('restaurantInfo', { restaurant: this.props.restaurant });
    }

    onDecline() {
        Actions.pop();
    }

    render() {
        const { textStyle, cardSectionStyle } = styles;

        return (
            <ModalBase
                visible
                title="Pedido pendiente"
                onAccept={this.onAccept}
                onDecline={this.onDecline}
            >
                <CardSection style={cardSectionStyle}>
                    <Text style={textStyle}>
                        Todavía tiene un pedido pendiente con otro restaurante.
                        Si accede a otro restaurante el pedido pendiente se cancelará.
                    </Text>
                    <Text style={textStyle}>
                        ¿Desea continuar y cancelar el pedido pendiente?
                    </Text>
                </CardSection>
            </ModalBase>
        );
    }
}

const styles = {
    cardSectionStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 20,
        padding: 10
    }
};

export default connect(null, { resetOrder })(OrderResetWarningModal);
