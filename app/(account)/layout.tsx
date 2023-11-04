import { checkSessionAndRedirect } from "@/lib/authCheck";

export default async function LayoutAccount({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkSessionAndRedirect();

  return (
    <div>
      <h1>Account Layout</h1>
      {children}
    </div>
  );
}
