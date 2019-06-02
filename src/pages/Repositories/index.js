import React, { Component } from 'react';

import api from '~/services/api';
import AsyncStorage from '@react-native-community/async-storage';

import { View, ActivityIndicator, FlatList } from 'react-native';

import Header from '~/components/Header';
import TabIcon from '~/components/TabIcon';

import RepositoryItem from './RepositoryItem';
import styles from './styles';

export default class Repositories extends Component {
  static navigationOptions = {
    // eslint-disable-next-line react/prop-types
    tabBarIcon: ({ tintColor }) => <TabIcon name="list-alt" color={tintColor} />,
  };

  state = {
    data: [],
    loading: true,
    refreshing: false,
  };

  async componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true });

    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/repos`);

    this.setState({ data, loading: false, refreshing: false });
  };

  renderListItem = ({ item }) => <RepositoryItem repository={item} />;

  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Repositórios" />
        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}
