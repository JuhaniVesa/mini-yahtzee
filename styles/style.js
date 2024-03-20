import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  infoIcon: {
    alignItems: 'center'
  },
  homeText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'monospace'
  },
  homeTextInput: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 50,
    marginVertical: 20,
    fontFamily: 'monospace'
  },
  container: {
    backgroundColor: '#f74141b7',
    flex: 1
  },
  gameboardcontainer: {
    backgroundColor: '#f74141b7',
    flex: 1,
    paddingTop: 15
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginHorizontal: 180,
  },
  buttonText: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10
  },
  ButtonElevation: {
    shadowColor: '#52006A',
    elevation: 5
  },
  diceStyle: {
    paddingBottom: 40,
  },
  pointNumber: {
    justifyContent: 'space-evenly',
    fontFamily: 'monospace',
    fontSize: 16,
    paddingBottom: 4
  },
  playerStyle: {
    flex: 1,
    textAlignVertical: 'bottom',
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 18,
    paddingBottom: 5
  },
  pointsStyle: {
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 20,
    fontWeight: 'bold',

  },
  bonusPoints: {
    fontFamily: 'monospace',
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 30,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'monospace'
  },
  footer: {
    marginTop: 0,
    backgroundColor: '#4EA034',
    flexDirection: 'row'
  },
  header: {
    marginTop: 30,
    marginBottom: 0,
    backgroundColor: '#4EA034',
    flexDirection: 'row',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'monospace'
  },

  scoreboardBox: {
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: '#4EA034',
    marginBottom: 10,
    padding: 5,
    width: '90%',
    alignItems: 'flex-start',
    marginLeft: 20,
    borderColor: '#f74141b7'
  },
  scoreboardBoxPlace: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  scoreboardBoxPlaceText: {
    fontFamily: 'monospace',
    color: 'white',
    fontSize: 24,
    textAlignVertical: 'center',
    paddingRight: 20,
    paddingLeft: 5
  },
  scoreboardBoxDetails: {
    flexDirection: 'column'
  },
  scoreboardText: {
    color: 'white',
    fontFamily: 'monospace',
    fontSize: 16
  }
});