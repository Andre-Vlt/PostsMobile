import axios from "axios";

export async function updateStudent( id_person:string, grade: string, name: string){
    try
    {
        const response = await axios.put(`https://school-bqfd.onrender.com/student/${id_person}`,{
            grade: grade,
            student_name: name
        });
        return response.data;
    }
    catch(error)
    {
        console.error("Erro ao atualizar aluno: ", error);
        alert("Erro ao atualizar aluno");
    }
}