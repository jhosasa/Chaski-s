import React from 'react';
import { Edit, MapPin, Phone, Mail, CreditCard, ShoppingBag, Bell, HelpCircle, LogOut, ChevronRight, Save, X, Shield, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface ProfileScreenProps {
  onViewProfile?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onViewProfile }) => {
  const { user, supabaseUser, logout, updateUserProfile, updatePassword } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedAddress, setEditedAddress] = React.useState(user?.address || 'Cbba | Av. Circunvalación');
  const [editedPhone, setEditedPhone] = React.useState(user?.phoneNumber || '74342342');
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  
  // Password setup state
  const [showPasswordSetup, setShowPasswordSetup] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [passwordSuccess, setPasswordSuccess] = React.useState('');

  // Check if user registered with Google
  const isGoogleUser = supabaseUser?.app_metadata?.provider === 'google';

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      await updateUserProfile({
        address: editedAddress,
        phone_number: editedPhone
      });
      setMessage('Perfil actualizado correctamente');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error al actualizar el perfil');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedAddress(user?.address || 'Cbba | Av. Circunvalación');
    setEditedPhone(user?.phoneNumber || '74342342');
    setIsEditing(false);
    setMessage('');
  };

  const handlePasswordSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    // Validation
    if (newPassword.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword(newPassword);
      setPasswordSuccess('Contraseña creada correctamente. Ahora puedes iniciar sesión con tu email y contraseña.');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordSetup(false);
      setTimeout(() => setPasswordSuccess(''), 5000);
    } catch (error) {
      console.error('Error setting password:', error);
      setPasswordError('Error al crear la contraseña. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const menuItems = [
    { icon: MapPin, label: 'UBICACIONES', subtitle: editedAddress, editable: true },
    { icon: Phone, label: 'Número de teléfono', subtitle: editedPhone, editable: true },
    { icon: Mail, label: 'E-mail', subtitle: supabaseUser?.email || user?.email || 'example@gmail.com', editable: false },
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
        
        {/* Success/Error Messages */}
        {message && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            <p className="text-sm">{message}</p>
          </div>
        )}

        {passwordSuccess && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800">
            <p className="text-sm">{passwordSuccess}</p>
          </div>
        )}
        
        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
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
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="text-white hover:text-green-200 disabled:opacity-50"
                  >
                    <Save size={20} />
                  </button>
                  <button 
                    onClick={handleCancelEdit}
                    className="text-white hover:text-red-200"
                  >
                    <X size={20} />
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-white hover:text-gray-200"
                >
                  <Edit size={20} />
                </button>
              )}
            </div>
          </div>
          
          {/* Ver perfil button */}
          <button
            onClick={onViewProfile}
            className="w-full flex items-center justify-center gap-2 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
          >
            <User size={16} />
            <span className="text-sm font-medium">Ver perfil</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-6">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} className="text-gray-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{item.label}</p>
                  {item.editable && isEditing ? (
                    <input
                      type="text"
                      value={item.label === 'UBICACIONES' ? editedAddress : editedPhone}
                      onChange={(e) => {
                        if (item.label === 'UBICACIONES') {
                          setEditedAddress(e.target.value);
                        } else {
                          setEditedPhone(e.target.value);
                        }
                      }}
                      className="mt-1 px-2 py-1 border border-gray-300 rounded text-sm w-full max-w-xs"
                    />
                  ) : (
                    item.subtitle && (
                      <p className="text-gray-600 text-sm">{item.subtitle}</p>
                    )
                  )}
                </div>
              </div>
              {!item.editable && <ChevronRight size={20} className="text-gray-400" />}
            </div>
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

        {/* Password Setup Section for Google Users */}
        {isGoogleUser && (
          <div className="mt-8 pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Seguridad</h3>
            
            {!showPasswordSetup ? (
              <button
                onClick={() => setShowPasswordSetup(true)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Shield size={20} className="text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Crear contraseña</p>
                    <p className="text-gray-600 text-sm">Permite iniciar sesión con email y contraseña</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Crear nueva contraseña</h4>
                  <button
                    onClick={() => {
                      setShowPasswordSetup(false);
                      setPasswordError('');
                      setNewPassword('');
                      setConfirmPassword('');
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handlePasswordSetup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nueva contraseña
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmar contraseña
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repite la contraseña"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent"
                      required
                    />
                  </div>
                  
                  {passwordError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-600 text-sm">{passwordError}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isLoading || !newPassword || !confirmPassword}
                    className="w-full bg-[#E07A5F] text-white py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E07A5F]/90 transition-colors"
                  >
                    {isLoading ? 'Creando contraseña...' : 'Crear contraseña'}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

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