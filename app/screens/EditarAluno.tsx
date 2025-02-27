import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { updateStudent } from "../../functions/api/updateStudent";

type StackParamList={
    EditarAluno: {student:any};
};

export default function EditarAluno(){
    const route = useRoute<RouteProp<StackParamList, "EditarAluno">>();
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    const { student } = route.params;

    const [name, setName] = useState(student.student_name);
    const [grade, setGrade] = useState(student.grade);

    const handleUpdate = async(name, grade) =>{
        try
        {
            await updateStudent(student.id_person , grade, name);
            alert ("Aluno atualizado com sucesso");
            navigation.goBack();
        }
        catch(error){
            console.error("Erro ao atualizar aluno: ", error);
            alert("Erro ao atualizar aluno");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Editar Aluno</Text>
            <Formik
                initialValues={{nameValue: name, gradeValue: grade}}
                onSubmit={(values) =>{
                    handleUpdate(values.nameValue, values.gradeValue);
                }}
            >
                {({handleChange, handleBlur, handleSubmit, values})=>(
                    <View style={styles.fieldsContainer}>
                        <View style={styles.inputsContainer}>
                            <Text style={styles.text}>Nome</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={handleChange("nameValue")}
                                onBlur={handleBlur("nameValue")}
                                value={values.nameValue}
                            />
                            <Text style={styles.text}>Série</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={handleChange("gradeValue")}
                                onBlur={handleBlur("gradeValue")}
                                value={values.gradeValue}
                            />
                            <TouchableOpacity style = {styles.button} onPress={() => handleSubmit()}>
                                <Text style={styles.btnText}>Atualizar</Text>                            
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#fdb5a5'
    },
    fieldsContainer:{
        marginVertical: 30,
        width: '75%',
        backgroundColor: '#fef9f7',
        padding: 20,
        paddingTop:50,
        paddingBottom:50,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#151f71'
    },
    inputsContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#151f71',
    },
    textTitle:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#151f71',
    },
    button:{
        marginVertical: 20,
        width: '100%',
        backgroundColor: '#151f71',
        padding: 10,
        borderRadius: 10,
    },
    btnText:{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
    
})