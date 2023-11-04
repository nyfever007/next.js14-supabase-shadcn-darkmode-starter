"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerComponentClient({ cookies });
export async function getProfile(id: string) {
  const { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.log(error);
    return null;
  }

  return user ? user : null;
}

export async function updateUser(profile: Profile) {
  const { data, error } = await supabase
    .from("profiles")
    .upsert(profile)
    .eq("id", profile.id);
  if (error) {
    console.log(error);
    return null;
  }

  return data ? data : null;
}
