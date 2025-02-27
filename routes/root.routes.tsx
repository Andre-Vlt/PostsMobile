import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useEffect, useState } from "react";


import Login from "../app/screens/Login";
import PostList from "../app/screens/PostList";
import CreatePost from "../app/screens/CriarPost";
import EditarPost from "../app/screens/EditarPost";
import LerPost from "../app/screens/LerPost";
import CreateStudent from "../app/screens/CriarAluno";
import CreateTeacher from "../app/screens/CriarProfessor";
import { ValidaProfessor } from "../functions/auxiliares/validaProfessor";
import TeacherList from "../app/screens/ListarProfessores";
import StudentList from "../app/screens/ListarAlunos";
import EditarAluno from "../app/screens/EditarAluno";
import EditarProfessor from "../app/screens/EditarProfessor";

type StackParamList = {
    Login: undefined;
    PostList: undefined;
    CreatePost: undefined;
    EditarPost: undefined;
    LerPost: undefined;
    PostListDrawer: undefined;
    EditarAluno: { student: any };
    EditarProfessor: { teacher: any };
};

const Stack = createStackNavigator<StackParamList>();
const Drawer = createDrawerNavigator();

function PostListStack() {
    return (
        <Stack.Navigator id={undefined}>
            <Stack.Screen 
                name="PostList"
                component={PostList}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="LerPost" component={LerPost} options={{ headerShown: false }} />
            <Stack.Screen name="EditarPost" component={EditarPost} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function PostListDrawer() {
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
        const loadVisible = async () => {
            try 
            {
                const isTeacher = await ValidaProfessor();
                setVisible(isTeacher);
            }
            catch (error)
            {
                console.error(error);
            }
        };
        loadVisible();
    }, []);

    return (
        <Drawer.Navigator 
            id={undefined}
            screenOptions={{ headerShown: false }}
            >
            <Drawer.Screen
                name="PostList"
                component={PostListStack}
                />
            <Drawer.Screen name="CreateStudent" component={CreateStudent} />
            <Drawer.Screen name="StudentList" component={StudentList} />

            {visible && (
                <Drawer.Screen 
                    name="CreatePost"
                    component={CreatePost}
                    /> 
                )}
            {visible && (
                <Drawer.Screen
                    name="CreateTeacher"
                    component={CreateTeacher}
                    />
                )}
            {visible && (
                <Drawer.Screen
                    name="TeacherList"
                    component={TeacherList}
                    />
            )}
        </Drawer.Navigator>
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
                <Stack.Screen name="EditarAluno" component={EditarAluno} options={{ headerShown: false }} />
                <Stack.Screen name="EditarProfessor" component={EditarProfessor} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}