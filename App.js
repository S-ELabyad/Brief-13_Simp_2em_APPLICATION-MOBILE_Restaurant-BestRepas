/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState , useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SearchBar from './src/components/SearchBar';
import BottomBar from './src/screens/home/BottomBar';
import ItemType from './src/screens/home/ItemType';
import RestaurantItem from './src/screens/home/RestaurantItem';
import ModalOrder from './src/screens/order/ModalOrder';

const types = [
  {
    id:1,
    type: 'Dinner',
    image: require('./src/assets/images/dinner.png'),
  },
  {
    id:2,
    type: 'Lunch',
    image: require('./src/assets/images/lunch.png'),
  },
  {
    id:3,
    type: 'Breakfast',
    image: require('./src/assets/images/breakfast.png'),
  },
  {
    id:4,
    type: 'Dessert',
    image: require('./src/assets/images/dessert.png'),
  },
];

const listRestaurants = [
  {
    background: require('./src/assets/images/bread.png'),
    miles: 10,
    name: `Noah's Bagel`,
    type: 'Lunch',
    country: 'American',
    currency: '$',
    smile: 97,
  },
  {
    background: require('./src/assets/images/pho.png'),
    miles: 10,
    name: `Pho Saigon`,
    type: 'Lunch',
    country: 'VietNam',
    currency: 'VND',
    smile: 97,
  },
];

const App = () => {
  const [isOrder, setIsOrder] = useState(false);
  const onPressItem = () => setIsOrder(true);
  const renderRestaurant = ({item}) => {
    return (
    <RestaurantItem 
    Type={types.find(x=>x.id==IdSelected)} 
    data={item} 
    onPress={onPressItem} />
    );
  };
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false)
  const [IdSelected , setIdSelected] = useState(1);
  const onClose = () => setIsOrder(false);
  const onSelected = (id) => {
    // alert('id' + id);
    setIdSelected(id);
   
  };
  useEffect(() => {
    _fectListFood() ;
   
  }, [IdSelected]);
  const _fectListFood = async() => {
try {
  setloading(true);
  setData([]);
  const res = await fetch('https://api-appfood.herokuapp.com/v1/foods?type=' + IdSelected, {
     method : 'GET',
     headers : {
       'Content-Type' : 'application/json',
     },
  },
  );
   const data = await res.json();
   if(data.status==1) {
     setData(data.data);
   }
 
} catch (error) {
  console.log(error);
} finally {
  setloading(false);
}
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <Text style={styles.heading}>What do you have a taste for?</Text>
              <Text style={styles.description}>1240 Restaurants availabe</Text>
            </View>

            <View style={styles.headerCart}>
              <View style={styles.buttonCart}>
                <Image source={require('./src/assets/images/cart.png')} />
                <Text style={styles.numCart}>2</Text>
              </View>
            </View>
          </View>
          <SearchBar />
          <View style={styles.listItemType}>
            {types.map((item, index) => {
              return <ItemType 
              onSelected={onSelected} 
              selected={item.id == IdSelected} 
              {...item} />;
            })}
          </View>
          <View style={styles.listRestaurant}>
            <Text style={styles.listRestaurantText}>
              Lunch Restaurants Near You
            </Text>
            <View style={styles.listRes}>
              {/* {data.map(renderRestaurant)} */}
              <FlatList 
                data = {data}
                extraData = {data}
                renderItem = {renderRestaurant}
              />
              {loading && 
                <View style={styles.loading}> 
                    <ActivityIndicator size="large" color="#59B7C9" /> 
              </View>
              }
            </View>
          </View>
        </ScrollView>
        <BottomBar />
      </SafeAreaView>
      {isOrder &&
       <ModalOrder onClose={onClose} isShow={isOrder} />}
    </>
  );
};

const styles = StyleSheet.create({
  listRestaurantText: {
    fontFamily: 'CeraPro-Medium',
    fontSize: 18,
  },
  container: {
    flex: 1,
  },
  wrap: {
    flex: 1,
    padding: 14,
  },
  headerTitle: {
    width: '55%',
  },
  headerCart: {},
  heading: {
    fontSize: 25,
    fontFamily: 'CeraPro-Bold',
    lineHeight: 30,
  },
  description: {
    fontFamily: 'CeraPro-Medium',
    color: 'gray',
    marginTop: 10,
  },
  buttonCart: {
    backgroundColor: '#F7CB6B',
    padding: 12,
    flexDirection: 'row',
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowColor: '#F7CB6B',
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  numCart: {
    fontFamily: 'CeraPro-Medium',
    color: '#FFF',
    paddingLeft: 10,
  },
  listItemType: {
    flexDirection: 'row',
  },
  listRes: {
    marginBottom: 15,
  },

  listRestaurant: {
    marginTop: 10,
  },
  loading : {
    height : 300,
    width:'100%' ,
    justifyContent : 'center',
    alignItems : 'center',
  },
});

export default App;