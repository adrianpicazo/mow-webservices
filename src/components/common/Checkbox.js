import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import {
    selectRestaurantType,
    selectAllRestaurantTypes,
} from '../../actions';

class Checkbox extends Component {
    render() {
        const { restaurantType } = this.props;

        return (
            <CheckBox
                title={restaurantType.title}
                onPress={onChecked}
                checked={restaurantType.checked}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const selected = state.selectedRestaurantTypes === ownProps;

    return { selected };
};

export default connect(mapStateToProps, {
    selectAllRestaurantTypes,
    selectRestaurantType
})(Checkbox);
