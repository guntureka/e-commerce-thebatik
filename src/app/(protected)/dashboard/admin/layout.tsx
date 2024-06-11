import type { Metadata } from "next";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col  lg:p-24 p-10">
      <div>
        <aside></aside>
        <div>{children}</div>
      </div>
    </main>
  );
}
