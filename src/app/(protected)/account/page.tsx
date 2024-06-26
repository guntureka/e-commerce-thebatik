import { getUserById } from "@/actions/user";
import { auth } from "@/auth";
import AccountForm from "@/components/account/account-form";
import { redirect } from "next/navigation";
import React from "react";

const AccountPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user = await getUserById(session.user.id!);

  return (
    <div className="min-h-screen flex flex-col gap-4 p-4">
      <div className="flex flex-row justify-between font-[14px] ">
        <h1>
          Welcome! <span className="text-[#DB4444]"> {user?.name}</span>
        </h1>
      </div>
      <div className="w-full">
        {/* <div>
          <div className="text-[16px] mt-2 ">
            <Link href="/wishlist">
              <p className="font-bold">My Wishlist</p>
            </Link>
          </div>
        </div>

        <Card className="flex flex-col border-none outline-none shadow-none justify-center">
          <ProfileForm {...user} />
        </Card> */}
        <AccountForm user={user!} />
      </div>
    </div>
  );
};

export default AccountPage;
