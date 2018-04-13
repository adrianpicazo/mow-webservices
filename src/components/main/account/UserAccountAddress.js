import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../headers/Header';
import UserAccountAddressItem from './UserAccountAddressItem';
import {
    Template,
    ScrollTemplate,
    Card,
    CardSection,
    IconButton,
    Spinner,
    Failure
} from '../../common/index';
import { addressesFetch } from '../../../actions/index';
import { fonts } from '../../../res/Fonts';
import { IC_WHITE_PLUS } from '../../../res/images';
import { colors } from '../../../res/Colors';

class UserAccountAddress extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const { addresses } = this.props;

        if (addresses === null)
            this.props.addressesFetch();
    }

    renderFailure() {
        const { addFailure, removeFailure } = this.props;

        if (addFailure) {
            return (
                <CardSection>
                    <Failure title={'FALLO DE REGISTRO'}>
                        {addFailure}
                    </Failure>
                </CardSection>
            );
        }

        if (removeFailure) {
            return (
                <CardSection>
                    <Failure title={'FALLO DE BORRADO'}>
                        {removeFailure}
                    </Failure>
                </CardSection>
            );
        }
    }

    renderAddressList() {
        const { flatListStyle } = styles;
        const { addresses, fetchLoading, fetchFailure, addLoading, removeSuccess } = this.props;

        if (fetchLoading || addLoading) {
            return (
                <Spinner size="large" />
            );
        }

        if (!removeSuccess && fetchFailure) {
            return (
                <CardSection>
                    <Failure title={'FALLO DE OBTENCIÓN DE DATOS'}>
                        {fetchFailure}
                    </Failure>
                </CardSection>
            );
        }

        return (
            <FlatList
                data={addresses}
                renderItem={({ item }) => <UserAccountAddressItem address={item} index />}
                keyExtractor={(item, index) => index.toString()}
                style={flatListStyle}
                extraData={this.props}
            />
        );
    }

    renderAddButton() {
        return (
            <CardSection style={{ alignSelf: 'flex-end' }}>
                <IconButton
                    onPress={() => Actions.push('userAccountAddressForm')}
                    image={IC_WHITE_PLUS}
                    buttonStyle={styles.buttonStyle}
                    imageStyle={{ tintColor: colors.BLUE.N700 }}
                />
            </CardSection>
        );
    }

    render() {
        return (
            <Template>
                <Header
                    renderBackButton
                    headerTitle="Tus direcciones"
                />

                <ScrollTemplate>
                    <Card style={{ width: '100%' }}>
                        <CardSection style={{ alignSelf: 'flex-start' }}>
                            <Text style={fonts.HUGE}>
                                Direcciones registradas
                            </Text>
                        </CardSection>

                        {this.renderAddressList()}
                        {this.renderAddButton()}
                        {this.renderFailure()}
                    </Card>
                </ScrollTemplate>
            </Template>
        );
    }
}

const styles = {
    flatListStyle: {
        position: 'relative',
        width: '100%',
        marginTop: 5,
        marginBottom: 5
    },
    buttonStyle: {
        height: 35,
        width: 35,
        padding: 6,
        borderColor: colors.BLUE.N700
    }
};

const mapStateToProps = ({ userAddresses, account }) => {
    const { addresses } = account;
    const {
        fetchLoading,
        fetchFailure,
        removeFailure,
        removeSuccess,
        addSuccess,
        addFailure,
        addLoading
    } = userAddresses;

    return {
        addresses,
        fetchLoading,
        fetchFailure,
        removeFailure,
        removeSuccess,
        addSuccess,
        addFailure,
        addLoading
    };
};

export default connect(mapStateToProps, { addressesFetch })(UserAccountAddress);
