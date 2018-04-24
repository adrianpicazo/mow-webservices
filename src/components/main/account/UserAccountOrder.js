import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Header from '../../headers/Header';
import {
    Template,
    ScrollTemplate,
    Card,
    CardSection,
    Spinner,
    Failure,
    Warning,
    HorizontalRule
} from '../../common/index';
import { ordersFetch } from '../../../actions/index';
import { fonts } from '../../../res/Fonts';
import { UserAccountOrderItem } from './UserAccountOrderItem';
import { analyticsTracker } from '../../../App';

class UserAccountOrder extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('User Account Order');

        const { uid } = this.props;

        if (uid) {
            this.props.ordersFetch(uid);
        }
    }

    renderOrdersList() {
        const { flatListStyle } = styles;
        const { orders, fetchLoading, fetchSuccess, fetchFailure } = this.props;

        if (fetchLoading) {
            return (
                <Spinner size="large" />
            );
        }

        if (fetchFailure) {
            return (
                <CardSection>
                    <Failure title={'FALLO DE OBTENCIÓN DE DATOS'}>
                        {fetchFailure}
                    </Failure>
                </CardSection>
            );
        }

        if (fetchSuccess && orders === null) {
            return (
                <CardSection>
                    <Warning>
                        No exiten pedidos todavía.
                    </Warning>
                </CardSection>
            );
        }

        return (
            <FlatList
                data={orders}
                renderItem={({ item }) => <UserAccountOrderItem
                    order={item}
                    onPress={() => Actions.push('userAccountOrderInfo', { order: item })}
                    index
                />}
                keyExtractor={(item, index) => index.toString()}
                style={flatListStyle}
                extraData={this.props}
                ItemSeparatorComponent={() => <HorizontalRule
                    marginLeft={30}
                    marginRight={30}
                />}
            />
        );
    }

    render() {
        return (
            <Template>
                <Header
                    renderBackButton
                    headerTitle="Tus pedidos"
                />

                <ScrollTemplate>
                    <Card style={{ width: '100%' }}>
                        <CardSection style={{ alignSelf: 'flex-start' }}>
                            <Text style={fonts.HUGE}>
                                Pedidos registrados
                            </Text>
                        </CardSection>

                        {this.renderOrdersList()}
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
    }
};

const mapStateToProps = ({ account, userOrders }) => {
    const { uid, orders } = account;
    const { fetchLoading, fetchSuccess, fetchFailure } = userOrders;

    return { uid, orders, fetchLoading, fetchSuccess, fetchFailure };
};

export default connect(mapStateToProps, { ordersFetch })(UserAccountOrder);
