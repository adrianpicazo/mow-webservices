import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Template, ScrollTemplate } from '../../common/index';
import OrderBanner from '../order/OrderBanner';
import Header from '../../headers/Header';
import { addRestaurantToOrder } from '../../../actions/index';
import CategoryList from '../category/CategoryList';
import { colors } from '../../../res/Colors';

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
            <Template>
                <Header
                    renderBackButton
                    headerTitle="Información del restaurante"
                    newHeaderTextStyle={{ fontSize: 20 }}
                />

                <ScrollTemplate>
                    <OrderBanner />

                    <Card>
                        <CardSection>
                            <View style={thumbnailContainerStyle}>
                                <Image
                                    style={thumbnailStyle}
                                    source={{ uri: thumbnail_image }}
                                    resizeMode="contain"
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
                </ScrollTemplate>
            </Template>
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
        height: '100%',
        width: undefined,
        backgroundColor: '#10fffa'

    },
    thumbnailContainerStyle: {
        height: 50,
        width: 50,
        marginRight: 0,
        marginLeft: 0,
        padding: 3,
        backgroundColor: '#fff713'
    }
};

const mapStateToProps = ({ restaurantSelected }) => {
    const { id, name, type, thumbnailImage, description, categories } = restaurantSelected;

    return { id, name, type, thumbnailImage, description, categories };
};

export default connect(mapStateToProps, { addRestaurantToOrder })(RestaurantInfo);
