import { useState } from "react";

const API_URL = "http://localhost:5000/api/user";

export function useAuth() {
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    setError("");
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data: { error?: string; token?: string } = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao fazer login");
      if (data.token) {
        document.cookie = `token=${data.token}; path=/`;
      }
      return data.token;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    }
  };

  return { login, error };
}