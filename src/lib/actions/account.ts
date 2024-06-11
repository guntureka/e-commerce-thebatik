import { db } from "@/utils/db";

export const createAccount = async (data: any) => {
  try {
    const account = await db.account.create({ data });
    return account;
  } catch (error) {
    return null;
  }
};


export const getAccountByProviderInfo = async (provider: string, providerAccountId: string) => {
  try {
    const account = await db.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
    });
    return account;
  } catch (error) {
    return null;
  }
};

// Get all accounts
export const getAllAccounts = async () => {
  try {
    const accounts = await db.account.findMany({});
    return accounts;
  } catch (error) {
    return null;
  }
};

// Update an account
export const updateAccount = async (provider: string, providerAccountId: string, data: any) => {
  try {
    const account = await db.account.update({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
      data,
    });
    return account;
  } catch (error) {
    return null;
  }
};

// Delete an account
export const deleteAccount = async (provider: string, providerAccountId: string) => {
  try {
    const account = await db.account.delete({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
    });
    return account;
  } catch (error) {
    return null;
  }
};
