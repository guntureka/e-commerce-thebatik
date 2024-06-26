"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Category,
  Prisma,
  Product,
  Transaction,
  TransactionItem,
  User,
} from "@prisma/client";
import { Button } from "@/components/ui/button";
// import EditCategoryForm from "./edit-product-form";
import EditUserForm from "./edit-transaction-form";
import DeleteTransactionButton from "./delete-transaction-button";
import EditTransactionForm from "./edit-transaction-form";

type transactionWithMany = Prisma.TransactionGetPayload<{
  include: {
    user: true;
    transactionItems: true;
  };
}>;

interface TransactionTableProps {
  transactions: transactionWithMany[] | undefined;
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>User ID</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions && transactions!.length > 0 ? (
          transactions &&
          transactions!.map((transaction, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{++index}</TableCell>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.userId}</TableCell>
                <TableCell>{transaction.total}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>
                  {new Date(transaction.createdAt).toLocaleString("en-GB")}
                </TableCell>
                <TableCell>
                  {new Date(transaction.updatedAt).toLocaleString("en-GB")}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center gap-2">
                    <EditTransactionForm transaction={transaction} />
                    <DeleteTransactionButton id={transaction.id} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No Data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
