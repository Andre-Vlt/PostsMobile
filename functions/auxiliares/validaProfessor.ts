import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetPersonId } from "../api/getPersonIdCall";
import { GetTeacherById } from "../api/getTeacherById";
import { GetTeacherId } from "../api/getTeacherId";

export async function ValidaProfessor() {
    try
    {
        await GetPersonId();
        await GetTeacherId();
        const teacherId = await GetTeacherById();

        if(teacherId)
        {
            await AsyncStorage.setItem('isTeacher', 'true');
            console.log(`isteacher: true`)
            return true;
        }
        else
        {
            await AsyncStorage.setItem('isTeacher', 'false');
            console.log(`isteacher: false`)
            return false;
        }
    }
    catch(error)
    {
        if(error.response.status === 404)
        {
            console.log('Não é professor');
        }
    }
}
