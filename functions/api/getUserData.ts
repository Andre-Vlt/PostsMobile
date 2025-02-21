import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function GetUserData(){

    const id_person = await AsyncStorage.getItem('personId');
    const response = await axios.get(`https://school-bqfd.onrender.com/adm/person/${id_person}`);
    return response.data;
}