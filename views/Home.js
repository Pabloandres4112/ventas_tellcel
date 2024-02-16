import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity} from "react-native";
import * as SecureStore from "expo-secure-store";

const Home = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [samsung, setSamsung] = useState(0);
  const [motorola, setMotorola] = useState(0);
  const [huawei, setHuawei] = useState(0);


  const handleVenta = async () => {
    try {
      // Verificar si todos los campos están vacíos
      if (!samsung && !motorola && !huawei) {
        alert("Por favor, complete algún campo de cantidad.");
      } else {
        // Guardar cada total individualmente
        if (Number.isInteger(parseInt(samsung))) {
          SecureStore.setItemAsync("totalSa", String(parseInt(samsung)));
        }
        if (Number.isInteger(parseInt(motorola))) {
          SecureStore.setItemAsync("totalMo", String(parseInt(motorola)));
        }
        if (Number.isInteger(parseInt(huawei))) {
          SecureStore.setItemAsync("totalHu", String(parseInt(huawei)));
        }

        navigation.navigate("Factura");
      }
    } catch (error) {
      alert("Error al vender: ", error);
    }
  };

  const cerrarSesion = async () => {
    try {
      await SecureStore.setItemAsync("logueo", "false");
      alert("Has cerrado sesión");
      navigation.navigate("Login");
    } catch (error) {
      alert("Error al vender: ", error);
    }
  };

  useEffect(() => {
    const dato = async () => {
      try {
        const nombre = await SecureStore.getItemAsync("nombre");
        if (nombre !== null) {
          setNombre(nombre);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    dato();
  }, []);

  return (
    <View style={{ padding: 30 }}>
      <View style={{display:"flex"}}>
        <TouchableOpacity onPress={cerrarSesion} style={styles.buttonCerrar}>
          <Text style={{ textAlign: "center", color: "white" }}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 24, paddingLeft: 20, textAlign: "center", marginTop: 90 }}>Venta de equipos Moviles Tellcel</Text>
      <Text style={{ fontSize: 20, marginHorizontal: 20, textAlign: "center" }}>Bienvenido {nombre}</Text>
      <View style={styles.container}>
        <View style={styles.productContainer}>
          <Image
            style={styles.productImage}
            source={require("../assets/Motorola.webp")}>
          </Image>
          <Text>Samsung</Text>
          <Text>600.000</Text>
          <TextInput
            placeholder="Cantidad"
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => {
              const contar = text ? parseInt(text) : 0;
              setSamsung(contar);
            }}
            value={samsung.toString()}
          ></TextInput>
        </View>
        <View style={styles.productContainer}>
          <Image
            style={styles.productImage}
            source={require("../assets/Sansug.webp")}
          ></Image>
          <Text>Motorola</Text>
          <Text>500.000</Text>
          <TextInput
            placeholder="Cantidad"
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => {
              const contar = text ? parseInt(text) : 0;
              setMotorola(contar);
            }}
            value={motorola.toString()}
          ></TextInput>
        </View>
        <View style={styles.productContainer}>
          <Image
            style={styles.productImage}
            source={require("../assets/heawei.webp")}
          ></Image>
          <Text>Huawei</Text>
          <Text>400.000</Text>
          <TextInput
            placeholder="Cantidad"
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => {
              const contar = text ? parseInt(text) : 0;
              setHuawei(contar);
            }}
            value={huawei.toString()}
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity onPress={handleVenta} style={styles.button}>
        <Text style={styles.buttonText}>Vender</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 40,
  },
  productContainer: {
    width: "28%",
    marginVertical: 10,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#BCA297",
    borderWidth: 1,
    paddingHorizontal: 9,
    borderRadius: 10,
    backgroundColor: "#F4EBC3",
  },
  button: {
    backgroundColor: "#C5CEAE",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 90,
  },
  buttonCerrar: {
    backgroundColor: "#C5CEAE",
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 30,
    marginLeft: 230
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  linkText: {
    color: "#3282F6",
  },
});

export default Home;
