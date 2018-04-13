import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from '../../common/index';
import { fonts } from '../../../res/Fonts';
import { colors } from '../../../res/Colors';
import { IC_WHITE_MINUS } from '../../../res/images';
import InputSecure from '../../common/InputSecure';
import { addressRemove } from '../../../actions/index';

class UserAccountAddressItem extends Component {

    constructor(props, context) {
        super(props, context);

        this.onRemoveButtonPress = this.onRemoveButtonPress.bind(this);
    }

    onRemoveButtonPress() {
        const { addresses, address } = this.props;

        this.props.addressRemove(addresses, address);
    }

    render() {
        const { cardSectionStyle, buttonStyle, imageStyle, textContainerStyle } = styles;
        const { address } = this.props;

        return (
            <CardSection style={cardSectionStyle}>
                <View style={textContainerStyle}>
                    <Text style={fonts.BIG}>
                        {address}
                    </Text>
                </View>
                <TouchableOpacity
                    style={buttonStyle}
                    onPress={this.onRemoveButtonPress}
                >
                    <Image
                        style={imageStyle}
                        source={IC_WHITE_MINUS}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </CardSection>
        );
    }
}

InputSecure.propTypes = {
    address: PropTypes.string
};

const styles = {
    cardSectionStyle: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    textContainerStyle: {
        width: '85%',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: colors.BLUE.N700
    },
    imageStyle: {
        height: '100%',
        width: undefined,
        tintColor: colors.BLUE.N700
    },
    buttonStyle: {
        height: 35,
        width: 35,
        padding: 6,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: colors.BLUE.N700
    }
};

const mapStateToProps = ({ account }) => {
    const { addresses } = account;

    return { addresses };
};

export default connect(mapStateToProps, { addressRemove })(UserAccountAddressItem);
