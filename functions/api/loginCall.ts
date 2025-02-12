import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function LoginCall(username: string, password: string)
{
    try
    {
        const response = await axios.post('https://school-bqfd.onrender.com/adm/user/login',{
            username: username,
            password: password
        });

        if(response.status === 200)
        {
            const data = response.data;
            await AsyncStorage.setItem('isLoggedIn', 'true');
            await AsyncStorage.setItem('userId', data.id_user);
            await AsyncStorage.setItem('username', data.username);
            const idUser = await AsyncStorage.getItem('userId');
            console.log("LoginCall-> id_user salvo no AsyncStorage:", idUser);
            return response;
        }

        return {status: response.status};
    }
    catch(error)
    {
        console.error('Erro ao fazer login: ',error);
        return {status: 500};
    }
}
