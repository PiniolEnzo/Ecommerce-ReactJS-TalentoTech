import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import toast from "react-hot-toast";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "El nombre es obligatorio";
    if (!form.email.trim()) errs.email = "El email es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email inválido";
    if (!form.password) errs.password = "La contraseña es obligatoria";
    else if (form.password.length < 6) errs.password = "Mínimo 6 caracteres";
    if (form.password !== form.confirm) errs.confirm = "Las contraseñas no coinciden";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Cuenta creada exitosamente");
      navigate("/");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Crear cuenta</h2>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
            {apiError}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.name ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.email ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="user@ejemplo.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.password ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar contraseña
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            value={form.confirm}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.confirm ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          {submitting ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Iniciá sesión
        </Link>
      </p>
    </div>
  );
}
