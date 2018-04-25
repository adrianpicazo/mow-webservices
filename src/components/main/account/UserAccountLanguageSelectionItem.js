import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from '../../common/index';
import { fonts } from '../../../res/Fonts';
import { colors } from '../../../res/Colors';
import { IC_BLACK_CIRCLE } from '../../../res/images';
import { restaurantTypeSelection } from '../../../actions';

// TODO: borrar
class UserAccountLanguageSelectionItem extends Component {

    constructor(props, context) {
        super(props, context);

        this.onItemPress = this.onItemPress.bind(this);
    }

    onItemPress() {

    }

    render() {
        const { buttonStyle, imageStyle } = styles;
        const { selected, name } = this.props.language.item;

        console.log(this.props);

        return (
            <CardSection style={{ justifyContent: 'space-between' }}>
                <Text style={[fonts.BIG, { padding: 5 }]}>
                    {name}
                </Text>

                <TouchableOpacity
                    onPress={this.onItemPress}
                    style={buttonStyle}
                >
                    {selected ?
                        <Image
                            style={imageStyle}
                            source={IC_BLACK_CIRCLE}
                            resizeMode="contain"
                        />
                     : null}
                </TouchableOpacity >
            </CardSection>
        );
    }
}

UserAccountLanguageSelectionItem.propTypes = {
    language: PropTypes.shape({
        item: PropTypes.shape({
            name: PropTypes.string,
            selected: PropTypes.boolean
        }),
        index: PropTypes.number
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
        padding: 8,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.BLUE_GREY.N500
    }
};

export default connect(null, { restaurantTypeSelection })(UserAccountLanguageSelectionItem);
