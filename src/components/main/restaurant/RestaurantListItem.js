import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card } from '../../common/Card';
import { CardSection } from '../../common/CardSection';
import { restaurantItemSelection } from '../../../actions/index';

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
            thumbnailStyle,
            headerContentStyle,
            thumbnailContainerStyle,
            headerTextStyle
        } = styles;
        const { name, type, thumbnail_image } = this.props.restaurant;

        return (
            <TouchableOpacity onPress={this.onRestaurantItemPress}>
                <View>
                    <Card>
                        <CardSection>
                            <View style={thumbnailContainerStyle}>
                                <Image
                                    style={thumbnailStyle}
                                    source={{ uri: thumbnail_image }}
                                />
                            </View>
                            <View style={headerContentStyle}>
                                <Text style={headerTextStyle}>{name}</Text>
                                <Text>{type}</Text>
                            </View>
                        </CardSection>
                    </Card>
                </View>
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
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    }
};

const mapStateToProps = ({ order }) => {
    const { selectedRestaurantId, numProducts } = order;

    return { selectedRestaurantId, numProducts };
};

export default connect(mapStateToProps, { restaurantItemSelection })(RestaurantListItem);
