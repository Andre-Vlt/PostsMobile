import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { getAllStudents } from "../../functions/api/getAllStudents";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Card, IconButton } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";

type StackParamList = {
    EditarAluno: undefined;
}
export default function StudentList(){
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    const loadStudents = async () => {
        try{
            setLoading(true);
            const data = await getAllStudents();
            setStudents(data);
        }catch(error){
            console.error("Erro ao buscar alunos: ", error);
        }
        finally{
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadStudents();
        }, [])
    );


    return(
        <View>
            <Text>Lista de alunos</Text>
            {loading ? (<Text>Carregando...</Text>)
            :(
                <FlatList
                    data={students}
                    keyExtractor={(item) => item.id_student}
                    renderItem={({ item }) => (
                        <Card>
                            <View>
                                <Text>{item.student_name}</Text>
                                <Text>{item.grade}</Text>
                                <IconButton icon = "pencil" onPress={() => navigation.navigate("EditarAluno")} />
                            </View>
                        </Card>
                    )} />)}


        </View>

    )
}