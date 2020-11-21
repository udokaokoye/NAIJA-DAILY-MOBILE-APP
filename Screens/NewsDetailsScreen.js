import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  FlatList,
  Share,
} from "react-native";
import parsers from "react-string-replace";
import {
  HeaderButtons,
  Item as ItemBtn,
} from "react-navigation-header-buttons";

import moment from "moment";
import { Video } from "expo-av";
import { Container, Title, Content, Text } from "native-base";
import HeaderButton from "../HeaderButton";
import playvid from "./test.mp4";
const NewsDetailsScreen = (props) => {
  const slug = props.navigation.getParam("slug");
  const screenWidth = Math.round(Dimensions.get("window").width);
  const [allnews, setallnews] = useState([]);
  const [news, setnews] = useState({});
  const [body, setbody] = useState("");
  const [vidplayer, setvidplayer] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const fetchpost = (slug) => {
    const url = `https://naijadaily.000webhostapp.com/fetch-posts.php?slug=${slug}`;
    setisLoading(true);
    fetch(url, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((res) => {
        setnews(res[0]);
        const txt = res[0].content + "";
        let replacedText;
        replacedText = parsers(txt, "IMG-002", (match, i) => (
          <View style={{ width: screenWidth, ...styles.image }}>
            <Image
              resizeMode={"contain"}
              source={{
                uri: res[0].picture_2,
              }}
              style={{ width: "100%", height: "100%" }}
            />
            {/* <Text>Hello</Text> */}
          </View>
        ));

        replacedText = parsers(replacedText, "IMG-003", (match, i) => (
          <View style={{ width: screenWidth, ...styles.image }}>
            <Image
              resizeMode={"contain"}
              source={{
                uri: res[0].picture_3,
              }}
              style={{ width: "100%", height: "100%" }}
            />
            {/* <Text>Hello</Text> */}
          </View>
        ));

        replacedText = parsers(replacedText, "IMG-004", (match, i) => (
          <View style={{ width: screenWidth, ...styles.image }}>
            <Image
              resizeMode={"contain"}
              source={{
                uri: res[0].picture_4,
              }}
              style={{ width: "100%", height: "100%" }}
            />
            {/* <Text>Hello</Text> */}
          </View>
        ));

        setbody(replacedText);

        const host = "https://naija-daily.netlify.app/";

        const shareNews = async () => {
          try {
            const result = await Share.share({
              message: `${res[0].title} \n ${host}${res[0].slug}`,
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            alert(error.message);
          }
        };

        props.navigation.setParams({
          share: shareNews,
        });
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  };

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
  const shareNews = async () => {
    try {
      const result = await Share.share({
        message: `${news.title} /n ${news.slug} `,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const setView = async () => {
    setisLoading(true);
    const formData = new FormData();
    formData.append("ip", "userIP");
    formData.append("slug", slug);
    const url = "https://naijadaily.000webhostapp.com/views.php";
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchpost(slug);
    fetchnews();
    setView();
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
    <Container>
      <Content>
        <View style={styles.image}>
          <Image
            resizeMode={"cover"}
            source={{
              uri: news.picture_1,
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={styles.topDetails}>
          <Text style={styles.title}>{news.title}</Text>
          <Text style={styles.date}>
            {" "}
            {moment(news.created_at).utc().format("MMMM Do, YYYY")}{" "}
          </Text>
        </View>

        <Text style={styles.publisher}>
          {" "}
          Published By:{" "}
          <Text style={{ color: "#BA0202" }}>{news.author_name}</Text>
        </Text>

        <Text style={styles.publisher}>
          Viewd By:{" "}
          {
            (news.views + "")
              .replace(/[^"]+;[^"]+/g, "")
              .replace(/^"*|"*$/g, "")
              .split('""').length
          }
        </Text>

        <Text style={styles.news}>{body}</Text>

        {news.video == "true" ? (
          <React.Fragment>
            <Text style={{ marginTop: 40, marginBottom: 40, marginLeft: 10 }}>
              Watch Video Below
            </Text>
            <Video
              source={{
                uri: news.video_path,
              }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              isLooping
              useNativeControls
              style={{ width: screenWidth, height: 400 }}
            />
          </React.Fragment>
        ) : (
          <Text></Text>
        )}

        <View style={{ width: "100%" }}>
          <Text
            style={{
              paddingVertical: 12,
              paddingHorizontal: 19,
              fontSize: 22,
              color: "#BA0202",
            }}
          >
            Related News
          </Text>
          <FlatList
            keyExtractor={(item) => item.id}
            data={allnews.length >= 4 ? allnews.slice(1, 7) : []}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    fetchpost(item.item.slug);
                  }}
                  style={{ width: "50%", height: "100%" }}
                >
                  <View style={styles.oth_con}>
                    <View style={styles.oth_image}>
                      <Image
                        resizeMode={"contain"}
                        source={{
                          uri: item.item.picture_1,
                        }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </View>
                    <Text numberOfLines={2}>{item.item.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            numColumns={2}
          />
        </View>
      </Content>
    </Container>
  );
};

NewsDetailsScreen.navigationOptions = (navData) => {
  const shareNews = navData.navigation.getParam("share");
  return {
    headerTitle: "Naija Daily",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <ItemBtn
          title="Cart"
          iconName="md-share"
          onPress={() => {
            shareNews();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default NewsDetailsScreen;

const styles = StyleSheet.create({
  image: {
    height: 250,
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  topDetails: {
    backgroundColor: "#DDDDDD",
    padding: 7,
  },

  title: {
    color: "#BA0202",
    fontWeight: "bold",
    marginBottom: 13,
    fontSize: 17,
  },

  date: {
    color: "#484650",
  },

  publisher: {
    paddingHorizontal: 7,
    paddingVertical: 20,
  },
  news: {
    paddingHorizontal: 0,
  },

  oth_con: {
    alignSelf: "center",
    width: "100%",
    marginRight: 5,
    paddingHorizontal: 8,
  },

  oth_image: {
    height: 100,
    width: "100%",
  },
});
