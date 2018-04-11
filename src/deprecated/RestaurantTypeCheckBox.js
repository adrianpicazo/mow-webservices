import React, { Component } from 'react';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements';

class RestaurantTypeCheckBox extends Component {
    state = { checked: false };

    press = () => {
        this.setState({
            checked: !this.state.checked,
        });
    };

    render() {
        return (
            <View>
                <CheckBox
                    title={this.props.title}
                    onPress={this.press}
                    checked={this.state.checked}
                    checkedColor='grey'
                />
            </View>
        );
    }
}

export default RestaurantTypeCheckBox;
