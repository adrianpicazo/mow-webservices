import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from '../../common/index';
import { checkRestaurantSelection } from '../../../actions/index';

class RestaurantListItem extends Component {

    constructor(props, context) {
        super(props, context);

        this.onRestaurantItemPress = this.onRestaurantItemPress.bind(this);
    }

    onRestaurantItemPress() {
        const { restaurant, restaurantSelected, numProducts } = this.props;

        this.props.checkRestaurantSelection(restaurant, restaurantSelected, numProducts > 0);
    }

    render() {
        const {
            imageStyle,
            imageContainerStyle,
            headerContentStyle,
            headerTextStyle
        } = styles;
        const { name, type, image } = this.props.restaurant;

        return (
            <TouchableOpacity onPress={this.onRestaurantItemPress}>
                <CardSection>
                    <View style={imageContainerStyle}>
                        <Image
                            style={imageStyle}
                            source={{ uri: image }}
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

const mapStateToProps = ({ userOrder }) => {
    const { restaurantSelected, numProducts } = userOrder;

    return { restaurantSelected, numProducts };
};

export default connect(mapStateToProps, { checkRestaurantSelection })(RestaurantListItem);
