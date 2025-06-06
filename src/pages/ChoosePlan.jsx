"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";
import FakePaymentForm from "../components/FakePaymentForm";
import { useAuth } from "../contexts/AuthContext";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";

const ChoosePlan = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  useEffect(() => {
    console.log("ChoosePlan: Iniciando busca por planos...");
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await api.get("/plans");
      console.log("ChoosePlan: Resposta da API de planos:", response);
      if (response && response.data && Array.isArray(response.data.plans)) {
        setPlans(response.data.plans);
        console.log(
          "ChoosePlan: Planos setados no estado:",
          response.data.plans
        );
      } else {
        console.error(
          "ChoosePlan: Resposta inesperada ao buscar planos:",
          response
        );
        toast.error("Erro ao carregar planos disponíveis.");
        setPlans([]); // Garantir que plans seja um array mesmo em caso de erro
      }
    } catch (error) {
      console.error("ChoosePlan: Erro ao buscar planos:", error);
      toast.error(error.response?.data?.message || "Erro ao carregar planos.");
      setPlans([]); // Garantir que plans seja um array em caso de erro
    } finally {
      setLoading(false);
      console.log("ChoosePlan: Carregamento de planos finalizado."); // Log de depuração
    }
  };

  // Função chamada ao clicar em um card de plano
  const handlePlanCardClick = (plan) => {
    setSelectedPlan(plan); // Define o plano selecionado para exibir o formulário
  };

  // Função chamada ao submeter o formulário de pagamento fake
  const handleFakePaymentSubmit = async (paymentDetails) => {
    // paymentDetails conterá os dados do formulário (nome, email, etc.)
    console.log("Detalhes de pagamento simulados:", paymentDetails); // Apenas logar por enquanto

    if (!selectedPlan) return; // Garantir que há um plano selecionado

    setSubscribing(true);
    try {
      // Chamada para o endpoint backend para selecionar o plano real
      const response = await api.post("/plans/select", {
        planId: selectedPlan.id,
      }); // Capturar a resposta

      console.log("ChoosePlan: Resposta do select plan:", response); // Log de depuração

      if (response && response.data && response.data.user) {
        updateUser(response.data.user); // Atualizar o estado do usuário no contexto
        console.log("ChoosePlan: Estado do usuário atualizado com plano."); // Log de depuração
      }

      toast.success("Plano selecionado com sucesso!");
      // Redirecionar o usuário após a seleção (ex: para o dashboard)
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao selecionar plano:", error);
      toast.error(error.response?.data?.message || "Erro ao selecionar plano.");
    } finally {
      setSubscribing(false);
      setSelectedPlan(null); // Fechar o formulário após tentar assinar
    }
  };

  const handleClosePaymentForm = () => {
    setSelectedPlan(null); // Fechar o formulário
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="text-center mt-8 text-gray-600">
        Nenhum plano disponível no momento.
      </div>
    );
  }

  // Função para formatar o preço em BRL
  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <AnimatedPage>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-4 py-12"
      >
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Escolha seu Plano
        </h1>
        <div className="flex flex-wrap justify-center gap-8">
          {console.log(
            "ChoosePlan: Conteúdo da array plans antes do map:",
            plans
          )}{" "}
          {/* Log de depuração */}
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => handlePlanCardClick(plan)} // Novo handler para abrir o formulário
              className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm w-full transition-transform transform hover:scale-105 cursor-pointer"
            >
              <div className="bg-blue-600 text-white text-center py-6">
                <h2 className="text-2xl font-semibold">{plan.name}</h2>
                <p className="text-sm mt-1 capitalize">
                  {plan.duration === "monthly"
                    ? "Assinatura Mensal"
                    : plan.duration === "annual"
                    ? "Assinatura Anual"
                    : plan.duration}
                </p>
              </div>
              <div className="p-8">
                {/* Conteúdo de benefícios - Adapte conforme necessário */}
                <ul className="space-y-4 text-gray-700 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="text-blue-500 mr-3" size={20} />
                    Ate 5 Times e 100 Tarefas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-blue-500 mr-3" size={20} />{" "}
                    Benefício Exemplo 2
                  </li>
                  {/* Adicione mais benefícios aqui */}
                </ul>

                {/* Seção de Preço */}
                <div className="text-center mb-8">
                  {/* Exemplo de preço com desconto, se aplicável */}
                  {/* <p className="text-sm text-gray-500 line-through">De {formatPrice(plan.originalPrice)}</p> */}
                  <p className="text-4xl font-bold text-gray-900">
                    {formatPrice(plan.price)}
                  </p>
                  <p className="text-md text-gray-600 mt-1">
                    /
                    {plan.duration === "monthly"
                      ? "mês"
                      : plan.duration === "annual"
                      ? "ano"
                      : plan.duration}
                  </p>
                </div>

                {/* Botão de Selecionar Plano */}
                <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors md:py-4 md:text-lg md:px-10">
                  Selecionar Plano (Simulado)
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Renderiza o formulário de pagamento fake se um plano estiver selecionado */}
        {selectedPlan && (
          <FakePaymentForm
            plan={selectedPlan}
            onSubmit={handleFakePaymentSubmit}
            onClose={handleClosePaymentForm}
            submitting={subscribing} // Passa o estado de submissão para desabilitar o botão
          />
        )}
      </motion.div>
    </AnimatedPage>
  );
};

export default ChoosePlan;
