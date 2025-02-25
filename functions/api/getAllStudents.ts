import axios from "axios";

export async function getAllStudents(){
    try
    {
        const response = await axios.get(`https://school-bqfd.onrender.com/student/`)
        return response.data;
    }
    catch(error)
    {
        console.error("Erro ao buscar alunos: ", error);
        return [];
    }
}