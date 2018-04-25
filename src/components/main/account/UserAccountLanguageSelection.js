import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ModalBase, Card, CardSection } from '../../common/index';
import { analyticsTracker } from '../../../App';
import { languageSelection, languageSelectionDone } from '../../../actions/LanguageActions';
import { colors } from '../../../res/Colors';
import { fonts } from '../../../res/Fonts';
import { IC_BLACK_CIRCLE } from '../../../res/images';
import { I18nUtils } from '../../../utils/I18nUtils';
import {
    TR_HEADER_MODAL_LANGUAGE_SELECTION,
    TR_LANGUAGE_ENGLISH,
    TR_LANGUAGE_SPANISH
} from '../../../i18n/constants';

class UserAccountLanguageSelection extends Component {

    constructor(props, context) {
        super(props, context);

        this.onAccept = this.onAccept.bind(this);
        this.onDecline = this.onDecline.bind(this);
    }

    componentWillMount() {
        this.props.languageSelection('es');
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('User Account Language Selection');
    }

    onAccept() {
        const { languages } = this.props;
        const languageCode = _.findKey(languages, item => item);

        this.props.languageSelectionDone(languageCode);

        Actions.pop();
    }

    onDecline() {
        Actions.pop();
    }

    render() {
        const { buttonStyle, imageStyle } = styles;
        const { languages } = this.props;

        return (
            <ModalBase
                visible
                title={I18nUtils.tr(TR_HEADER_MODAL_LANGUAGE_SELECTION)}
                onAccept={this.onAccept}
                onDecline={this.onDecline}
                titleSize={24}
            >
                <Card style={{ width: '100%' }}>
                    <CardSection style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Text style={[fonts.BIG, { padding: 5 }]}>
                            {I18nUtils.tr(TR_LANGUAGE_SPANISH)}
                        </Text>

                        <TouchableOpacity
                            onPress={() => this.props.languageSelection('es')}
                            style={buttonStyle}
                        >
                            {languages.es ?
                                <Image
                                    style={imageStyle}
                                    source={IC_BLACK_CIRCLE}
                                    resizeMode="contain"
                                />
                                : null}
                        </TouchableOpacity >
                    </CardSection>

                    <CardSection style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Text style={[fonts.BIG, { padding: 5 }]}>
                            {I18nUtils.tr(TR_LANGUAGE_ENGLISH)}
                        </Text>

                        <TouchableOpacity
                            onPress={() => this.props.languageSelection('en')}
                            style={buttonStyle}
                        >
                            {languages.en ?
                                <Image
                                    style={imageStyle}
                                    source={IC_BLACK_CIRCLE}
                                    resizeMode="contain"
                                />
                                : null}
                        </TouchableOpacity >
                    </CardSection>
                </Card>

                <View style={{ flex: 1 }} />
            </ModalBase>
        );
    }
}

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

const mapStateToProps = ({ languages }) => {
    return { languages };
};

export default connect(mapStateToProps, {
    languageSelection,
    languageSelectionDone
})(UserAccountLanguageSelection);
