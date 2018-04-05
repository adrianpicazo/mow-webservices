import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Card } from '../../common/Card';
import { CardSection } from '../../common/CardSection';
import OrderBanner from '../order/OrderBanner';
import Header from '../../headers/Header';
import { addRestaurantToOrder } from '../../../actions/index';
import CategoryList from '../category/CategoryList';

class RestaurantInfo extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const { id, name, type, thumbnail_image, description, categories } = this.props;
        const restaurant = { id, name, type, thumbnail_image, description, categories };

        this.props.addRestaurantToOrder(restaurant);
    }

    render() {
        const {
            thumbnailStyle,
            headerContentStyle,
            thumbnailContainerStyle,
            headerTextStyle
        } = styles;

        const { name, type, thumbnail_image, description, categories } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <Header
                    renderBackButton
                    headerTitle="Información del restaurante"
                    newHeaderTextStyle={{ fontSize: 20 }}
                />

                <OrderBanner />

                <ScrollView style={{ flex: 1 }}>
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

                        <CardSection>
                            <Text>
                                {description}
                            </Text>
                        </CardSection>
                    </Card>

                    <CategoryList categories={categories} />
                </ScrollView>
            </View>
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

const mapStateToProps = ({ restaurantSelected }) => {
    const { id, name, type, thumbnailImage, description, categories } = restaurantSelected;

    return { id, name, type, thumbnailImage, description, categories };
};

export default connect(mapStateToProps, { addRestaurantToOrder })(RestaurantInfo);
