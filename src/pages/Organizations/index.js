import React, { Component } from 'react';

import api from '~/services/api';
import AsyncStorage from '@react-native-community/async-storage';

import { View, ActivityIndicator, FlatList } from 'react-native';

import Header from '~/components/Header';
import TabIcon from '~/components/TabIcon';
import OrganizationItem from './OrganizationItem';

import styles from './styles';

export default class Organizations extends Component {
  static navigationOptions = {
    // eslint-disable-next-line react/prop-types
    tabBarIcon: ({ tintColor }) => <TabIcon name="list-alt" color={tintColor} />,
  };

  state = {
    data: [],
    loading: true,
    refreshing: false,
  };

  componentDidMount() {
    this.loadOrganizations();
  }

  loadOrganizations = async () => {
    this.setState({ refreshing: true });

    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/orgs`);

    this.setState({ data, loading: false, refreshing: false });
  };

  renderListItem = ({ item }) => <OrganizationItem organization={item} />;

  renderList = () => {
    const { data, refreshing } = this.state;
    console.tron.log(data);

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadOrganizations}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Organizações" />
        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}
