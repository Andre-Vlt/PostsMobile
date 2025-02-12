import { TextInput, View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { Formik } from "formik";
import { useState } from "react";
import { LoginCall } from "../../functions/api/loginCall";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type StackParamList = {
    Login: undefined;
    PostList: undefined;
}

type LoginScreenNavigationProp = StackNavigationProp<StackParamList, 'Login'>;

export default function Login() {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [isTeacher, setIsTeacher] = useState(false);
    const [visibility, setVisibility] = useState(false);
    return(
    <Formik 
        initialValues={{username: '', password: ''}}
        onSubmit=
        {
            async (values) =>
            {
                try
                {
                    const response = await LoginCall(values.username, values.password);
                    if(response.status === 200){
                        navigation.navigate("PostList");
                    }
                    else{
                        console.log('Erro ao fazer login');
                    }
                }
                catch(error)
                {
                    console.error('Erro ao fazer login: ',error);
                }
            }
        }
    >
        {({handleChange, handleBlur, handleSubmit, values}) =>(
            <View style={styles.container}>
                <Image style = {styles.image} source={require('../../assets/images/Books.png')} />
                <TextInput style={styles.input}
                    value={values.username}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    placeholder="Usuário"
                />
                <TextInput style={styles.input}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder="Senha"
                />
                <TouchableOpacity 
                    style= {styles.button}
                    onPress={ () => handleSubmit()}
                >
                    <Text style = {styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        )}
    </Formik>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fe9a8b'
    },
    input: {
        width: '80%',
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 10
    },
    image: {
        width: 300,
        height: 220,
        marginBottom: 20
    },
    button: {
        width: '80%',
        backgroundColor: '#767fa7',
        padding: 10,
        borderRadius: 7,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
    }
})