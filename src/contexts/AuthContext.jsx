"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userData = await authService.getProfile();
          setUser(userData.user);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      localStorage.setItem("token", response.token);
      setUser(response.user);
      toast.success("Login realizado com sucesso!");
      return response;
    } catch (error) {
      const message = error.response?.data?.message || "Erro ao fazer login";
      toast.error(message);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await authService.register(name, email, password);
      localStorage.setItem("token", response.token);
      setUser(response.user);
      toast.success("Conta criada com sucesso!");
      return response;
    } catch (error) {
      const message = error.response?.data?.message || "Erro ao criar conta";
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logout realizado com sucesso!");
  };

  // Nova função para atualizar o estado do usuário
  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser, // Adicionar a nova função ao contexto
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
