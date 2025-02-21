import axios from "axios";

export async function SearchPost(keyWord){
    const response = await axios.get(`https://school-bqfd.onrender.com/student/search?keyWord=${keyWord}`);
    return response.data;
}