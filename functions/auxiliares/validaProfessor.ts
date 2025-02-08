import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetPersonId } from "../api/getPersonIdCall";
import { GetTeacherById } from "../api/getTeacherById";
import { GetTeacherId } from "../api/getTeacherId";

export async function ValidaProfessor() {
    try
    {
        await GetPersonId();
        await GetTeacherId();
        await GetTeacherById();

        if(await GetTeacherById())
        {
            await AsyncStorage.setItem('isTeacher', 'true');
            return true;
        }
        else
        {
            await AsyncStorage.setItem('isTeacher', 'false');
            return false;
        }
    }
    catch(error)
    {
        console.error('Erro: ',error);
    }
}
