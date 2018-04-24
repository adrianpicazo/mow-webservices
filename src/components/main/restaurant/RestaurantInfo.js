import React, { Component } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardSection, Template, ScrollTemplate, HorizontalRule, Warning } from '../../common';
import OrderBanner from '../order/OrderBanner';
import Header from '../../headers/Header';
import { addRestaurantToOrder } from '../../../actions/index';
import CategoryListItem from './CategoryListItem';
import InputSecure from '../../common/InputSecure';
import { analyticsTracker } from '../../../App';

class RestaurantInfo extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('Restaurant Info');

        const { restaurant } = this.props;

        this.props.addRestaurantToOrder(restaurant);
    }

    renderCategoryList() {
        const { categories } = this.props.restaurant;
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

        return (
            <FlatList
                data={categories}
                renderItem={({ item }) => <CategoryListItem category={item} />}
                keyExtractor={(item, index) => index.toString()}
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

        const { name, type, image, description } = this.props.restaurant;

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

InputSecure.propTypes = {
    restaurant: PropTypes.shape({
        id: PropTypes.int,
        name: PropTypes.string,
        type: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
        categories: PropTypes.arrayOf(PropTypes.object)
    })
};

export default connect(null, { addRestaurantToOrder })(RestaurantInfo);
