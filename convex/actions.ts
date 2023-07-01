"use node";

import { action } from "./_generated/server";
import { api } from "./_generated/api";
import jwt from "jsonwebtoken";

export const createTodo = action(
  async (
    { runMutation, auth },
    { text, sessionToken }: { text: string; sessionToken: string }
  ) => {
    console.log("user identity", await auth.getUserIdentity());
    // verify session token
    console.log(sessionToken);
    const decoded = jwt.verify(sessionToken, "my-password");
    console.log(decoded);

    await runMutation(api.todos.create, {
      text,
    });
  }
);
