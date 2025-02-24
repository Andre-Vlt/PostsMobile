import axios from "axios";

export async function CriaPost(id_teacher:string ,id_subject:string, post_text:string, post_title:string){
    const response = await axios.post(`https://school-bqfd.onrender.com/teacher/post`, {
        id_teacher: id_teacher,
        id_subject: id_subject,
        post_text: post_text,
        post_title: post_title
    })
    
    return response.data;
}