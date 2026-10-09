import * as userRepo from "../repo/user.repo";

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
    const user = await userRepo.createUser(name, email, password);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
