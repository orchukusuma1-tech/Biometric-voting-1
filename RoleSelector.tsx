import { Users, ShieldCheck, Eye, BarChart3, Fingerprint } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface RoleSelectorProps {
  onSelectRole: (role: string) => void;
}

export function RoleSelector({ onSelectRole }: RoleSelectorProps) {
  const roles = [
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage the system, monitor election data, and ensure platform security',
      icon: ShieldCheck,
      color: 'text-red-600'
    },
    {
      id: 'citizen',
      title: 'Citizen',
      description: 'Track election processes, report issues, and engage in civic discussions',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: 'observer',
      title: 'Election Observer',
      description: 'Monitor election activities, report anomalies, and provide insights',
      icon: Eye,
      color: 'text-green-600'
    },
    {
      id: 'analyst',
      title: 'Data Analyst',
      description: 'Analyze election data, generate reports, and provide real-time updates',
      icon: BarChart3,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Election Monitoring System</h1>
          <p className="text-xl text-gray-600">Ensuring Fair and Transparent Elections</p>
          <p className="text-sm text-gray-500 mt-2">Select your role to continue</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
            <Fingerprint className="h-4 w-4 text-purple-600" />
            <span className="text-sm text-purple-900">Powered by Biometric Verification</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card 
                key={role.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-indigo-300"
                onClick={() => onSelectRole(role.id)}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full bg-gray-50 ${role.color}`}>
                      <Icon className="h-10 w-10" />
                    </div>
                  </div>
                  <CardTitle>{role.title}</CardTitle>
                  <CardDescription className="min-h-[60px]">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Enter as {role.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm">System Status: Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}