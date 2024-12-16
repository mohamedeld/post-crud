"use client";
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast';
import { deletePost } from '@/utils/action';
import { Loader2 } from 'lucide-react';

interface IProps{
  postId:string | number;
}

const DeletePost = ({postId}:IProps) => {
  const [open,setOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const {toast} = useToast();
 
  async function handleDelete(){
    setLoading(true);
    try{
      const formData = new FormData();
      formData.append("id",postId);
      await deletePost(formData);
      setOpen(false);
        toast({
          title: "Post Deleted successfully"
        });
        setLoading(false);
      }catch(error){
        console.log(error);
        toast({
          title: "Something went wrong",
          description: error instanceof Error && error?.message
        })
        setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Do you want to delete this post</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogFooter>
      <Button onClick={handleDelete} disabled={loading}>{
        loading ? (
          <>
                  <Loader2 className="animate-spin" />
            Please wait
                  </>
        ) : ("Delete")
        }</Button>
    </DialogFooter>
        </DialogContent>
        </Dialog>
  )
}

export default DeletePost