import React from "react";
import { TextInput, View, StyleSheet, Image, TouchableOpacity, Text, Pressable, KeyboardAvoidingView,Platform} from "react-native";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { LoginCall } from "../../functions/api/loginCall";

type StackParamList = {
    Login: undefined;
    PostList: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<StackParamList, 'Login'>;

export default function Login() {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    return (
        <LinearGradient 
            colors={["#fdb5a5", "#fe9a8b", "#ff7f7f"]} // Gradiente suave
            locations={[0, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={styles.keyboardView}
            >
                <View style={styles.card}>
                    <Formik 
                        initialValues={{ username: '', password: '' }}
                        onSubmit={async (values) => {
                            try {
                                const response = await LoginCall(values.username, values.password);
                                if(response.status === 200){
                                    navigation.navigate("PostList");
                                } else {
                                    console.log('Erro ao fazer login');
                                }
                            } catch (error) {
                                console.error('Erro ao fazer login: ', error);
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <View style={styles.content}>
                                <Image 
                                    style={styles.image} 
                                    source={require('../../assets/images/Books.png')} 
                                />

                                <Text style={styles.title}>Bem-vindo de volta!</Text>

                                <View style={styles.inputContainer}>
                                    <TextInput 
                                        style={styles.input}
                                        value={values.username}
                                        onChangeText={handleChange('username')}
                                        onBlur={handleBlur('username')}
                                        placeholder="Usuário"
                                        placeholderTextColor="#888"
                                    />
                                    
                                    <TextInput 
                                        style={styles.input}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        placeholder="Senha"
                                        placeholderTextColor="#888"
                                        secureTextEntry
                                    />
                                </View>

                                <Pressable 
                                    style={({ pressed }) => [
                                        styles.button, 
                                        pressed && styles.buttonPressed
                                    ]}
                                    onPress={() => handleSubmit()}
                                >
                                    <Text style={styles.buttonText}>Entrar</Text>
                                </Pressable>
                            </View>
                        )}
                    </Formik>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    keyboardView: {
        width: "100%",
        alignItems: "center",
    },
    card: {
        width: '90%',
        minHeight: 500,  // Card um pouco menor para melhor proporção
        maxHeight: 600,
        padding: 30,
        backgroundColor: "rgba(255, 255, 255, 0.95)", 
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.22,
        shadowRadius: 8,
        elevation: 8, 
    },
    content: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        gap: 5, // Reduzi o espaçamento para aproximar mais os inputs
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: "contain",
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#444",
        marginBottom: 15,
    },
    inputContainer: {
        width: "100%",
        alignItems: "center",
    },
    input: {
        width: "100%", 
        height: 48,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        backgroundColor: "#fff",
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 8, // Diminui o espaçamento entre os inputs
    },
    button: {
        width: "100%",
        backgroundColor: "#767fa7",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 5, // Aproxima ainda mais o botão dos inputs
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    buttonPressed: {
        transform: [{ scale: 0.98 }], // Efeito de clique
        opacity: 0.9,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
