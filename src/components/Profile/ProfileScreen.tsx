import React from 'react';
import { Edit, MapPin, Phone, Mail, CreditCard, ShoppingBag, Bell, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: MapPin, label: 'UBICACIONES', subtitle: 'Cbba | Av. Circunvalación' },
    { icon: Phone, label: 'Número de teléfono', subtitle: '74342342' },
    { icon: Mail, label: 'E-mail', subtitle: 'example@gmail.com' },
    { icon: CreditCard, label: 'Billetera', subtitle: '' },
    { icon: ShoppingBag, label: 'Mis pedidos', subtitle: '' },
    { icon: Bell, label: 'Notificaciones', subtitle: '' },
    { icon: HelpCircle, label: 'Información legal', subtitle: '' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#E07A5F] px-4 py-6 text-white">
        <h1 className="text-xl font-semibold mb-4">¡Bienvenido @user!</h1>
        
        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full overflow-hidden">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>
                )}
              </div>
              <div>
                <p className="font-semibold">Perfil</p>
                <p className="text-white/80 text-sm">{user?.name || 'Mateo Araka'}</p>
              </div>
            </div>
            <button className="text-white">
              <Edit size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-6">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} className="text-gray-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{item.label}</p>
                  {item.subtitle && (
                    <p className="text-gray-600 text-sm">{item.subtitle}</p>
                  )}
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Actividad</h3>
          
          <div className="space-y-1">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-4">
                <CreditCard size={20} className="text-gray-600" />
                <span className="font-medium text-gray-900">Billetera</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-4">
                <ShoppingBag size={20} className="text-gray-600" />
                <span className="font-medium text-gray-900">Mis pedidos</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Configuración</h3>
          
          <div className="space-y-1">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-4">
                <Bell size={20} className="text-gray-600" />
                <span className="font-medium text-gray-900">Notificaciones</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-4">
                <HelpCircle size={20} className="text-gray-600" />
                <span className="font-medium text-gray-900">Información legal</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 mt-8 p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};