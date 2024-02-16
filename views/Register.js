import React, { useContext, useState } from "react";
import {View,TextInput,Alert,Text,TouchableOpacity,StyleSheet,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [username, setUsername] = useState("");
  const [fecha, setfecha] = useState("");

  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);

  const mirarClave = () => {
    setIsPassword(!isPassword);
  };



  const registrarUser = async () => {
    if (
      username !== "" &&
      password !== "" &&
      username !== "" &&
      password !== "" &&
      fecha !== ""
    ) {
      try {
        await SecureStore.setItemAsync("nombre", nombre);
        await SecureStore.setItemAsync("telefono", telefono);
        await SecureStore.setItemAsync("user", username);
        await SecureStore.setItemAsync("clave", password);
        await SecureStore.setItemAsync("fecha", fecha);
        await SecureStore.setItemAsync("logueo", "false"); // Corregido el uso de toString
        alert("Usuario Registrado con éxito");
        navigation.navigate("Login");
      } catch (error) {
        console.error("Error al registrar", error);
      }
    } else {
      Alert.alert(
        "Error",
        "Por favor, ingresa tu nombre, telefono, username, su password y fecha."
      );
    }
  };

  const dateFecha = (text) => {
    const regex = /^\d*$/;
    if (regex.test(text)) {
      setfecha(text);
    }
  };

  const noPuntosniComas = (text) => {
    const regex = /^[-/]*$/;
    if (regex.test(text)) {
      setTelefono(text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrate</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        onChangeText={(text) => setNombre(text)}
        value={nombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefono"
        keyboardType="numeric"
        onChangeText={setTelefono}
        value={telefono}
      />
      <TextInput
        style={styles.input}
        placeholder="username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <View style={styles.inputpassword}>
        <TextInput
          placeholder="Clave"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!isPassword}
        />
        <TouchableOpacity onPress={mirarClave}>
          <MaterialCommunityIcons name={isPassword ? "eye-off" : "eye"} />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Año"
        keyboardType="numbers-and-punctuation"
        onChangeText={dateFecha}
        value={fecha}
      />
      
      <TouchableOpacity onPress={registrarUser} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        No tienes una cuenta?
        <Text
          onPress={() => navigation.navigate("Login")}
          style={styles.linkText}
        >
          Iniciar sesión
        </Text>
      </Text>
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
  inputpassword: {
    height: 40,
    width: "100%",
    borderColor: "#97B2CA",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#ECF0F1",
    flexDirection: "row",
    justifyContent: "space-between",
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

export default RegisterScreen;
