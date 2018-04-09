import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../../common/index';
import { fonts } from '../../../res/Fonts';

class CategoryListItem extends Component {

    constructor(props, context) {
        super(props, context);
    }

    onCategoryItemPress() {
        Actions.categoryInfo({ category: this.props.category });
    }

    render() {
        const { name } = this.props.category;

        return (
            <TouchableOpacity
                onPress={this.onCategoryItemPress.bind(this)}
            >
                <CardSection>
                    <Text style={[fonts.BIG_FONT, { padding: 5 }]}>
                        {name}
                    </Text>
                </CardSection>
            </TouchableOpacity>
        );
    }
}

export default CategoryListItem;
