"use client";
import { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { AuthProvider } from "../../../contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthProvider>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
        {isLogin ? <LoginForm /> : <RegisterForm onRegisterSuccess={() => setIsLogin(true)} />}
        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Não tem uma conta? Cadastre-se" : "Já tem uma conta? Faça login"}
        </Button>
      </div>
    </AuthProvider>
  );
}
