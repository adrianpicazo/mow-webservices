import React, { Component } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Template, ScrollTemplate, HorizontalRule, Warning } from '../../common';
import OrderBanner from '../order/OrderBanner';
import Header from '../../headers/Header';
import { addRestaurantToOrder } from '../../../actions/index';
import CategoryListItem from './CategoryListItem';

class RestaurantInfo extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const { id, name, type, thumbnail_image, description, categories } = this.props;
        const restaurant = { id, name, type, thumbnail_image, description, categories };

        this.props.addRestaurantToOrder(restaurant);
    }

    renderCategoryList() {
        const { categories } = this.props;
        const { categoryListStyle } = styles;

        if (categories === undefined) {
            return (
                <Card>
                    <CardSection>
                        <Warning>
                            No existen categorías de productos para este restaurante.
                        </Warning>
                    </CardSection>
                </Card>
            );
        }

        // TODO: revisar la key
        return (
            <FlatList
                data={categories}
                renderItem={({ item }) => <CategoryListItem category={item} />}
                keyExtractor={item => item.name}
                style={categoryListStyle}
                ItemSeparatorComponent={() => <HorizontalRule />}
            />
        );
    }

    render() {
        const {
            cardStyle,
            thumbnailStyle,
            headerContentStyle,
            thumbnailContainerStyle,
            headerTextStyle
        } = styles.restaurant;

        const { name, type, image, description } = this.props;

        return (
            <Template>
                <Header
                    renderBackButton
                    headerTitle="Información del restaurante"
                    newHeaderTextStyle={{ fontSize: 20 }}
                />

                <OrderBanner />

                <ScrollTemplate>
                    <Card style={cardStyle}>
                        <CardSection>
                            <View style={thumbnailContainerStyle}>
                                <Image
                                    style={thumbnailStyle}
                                    source={{ uri: image }}
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

                    {this.renderCategoryList()}
                </ScrollTemplate>
            </Template>
        );
    }
}

const styles = {
    restaurant: {
        cardStyle: {
            alignItems: 'flex-start',
            paddingTop: 0,
            paddingRight: 10,
            paddingLeft: 10,
            marginBottom: 5
        },
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
        },
        thumbnailContainerStyle: {
            height: 50,
            width: 50,
            marginRight: 10,
            padding: 3
        }
    },
    categoryListStyle: {
        position: 'relative',
        width: '100%',
        marginTop: -5,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 5
    }
};

const mapStateToProps = ({ restaurantSelected }) => {
    const { id, name, type, image, description, categories } = restaurantSelected;

    return { id, name, type, image, description, categories };
};

export default connect(mapStateToProps, { addRestaurantToOrder })(RestaurantInfo);
