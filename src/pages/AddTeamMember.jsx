"use client";

import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserPlus, X, ArrowLeft } from "lucide-react";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const AddTeamMember = () => {
  const [email, setEmail] = useState("");
  const [addingMember, setAddingMember] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Por favor, insira o email do usuário.");
      return;
    }

    setAddingMember(true);
    try {
      const response = await api.post(`/teams/${id}/members`, { email: email });
      toast.success("Membro adicionado com sucesso!");
      setEmail(""); // Limpa o input após sucesso
      // navigate(`/teams/${id}`); // Pode remover este se preferir ficar na página para adicionar mais
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
      const message =
        error.response?.data?.message || "Erro ao adicionar membro";
      toast.error(message);
    } finally {
      setAddingMember(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => navigate(`/teams/${id}`)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Adicionar Membro</h1>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Adicionar membro por email</h3>
          </div>
          <div className="card-content">
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email do Usuário
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="nome@exemplo.com"
                  className="input mt-1 w-full"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!email || addingMember}
                  className="btn btn-primary btn-lg"
                >
                  {addingMember ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Adicionando...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5 mr-2" />
                      Adicionar Membro
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Opcional: Link para voltar */}
        <div className="mt-6 text-center">
          <Link
            to={`/teams/${id}`}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar e Voltar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMember;
