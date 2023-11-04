"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabaseClient } from "@/lib/supabaseBroswer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, {
      message: "Confirmation password must be at least 8 characters long",
    }),
    // If you need to ensure passwords match, you can add a refine here
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const supabase = supabaseClient();
export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function signInWithGoogle() {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          redirectTo: `${location.origin}/auth/signInCallback`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function signInWithKakao() {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `${location.origin}/auth/signInCallback`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {}
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='max-w-xs m-auto'>
        <h1 className='font-bold text-3xl'>로그인</h1>
        <button onClick={() => signInWithGoogle()}>구글로그인</button>
        <button onClick={() => signInWithKakao()}>카카오로그인</button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input placeholder='email' {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input placeholder='password' {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input placeholder='password' {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
