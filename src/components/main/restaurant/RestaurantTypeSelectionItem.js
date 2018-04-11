import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from '../../common/index';
import { fonts } from '../../../res/Fonts';
import { colors } from '../../../res/Colors';
import { IC_BLACK_CHECK_MARK_2 } from '../../../res/images';
import { restaurantTypeSelection } from '../../../actions';

class RestaurantTypeSelectionItem extends Component {

    constructor(props, context) {
        super(props, context);

        this.onRestaurantTypeItemPress = this.onRestaurantTypeItemPress.bind(this);
    }

    onRestaurantTypeItemPress() {
        const { name } = this.props.type;

        this.props.restaurantTypeSelection(name);
    }

    renderImage() {
        const { imageStyle } = styles;
        const { selected } = this.props.type;

        if (selected)
            return (
                <Image
                    style={imageStyle}
                    source={IC_BLACK_CHECK_MARK_2}
                    resizeMode="contain"
                />
            );
    }

    render() {
        const { buttonStyle } = styles;
        const { name } = this.props.type;

        return (
            <CardSection style={{ justifyContent: 'space-between' }}>
                <Text style={[fonts.BIG, { padding: 5 }]}>
                    {name}
                </Text>

                <TouchableOpacity
                    onPress={this.onRestaurantTypeItemPress}
                    style={buttonStyle}
                >
                    {this.renderImage()}
                </TouchableOpacity >
            </CardSection>
    );
    }
}

RestaurantTypeSelectionItem.propTypes = {
    type: PropTypes.shape({
        name: PropTypes.string,
        selected: PropTypes.boolean
    })
};

const styles = {
    imageStyle: {
        height: '100%',
        width: undefined,
        tintColor: colors.BLUE_GREY.N500
    },
    buttonStyle: {
        height: 30,
        width: 30,
        marginRight: 5,
        marginLeft: 5,
        padding: 3,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: colors.BLUE_GREY.N500
    }
};

export default connect(null, { restaurantTypeSelection })(RestaurantTypeSelectionItem);
