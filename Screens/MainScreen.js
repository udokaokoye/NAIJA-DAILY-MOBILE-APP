import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  HeaderButtons,
  Item as ItemBtn,
} from "react-navigation-header-buttons";
import moment from "moment";
import { Container, Content, Text } from "native-base";
import HeaderButton from "../HeaderButton";
const MainScreen = (props) => {
  const [allnews, setallnews] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isRefreshing, setisRefreshing] = useState(false);
  const fetchnews = () => {
    const url = `https://naijadaily.000webhostapp.com/fetch-posts.php?category=all`;
    setisLoading(true);
    fetch(url, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((res) => {
        setallnews(res);

        // console.log(res[1]);
      })
      .catch((err) => console.log(err));
    setisLoading(false);
  };

  const fetchUpdatedNews = () => {
    setisRefreshing(true);
    const url = `https://naijadaily.000webhostapp.com/fetch-posts.php?category=all`;
    fetch(url, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((res) => {
        setallnews(res);
        // console.log(res);
      })
      .catch((err) => console.log(err));
    setisRefreshing(false);
  };
  useEffect(() => {
    fetchnews();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <ActivityIndicator size={"large"} color={"#BA0202"} />
      </View>
    );
  }

  return (
    <Container style={{ flex: 1 }}>
      <FlatList
        onRefresh={fetchUpdatedNews}
        refreshing={isRefreshing}
        data={allnews}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <View>
              {allnews.length > 0 ? (
                allnews.slice(0, 1).map((news) => {
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate("NewsDetails", {
                            slug: news.slug,
                          })
                        }
                      >
                        <View style={styles.headline}>
                          <View style={styles.imgContainer}>
                            <Image
                              style={styles.image}
                              resizeMode={"cover"}
                              source={{
                                uri: news.picture_1,
                              }}
                              style={{ width: "100%", height: "100%" }}
                            />
                          </View>
                          <View style={styles.headlineDetails}>
                            <Text style={styles.headlineText} numberOfLines={3}>
                              {news.title}
                            </Text>
                            <Text style={styles.time}>
                              {moment(news.created_at).format("MMM DD YYYY")}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 25,
                          paddingLeft: 20,
                          marginTop: 20,
                          paddingBottom: 12,
                          paddingTop: 12,
                          backgroundColor: "#D4D3D3",
                        }}
                      >
                        Latest
                      </Text>
                    </View>
                  );
                })
              ) : (
                <Text>No News Available</Text>
              )}
            </View>
          </>
        }
        renderItem={(item) => {
          return (
            <View style={{ backgroundColor: "#D4D3D3" }}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("NewsDetails", {
                    slug: item.item.slug,
                  })
                }
              >
                <View key={item.item} style={styles.latestCat}>
                  <View style={styles.latestImage}>
                    <Image
                      style={styles.image}
                      resizeMode={"cover"}
                      source={{
                        uri: item.item.picture_1,
                      }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                  <View style={styles.latestDet}>
                    <Text numberOfLines={2} style={styles.latestText}>
                      {item.item.title}
                    </Text>
                    <Text style={styles.timeLatest}>
                      {moment().format("MMMM Do, YYYY") ==
                      moment(item.item.created_at).format("MMMM Do, YYYY") ? (
                        <Text>{moment(item.item.created_at).fromNow()}</Text>
                      ) : (
                        <Text>
                          {moment(item.item.created_at).format("DD MMM YYYY")}
                        </Text>
                      )}

                      {/* <Text>
                        {moment(item.item.created_at, [
                          "ddd MMM DD YYYY h:mm:ss",
                        ]).format("MMMM Do YYYY HH:mm:ss a")}
                      </Text> */}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </Container>
  );
};

MainScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Naija Daily",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <ItemBtn
          title="Cart"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),

    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <ItemBtn
          title="Cart"
          iconName="md-search"
          onPress={() => {
            alert("Searching...");
          }}
        />
      </HeaderButtons>
    ),
  };
};
export default MainScreen;

const styles = StyleSheet.create({
  headline: {
    height: 350,
  },
  imgContainer: {
    width: "100%",
    height: "65%",
  },
  headlineDetails: {
    height: "35%",
  },
  headlineText: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 19,
    paddingHorizontal: 5,
  },
  time: {
    textAlign: "left",
    paddingTop: 10,
    color: "#BA0202",
  },
  latest: {
    marginTop: 35,
    backgroundColor: "#DDDDDD",
  },
  latestCat: {
    width: "90%",
    height: 80,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 12,
    alignSelf: "center",
    backgroundColor: "white",
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    borderRadius: 5,
    overflow: "hidden",
  },
  latestImage: {
    height: "100%",
    width: "25%",
  },

  latestDet: {
    width: "70%",
  },
  latestText: {
    paddingTop: 10,
    fontSize: 15,
  },
  timeLatest: {
    textAlign: "right",
    padding: 10,
    color: "#BA0202",
    fontSize: 9,
  },
});
