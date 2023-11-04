"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { VariantProps } from "class-variance-authority";
import { Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface SignOutButtonProps {
  buttonSize: VariantProps<typeof Button>["size"];
  buttonVariant?: VariantProps<typeof Button>["variant"];
  session: Session | null;
}
const SignOutButton = ({
  buttonSize,
  buttonVariant,
  session,
}: SignOutButtonProps) => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (session) {
    return (
      <Button
        variant={buttonVariant}
        size={buttonSize}
        className='gap-x-1'
        onClick={() => handleSignOut()}
      >
        <Lock size={16} />
        로그아웃
      </Button>
    );
  }

  return (
    <Button asChild variant={buttonVariant} size={buttonSize}>
      <Link href='/login' className='space-x-1'>
        <Lock size={12} />
        로그인
      </Link>
    </Button>
  );
};

export default SignOutButton;
