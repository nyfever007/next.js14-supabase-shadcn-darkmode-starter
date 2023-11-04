import TopHeader from "@/components/global/TopHeader";
import { getUserSession } from "@/lib/authCheck";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();

  return (
    <>
      <TopHeader session={session} />
      {children}
    </>
  );
}
