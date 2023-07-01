# Next with Convex and Next-Auth

This is a work in progress. Do not use in production, only use as a reference.

## Goals

I'm trying to find a way to setup next using next-auth to allow google login. In order to achieve this, I had to create a next-auth adapter for Convex for storing the users, accounts, and sessions. The issue with this setup is that on the next API side, we can easily just check the cookies, get the session token, and lookup the user session in our users table. But since we want to use convex for our backend, it wouldn't make sense to create various next api endpoints just to invoke convex actions and mutations.

The approach I'm taking is to treat our next application like an authentication service which will give users a JWT token which they can send to Convex. We'd then verify the JWTs in convex. By trying this, I'm running into more issues because crypto related helper functions do not work in convex mutations, so basically a user can not invoke any public facing action, and instead all interactions with the convex api must be via mutation with the nodejs runtime.
