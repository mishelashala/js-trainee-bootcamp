import { IUser } from "../entities/User";

export const UserService = () => {
  const getAll = (): Promise<IUser[]> => {
    return Promise.resolve([
      {
        id: "1",
        username: "mishelashala",
        name: "Michell"
      }
    ]);
  };

  return {
    getAll
  };
};
