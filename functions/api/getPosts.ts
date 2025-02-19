import axios from "axios";

export interface Posts{
    id_post: number;
    id_teacher: string;
    id_subject: number;
    post_text: string;
    post_title: string;
    post_date: string;
    teacher_name: string;
    subject_name: string;
}
export async function fetchPosts(): Promise<Posts[]>{
    const response = axios.get('https://school-bqfd.onrender.com/teacher/posts');
    const data = (await response).data;
    return data;
} 