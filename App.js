import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./views/Home.js";
import Register from "./views/Register.js";
import Login from "./views/login.js";
import Facture from "./views/Facture.js";
import Dashboard from "./views/Dashboard.js";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          component={Dashboard} 
          options={{ title: "Tellcel" }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "", headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Factura"
          component={Facture}
          options={{ title: "Facture" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
