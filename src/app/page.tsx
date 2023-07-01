"use client";

import { api } from "../../convex/_generated/api";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  const session = useConvexAuth();
  const createTodo = useMutation(api.todos.create);
  const todos = useQuery(api.todos.get, undefined);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center dark:bg-gray-900 dark:text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {session.isAuthenticated ? (
          <>
            <button
              className="rounded bg-green-200 px-3 py-2 text-lg text-gray-800"
              onClick={async () => {
                await createTodo({ text: "hello world" }).catch(console.error);
              }}
            >
              Create a Todo
            </button>

            {todos?.map((todo) => (
              <div key={todo._id}>{todo.text}</div>
            ))}

            <button
              className="rounded bg-white px-3 py-2 text-lg text-gray-800"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            className="rounded bg-white px-3 py-2 text-lg text-gray-800"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
    </main>
  );
}
