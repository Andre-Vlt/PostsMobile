import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function GetTeacherId() {
    try
    {
        const personId = await AsyncStorage.getItem('personId');
        const response = await axios.get(`https://school-bqfd.onrender.com/adm/teacher/person/${personId}`);
        if(response.status === 200 && response.data)
        {
            await AsyncStorage.setItem('teacherId', response.data.id_teacher);
            return response.data.id_teacher;
        }
    }
    catch(error)
    {
        if(error.response && error.response.status === 404)
        {
            await AsyncStorage.setItem('teacherId', '');
            return null;
        }
    }
}