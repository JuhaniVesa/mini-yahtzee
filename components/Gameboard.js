import { Text, View, Pressable, Alert, Button } from "react-native";
import style from "../styles/style";
import { useState, useEffect } from "react";
import { Row, Container, Col } from "react-native-flex-grid";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINT_LIMIT,
    BONUS_POINTS
} from '../constants/Game'
import Footer from "./Footer";
import Header from "./Header";
import AsyncStorage from '@react-native-async-storage/async-storage';

let board = []

export default function Gameboard ({navigation, route}) {

    // Lots of constants for state handling like game status, points, throws left etc.

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
    const [status, setStatus] = useState('Keep throwing dices')
    const [gameEndStatus,setGameEndStatus] = useState(false)
    const [scores, setScores] = useState([])
    const [playerName, setPlayerName] = useState('')
    const [toBonus, setToBonus] = useState(63)

    const [gamePointsTotal, setGamePointsTotal] = useState(0)
    const [turn, setTurn] = useState(0) //Tarkoitus on laskea, että pelaaja voi pelata yhden kokonaisen kierroksen

    const [selectedDices, setSelectedDices] = 
    useState(new Array(NBR_OF_DICES).fill(false))
    const [diceSpots, setDiceSpots] = 
        useState(new Array(NBR_OF_DICES).fill(0))

    const [selectedDicePoints, setSelectedDicePoints] =
        useState(new Array(MAX_SPOT).fill(false))
    const [dicePointsTotal, setDicePointsTotal] =  
        useState(new Array(MAX_SPOT).fill(0))



    const [selectedSpots, setSelectedSpots] = 
        useState(new Array(NBR_OF_DICES).fill(0))

    const [selectedPoints, setSelectedPoints] =
        useState(new Array(BONUS_POINT_LIMIT).fill(false))


        //useEffect to check if player name from resetting name in 'Home' screen to match name setted in state handling in this screen.
    
        useEffect(() => {
        if (route.params?.player && playerName !== route.params.player) {
            setPlayerName(route.params.player)
        }
    }, [playerName, route.params?.player])

    // Two functions to check color of (un)selected dices and dicepoints icons.

    function getDiceColor(i) {
         return selectedDices[i] ? "#4EA034" : "white" 

     }

    function getDicePointsColor(i) {
        return selectedDicePoints[i] ? '#4EA034' : 'white'
    }

    // Selecting dice and setting it true if selected

    const selectDice = (i) => {
        if (nbrOfThrowsLeft < 3) {
            let dices = [...selectedDices]
            dices[i] = selectedDices[i] ? false : true
            setSelectedDices(dices)
    } 
    }

    // Throwing dice and give a random number between 1-6 and also checks if player have played whole round (round = 6 turns) and if have played then showing alert and ask 
    // if player want's to play another, if yes then new game starts and if not it goes to 'Home' screen.

    const throwDices = () => {
        if (turn < 6 ) {
            if (nbrOfThrowsLeft > 0) {
            let spots = [...diceSpots]
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1)
                    spots[i] = randomNumber
                    board[i] = 'dice-' + randomNumber
                }
            }
            setDiceSpots(spots)
            setNbrOfThrowsLeft(nbrOfThrowsLeft -1)
        } else {
            Alert.alert('You have to select number first')
        }
    } else {
        Alert.alert('Maybe another game?', '', [
            {
                text: 'Play',
                onPress: () => newGame()
            },
            {    text: 'No',
                onPress: () => {
                    navigation.navigate('Home');
                    newGame();
                    console.log(playerName);
                }
        }
        ])
    }
}


    // newGame const updatesScores for saving data to device and set all states to beginning so game can start all over again

    const newGame = async () => {

        const updateScores = async () => {
            try {
                const currentScores = await AsyncStorage.getItem('scores')
                let currentScorePoints = []
                if (currentScores) {
                    currentScorePoints = JSON.parse(currentScores)
                }
                const newScore = {playerName, score: gamePointsTotal, date: new Date().toISOString()}
                currentScorePoints.push(newScore)

                await AsyncStorage.setItem('scores', JSON.stringify(currentScorePoints))
                console.log('Updatescores updated');
            } catch (error) {
                console.log('newGame: ', error);
            }
        }
        await updateScores()

        setTurn(0)
        setNbrOfThrowsLeft(NBR_OF_THROWS)
    
        setToBonus(63)
 
        setStatus('Throw dices')
        setGameEndStatus(false)
        
        setScores([])
        setGamePointsTotal(0)

        setSelectedDices(new Array(NBR_OF_DICES).fill(false))
        setDiceSpots(new Array(NBR_OF_DICES).fill(0))
    
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false))
        setDicePointsTotal(new Array(MAX_SPOT).fill(0))


    }


    function getSpotTotal(i) {
        return dicePointsTotal[i]
    }

    // This section is handling selecting dices and set points to states. It also checks if player have reached bonus point limit. Also setting statuses for different situations
    // like when player have to chose dicepoints or guiding to keep throwing.

    const selectDicePoints = (i) => {
        if (nbrOfThrowsLeft === 0) {
            let selected = [...selectedDices]
            let selectedPoints = [...selectedDicePoints]
            let points = [...dicePointsTotal]
            if (!selectedPoints[i]) {
                selectedPoints[i] = true
                let nbrOfDices = 
                    diceSpots.reduce(
                    (total, x) => (x === (i + 1) ? total + 1 : total), 0)
                points [i] = nbrOfDices * (i + 1)
                const sum = points.reduce((partialSum, a) => partialSum + a, 0)
                const bonusPointsTotal = 63
                const bonusPoints = bonusPointsTotal - sum
                setGamePointsTotal(sum)
                setDicePointsTotal(points)
                setSelectedDicePoints(selectedPoints)
                setNbrOfThrowsLeft(NBR_OF_THROWS)
                setTurn(turn + 1)
                setSelectedDices(new Array(NBR_OF_DICES).fill(false))
                setNbrOfThrowsLeft(NBR_OF_THROWS)
                setToBonus(bonusPoints)
                if (bonusPoints <= 0) {
                    setGamePointsTotal(sum + 50)
                }
                return points[i]
            } 
            else {
                setStatus('You already selected points for ' + (i + 1))
        }
        } else {
            setStatus('Throw ' + NBR_OF_THROWS + ' times before setting points')
        }
        }

    // creates an array which is filled with icons and calling selectDice function to set dice.

    const row = []
    for (let dice = 0; dice < NBR_OF_DICES; dice++) {
        row.push(
            <Col key={"dice" + dice}>
            <Pressable
            key={"dice" + dice}
            onPress={() => selectDice(dice)}>
                <MaterialCommunityIcons
                    name={board[dice]}
                    key={"dice" + dice}
                    size={35}
                    color={getDiceColor(dice)}
                    >
                </MaterialCommunityIcons>
            </Pressable>
            </Col>
        )
    }

    // creates an array which is filled with icons and calling selectDicePoints function to set dicepoints.

    const pointsToSelectRow = []
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        pointsToSelectRow.push(
            <Col key={"buttonsRow" + diceButton}>
                <Pressable
                key={"buttonsRow" + diceButton}
                onPress={() => selectDicePoints(diceButton)}
                >
            <MaterialCommunityIcons
                name={"numeric-" + (diceButton + 1) + "-circle"}
                key={"buttonsRow" + diceButton}
                size={35}
                color={getDicePointsColor(diceButton)}
                >
                </MaterialCommunityIcons>
            </Pressable>
            </Col>
        )
    }

    // creates an array which is filled with icons and setting points of chosen dicepoints.

    const pointsRow = []
    for (let spot = 0; spot < MAX_SPOT;spot++)
        pointsRow.push(
            <Col key={"pointsRow" + spot}>
                <Text key={"pointsRow" + spot}>{getSpotTotal(spot)}</Text>
            </Col>
            )
 

    //returning total points, showing how much still to get bonus points and showing status and how many throws left. Also showing icons of dices and dicepoints. Changing button
    // from 'throw dices' to 'new game' with ternary operator.

    return (
        <>
        <Header />
        <View style={style.gameboardcontainer}>
        <Text style={style.pointsStyle}>Total Points: {gamePointsTotal}</Text>
            {toBonus <= 0
            ? <Text style={style.bonusPoints}>You get bonus points!</Text>
            : <Text style={style.bonusPoints}>Points to bonus points: {toBonus}</Text>
            }
            <Text style={[style.homeText, {paddingBottom: 20}]}>Throws Left: {nbrOfThrowsLeft}</Text>
            <Text style={[style.homeText, {paddingBottom: 20}]}>{status}</Text>
            <Container style={style.diceStyle}>
                <Row>{row}</Row>
            </Container>
            <Container>
                <Row style={[style.pointNumber, {paddingLeft: 15}]}>{pointsRow}</Row>
            </Container>
            <Container>
                <Row style={style.pointNumber}>{pointsToSelectRow}</Row>
            </Container>
            <Pressable
            onPress={() => throwDices()}
            style={[style.buttonText, style.button, {marginHorizontal: 100, paddingTop: 20}]}>
                { turn === 6
                ? <Text style={style.buttonText}>New game/end game</Text>
                : <Text style={style.buttonText}>THROW DICES</Text>
                } 
            </Pressable>
            <Text style={style.playerStyle}>Player: {playerName}</Text>
        </View>
        <Footer/>
        </>
        
    )
} 
