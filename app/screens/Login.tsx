import { Button, TextInput, View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { Formik } from "formik";
import { useState } from "react";

export default function Login() {

    return(
    <Formik 
        initialValues={{username: '', password: ''}}
        onSubmit={(values) => console.log(values)}
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
                    onPress={ () => handleSubmit}
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