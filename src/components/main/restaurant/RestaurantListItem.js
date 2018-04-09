import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from '../../common/index';
import { restaurantItemSelection } from '../../../actions/index';
import { colors } from '../../../res/Colors';

class RestaurantListItem extends Component {

    constructor(props, context) {
        super(props, context);

        this.onRestaurantItemPress = this.onRestaurantItemPress.bind(this);
    }

    onRestaurantItemPress() {
        const restaurant = this.props.restaurant;
        const restaurantIdSelected = this.props.selectedRestaurantId;
        const hasOrderedProducts = this.props.numProducts > 0;

        if (restaurantIdSelected !== -1 &&
            restaurant.id !== restaurantIdSelected &&
            hasOrderedProducts) {
            Actions.push('orderResetWarningModal', { restaurant });
        } else {
            this.props.restaurantItemSelection(restaurant);
            Actions.push('restaurantInfo');
        }
    }

    render() {
        const {
            imageStyle,
            imageContainerStyle,
            headerContentStyle,
            headerTextStyle
        } = styles;
        const { name, type, thumbnail_image } = this.props.restaurant;

        return (
            <TouchableOpacity onPress={this.onRestaurantItemPress}>
                <CardSection>
                    <View style={imageContainerStyle}>
                        <Image
                            style={imageStyle}
                            source={{ uri: thumbnail_image }}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={headerContentStyle}>
                        <Text style={headerTextStyle}>{name}</Text>
                        <Text>{type}</Text>
                    </View>
                </CardSection>
            </TouchableOpacity>
        );
    }
}

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18
    },
    imageStyle: {
        height: '100%',
        width: undefined
    },
    imageContainerStyle: {
        height: 50,
        width: 50,
        marginRight: 10,
        padding: 3
    }
};

const mapStateToProps = ({ order }) => {
    const { selectedRestaurantId, numProducts } = order;

    return { selectedRestaurantId, numProducts };
};

export default connect(mapStateToProps, { restaurantItemSelection })(RestaurantListItem);
