import { UserTable } from "./../db/schema/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const getAllUsers = async () => {
  try {
    const users = await db.query.UserTable.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);

    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.UserTable.findFirst({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.UserTable.findFirst({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

export const getUserByName = async (name: string) => {
  try {
    const user = await db.query.UserTable.findFirst({
      where: { name },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by name:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const user = await db
      .insert(UserTable)
      .values({
        name,
        email,
        password,
      })
      .returning({
        id: UserTable.id,
        name: UserTable.name,
        email: UserTable.email,
        role: UserTable.role,
      });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

export const updateUser = async (
  id: string,
  name: string,
  email: string,
  password: string,
  role: "user" | "admin",
) => {
  try {
    const user = await db
      .update(UserTable)
      .set({
        name,
        email,
        password,
        role,
      })
      .where(eq(UserTable.id, id))
      .returning({
        id: UserTable.id,
        name: UserTable.name,
        email: UserTable.email,
        role: UserTable.role,
      });
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const deletedUser = await db
      .delete(UserTable)
      .where(eq(UserTable.id, id))
      .returning({
        id: UserTable.id,
        name: UserTable.name,
        email: UserTable.email,
        role: UserTable.role,
      });
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    if (error instanceof Error) {
      console.error("Error Cause: ", error.cause);
      console.log("Error Message: ", error.message);
    }
    throw error;
  }
};
