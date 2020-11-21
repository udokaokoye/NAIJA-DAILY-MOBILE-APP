import React, { useState } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  DrawerItems,
} from "react-navigation";
import MainScreen from "../Screens/MainScreen";
import NewsDetailsScreen from "../Screens/NewsDetailsScreen";
import NewsCategoryScreen from "../Screens/NewsCategory";
import { Ionicons } from "@expo/vector-icons";
import {
  HeaderButtons,
  Item as ItemBtn,
} from "react-navigation-header-buttons";
import HeaderButton from "../HeaderButton";
import {
  Platform,
  SafeAreaView,
  View,
  Button,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";

const navoPolitics = ({ navigation }) => {
  return {
    headerTitle: "Politics",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <ItemBtn
          title="Cart"
          iconName="md-menu"
          onPress={() => {
            navigation.toggleDrawer();
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

    headerStyle: {
      backgroundColor: "#BA0202",
    },
    headerTintColor: "white",
  };
};

const navoSports = ({ navigation }) => {
  return {
    headerTitle: "Sports",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <ItemBtn
          title="Cart"
          iconName="md-menu"
          onPress={() => {
            navigation.toggleDrawer();
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

    headerStyle: {
      backgroundColor: "#BA0202",
    },
    headerTintColor: "white",
  };
};

const navoEnt = ({ navigation }) => {
  return {
    headerTitle: "Entertainment",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <ItemBtn
          title="Cart"
          iconName="md-menu"
          onPress={() => {
            navigation.toggleDrawer();
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

    headerStyle: {
      backgroundColor: "#BA0202",
    },
    headerTintColor: "white",
  };
};

const navoMetro = ({ navigation }) => {
  return {
    headerTitle: "Metro Plus",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <ItemBtn
          title="Cart"
          iconName="md-menu"
          onPress={() => {
            navigation.toggleDrawer();
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

    headerStyle: {
      backgroundColor: "#BA0202",
    },
    headerTintColor: "white",
  };
};

const navoBus = ({ navigation }) => {
  return {
    headerTitle: "Business",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <ItemBtn
          title="Cart"
          iconName="md-menu"
          onPress={() => {
            navigation.toggleDrawer();
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

    headerStyle: {
      backgroundColor: "#BA0202",
    },
    headerTintColor: "white",
  };
};

const navoHealth = ({ navigation }) => {
  return {
    headerTitle: "Health",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <ItemBtn
          title="Cart"
          iconName="md-menu"
          onPress={() => {
            navigation.toggleDrawer();
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

    headerStyle: {
      backgroundColor: "#BA0202",
    },
    headerTintColor: "white",
  };
};

const navoFor = ({ navigation }) => {
  return {
    headerTitle: "Foreign",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <ItemBtn
          title="Cart"
          iconName="md-menu"
          onPress={() => {
            navigation.toggleDrawer();
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

    headerStyle: {
      backgroundColor: "#BA0202",
    },
    headerTintColor: "white",
  };
};
const Homenaviagtor = createStackNavigator(
  {
    mainscreen: MainScreen,
    NewsDetails: NewsDetailsScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#BA0202",
      },
      headerTintColor: "white",
    },
  }
);

const Politics = createStackNavigator(
  {
    first: (props) => <NewsCategoryScreen {...props} Category="Politics" />,
  },
  {
    defaultNavigationOptions: navoPolitics,
  }
);

const Sports = createStackNavigator(
  {
    first: (props) => <NewsCategoryScreen {...props} Category="Sports" />,
  },
  {
    defaultNavigationOptions: navoSports,
  }
);

const Entertainment = createStackNavigator(
  {
    first: (props) => (
      <NewsCategoryScreen {...props} Category="Entertainment" />
    ),
  },
  {
    defaultNavigationOptions: navoEnt,
  }
);

const MetroPlus = createStackNavigator(
  {
    first: (props) => <NewsCategoryScreen {...props} Category="Metro Plus" />,
  },
  {
    defaultNavigationOptions: navoMetro,
  }
);

const Business = createStackNavigator(
  {
    first: (props) => <NewsCategoryScreen {...props} Category="Business" />,
  },
  {
    defaultNavigationOptions: navoBus,
  }
);

const Foreign = createStackNavigator(
  {
    first: (props) => <NewsCategoryScreen {...props} Category="Foreign" />,
  },
  {
    defaultNavigationOptions: navoFor,
  }
);

const Health = createStackNavigator(
  {
    first: (props) => <NewsCategoryScreen {...props} Category="Health" />,
  },
  {
    defaultNavigationOptions: navoHealth,
  }
);
const AppNavigator = createDrawerNavigator(
  {
    Home: Homenaviagtor,
    Entertainment: Entertainment,
    Sports: Sports,
    Metro: {
      screen: MetroPlus,
      navigationOptions: {
        drawerLabel: "Metro Plus",
      },
    },
    Politics: Politics,
    Business: Business,
    Health: Health,
    Foreign: Foreign,
  },
  {
    contentComponent: (props) => {
      return (
        <View
          style={{
            flex: 1,
            marginTop: Platform.OS === "android" ? 35 : 0,
          }}
        >
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <View
              style={{
                height: 70,
                backgroundColor: "#BA0202",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                resizeMode={"contain"}
                source={require("../assets/logo-white-bold.png")}
                style={{ width: "70%", height: "70%" }}
              />
            </View>
            <DrawerItems {...props} />
            <Button
              onPress={() => {
                Linking.openURL("https://naija-daily.netlify.app/");
              }}
              title="Visit Website"
              color="#BA0202"
            />
          </SafeAreaView>
        </View>
      );
    },

    contentOptions: {
      activeTintColor: "#BA0202",
    },
  }
);

// const MainNavigator = createStackNavigator({
//   MainScreen: AppNavigator,
// });

export default createAppContainer(AppNavigator);
