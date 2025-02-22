"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const URL_LOGIN = "/api/login";
const URL_SIGNUP = "/api/signup";

export default function AuthForm({ isSignup }: { isSignup: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignup && password !== rePassword) {
      setError("Passwords do not match");
      return;
    }
    
    const response = await fetch(isSignup ? URL_SIGNUP : URL_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isSignup ? { email, username, password } : { email, password }),
    });

    if (!response.ok) {
      setError("Authentication failed");
      return;
    }

    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">{isSignup ? "Sign Up" : "Login"}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
        {isSignup && (
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
            />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
          />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
          />
        {isSignup && (
            <input
            type="password"
            placeholder="Re-enter Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
            />
        )}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          {isSignup ? "Sign Up" : "Login"}
        </button>
        </div>
      </form>
    </div>
  );
}