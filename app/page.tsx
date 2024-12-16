import PostsTable from "@/components/PostsTable";
import { fetchData } from "@/utils/action";
import Image from "next/image";

export default async function Home() {
  const response = await fetchData();
  
  return (
    <div >
      <PostsTable data={response?.data}/>
    </div>
  );
}
