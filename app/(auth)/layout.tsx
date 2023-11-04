import { getUserSession } from "@/lib/authCheck";
import { redirect } from "next/navigation";

export default async function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();

  if (session) redirect("/");
  return (
    <div>
      <h1>Auth Layout</h1>
      {children}
    </div>
  );
}
