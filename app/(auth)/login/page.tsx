"use client";

import { supabaseClient } from "@/lib/supabaseBroswer";

const supabase = supabaseClient();
export default function Login() {
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

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='max-w-xs m-auto'>
        <h1 className='font-bold text-3xl'>로그인</h1>
        <button onClick={() => signInWithGoogle()}>Google SignIn</button>
        <button onClick={() => signInWithKakao()}>Kakao SignIn</button>
      </div>
    </div>
  );
}
