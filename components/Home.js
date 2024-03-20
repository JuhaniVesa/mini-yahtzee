import { Text, View, TextInput, Pressable, Keyboard } from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from "./Header";
import Footer from "./Footer"
import style from "../styles/style";
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINT_LIMIT,
    BONUS_POINTS
} from '../constants/Game'


export default function Home ({ navigation }) {

    // Const for players name and if player have name submitted or not. 

    const [playerName, setPlayerName] = useState('')
    const [hasPlayerName, setHasPlayerName] = useState(false)

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true)
            Keyboard.dismiss()
        }
    }

    // Ternary operator is for checking is player have submitted name. If not it displays text input to submit name and if player have name then showing rules and giving a button to 
    //proceed.

    return(
        <>
        <Header />
        <View style={style.container}>
            <View style={style.infoIcon}>
                <MaterialCommunityIcons 
                name="information"
                size={90}
                color="orange"
            />
            </View>
            {!hasPlayerName ?
                <>
                    <Text style={style.homeText}>For scoreboard enter your name</Text>
                    <TextInput
                    onChangeText={setPlayerName}
                    autoFocus={true}
                    style={style.homeTextInput}
                    placeholder="Write player name"
                    />
                    <Pressable
                    style={style.button}
                    onPress={() => { handlePlayerName(playerName), console.log(playerName)}}>
                        <Text style={style.buttonText}>OK</Text>
                    </Pressable>
                </>
            :
                <>
                    <Text style={style.homeText}>Rules of the game</Text>
                    <Text multiline="true" style={style.homeText}>
                    THE GAME: Upper section of the classic Yahtzee
                    dice game. You have {NBR_OF_DICES} dices and
                    for the every dice you have {NBR_OF_THROWS}
                    throws. After each throw you can keep dices in
                    order to get same dice spot counts as many as
                    possible. In the end of the turn you must select
                    your points from {MIN_SPOT} to {MAX_SPOT}.
                    Game ends when all points have been selected.
                    The order for selecting those is free.
                    </Text>
                    <Text style={style.homeText}>
                    POINTS: After each turn game calculates the sum
                    for the dices you selected. Only the dices having
                    the same spot count are calculated. Inside the
                    game you can not select same points from 
                    {MIN_SPOT} to {MAX_SPOT} again.
                    </Text>
                    <Text style={style.homeText}>
                    GOAL: To get points as much as possible.
                     {BONUS_POINT_LIMIT} points is the limit of
                    getting bonus which gives you {BONUS_POINTS} 
                     points more.
                    </Text>
                    <Text style={style.homeText}>Good luck, {playerName}</Text>
                    <Pressable
                    onPress={() => navigation.navigate('Gameboard', {player: playerName})}>
                    <Text style={style.buttonText}>PLAY</Text>
                    </Pressable>
                    <Pressable
                    onPress={() => {
                        setHasPlayerName(false)
                        setPlayerName('')}}>
                    <Text style={style.buttonText}>RESET NAME</Text>
                    </Pressable>
                </>
            }
        </View>
        <Footer />
        </>
    )
} 
