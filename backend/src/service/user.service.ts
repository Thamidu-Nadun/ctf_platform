import * as userRepo from "../repo/user.repo";
import { NotFoundError } from "../libs/errors";

export const getAllUsers = async () => {
  const users = await userRepo.getAllUsers();
  return users;
};

export const getUserById = async (id: string) => {
  const user = await userRepo.getUserById(id);
  return user;
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    // Check whether a user with the same email exists
    const existingUserByEmail = await userRepo.getUserByEmail(email);
    if (existingUserByEmail) {
      throw new Error(`User with email ${email} already exists`);
    }
    // Check whether a user with the same name exists
    const existingUserByName = await userRepo.getUserByName(name);
    if (existingUserByName) {
      throw new Error(`User with name ${name} already exists`);
    }
    // IF No: create the user
    const user = await userRepo.createUser(name, email, password);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
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
    const existingUser = await userRepo.getUserById(id);
    if (!existingUser) {
      throw new NotFoundError(`User with ID ${id} not found`);
    }
    const updatedUser = await userRepo.updateUser(
      id,
      name,
      email,
      password,
      role,
    );
    return updatedUser;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const existingUser = await userRepo.getUserById(id);
    if (!existingUser) {
      throw new NotFoundError(`User with ID ${id} not found`);
    }
    const deletedUser = await userRepo.deleteUser(id);
    return deletedUser;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};
