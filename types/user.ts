export type User = {
  id: string;
  name: string;
};

export type UserDetails = {
  id: string;
  username: string;
  email: string;
};

export type UserSignIn = {
  password: string;
} & Pick<UserDetails, 'email'>;

export type UserSignUp = {
  password: string;
} & Omit<UserDetails, 'id'>;
