import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { RoleSelector } from './components/RoleSelector';
import { AdminDashboard } from './components/AdminDashboard';
import { CitizenDashboard } from './components/CitizenDashboard';
import { ObserverDashboard } from './components/ObserverDashboard';
import { AnalystDashboard } from './components/AnalystDashboard';

export default function App() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSelectRole = (role: string) => {
    setSelectedRole(role);
  };

  const handleLogout = () => {
    setSelectedRole(null);
  };

  const renderDashboard = () => {
    switch (selectedRole) {
      case 'admin':
        return <AdminDashboard onLogout={handleLogout} />;
      case 'citizen':
        return <CitizenDashboard onLogout={handleLogout} />;
      case 'observer':
        return <ObserverDashboard onLogout={handleLogout} />;
      case 'analyst':
        return <AnalystDashboard onLogout={handleLogout} />;
      default:
        return <RoleSelector onSelectRole={handleSelectRole} />;
    }
  };

  return (
    <>
      {renderDashboard()}
      <Toaster />
    </>
  );
}
