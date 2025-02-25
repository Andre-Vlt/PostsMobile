import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function createUser(username:string, password:string){
    const response = await axios.post(`https://school-bqfd.onrender.com/adm/user`, 
    {
        username:username,
        password:password
    });
    const data = response.data;
    await AsyncStorage.setItem('newUserId', data.id_user);
    return data;
}