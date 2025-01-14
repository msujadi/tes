import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootState } from '../types/State';
import { AllForumObject } from '../types/Commons';
import { token } from '../helpers';
import { CUSTOM_BLACK, WHITE } from '../constants/color';
import { STATUS_BAR_HEIGHT } from '../constants/deviceConfig';
import { Icon, Text } from '../core-ui';
import { ForumList, TabView } from '../components';

type Props = NavigationScreenProps & {
  forumData: AllForumObject;
  fetchForum: (authToken: string) => void;
};

type ForumSceneState = {
  isRefresh: boolean;
  index: number;
};

export class ForumScene extends Component<Props, ForumSceneState> {
  state: ForumSceneState = {
    isRefresh: false,
    index: 0,
  };

  componentWillMount() {
    if (this.props.navigation.getParam('from') === 'Forum') {
      this.setState({ index: 0 });
    } else if (this.props.navigation.getParam('from') === 'Market') {
      this.setState({ index: 1 });
    }
  }

  async componentDidMount() {
    this._asyncStorage();
  }

  _asyncStorage = async () => {
    let { fetchForum } = this.props;
    let userToken = await token.getToken();

    if (userToken) {
      await fetchForum(userToken);
    }
  };

  tab = [
    {
      title: 'Umum',
      render: () => {
        return (
          <View style={styles.body}>
            <View style={styles.textContainer}>
              <Text text="Terbaru" type="medium" />
            </View>
            {this.props.forumData ? (
              <FlatList
                onRefresh={this._onRefresh}
                refreshing={this.state.isRefresh}
                data={this.props.forumData.umum}
                renderItem={({ item }) => {
                  return (
                    <ForumList
                      thumbnail={item.image}
                      type={item.category}
                      date="26 Juli 2019"
                      forumTitle={item.forum_name}
                      starter="Lia Eden"
                      comments={1296}
                    />
                  );
                }}
                keyExtractor={(index) => index.toString()}
              />
            ) : (
              <View />
            )}
          </View>
        );
      },
    },
    {
      title: 'Jual',
      render: () => {
        return (
          <View style={styles.body}>
            <View style={styles.textContainer}>
              <Text text="Terbaru" type="medium" />
            </View>
            {this.props.forumData ? (
              <FlatList
                onRefresh={this._onRefresh}
                refreshing={this.state.isRefresh}
                data={this.props.forumData.jual}
                renderItem={({ item }) => {
                  return (
                    <ForumList
                      thumbnail={item.image}
                      type={item.category}
                      date="26 Juli 2019"
                      forumTitle={item.forum_name}
                      starter="Lia Eden"
                      comments={1296}
                    />
                  );
                }}
                keyExtractor={(index) => index.toString()}
              />
            ) : (
              <View />
            )}
          </View>
        );
      },
    },
    {
      title: 'Beli',
      render: () => {
        return (
          <View style={styles.body}>
            <View style={styles.textContainer}>
              <Text text="Terbaru" type="medium" />
            </View>
            {this.props.forumData ? (
              <FlatList
                onRefresh={this._onRefresh}
                refreshing={this.state.isRefresh}
                data={this.props.forumData.beli}
                renderItem={({ item }) => {
                  return (
                    <ForumList
                      thumbnail={item.image}
                      type={item.category}
                      date="26 Juli 2019"
                      forumTitle={item.forum_name}
                      starter="Lia Eden"
                      comments={1296}
                    />
                  );
                }}
                keyExtractor={(index) => index.toString()}
              />
            ) : (
              <View />
            )}
          </View>
        );
      },
    },
  ];

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View style={styles.navbarContainer}>
            <Icon
              name="arrowBack"
              customStyle={styles.arrowBack}
              onPress={() => this.props.navigation.goBack()}
            />

            <Text
              text="Forum"
              type="headerTitle"
              newTextStyle={styles.titleText}
            />
            <View />
          </View>

          <TabView
            tabs={this.tab}
            index={this.state.index}
            onChange={(newIndex: number) => {
              this.setState({ index: newIndex });
            }}
          />
        </View>
      </View>
    );
  }

  _onRefresh = () => {
    this.setState({ isRefresh: true });
    this._asyncStorage().then(() => {
      this.setState({ isRefresh: false });
    });
  };
}

let mapStateToProps = (state: RootState) => {
  let { forumState } = state;

  return {
    forumData: forumState.forumData,
  };
};

let mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchForum: (authToken: string) => {
      dispatch({ type: 'FORUM_REQUESTED', authToken });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForumScene);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flex: 1,
    backgroundColor: CUSTOM_BLACK,
  },
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: CUSTOM_BLACK,
    marginTop: STATUS_BAR_HEIGHT,
    paddingHorizontal: 16,
    height: 56,
  },
  arrowBack: {
    width: 24,
    height: 24,
  },
  titleText: {
    paddingRight: 20,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  body: {
    flex: 7,
    backgroundColor: WHITE,
  },
  bannerContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
