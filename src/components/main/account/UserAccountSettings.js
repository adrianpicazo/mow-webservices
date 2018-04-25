import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import Header from '../../headers/Header';
import { connect } from 'react-redux';
import {
    Template,
    ScrollTemplate,
    Card,
    CardSection
} from '../../common/index';
import { colors } from '../../../res/Colors';
import { analyticsTracker } from '../../../App';
import { I18nUtils } from '../../../utils/I18nUtils';
import SettingsOption from '../../common/SettingsOption';
import {
    TR_BODY_SETTINGS_CHANGE,
    TR_BODY_SETTINGS_LANGUAGE
} from '../../../i18n/constants';

class UserAccountSettings extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('User Account Settings');
    }

    render() {
        const { cardStyle, cardSectionStyle } = styles;

        return (
            <Template key={this.props.language}>
                <Header
                    renderBackButton
                    headerTitle={'Configuración'}
                />

                <ScrollTemplate>
                    <Card style={cardStyle}>
                        <CardSection style={cardSectionStyle}>
                            <SettingsOption
                                textHeader={I18nUtils.tr(TR_BODY_SETTINGS_LANGUAGE)}
                                textButton={I18nUtils.tr(TR_BODY_SETTINGS_CHANGE)}
                                textBody="Español"
                                onButtonPress={() => Actions.push('userAccountLanguageSelection')}
                            />
                        </CardSection>
                    </Card>
                </ScrollTemplate>
            </Template>
        );
    }
}

const styles = {
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
    const { language } = account;

    return { language };
};

export default connect(mapStateToProps, {})(UserAccountSettings);
