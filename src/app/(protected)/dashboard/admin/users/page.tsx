import UserTable from "@/components/admin/user/user-table";
import { getAllUser } from "@/lib/actions/user";
import React from "react";

const page = async () => {
  const users = await getAllUser();
  return (
    <div className="flex flex-col p-5">
      <UserTable users={users} />
    </div>
  );
};

export default page;
