import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScreenOrientation } from 'expo'

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import DefaultStyles from "../constants/default-styles";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuess, setPassGuess] = useState([initialGuess]);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width)
      setAvailableDeviceHeight(Dimensions.get('window').height)
    }
    Dimensions.addEventListener('change', updateLayout)

    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  })

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuess.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert(`Don't lie!`, "You know that this is wrong...", [
        { text: "sorry", style: "cancel" }
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    setPassGuess(curPastGuess => [nextNumber, ...curPastGuess]);
  };

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponen's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={() => nextGuessHandler("lower")}>
            {" "}
            <Ionicons name='md-remove' size={24} color='white' />{" "}
          </MainButton>
          <NumberContainer number={currentGuess} />
          <MainButton onPress={() => nextGuessHandler("greater")}>
            {" "}
            <Ionicons name='md-add' size={24} color='white' />{" "}
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuess.map((guess, index) =>
              renderListItem(guess, pastGuess.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponen's Guess</Text>
      <NumberContainer number={currentGuess} />
      <Card style={{...styles.buttonContainer, ...{marginTop: availableDeviceHeight > 600 ? 20 : 5}}}>
        <MainButton onPress={() => nextGuessHandler("lower")}>
          {" "}
          <Ionicons name='md-remove' size={24} color='white' />{" "}
        </MainButton>
        <MainButton onPress={() => nextGuessHandler("greater")}>
          {" "}
          <Ionicons name='md-add' size={24} color='white' />{" "}
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuess.map((guess, index) =>
            renderListItem(guess, pastGuess.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 400,
    maxWidth: "90%"
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get("window").height > 350 ? "60%" : "80%"
  },
  list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  }
});

export default GameScreen;
