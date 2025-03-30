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
    <Card className="w-full container mx-auto sm:max-w-[25vw]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <form onSubmit={handleLogin} className="space-y-6 w-full">
          <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white">
            Entrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
