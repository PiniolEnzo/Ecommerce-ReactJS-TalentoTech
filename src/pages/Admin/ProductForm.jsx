import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById, createProduct, updateProduct } from "@/services/productService";
import { useAuth } from "@/contexts/AuthProvider";

const CATEGORIES = [
  "men's clothing",
  "women's clothing",
  "electronics",
  "jewelery",
];

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [loadingProduct, setLoadingProduct] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  /* Cargar producto existente si estamos editando */
  useEffect(() => {
    if (!isEdit) return;
    fetchProductById(id)
      .then((p) => {
        setForm({
          title: p.title,
          price: String(p.price),
          description: p.description,
          category: p.category,
          image: p.image,
        });
      })
      .catch((err) => setApiError(err.message))
      .finally(() => setLoadingProduct(false));
  }, [id, isEdit]);

  function validate() {
    const errs = {};
    if (!form.title.trim()) errs.title = "El título es obligatorio";
    if (!form.price.trim()) errs.price = "El precio es obligatorio";
    else if (isNaN(Number(form.price)) || Number(form.price) <= 0)
      errs.price = "Precio inválido";
    if (!form.description.trim()) errs.description = "La descripción es obligatoria";
    if (!form.category) errs.category = "Seleccioná una categoría";
    if (!form.image.trim()) errs.image = "La URL de la imagen es obligatoria";
    return errs;
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const payload = {
      title: form.title.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      category: form.category,
      image: form.image.trim(),
      rating: 0,
    };

    setSubmitting(true);
    try {
      if (isEdit) {
        await updateProduct(id, payload, token);
      } else {
        await createProduct(payload, token);
      }
      navigate("/admin/products");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingProduct) {
    return <div className="text-center py-10 text-gray-500">Cargando producto...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-6">
        {isEdit ? "Editar producto" : "Nuevo producto"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
            {apiError}
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.title ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.price ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white ${
              errors.category ? "border-red-400" : "border-gray-300"
            }`}
          >
            <option value="">Seleccionar...</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            URL de la imagen
          </label>
          <input
            id="image"
            name="image"
            type="url"
            value={form.image}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.image ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="https://..."
          />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.description ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 text-sm font-medium"
          >
            {submitting ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear producto"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
