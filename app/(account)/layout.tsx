import { getUserSession } from "@/lib/authCheck";
import { redirect } from "next/navigation";

export default async function UserAccountRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();
  if (!session) return redirect("/auth/unauthorized");
  return (
    <>
      <div>
        <h1>Dashboard Layout</h1>
        {children}
      </div>
    </>
  );
}
