import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { ValidaProfessor } from "../functions/auxiliares/validaProfessor";

import Login from "../app/screens/Login";
import PostList from "../app/screens/PostList";
import CreatePost from "../app/screens/CriarPost";
import EditarPost from "../app/screens/EditarPost";
import LerPost from "../app/screens/LerPost";
import CreateStudent from "../app/screens/CriarAluno";
import CreateTeacher from "../app/screens/CriarProfessor";
import TeacherList from "../app/screens/ListarProfessores";
import StudentList from "../app/screens/ListarAlunos";
import EditarAluno from "../app/screens/EditarAluno";
import EditarProfessor from "../app/screens/EditarProfessor";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerItem({ label, onPress }) {
    const backgroundColor = useRef(new Animated.Value(0)).current;

    const handleHoverIn = () => {
        Animated.timing(backgroundColor, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleHoverOut = () => {
        Animated.timing(backgroundColor, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const interpolatedColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ["transparent", "#ff7f7f"],
    });

    return (
        <Pressable 
            onPress={onPress} 
            onHoverIn={handleHoverIn} 
            onHoverOut={handleHoverOut}
            style={styles.drawerItem}
        >
            <Animated.View style={[styles.drawerItem, { backgroundColor: interpolatedColor }]}> 
                <Text style={styles.drawerLabel}>{label}</Text>
            </Animated.View>
        </Pressable>
    );
}

function CustomDrawerContent(props) {
    return (
        <View style={styles.drawerContainer}>
            <Text style={styles.drawerTitle}>📌 Menu</Text>
            <DrawerContentScrollView {...props}>
                {props.state.routes.map((route, index) => (
                    <CustomDrawerItem 
                        key={index} 
                        label={route.name} 
                        onPress={() => props.navigation.navigate(route.name)} 
                    />
                ))}
            </DrawerContentScrollView>
        </View>
    );
}

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
            try {
                const isTeacher = await ValidaProfessor();
                setVisible(isTeacher);
            } catch (error) {
                console.error(error);
            }
        };
        loadVisible();
    }, []);

    return (
        <Drawer.Navigator id={undefined}
            screenOptions={{
                headerShown: false,
                drawerStyle: styles.drawerStyle,
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="📄 Conteúdo" component={PostListStack} />
            <Drawer.Screen name="👨‍🎓 Cadastrar Alunos" component={CreateStudent} />
            <Drawer.Screen name="📋 Listar Alunos" component={StudentList} />
            {visible && <Drawer.Screen name="📝 Criar Conteúdos" component={CreatePost} />} 
            {visible && <Drawer.Screen name="👨‍🏫 Cadastrar Professores" component={CreateTeacher} />} 
            {visible && <Drawer.Screen name="📜 Listar Professores" component={TeacherList} />} 
        </Drawer.Navigator>
    );
}

export default function RootRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator id={undefined}>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="PostListDrawer" component={PostListDrawer} options={{ headerShown: false }} />
                <Stack.Screen name="EditarAluno" component={EditarAluno} options={{ headerShown: false }} />
                <Stack.Screen name="EditarProfessor" component={EditarProfessor} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: "#fdb5a5",
        padding: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    drawerTitle: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#151f71",
        marginBottom: 20,
        textAlign: "center",
    },
    drawerStyle: {
        backgroundColor: "#fe9a8b",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    drawerLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#ffffff",
    },
    drawerItem: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
    },
});