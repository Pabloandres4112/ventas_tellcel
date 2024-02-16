import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as SecureStore from "expo-secure-store";

const DashboardScreen = ({navigation}) => {
  useEffect(() => {
    const loguear = async () => {
      const logueo = await SecureStore.getItemAsync("logueo");
      if (logueo === "true") {
        navigation.navigate("Home");
      }
    };
    loguear();
  }, []); // Agregado el arreglo de dependencias vacío

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welhome Tellcel </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Register</Text>
    </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex:  1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:  10,
    backgroundColor: '#F4EBC3',
  },
  title: {
    fontSize:  20,
    marginBottom:  20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#C5CEAE',
    padding:  10,
    marginTop:  15,
    borderRadius:  17,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  });
  export default DashboardScreen