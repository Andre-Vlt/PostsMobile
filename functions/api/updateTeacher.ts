import axios from "axios";

export async function updateTeacher(teacherId:string, teacherName:string, id_subject:number){
    try
    {
        const response = await axios.put(`https://school-bqfd.onrender.com/teacher/${teacherId}`,{
            teacher_name: teacherName,
            id_subject: id_subject
        });
        return response.data;
    }
    catch(error)
    {
        console.error("Erro ao atualizar professor: ", error);
        alert("Erro ao atualizar professor");
    }
}