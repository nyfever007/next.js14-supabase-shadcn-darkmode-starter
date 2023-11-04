"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const SignOutButton = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return <Button onClick={() => handleSignOut()}>Sign Out</Button>;
};

export default SignOutButton;
