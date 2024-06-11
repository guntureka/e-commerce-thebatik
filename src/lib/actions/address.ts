import { db } from "@/utils/db";


export const createAddress = async (data: any) => {
    try {
      const address = await db.address.create({ data });
      return address;
    } catch (error) {
      return null;
    }
  };
  
  
  export const getAddressById = async (id: string) => {
    try {
      const address = await db.address.findUnique({
        where: {
          id,
        },
      });
      return address;
    } catch (error) {
      return null;
    }
  };
  
  
  export const getAllAddresses = async () => {
    try {
      const addresses = await db.address.findMany({});
      return addresses;
    } catch (error) {
      return null;
    }
  };
  
  
  export const updateAddress = async (id: string, data: any) => {
    try {
      const address = await db.address.update({
        where: { id },
        data,
      });
      return address;
    } catch (error) {
      return null;
    }
  };
  
  
  export const deleteAddress = async (id: string) => {
    try {
      const address = await db.address.delete({
        where: { id },
      });
      return address;
    } catch (error) {
      return null;
    }
  };