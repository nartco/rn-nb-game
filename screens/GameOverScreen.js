import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView
} from "react-native";

import BodyText from "../components/BodyText";
import TitleTtext from "../components/TitleText";
import Colors from "../constants/colors";

import MainButton from "../components/MainButton";

const GameOverScreen = props => {
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  return (
      <ScrollView>
        <View style={styles.screen}>
          <TitleTtext>The Game Is Over!</TitleTtext>
          <View
            style={{
              ...styles.imageContainer,
              ...{
                width: availableDeviceWidth * 0.7,
                height: availableDeviceWidth * 0.7,
                borderRadius: (availableDeviceWidth * 0.7) / 2,
                marginVertical: availableDeviceHeight / 30
              }
            }}
          >
            <Image
              source={require("../assets/success.png")}
              style={styles.image}
              resizeMode='cover'
            />
          </View>
          <View
            style={{
              ...styles.ResultContainer,
              ...{ marginVertical: availableDeviceHeight / 60 }
            }}
          >
            <BodyText
              style={{
                ...styles.resultText,
                ...{
                  fontSize: availableDeviceHeight < 400 ? 16 : 20
                }
              }}
            >
              Your phone needed{" "}
              <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds
              to guess the number{" "}
              <Text style={styles.highlight}>{props.userNumber}</Text>{" "}
            </BodyText>
          </View>
          <MainButton onPress={props.onRestart}>New Game</MainButton>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  imageContainer: {
    borderWidth: 3,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold"
  },
  ResultContainer: {
    marginHorizontal: 30
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height > 400 ? 16 : 30
  }
});

export default GameOverScreen;
