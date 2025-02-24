import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "../app/screens/Login";
import PostList from "../app/screens/PostList";
import CreatePost from "../app/screens/CriarPost";
import EditarPost from "../app/screens/EditarPost";
import LerPost from "../app/screens/LerPost";
import CreateStudent from "../app/screens/CriarAluno";
import CreateTeacher from "../app/screens/CriarProfessor";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type StackParamList = {
  Login: undefined;
  PostList: undefined;
  CreatePost: undefined;
  EditarPost: undefined;
  LerPost: undefined;
  PostListDrawer: undefined;
};

const Stack = createStackNavigator<StackParamList>();
const Drawer = createDrawerNavigator();

function PostListStack() {
  return (
    <Stack.Navigator id={undefined}>
      <Stack.Screen name="PostList" component={PostList} options={{ headerShown: false }} />
      <Stack.Screen name="LerPost" component={LerPost} options={{ headerShown: false }} />
      <Stack.Screen name="EditarPost" component={EditarPost} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function PostListDrawer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const loadVisible = async () => {
      try {
        const isTeacher = await AsyncStorage.getItem('isTeacher');
        if (isTeacher === 'true') {
          setVisible(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadVisible();
  }, []);

  return (
    <Drawer.Navigator id={undefined}>
      <Drawer.Screen
        name="PostList"
        component={PostListStack}
        options={{ headerShown: false }}
      />
      {visible && (
        <Drawer.Screen
          name="CreatePost"
          component={CreatePost}
          options={{ headerShown: false }}
        />
      )}
      <Drawer.Screen name="CreateStudent" component={CreateStudent} />
      {visible && (
        <Drawer.Screen
          name="CreateTeacher"
          component={CreateTeacher}
          options={{ headerShown: false }}
        />
      )}
    </Drawer.Navigator>
  );
}
function AuthStack() {
  return (
    <Stack.Navigator id={undefined}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
export default function RootRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen
          name="PostListDrawer"
          component={PostListDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}