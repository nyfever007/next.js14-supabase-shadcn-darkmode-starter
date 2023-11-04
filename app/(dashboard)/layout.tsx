import { getProfile } from "@/lib/actions";
import { getUserSession } from "@/lib/authCheck";
import { UserRole } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();
  if (!session) return redirect("/auth/unauthorized");
  const user = await getProfile(session.user.id);
  if (user.role !== UserRole.admin) return redirect("/auth/unauthorized");
  return (
    <>
      <div>
        <h1>Dashboard Layout</h1>
        {children}
      </div>
    </>
  );
}
