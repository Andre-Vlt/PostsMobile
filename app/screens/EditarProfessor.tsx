import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { updateTeacher } from "../../functions/api/updateTeacher";
import { Picker } from "@react-native-picker/picker";

type StackParamList={
    EditarProfessor: {teacher:any};
};

const subjects = [
    { id: '1', name: 'Português' },
    { id: '2', name: 'Matemática' },
    { id: '3', name: 'Ciências' },
    { id: '4', name: 'História' },
    { id: '5', name: 'Geografia' },
    { id: '6', name: 'Inglês' },
    { id: '7', name: 'Física' },
    { id: '8', name: 'Química' },
    { id: '9', name: 'Tecnologia' },
];

export default function EditarProfessor(){
    const route = useRoute<RouteProp<StackParamList>>();
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    const { teacher } = route.params;

    const [name, setName] = useState(teacher.teacher_name);
    const [subject, setSubject] = useState(teacher.id_subject);

    const handleUpdate = async(name, subject) =>{
        try
        {
            await updateTeacher(teacher.id_teacher , name, Number(subject));
            alert ("Professor atualizado com sucesso");
            navigation.goBack();
        }
        catch(error){
            console.error("Erro ao atualizar Professor: ", error);
            alert("Erro ao atualizar Professor");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Editar Professor</Text>
            <Formik
                initialValues={{nameValue: name, subjectValue: subject}}
                onSubmit={(values) =>{
                    handleUpdate(values.nameValue, values.subjectValue);
                }}
            >
                {({handleChange, handleBlur, handleSubmit, values, setFieldValue})=>(
                    <View style={styles.fieldsContainer}>
                        <View style={styles.inputsContainer}>
                            <Text style={styles.text}>Nome</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={handleChange("nameValue")}
                                onBlur={handleBlur("nameValue")}
                                value={values.nameValue}
                            />
                            <Text style={styles.text}>Matéria</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={values.subjectValue}
                                onValueChange={(itemValue)=> setFieldValue("subjectValue", Number(itemValue))}
                            >
                                {subjects.map((subject) => (
                                    <Picker.Item key={subject.id} label={subject.name} value={subject.id} />
                                ))}
                            </Picker>
                            <Button onPress={() => handleSubmit()} title="Atualizar"/>
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
    picker:{
        width: '100%',
        borderWidth: 1,
        borderColor: '#151f71',
        backgroundColor: '#e0dedd',
    }
    
})