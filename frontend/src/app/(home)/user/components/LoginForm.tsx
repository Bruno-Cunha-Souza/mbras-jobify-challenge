"use client";
import { useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuth();
  const { setToken } = useAuthContext();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      setToken(token ?? null);
      router.push("/");
    } catch {
      // Error already handled in the hook
    }
  };

  return (
    <Card className="w-full container mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
