"use server";

import { db } from "@/utils/db";
import { snap } from "@/utils/midtrans";
import { Prisma, TransactionStatus } from "@prisma/client";
import { getTransactionById } from "./transaction";
import { createHash } from "crypto";
type Transaction = Prisma.TransactionGetPayload<{
  include: {
    transactionItems: true;
  };
}>;

export interface MidtransAfterPaymentProps {
  transaction_time: string;
  transaction_status: string;
  transaction_id: string;
  status_message: string;
  status_code: string;
  signature_key: string;
  settlement_time: string;
  payment_type: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  fraud_status: string;
  currency: string;
}

export const createSnapToken = async (transaction: Transaction) => {
  try {
    const transactionData = {
      transaction_details: {
        order_id: transaction.id,
        gross_amount: transaction.total,
      },
      CreditCard: {
        secure: true,
      },
    };
    const snapToken = await snap.createTransactionToken(transactionData);

    return snapToken;
  } catch (error) {
    console.log(error);
  }
};

const updateTransactionDb = async (
  props: MidtransAfterPaymentProps,
  status: TransactionStatus
) => {
  const transactionId = props.order_id;
  try {
    await db.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        status: status,
      },
    });
    // Buat update db setelah pembayaran berhasil
  } catch (error) {
    console.error("Error updating transaction:", error);
  }
};

const signatureKeyCompare = (
  signature_key: string,
  order_id: string,
  gross_amount: string,
  status_code: string
) => {
  /*
    The logic to generate or calculate signature_key is explained below: SHA512(order_id+status_code+gross_amount+ServerKey)
    */

  const userSignatureKey = `${order_id}${status_code}${gross_amount}${process.env.NEXT_PUBLIC_MIDTRANS_SECRET_KEY}`;

  const hash = createHash("sha512").update(userSignatureKey).digest("hex");
  console.log(hash);
  console.log(signature_key);

  return signature_key === hash;
};

export const handleAfterPayment = async (
  response: MidtransAfterPaymentProps
) => {
  try {
    const transactionStatus = response.transaction_status;
    const fraudStatus = response.fraud_status;

    let data = null;

    const transaction = await getTransactionById(response.order_id);

    if (!transaction) {
      return {
        error: "Transactoun not found",
      };
    }

    const isSignatureFromMidtrans = signatureKeyCompare(
      response.signature_key,
      transaction?.id,
      response.gross_amount,
      response.status_code
    );

    if (isSignatureFromMidtrans) {
      if (
        transactionStatus === "capture" ||
        transactionStatus === "settlement"
      ) {
        if (fraudStatus == "accept") {
          data = await updateTransactionDb(response, TransactionStatus.SUCCESS);
        } else return { status: 500, message: "Fraud detected!" };
      } else if (
        transactionStatus === "cancel" ||
        transactionStatus === "deny" ||
        transactionStatus === "expire"
      ) {
        data = await updateTransactionDb(response, TransactionStatus.DECLINE);
      } else if (transactionStatus === "pending") {
        data = await updateTransactionDb(response, TransactionStatus.PROCESS);
      } else return { status: 500, message: "no status available" };
    } else return { status: 500, message: "Signature key not match" };

    return data;
  } catch (error) {
    console.log(error);
  }
};
