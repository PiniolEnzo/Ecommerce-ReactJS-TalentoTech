import { useAuth } from "@/contexts/AuthProvider";

export default function Account() {
  const { user, isAdmin } = useAuth();

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Mi cuenta</h2>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <div>
          <span className="text-sm text-gray-500">Nombre</span>
          <p className="font-medium">{user?.name}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Email</span>
          <p className="font-medium">{user?.email}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Rol</span>
          <p className="font-medium">
            {isAdmin ? "Administrador" : "Cliente"}
          </p>
        </div>
      </div>
    </div>
  );
}
