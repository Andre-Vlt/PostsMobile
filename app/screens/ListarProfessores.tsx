import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Card, IconButton } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { getAllTeachers } from "../../functions/api/getAllTeachers";

type StackParamList = {
    EditarProfessor: { teacher: any };
}
export default function TeacherList(){
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    const loadTeachers = async () => {
        try{
            setLoading(true);
            const data = await getAllTeachers();
            setTeachers(data);
        }catch(error){
            console.error("Erro ao buscar professores: ", error);
        }
        finally{
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadTeachers();
        }, [])
    );


    return(
        <View>
            <Text>Lista de professores</Text>
            {loading ? (<Text>Carregando...</Text>)
            :(
                <FlatList
                    data={teachers}
                    keyExtractor={(item) => item.id_teacher.toString()}
                    renderItem={({ item }) => (
                        <Card>
                            <View>
                                <Text>{item.teacher_name}</Text>
                                <Text>{item.id_subject}</Text>
                                <IconButton icon = "pencil" onPress={() => navigation.navigate("EditarProfessor", { teacher: item})} />
                            </View>
                        </Card>
                    )} />)}


        </View>

    )
}