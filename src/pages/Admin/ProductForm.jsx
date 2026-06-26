import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById, createProduct, updateProduct } from "@/services/productService";
import { useAuth } from "@/contexts/AuthProvider";
import Spinner from "@/components/ui/Spinner";
import toast from "react-hot-toast";

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
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.price.trim()) errs.price = "Price is required";
    else if (isNaN(Number(form.price)) || Number(form.price) <= 0)
      errs.price = "Invalid price";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.category) errs.category = "Select a category";
    if (!form.image.trim()) errs.image = "Image URL is required";
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
        toast.success("Product updated");
      } else {
        await createProduct(payload, token);
        toast.success("Product created");
      }
      navigate("/admin/products");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingProduct) {
    return <Spinner text="Loading product..." />;
  }

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-6">
        {isEdit ? "Edit product" : "New product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {apiError && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg text-sm">
            {apiError}
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.title
                ? "border-red-300 focus:ring-red-400"
                : "border-gray-200 focus:ring-nexo-400 focus:border-nexo-400"
            }`}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1.5">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.price
                ? "border-red-300 focus:ring-red-400"
                : "border-gray-200 focus:ring-nexo-400 focus:border-nexo-400"
            }`}
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors bg-white ${
              errors.category
                ? "border-red-300 focus:ring-red-400"
                : "border-gray-200 focus:ring-nexo-400 focus:border-nexo-400"
            }`}
          >
            <option value="">Select...</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1.5">
            Image URL
          </label>
          <input
            id="image"
            name="image"
            type="url"
            value={form.image}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.image
                ? "border-red-300 focus:ring-red-400"
                : "border-gray-200 focus:ring-nexo-400 focus:border-nexo-400"
            }`}
            placeholder="https://..."
          />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.description
                ? "border-red-300 focus:ring-red-400"
                : "border-gray-200 focus:ring-nexo-400 focus:border-nexo-400"
            }`}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-nexo-600 text-white rounded-lg hover:bg-nexo-700 disabled:opacity-50 text-sm font-medium transition-colors"
          >
            {submitting ? "Saving..." : isEdit ? "Save changes" : "Create product"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
