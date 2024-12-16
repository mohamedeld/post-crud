"use server";
import axios from "axios";
import { IPost } from "./types";
import { revalidatePath } from "next/cache";
export const fetchData = async ()=>{
  try{
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response;
  }catch(error){
    console.log(error);
  }
}


export const createNewPost = async (formData:FormData)=>{
  try{
    const userId = formData.get('userId');
    const title = formData.get('title');
    const body = formData.get('body');
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts',{
      userId,title,body
    });
    revalidatePath("/");
    return response?.data
  }catch(error){
    console.log(error);
  }
}


export async function deletePost(formData:FormData) {
  try {
      const id = formData.get("id");
      console.log("id ",id);
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    revalidatePath('/')
    return response?.data
  } catch (error) {
    return { error: 'Failed to delete user' }
  }
}