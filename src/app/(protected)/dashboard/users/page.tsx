import { getAllUser } from "@/actions/user";
import AddUserForm from "@/components/dashboard/user/add-user-form";
import UserTable from "@/components/dashboard/user/user-table";
import React from "react";

const Products = async () => {
  const users = await getAllUser();
  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h1 className="text-center text-4xl font-extrabold">Users</h1>
      </div>
      <div className="flex justify-end items-center">
        <AddUserForm />
      </div>
      <div className="overflow-auto h-96">
        <UserTable users={users} />
      </div>
    </div>
  );
};

export default Products;
