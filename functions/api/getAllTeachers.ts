import axios from "axios";

export async function getAllTeachers(){
    try
    {
        const response = await axios.get(`https://school-bqfd.onrender.com/teacher/`);
        return response.data;
    }
    catch(error)
    {
        console.error("Erro ao buscar professores: ", error);
    }
}