import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, StyleSheet,SafeAreaView, View ,Image } from 'react-native';
import SearchBar from './src/components/SearchBar';
import ItemType from './src/screens/home/ItemType';

const type = [
  {
    type : 'Dinner',
    image: require('./src/assets/images/dinner.png'),
  },
  {
    type : 'Lunch',
    image: require('./src/assets/images/lunch.png'),
  },
  {
    type : 'Breakfast',
    image: require('./src/assets/images/breakfast.png'),
  },
  {
    type : 'Dessert',
    image: require('./src/assets/images/dessert.png'),
  },
];

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container} >
       <View style={styles.wrap}>
        <View style={styles.header}>

            <View style={styles.headerTitle}>
                <Text style={styles.heading}> What do you have a taste for ?</Text>
                <Text style={styles.description}>1240 Restaurant Availabe</Text>
            </View>
            
            <View style={styles.headerCart}>
              <View style={styles.buttonCart}>
                    <Image style={styles.img} source={require('./src/assets/images/icon.png')} /> 
                    <Text style={styles.numCart}>2</Text>
              </View>
            </View>

        </View>  

          <SearchBar />

          <View style={styles.listItemType}>
            {type.map((item) => {
              return <ItemType {...item} />;
            })}
            
        
          </View>

        
          </View>  

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    flex:1,
    padding:14,
  },
  headerTitle : {
  width: '55%',
  },
  headerCart : {
    marginLeft: 60,
  },
  heading : {
    fontSize : 25 ,
    // fontFamily: 'CeraPro-Bold',
    fontWeight: 'bold',
    lineHeight: 30,
   
  },
  description :{
    color : 'gray',
    marginTop: 10,
  },
  buttonCart : {
    backgroundColor : '#F7CB6B',
    padding: 12,
    flexDirection : 'row',
    borderRadius : 15,
    shadowOpacity :0.4,
    shadowColor : '#F7CB6B',
    shadowRadius :2,
    marginTop :15,

  },
  img : {
  width: 23 ,
  height:30,
 
   
  },
 
  header : {
    flexDirection: 'row',
    padding : 16,
    justifyContent: 'space-between',
  },
  numCart : {
    color : '#FFF',
    paddingLeft: 10,
  },
  listItemType : {
    flexDirection : 'row',
  },
 

});

export default App 
 