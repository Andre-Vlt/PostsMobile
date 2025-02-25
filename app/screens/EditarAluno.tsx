import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
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
        <View>
            <Formik
                initialValues={{nameValue: name, gradeValue: grade}}
                onSubmit={(values) =>{
                    handleUpdate(values.nameValue, values.gradeValue);
                }}
            >
                {({handleChange, handleBlur, handleSubmit, values})=>(
                    <View>
                        <TextInput
                            onChangeText={handleChange("nameValue")}
                            onBlur={handleBlur("nameValue")}
                            value={values.nameValue}
                        />
                        <TextInput
                            onChangeText={handleChange("gradeValue")}
                            onBlur={handleBlur("gradeValue")}
                            value={values.gradeValue}
                        />
                        <Button onPress={() => handleSubmit()} title="Atualizar"/>
                    </View>
                )}

            </Formik>
        </View>
    )
}