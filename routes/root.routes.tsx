import { createStackNavigator } from "@react-navigation/stack"
import Login from "../app/screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import PostList from "../app/screens/PostList";

type StackParamList = {
    Login: undefined;
    PostList: undefined;
}

const Stack = createStackNavigator<StackParamList>();

export default function RootRoutes(){
    return (
        <NavigationContainer>
            <Stack.Navigator id = {undefined} >
                <Stack.Screen
                     name = "Login"
                     component= {Login}
                     options={{headerShown: false}}
                     />
                <Stack.Screen
                    name = "PostList"
                    component = {PostList}
                    options={{headerShown: false}}
                    />
            </Stack.Navigator>
        </NavigationContainer>
    )
}