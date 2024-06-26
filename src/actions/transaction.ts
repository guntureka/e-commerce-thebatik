"use server";

import { auth } from "@/auth";
import { transactionStatusSchema } from "@/lib/schemas";
import { db } from "@/utils/db";
import {
  Cart,
  Prisma,
  TransactionItem,
  TransactionStatus,
} from "@prisma/client";
import { create } from "domain";
import { z } from "zod";
import { createSnapToken } from "./midtrans";
import { deleteCartById } from "./cart";

export const getAllTransaction = async () => {
  try {
    const transactions = await db.transaction.findMany({
      include: {
        user: true,
        transactionItems: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return transactions;
  } catch (error) {
    console.log(error);
  }
};

export const getTransactionByUserId = async (id: string) => {
  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId: id,
      },
      include: {
        transactionItems: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return transactions;
  } catch (error) {
    console.log(error);
  }
};

export const getTransactionById = async (id: string) => {
  try {
    const transaction = await db.transaction.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        transactionItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return transaction;
  } catch (error) {
    console.log(error);
  }
};

export const updateTransactionStatusById = async (
  id: string,
  values: z.infer<typeof transactionStatusSchema>
) => {
  try {
    const validatedFields = transactionStatusSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const { transactionStatus } = validatedFields.data;

    await db.transaction.update({
      where: {
        id,
      },
      data: {
        status: transactionStatus,
      },
    });

    return {
      success: "Transaction updated successful",
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteTransactionById = async (id: string) => {
  try {
    const transaction = await getTransactionById(id);

    if (!transaction) {
      return {
        error: "Transaction doesnt exist!",
      };
    }

    await db.transaction.delete({
      where: {
        id,
      },
    });

    return {
      success: "Transaction deleted successful",
    };
  } catch (error) {
    console.log(error);
  }
};

type CartWithMany = Prisma.CartGetPayload<{
  include: {
    product: true;
  };
}>;

interface CartProps {
  carts: CartWithMany[] | undefined;
}

// type TransactionItems = {
//   quantity: number | null;
//   productId: string;
// };

export const createTransaction = async ({ carts }: CartProps) => {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user) {
      return {
        error: "Login first!",
      };
    }

    if (!carts) {
      return {
        error: "Carts doesnt exist",
      };
    }

    let total = 0;

    carts.map((cart) => {
      if (cart.product.discount) {
        total +=
          cart.quantity *
          (cart.product.price -
            (cart.product.price * cart.product?.discount) / 100);
      } else {
        total += cart.quantity * cart.product.price;
      }
    });

    const transaction = await db.transaction.create({
      data: {
        total,
        status: TransactionStatus.PROCESS,
        userId: user.id!,
        transactionItems: {
          createMany: {
            data: carts.map((v) => {
              return {
                quantity: v.quantity,
                productId: v.product.id,
              };
            }),
          },
        },
      },
      include: {
        transactionItems: true,
      },
    });

    const snapToken = await createSnapToken(transaction);

    if (!snapToken) {
      return {
        error: "Error generate snap token",
      };
    }

    await Promise.all(
      carts.map((v) => {
        return deleteCartById(v.id);
      })
    );

    return {
      transactionId: transaction.id,
      token: snapToken,
      success: "Transaction created successful",
    };

    console.log(carts);
  } catch (error) {
    console.log(error);
  }
};

export const updateTransactionItemWithId = async (
  id: string,
  quantity: number
) => {
  try {
    await db.transactionItem.update({
      where: {
        id,
      },

      data: {
        quantity,
      },
    });

    return {
      success: "Transaction updated successful",
    };
  } catch (error) {
    console.log();
  }
};
