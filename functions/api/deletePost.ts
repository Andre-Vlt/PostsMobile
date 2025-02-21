import axios from "axios";

export async function DeletePost(postId: number){
    const response = await axios.delete(`https://school-bqfd.onrender.com/teacher/post/${postId}`);
    return response.data;
}