import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function GetTeacherById() {
    try
    {
        const teacherId = await AsyncStorage.getItem('teacherId');
        const response = await axios.get(`https://school-bqfd.onrender.com/adm/teacher/${teacherId}`);
        if(response.status === 200)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    catch(error)
    {
        if(error.response && error.response.status === 404)
        {
            return false;
        }
    }
}