import { createStackNavigator } from "@react-navigation/stack"
import Login from "../app/screens/Login";
import { NavigationContainer } from "@react-navigation/native";


const Stack = createStackNavigator();

export default function RootRoutes(){
    return (
        <NavigationContainer>
            <Stack.Navigator id = {undefined} >
                <Stack.Screen
                     name = "Login"
                     component= {Login}
                     options={{headerShown: false}}
                     />
            </Stack.Navigator>
        </NavigationContainer>
    )
}