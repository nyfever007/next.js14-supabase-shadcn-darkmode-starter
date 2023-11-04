"use server";
import { getProfile, updateUser } from "@/lib/actions";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
const supabase = createRouteHandlerClient<Database>({ cookies });

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  if (code) {
    try {
      await supabase.auth.exchangeCodeForSession(code);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        return NextResponse.redirect("/auth/signin");
      }
      let profile: Profile = await getProfile(session.user.id);
      profile.loggedAt = new Date().toUTCString();

      if (profile.email === "") {
        profile.email = session.user.user_metadata.email;
      }
      if (profile.name === "") {
        profile.name = session.user.user_metadata.full_name;
      }
      if (profile.avatarUrl === "") {
        profile.avatarUrl = session.user.user_metadata.avatar_url;
      }
      if (!profile.provider) {
        profile.provider = session.user.app_metadata.provider ?? null;
      }
      await updateUser(profile);
    } catch (error) {
      return NextResponse.redirect("/auth/signup");
    }
  }
  return NextResponse.redirect(requestUrl.origin);
}
