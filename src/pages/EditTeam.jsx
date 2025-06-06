"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Save, X, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { teamService } from "../services/teamService";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const EditTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadTeam();
  }, [id]);

  const loadTeam = async () => {
    try {
      setLoading(true);
      const response = await teamService.getTeamById(id);
      if (response && response.data) {
        reset(response.data); // Preencher formulário com dados do time
      } else {
        console.error(
          "Resposta vazia ou inválida ao carregar time para edição:",
          response
        );
        toast.error("Erro ao carregar dados do time para edição.");
        navigate(`/teams/${id}`); // Voltar para detalhes se falhar
      }
    } catch (error) {
      console.error("Erro ao carregar time para edição:", error);
      const message =
        error.response?.status === 404
          ? "Time não encontrado para edição"
          : "Erro ao carregar time para edição";
      toast.error(message);
      navigate(`/teams/${id}`); // Voltar para detalhes se falhar
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await teamService.updateTeam(id, data);
      toast.success("Time atualizado com sucesso!");
      navigate(`/teams/${id}`); // Voltar para detalhes após salvar
    } catch (error) {
      console.error("Erro ao atualizar time:", error);
      const message = error.response?.data?.message || "Erro ao atualizar time";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-gray-900">Editar Time</h1>
        </div>

        <div className="card">
          <div className="card-content">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome do Time
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Nome do time é obrigatório",
                    minLength: {
                      value: 2,
                      message: "Nome deve ter pelo menos 2 caracteres",
                    },
                    maxLength: {
                      value: 100,
                      message: "Nome deve ter no máximo 100 caracteres",
                    },
                  })}
                  className="input mt-1 w-full"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descrição (Opcional)
                </label>
                <textarea
                  id="description"
                  {...register("description", {
                    maxLength: {
                      value: 1000,
                      message: "Descrição deve ter no máximo 1000 caracteres",
                    },
                  })}
                  rows="4"
                  className="textarea mt-1 w-full"
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="flex space-x-3 justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary btn-lg"
                >
                  {saving ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Salvar Alterações
                    </>
                  )}
                </button>
                <Link
                  to={`/teams/${id}`}
                  className="btn btn-outline btn-lg flex items-center"
                >
                  <X className="h-5 w-5 mr-2" />
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTeam;
