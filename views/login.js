import React, { useContext, useEffect, useState } from "react";
import {View,Text,TextInput,StyleSheet,Alert,TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);

  const mirarPassword = () => {
    setIsPassword(!isPassword);
  };

  const validateAndLogin = async () => {
    if (username && password) {
      try {
        const storedUsername = await SecureStore.getItemAsync("user");
        const storedPassword = await SecureStore.getItemAsync("clave");
        SecureStore.setItemAsync("logueo", "true");
        // Si no hay usuario guardado en el dispositivo o si no
        if (username === storedUsername && password === storedPassword) {
          Alert.alert("Inicio de sesión exitoso");
          navigation.navigate("Home");
        } else {
          Alert.alert("Usuario o clave incorrectos");
        }
      } catch (error) {
        console.error("Error al validar la sesión", error);
        Alert.alert("Error al validar la sesión");
      }
    } else {
      Alert.alert("Por favor, ingresa tu usuario y clave");
    }
  };

  useEffect(() => {
    const loguear = SecureStore.getItemAsync("logueo");
    if (loguear === "true") {
      navigation.navigate("Home");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <View style={styles.inputpassword}>
        <TextInput
          placeholder="Clave"
          secureTextEntry={!isPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={mirarPassword}>
          <MaterialCommunityIcons
            name={isPassword ? "eye-off" : "eye"}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={validateAndLogin} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        No tienes una cuenta? -
        <Text
          onPress={() => navigation.navigate("Register")}
          style={styles.linkText}
        >
          Registrate
        </Text>
      </Text>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F4EBC3",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#2C3E50",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#97B2CA",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#ECF0F1",
  },
  inputpassword :{
    height: 45,
    width: "100%",
    borderColor: "#97B2CA",
    borderWidth: 1,
    marginBottom: 11,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#ECF0F1",
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#C5CEAE",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
  },
  linkText: {
    color: "#3282F6",
  },
});

export default Login;
