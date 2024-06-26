import { getAllTransaction } from "@/actions/transaction";
import { getAllUser } from "@/actions/user";
import TransactionTable from "@/components/dashboard/transaction/transaction-table";
import AddUserForm from "@/components/dashboard/user/add-user-form";
import UserTable from "@/components/dashboard/user/user-table";
import React from "react";

const TransactionPage = async () => {
  const users = await getAllUser();
  const transactions = await getAllTransaction();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h1 className="text-center text-4xl font-extrabold">Transactions</h1>
      </div>
      <div className="overflow-auto h-96">
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
};

export default TransactionPage;
