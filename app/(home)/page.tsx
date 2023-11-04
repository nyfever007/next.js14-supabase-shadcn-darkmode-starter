import { getUserSession } from "@/lib/authCheck";

export default async function Home() {
  const session = await getUserSession();
  return (
    <>
      <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </>
  );
}
