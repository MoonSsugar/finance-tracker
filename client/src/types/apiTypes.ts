export interface User {
  id: number,
  name: string,
  email: string,
  password: string,
  transactions: Transaction[]
};

export interface LoggedUser {
  token: string,
  user: Omit<User, "password" | "transactions">
};

export interface Transaction {
  id: number,
  amount: number,
  category: string,
  date?: string,
  createdAt: string,
  user: User
}