import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner"; // Assumindo que LoadingSpinner está no mesmo diretório

const FakePaymentForm = ({ plan, onSubmit, onClose, submitting }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "", // Simulação de campo de cartão
    expiryDate: "", // Simulação de data de expiração
    cvv: "", // Simulação de CVV
    pixKey: "", // Simulação de chave Pix
    paymentMethod: "card", // 'card' ou 'pix'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentMethodChange = (method) => {
    setFormData({ ...formData, paymentMethod: method });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar validações básicas se quiser, mas para simulação não é estrito
    onSubmit(formData); // Chama a função onSubmit passada pelo componente pai (ChoosePlan)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={submitting}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Assinar {plan.name}
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Valor:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(plan.price)}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Seleção do Método de Pagamento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Método de Pagamento
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handlePaymentMethodChange("card")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  formData.paymentMethod === "card"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Cartão de Crédito
              </button>
              <button
                type="button"
                onClick={() => handlePaymentMethodChange("pix")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  formData.paymentMethod === "pix"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Pix
              </button>
            </div>
          </div>

          {/* Campos do Método de Pagamento Selecionado */}
          {formData.paymentMethod === "card" && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Número do Cartão (Fake)
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required={formData.paymentMethod === "card"}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Data Exp. (MM/AA Fake)
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required={formData.paymentMethod === "card"}
                    placeholder="MM/AA"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVV (Fake)
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    required={formData.paymentMethod === "card"}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </div>
            </div>
          )}

          {formData.paymentMethod === "pix" && (
            <div>
              <label
                htmlFor="pixKey"
                className="block text-sm font-medium text-gray-700"
              >
                Chave Pix (Fake)
              </label>
              <input
                type="text"
                id="pixKey"
                name="pixKey"
                value={formData.pixKey}
                onChange={handleChange}
                required={formData.paymentMethod === "pix"}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              disabled={submitting}
            >
              {submitting ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                <CheckCircle className="mr-2 h-5 w-5" />
              )}
              {submitting
                ? "Processando Pagamento..."
                : "Confirmar Assinatura (Simulado)"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FakePaymentForm;
