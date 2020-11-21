import React from "react";
import { StyleSheet, Text, View } from "react-native";

const testo = (props) => {
  return (
    <View>
      <View style={styles.image}>
        <Image
          resizeMode={"cover"}
          source={{
            uri: props.pic,
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
};

export default testo;

const styles = StyleSheet.create({
  image: {
    height: 250,
  },
});
