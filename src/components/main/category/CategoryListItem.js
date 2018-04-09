import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../../common/index';

class CategoryListItem extends Component {

    constructor(props, context) {
        super(props, context);
    }

    onCategoryItemPress() {
        Actions.categoryInfo({ category: this.props.category });
    }

    render() {
        const {
            headerContentStyle,
            headerTextStyle
        } = styles;

        const { name } = this.props.category;

        return (
            <TouchableOpacity
                onPress={this.onCategoryItemPress.bind(this)}
            >
                <CardSection>
                    <View style={headerContentStyle}>
                        <Text style={headerTextStyle}>
                            {name}
                        </Text>
                    </View>
                </CardSection>
            </TouchableOpacity>
        );
    }
}

const styles = {
    headerContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18,
        padding: 5
    }
};

export default CategoryListItem;
