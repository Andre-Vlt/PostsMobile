import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function GetPersonId(){
    try
    {
        const userId = await AsyncStorage.getItem('userId');
        const response = await axios.get(`https://school-bqfd.onrender.com/adm/person/userid/${userId}`)
        if(response.status === 200)
        {
            await AsyncStorage.setItem('personId', response.data.id_person);
        }
        else
        {
            console.log('Erro ao buscar id da pessoa');
        }
    }
    catch(error)
    {
        console.error('Erro ao buscar id da pessoa: ',error);
    }
}