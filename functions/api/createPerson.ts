import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function createPerson(name:string, email:string, birth:string, cpf:string){
    const id_user = await AsyncStorage.getItem('newUserId');
    const response = await axios.post(`https://school-bqfd.onrender.com/adm/person`,{
        id_user: id_user,
        name: name,
        email: email,
        birth: birth,
        cpf: cpf
    })
    const data = response.data;
    await AsyncStorage.setItem('newPersonId', data.id_person);
    return data;
}