import React, { Component } from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Bar, BarCard, BarSection, BarButton } from '../common/bar';
import {
    IC_BLACK_LEFT_ARROW,
    IC_BLACK_FILTER_MENU_HORIZONTAL,
    IC_BLACK_HAMBURGER_MENU_1
} from '../../res/images/index';

class Header extends Component {

    constructor(props, context) {
        super(props, context);
    }

    renderBackButton() {
        if (this.props.renderBackButton &&
            this.props.renderBackButton === true) {
            return (
                <BarSection>
                    <BarButton
                        image={IC_BLACK_LEFT_ARROW}
                        onPress={() => Actions.pop()}
                    />
                </BarSection>
            );
        }
    }

    renderFilterMenuButton() {
        if (this.props.renderFilterMenuButton &&
            this.props.renderFilterMenuButton === true) {
            return (
                <BarButton
                    image={IC_BLACK_FILTER_MENU_HORIZONTAL}
                    onPress={() => Actions.push('restaurantListModal')}
                />
            );
        }
    }

    renderUserAccountMenuButton() {
        if (this.props.renderUserAccountMenuButton &&
            this.props.renderUserAccountMenuButton === true) {
            return (
                <BarButton
                    image={IC_BLACK_HAMBURGER_MENU_1}
                    onPress={() => Actions.drawerOpen()}
                />
            );
        }
    }

    // TODO: comprobación newHeaderTextStyle
    render() {
        const { headerTextStyle } = styles;

        return (
            <Bar>
                <BarCard newCardStyle={{ justifyContent: 'flex-start' }}>
                    {this.renderBackButton()}
                    <BarSection>
                        <Text style={[headerTextStyle, this.props.newHeaderTextStyle]}>
                            {this.props.headerTitle}
                        </Text>
                    </BarSection>
                </BarCard>

                <BarCard newCardStyle={{ justifyContent: 'flex-end' }}>
                    <BarSection>
                        {this.renderFilterMenuButton()}
                        {this.renderUserAccountMenuButton()}
                    </BarSection>
                </BarCard>
            </Bar>
        );
    }
}

const styles = {
    headerTextStyle: {
        fontSize: 25,
        color: '#ffffff',
        marginRight: 5,
        marginLeft: 15
    }
};

export default Header;
