import { db } from "@/utils/db";

export const createSession = async (data: any) => {
    try {
      const session = await db.session.create({ data });
      return session;
    } catch (error) {
      return null;
    }
  };
  
  
  export const getSessionByToken = async (sessionToken: string) => {
    try {
      const session = await db.session.findUnique({
        where: {
          sessionToken,
        },
      });
      return session;
    } catch (error) {
      return null;
    }
  };
  
  
  export const getAllSessions = async () => {
    try {
      const sessions = await db.session.findMany({});
      return sessions;
    } catch (error) {
      return null;
    }
  };
  
  
  export const updateSession = async (sessionToken: string, data: any) => {
    try {
      const session = await db.session.update({
        where: { sessionToken },
        data,
      });
      return session;
    } catch (error) {
      return null;
    }
  };
  
  
  export const deleteSession = async (sessionToken: string) => {
    try {
      const session = await db.session.delete({
        where: { sessionToken },
      });
      return session;
    } catch (error) {
      return null;
    }
  };