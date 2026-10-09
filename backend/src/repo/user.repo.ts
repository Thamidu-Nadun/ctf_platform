import { userTable } from "./../db/schema/schema";
import { db } from "../db";

export const getAllUsers = async () => {
  try {
    const users = await db.query.userTable.findMany();
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
    const user = await db.query.userTable.findFirst({
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

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const existingUser = await db.query.userTable.findFirst({
      where: { email },
    });
    if (existingUser) {
      throw new Error(`User with this ${email} email already exists`);
    }

    const user = await db
      .insert(userTable)
      .values({
        name,
        email,
        password,
      })
      .returning({
        id: userTable.id,
        name: userTable.name,
        email: userTable.email,
        role: userTable.role,
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
