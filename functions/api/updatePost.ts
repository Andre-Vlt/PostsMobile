import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function UpdatePost(postId: number, title: string, content: string, id_subject: number){
    try
    {
        const response = await axios.put(`https://school-bqfd.onrender.com/teacher/post/${postId}`,
            {
                id_teacher: await AsyncStorage.getItem('teacherId'),
                id_subject,
                post_text: content,
                post_title: title
            }
        );
        return response.data;

    }
    catch(error)
    {
        console.error('Erro ao editar post: ', error);
        throw error;
    }
}