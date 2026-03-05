export type User = {
  id: string;
  name: string;
};

export type User2 = {
  id: string;
  username: string;
  email: string;
};

export type UserLogin = {
  password: string;
} & Pick<User2, 'email'>;

export type UserRegister = {
  password: string;
} & Omit<User2, 'id'>;
