export type UserObject = {
  user: {
    email: string;
    password: string;
  };
};

export type UpdatingAuth = { updateAuth: (status: boolean) => void };
