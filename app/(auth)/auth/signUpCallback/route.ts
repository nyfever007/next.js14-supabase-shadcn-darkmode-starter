"use server";
import { getProfile, updateUser } from "@/lib/actions";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { NextResponse, type NextRequest } from "next/server";
const supabase = createRouteHandlerClient<Database>({ cookies });

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const callback = requestUrl.origin + "/welcome";
  if (code) {
    try {
      await supabase.auth.exchangeCodeForSession(code);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        return NextResponse.redirect("/auth/signup");
      }
      let profile: Profile = await getProfile(session.user.id);
      if (!profile) {
        return NextResponse.redirect("/auth/signup");
      }
      profile.updatedAt = new Date().toUTCString();
      profile.name = session.user.user_metadata.full_name;
      profile.email = session.user.user_metadata.email;
      profile.avatarUrl = session.user.user_metadata.avatar_url;

      await updateUser(profile);
    } catch (error) {
      console.log(error);
      return NextResponse.redirect("/auth/signup");
    }
  }
  return NextResponse.redirect(callback);
}
