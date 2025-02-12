import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function GetTeacherId() {
    try
    {
        const personId = await AsyncStorage.getItem('personId');
        const response = await axios.get(`https://school-bqfd.onrender.com/adm/teacher/person/${personId}`);
        if(response.status === 200)
        {
            await AsyncStorage.setItem('teacherId', response.data.id_teacher);
            console.log('GetTeacherId-> id_teacher salvo no AsyncStorage: ',response.data.id_teacher);
        }
        else
        {
            console.log('Erro ao buscar id do professor');
        }
    }
    catch(error)
    {
        console.error('Erro ao buscar id do professor: ',error);
    }
}