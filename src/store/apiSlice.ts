import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://products-api-hfoe.onrender.com/api/";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "orders",
        method: "POST",
        body: newOrder,
      }),
    }),
    getOrderByReference: builder.query({
      query: (reference) => `orders/${reference}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery, useCreateOrderMutation, useGetOrderByReferenceQuery } = apiSlice;