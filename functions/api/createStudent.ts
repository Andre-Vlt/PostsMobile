import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function createStudent(grade:string){
    const id_person = await AsyncStorage.getItem('newPersonId');
    const response = await axios.post(`https://school-bqfd.onrender.com/adm/student`,{
        id_person: id_person,
        grade: grade
    });
    const data = response.data;
    return data;
}