"use client";
import { IPost } from "@/utils/types"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import AddPost from "./AddPost";
import { useState } from "react";
import DeletePost from "./DeletePost";



interface IProps {
  data: IPost[]
}

const PostsTable = ({ data }: IProps) => {
  const [postId,setPostId] = useState('');
  return (
    <div className="max-w-7xl mx-auto my-[3rem] px-5">
      <div className="py-5 flex items-center justify-end">
        <AddPost/>
      </div>
      <Table>
        <TableCaption>A list of posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>UserId</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Body</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data?.length > 0 ? data?.map(item => {
              return (
                <TableRow key={item?.id}>
                  <TableCell className="font-medium">{item?.id}</TableCell>
                  <TableCell>{item?.userId}</TableCell>
                  <TableCell>{item?.title}</TableCell>
                  <TableCell>{item?.body}</TableCell>
                  <TableCell className="flex justify-center items-center gap-4 ">
                    <Button variant="secondary" className="bg-green-600 text-white">Update</Button>
                    
                    {item?.id !== undefined && <DeletePost postId={item?.id} />}
                    
                  </TableCell>
                </TableRow>
              )
            })
              : <p>No Items Found</p>
          }

        </TableBody>
      </Table>
    </div>

  )
}

export default PostsTable