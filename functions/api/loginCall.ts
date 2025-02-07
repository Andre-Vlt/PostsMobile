import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function LoginCall(username: string, password: string)
{
    try
    {
        const response = await axios.post('INSERIR ROTA DE LOGIN',{
            username: username,
            password: password
        });

        if(response.status === 200)
        {
            const data = response.data;
            await AsyncStorage.setItem('isLoggedIn', 'true');
            await AsyncStorage.setItem('userId', data.id_user);
            await AsyncStorage.setItem('username', data.username);
        }
        else
        {
            console.log('Erro ao fazer login');
        }
    }
    catch(error)
    {
        console.error('Erro ao fazer login: ',error);
    }
}
