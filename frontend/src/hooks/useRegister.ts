import { useState } from "react";

const API_URL = "http://localhost:5000/api/user";

export function useRegister() {
  const [error, setError] = useState("");

  const register = async (email: string, password: string, name: string) => {
    setError("");
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data: { error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao registrar");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    }
  };

  return { register, error };
}