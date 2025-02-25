import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function createTeacher(idSubject:number, teacherName:string){
    try
    {
        const idPerson = await AsyncStorage.getItem('newPersonId');
        const response = await axios.post(`https://school-bqfd.onrender.com/adm/teacher`, 
            {
                id_person: idPerson,
                id_subject: idSubject,
                teacher_name: teacherName
            }
        )
        const data = response.data;
        return data;
    }
    catch(error)
    {
        console.error(error);
    }
}