"use client";
import { useState } from "react";
import { useRegister } from "../../../../hooks/useRegister";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RegisterForm({ onRegisterSuccess }: { onRegisterSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { register, error } = useRegister();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      onRegisterSuccess();
    } catch {
      // Error already handled in the hook
    }
  };

  return (
    <Card className="w-full container mx-auto">
      <CardHeader>
        <CardTitle>Cadastro</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            Cadastrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
