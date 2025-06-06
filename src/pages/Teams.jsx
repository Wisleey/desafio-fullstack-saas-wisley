"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { teamService } from "../services/teamService";
import LoadingSpinner from "../components/LoadingSpinner";
import TeamCard from "../components/TeamCard";
import toast from "react-hot-toast";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      setLoading(true);
      const response = await teamService.getTeams();
      setTeams(response.teams);
    } catch (error) {
      toast.error("Erro ao carregar times");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setCreating(true);
    try {
      await teamService.createTeam(data.name);
      toast.success("Time criado com sucesso!");
      reset();
      setShowCreateForm(false);
      loadTeams();
    } catch (error) {
      toast.error("Erro ao criar time");
    } finally {
      setCreating(false);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Times</h1>
          <p className="text-gray-600">
            Gerencie seus times e colabore com sua equipe
          </p>
        </div>

        <button
          onClick={() => setShowCreateForm(true)}
          className="btn btn-primary btn-md"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Time
        </button>
      </div>

      {/* Create Team Form */}
      {showCreateForm && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Criar Novo Time</h3>
          </div>
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
                  {...register("name", {
                    required: "Nome do time é obrigatório",
                    minLength: {
                      value: 2,
                      message: "Nome deve ter pelo menos 2 caracteres",
                    },
                  })}
                  type="text"
                  className="input mt-1"
                  placeholder="Digite o nome do time"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={creating}
                  className="btn btn-primary btn-md"
                >
                  {creating ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Criando...
                    </>
                  ) : (
                    "Criar Time"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    reset();
                  }}
                  className="btn btn-outline btn-md"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teams Grid */}
      {teams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <Plus className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Nenhum time
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Comece criando um novo time para colaborar com sua equipe.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn btn-primary btn-md"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar primeiro time
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
