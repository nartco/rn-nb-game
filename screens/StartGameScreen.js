import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4)
    }
  
    Dimensions.addEventListener('change', updateLayout)

    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  })

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumer = parseInt(enteredValue);
    if (isNaN(chosenNumer) || chosenNumer <= 0 || chosenNumer > 99) {
      Alert.alert(
        "Invalid Number",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(parseInt(enteredValue));
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.confirmContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer number={selectedNumber} />
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start A New Game !</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText style={styles.text}>Select a number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCorrect={false}
                keyboardType='number-pad'
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{width: buttonWidth}}>
                  <Button
                    title='Reset'
                    onPress={resetInputHandler}
                    color={Colors.accent}
                  />
                </View>
                <View style={{width: buttonWidth}}>
                  <Button
                    title='Confirm'
                    onPress={confirmInputHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  // button: {
  //   // width: "40%"
  //   width: Dimensions.get("window").width / 4
  // },
  inputContainer: {
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center"
  },
  input: {
    width: 50,
    textAlign: "center"
  },
  confirmContainer: {
    marginVertical: 10,
    alignItems: "center"
  },
  text: {
    fontFamily: "open-sans"
  }
});

export default StartGameScreen;
