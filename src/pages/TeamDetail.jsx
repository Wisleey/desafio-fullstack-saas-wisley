"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Plus, UserPlus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { teamService } from "../services/teamService";
import LoadingSpinner from "../components/LoadingSpinner";
import TaskCard from "../components/TaskCard";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddMember, setShowAddMember] = useState(false);
  const [addingMember, setAddingMember] = useState(false);

  const MySwal = withReactContent(Swal);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    loadTeam();
  }, [id]);

  const loadTeam = async () => {
    try {
      setLoading(true);
      const response = await teamService.getTeamById(id);
      if (response && response.data) {
        setTeam(response.data);
      } else {
        console.error("Resposta vazia ou inválida ao carregar time:", response);
        toast.error("Time não encontrado ou dados inválidos.");
        navigate("/teams");
      }
    } catch (error) {
      console.error("Erro ao carregar time:", error);
      const message =
        error.response?.status === 404
          ? "Time não encontrado"
          : "Erro ao carregar time";
      toast.error(message);
      navigate("/teams");
    } finally {
      setLoading(false);
    }
  };

  const onAddMember = async (data) => {
    setAddingMember(true);
    try {
      await teamService.addMember(id, data.email);
      toast.success("Membro adicionado com sucesso!");
      reset();
      setShowAddMember(false);
      loadTeam();
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
      const message =
        error.response?.data?.message || "Erro ao adicionar membro";
      toast.error(message);
    } finally {
      setAddingMember(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    const result = await MySwal.fire({
      title: "Remover membro?",
      text: "Tem certeza que deseja remover este membro da equipe?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sim, remover",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await teamService.removeMember(id, memberId);
        toast.success("Membro removido com sucesso!");
        loadTeam();
      } catch (error) {
        console.error("Erro ao remover membro:", error);
        toast.error("Erro ao remover membro");
      }
    }
  };

  const getTasksByStatus = (status) => {
    return team?.tasks?.filter((task) => task.status === status) || [];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Data inválida";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Data inválida";
    return date.toLocaleDateString("pt-BR");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!team && !loading) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">
          Time não encontrado
        </h3>
        <p className="text-gray-500">
          O time que você está procurando não existe ou foi removido.
        </p>
        <Link to="/teams" className="btn btn-primary btn-lg mt-4">
          Voltar para Times
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/teams")}
          className="p-3 text-gray-400 hover:text-gray-600 transition-colors rounded-lg"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{team.name}</h1>
          <p className="text-gray-600">
            Criado em {formatDate(team.createdAt)}
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddMember(true)}
            className="btn btn-outline btn-lg"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Adicionar Membro
          </button>
          <Link
            to={`/tasks/create/${team.id}`}
            className="btn btn-primary btn-lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nova Tarefa
          </Link>
        </div>
      </div>

      {/* Add Member Form */}
      {showAddMember && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Adicionar Membro</h3>
          </div>
          <div className="card-content">
            <form onSubmit={handleSubmit(onAddMember)} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email do usuário
                </label>
                <input
                  {...register("email", {
                    required: "Email é obrigatório",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email inválido",
                    },
                  })}
                  type="email"
                  className="input mt-1 w-full"
                  placeholder="usuario@exemplo.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex space-x-3 justify-end">
                <button
                  type="submit"
                  disabled={addingMember}
                  className="btn btn-primary btn-lg"
                >
                  {addingMember ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Adicionando...
                    </>
                  ) : (
                    "Adicionar"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddMember(false);
                    reset();
                  }}
                  className="btn btn-outline btn-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Info */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Membros do Time</h3>
            </div>
            <div className="card-content">
              <div className="space-y-3">
                {Array.isArray(team.members) &&
                  team.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-md font-medium text-white">
                            {member.name?.charAt(0).toUpperCase() || "?"}
                          </span>
                        </div>
                        <div>
                          <p className="text-md font-medium text-gray-900">
                            {member.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {member.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg"
                        title="Remover membro"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                {Array.isArray(team.members) && team.members.length === 0 && (
                  <p className="text-gray-500">Nenhum membro no time ainda.</p>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="card mt-6">
            <div className="card-header">
              <h3 className="card-title">Estatísticas</h3>
            </div>
            <div className="card-content">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Total de Tarefas
                  </span>
                  <span className="font-medium">{team.tasks?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pendentes</span>
                  <span className="font-medium text-yellow-600">
                    {getTasksByStatus("pendente").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Em Andamento</span>
                  <span className="font-medium text-blue-600">
                    {getTasksByStatus("andamento").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Concluídas</span>
                  <span className="font-medium text-green-600">
                    {getTasksByStatus("concluída").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Reprovadas</span>
                  <span className="font-medium text-red-600">
                    {getTasksByStatus("reprovada").length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h3 className="card-title">Tarefas do Time</h3>
                <Link
                  to={`/tasks/create/${team.id}`}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Criar nova tarefa
                </Link>
              </div>
            </div>
            <div className="card-content">
              {team.tasks && team.tasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {team.tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdate={loadTeam}
                      members={team.members}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma tarefa criada ainda</p>
                  <Link
                    to={`/tasks/create/${team.id}`}
                    className="btn btn-primary btn-md mt-4"
                  >
                    Criar primeira tarefa
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
