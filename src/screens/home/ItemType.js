 import React from 'react'
 import {Image, StyleSheet, Text, View } from 'react-native'
 
 export default function itemType({image,type}) {
     return (
         <View style={styles.container}>
             <Image source={image} style={styles.icon} />
             <Text>{type}</Text>
         </View>
     )
 }
 
 const styles = StyleSheet.create({
     container : {
        backgroundColor:'#F1F2F6',
        padding:20,

     },
     icon: {
         width :50,
         height: 50,
        //  justifyContent :'space-between',
         
   
     }
 })
 