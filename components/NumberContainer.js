import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/colors'

const NumberContainer = props => {
    return (
        <View style={styles.numberContainer}>
            <Text style={styles.number}>{props.number}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    numberContainer: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.accent,
        alignItems: "center"
    },
    number: {
        color: Colors.accent,
        fontSize: 22
    }
})

export default NumberContainer
