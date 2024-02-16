import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

const Facture = () => {
  const [samsung, setSamsung] = useState(0);
  const [motorola, setMotorola] = useState(0);
  const [huawei, setHuawei] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const samsungTotal = await SecureStore.getItemAsync("totalSa");
        const motorolaTotal = await SecureStore.getItemAsync("totalMo");
        const huaweiTotal = await SecureStore.getItemAsync("totalHu");

        if (samsungTotal !== null) setSamsung(parseInt(samsungTotal));
        if (motorolaTotal !== null) setMotorola(parseInt(motorolaTotal));
        if (huaweiTotal !== null) setHuawei(parseInt(huaweiTotal));

        let sumaTotal =   0;

        if (samsungTotal >   10) {
          sumaTotal += Math.round(samsungTotal *   600000 *   0.95);
        } else {
          sumaTotal += samsungTotal *   600000;
        }
        
        if (motorolaTotal >   10) {
          sumaTotal += Math.round(motorolaTotal *   500000 *   0.95);
        } else {
          sumaTotal += motorolaTotal *   500000;
        }
        
        if (huaweiTotal >   10) {
          sumaTotal += Math.round(huaweiTotal *   400000 *   0.95);
        } else {
          sumaTotal += huaweiTotal *   400000;
        }
        
        // setTotal(sumaTotal);
        
      } catch (error) {
        console.error("Error al cargar los datos", error);
      }
    };

    loadData();
  }, []);

  function determinarMayor() {
    let mayor = "";
    const marcas = {
      samsung,
      motorola,
      huawei,
    };
    const ordenar = Object.keys(marcas).sort((a, b) => marcas[b] - marcas[a]);
    const totalMax = marcas[ordenar[0]];
    const marcaMax = ordenar.filter((marca) => marcas[marca] === totalMax);

    if (marcaMax.length === 1) {
      mayor = marcaMax[0];
    } else if (marcaMax.length === 2) {
      mayor = `${marcaMax[0]} y ${marcaMax[1]} Empate`;
    } else {
      mayor = "Empate los  3";
    }
    return mayor;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 28 }}>¡Gracias por su compra!</Text>
      <Text style={{ fontSize: 15 }}>Total de celulares vendidos por marca:</Text>

      {/* celulares */}

      <Text>Samsung: {samsung ? samsung : 0}</Text>
      <Text>Motorola: {motorola ? motorola : 0}</Text>
      <Text>Huawei: {huawei ? huawei : 0}</Text>

      {/* precios y si es mayor a 10 */}

      <Text style={{ fontSize: 15 }}>Valor  por marca:</Text>
      <Text>Samsung: ${samsung > 10 ? ((samsung * 600000) * 0.95).toLocaleString("es-ES") + (" Descuento de 5%"): (samsung * 600000).toLocaleString("es-ES")}</Text>
      <Text>Motorola: ${motorola > 10 ? ((motorola * 500000) * 0.95).toLocaleString("es-ES") + (" Descuento de 5%") : (motorola * 500000).toLocaleString("es-ES")}</Text>
      <Text>Huawei: ${huawei > 10 ? ((huawei * 400000) * 0.95).toLocaleString("es-ES") + (" Descuento de 5%") : (huawei * 400000).toLocaleString("es-ES")}</Text>
      
      {/* cuel se vendio mas estos momentos */}
      <Text>
        el celuler más vendidos es :
        {determinarMayor(samsung, motorola, huawei)}
      </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 13,
    gap: 7,
  },
});

export default Facture;
