import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User, LoggedUser, Transaction } from "../types/apiTypes";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  }
});

export const trackerApi = createApi({
  reducerPath: "trackerApi",
  baseQuery,
  tagTypes: ['Transactions'],
  endpoints: (builder) => ({
    addUser: builder.mutation<Omit<User,
      "password" | "transactions">, Omit<User, "id" | "transactions">
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body
      })
    }),
    loginUser: builder.mutation<
      LoggedUser, Omit<User, "name" | "id" | "transactions">
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body
      })
    }),
    getUser: builder.query<Omit<User, "password">, number>({
      query: (id: number) => `/users/${id}`,
    }),
    updateUser: builder.mutation<
      Omit<User, "password">, Partial<Omit<User, "password" | "transactions">>
    >({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: "PUT",
        body
      })
    }),
    deleteUser: builder.mutation<
      Omit<User, "password" | "transactions" | "createdAt">, number
    >({
      query: (id: number) => ({
        url: `/users/${id}`,
        method: "DELETE"
      })
    }),
    getTransactions: builder.query<Transaction[], void>({
      query: () => `/transactions`,
      providesTags: ["Transactions"]
    }),
    getTransaction: builder.query<Transaction, number>({
      query: (id) => `/transactions/${id}`,
      providesTags: ["Transactions"]
    }),
    addTransaction: builder.mutation<
      Transaction, Omit<Transaction, "id" | "createdAt" | "user">
    >({
      query: (body) => ({
        url: "/transactions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Transactions"]
    }),
    updateTransaction: builder.mutation<
      Transaction, Partial<Omit<Transaction, "createdAt" | "user">>
    >({
      query: (body) => ({
        url: `/transactions/${body.id}`,
        method: `PUT`,
        body
      }),
      invalidatesTags: ["Transactions"]
    }),
    deleteTransaction: builder.mutation<
      Transaction, number
    >({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Transactions"]
    })
  })
});

export const {
  useAddTransactionMutation,
  useAddUserMutation,
  useDeleteTransactionMutation,
  useDeleteUserMutation,
  useGetTransactionQuery,
  useGetTransactionsQuery,
  useGetUserQuery,
  useUpdateTransactionMutation,
  useLoginUserMutation,
  useUpdateUserMutation
} = trackerApi;