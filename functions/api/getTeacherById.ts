import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function GetTeacherById() {
    try
    {
        const teacherId = await AsyncStorage.getItem('teacherId');
        const response = await axios.get(`https://school-bqfd.onrender.com/adm/teacher/${teacherId}`);
        if(response.status === 200)
        {
            await AsyncStorage.setItem('isTeacher', 'true');
            return true;
        }
        else
        {
            return false;
        }
    }
    catch(error)
    {
        console.error('Erro ao buscar professor por id: ',error);
        return false;
    }
}