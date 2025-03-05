'use client';

import { Toast } from '@/components/Toast/Toast';
import { useSession } from 'next-auth/react';
import { useState } from 'react';


export default function Profile() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    bDate: '',
    phone: '',
    address: '',
    role: '',
    dni: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/update-user/${session?.user?.email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Toast.fire({
          icon: 'success',
          title: 'Datos actualizados con éxito',
        });
      } else {
        throw new Error('Error al actualizar datos');
      }
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: 'error',
        title: 'Error al actualizar datos',
        text: 'Por favor, intenta nuevamente.',
      });
    }
  };

  if (!session) return <p className="text-center text-primary">Cargando...</p>;

  return (
    <div className="relative flex justify-center items-center min-h-screen -mt-5 pb-8">
      <div className="absolute inset-0 bg-[url('/assets/Profile.jpg')] bg-cover bg-center before:absolute before:inset-0 before:bg-black/60"></div>

      <div className="relative bg-secondary p-8 mt-12 rounded-2xl whiteShadow w-full max-w-xl">
        <h2 className="text-primary text-3xl font-holtwood text-center mb-6">COMPLETA TU PERFIL</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-primary font-holtwood text-sm">Fecha de Nacimiento:</label>
              <input
                type="date"
                name="bDate"
                onChange={handleChange}
                className="w-full border-2 border-tertiary p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="text-primary font-holtwood text-sm">Teléfono:</label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                className="w-full border-2 border-tertiary p-2 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-primary font-holtwood text-sm">Dirección:</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              className="w-full border-2 border-tertiary p-2 rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-primary font-holtwood text-sm">Rol:</label>
              <select
                name="role"
                onChange={handleChange}
                className="w-full border-2 border-tertiary p-2 rounded-md"
                required
              >
                <option value="">Elige tu rol</option>
                <option value="USER_MEMBER">Cliente</option>
                <option value="USER_TRAINING">Entrenador</option>
              </select>
            </div>

            <div>
              <label className="text-primary font-holtwood text-sm">DNI:</label>
              <input
                type="text"
                name="dni"
                onChange={handleChange}
                className="w-full border-2 border-tertiary p-2 rounded-md"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-tertiary text-primary font-holtwood py-2 px-4 rounded-md hover:shadow-md transition"
          >
            GUARDAR
          </button>
        </form>
      </div>
    </div>
  );
}
