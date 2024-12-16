"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input";
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from "zod"
import { useForm } from "react-hook-form";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { createNewPost } from "@/utils/action";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  body: z.string().min(2, {
    message: "body must be at least 2 characters.",
  }),
})

const AddPost = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { userId } = useAuth();
  const [open,setOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append('userId', userId as string);
      formData.append('title', values.title);
      formData.append('body', values.body);
      
        // Call the createNewPost function
        await createNewPost(formData);
        form.reset();
        setOpen(false);
        toast({
          title: "Post created successfully"
        });

      
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: error instanceof Error && error?.message
      })
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Add Post</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your post</DialogTitle>
        </DialogHeader>
         <DialogDescription></DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {
                isSubmitting?(
                  <>
                  <Loader2 className="animate-spin" />
            Please wait
                  </>
          ) : "Submit"}
      </Button>
        </form>
      </Form>
    </DialogContent>
    </Dialog >

  )
}

export default AddPost