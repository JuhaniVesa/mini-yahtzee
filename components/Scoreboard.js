import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, FlatList, Pressable } from "react-native";
import style from "../styles/style";

export default function Scoreboard ({navigation}) {

    //constant for scores

    const [scores, setScores] = useState([])

    //constant for getting socres from device.

    const getScores = async () => {
        try {
            const scorePoints = await AsyncStorage.getItem('scores')
            const scores = scorePoints ? JSON.parse(scorePoints) : []
            setScores(scores)
            console.log('Scoreboard');
        } catch (error) {
            console.log('getScores: ', error);
        }
    }

    //constant to resetting scores if player want to clean top 10 list.

    const resetScores = async () => {
        try {
            await AsyncStorage.removeItem('scores')
            setScores([])
        } catch (error) {
            console.log('error resetting scores', error);
        }
    }

    // useEffect to getting scores when player focusing on 'Scoreboard' screen.

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScores()
        })
        return unsubscribe
    }, [navigation])


    // returning top 10 text and button for resetting scoreboard. Also flatlist for scores.

    return(
        <View style={[style.container, {paddingTop: 10}]}>
            <Text style={[style.pointsStyle, {paddingBottom: 15, fontSize: 24}]}>Top 10</Text>
            <FlatList
            data={scores.sort((a, b) => b.score - a.score).slice(0,10)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => <Item score = {item} index={index}/>}
            />
            <Pressable onPress={resetScores}
            style={[style.button, {marginHorizontal: 150, marginBottom: 10,}]}>
                <Text style={style.buttonText}>RESET</Text>
            </Pressable>
        </View>
    )

    // function Item have date and time constants to get exact time when player submits scores. And return have things for the flatlist, such data as playername, scores, place,
    // date and time

    function Item({score, index}) {

        const date = new Date(score.date)

        const d = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        const t = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`


        return (
            <View style={[style.scoreboardBox, style.ButtonElevation]}>
                <View style={style.scoreboardBoxPlace}>
                    <Text style={style.scoreboardBoxPlaceText}>#{index + 1}</Text>
                    <View style={style.scoreboardBoxDetails}>
                        <Text style={style.scoreboardText}>Player: {score.playerName}</Text>
                        <Text style={style.scoreboardText}>Score: {score.score}</Text>
                        <Text style={style.scoreboardText}>Date: {d} {t} </Text>
                    </View>
                </View>
            </View>
        )
    }

} 
