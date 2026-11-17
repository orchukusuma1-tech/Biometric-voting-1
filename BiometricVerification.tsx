import { useState } from 'react';
import { Fingerprint, ScanFace, Eye, Shield, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { toast } from 'sonner';

interface BiometricVerificationProps {
  onVerificationComplete?: (success: boolean, method?: string) => void;
}

export function BiometricVerification({ onVerificationComplete }: BiometricVerificationProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [confidence, setConfidence] = useState(0);

  const methods = [
    {
      id: 'fingerprint',
      name: 'Fingerprint Scan',
      icon: Fingerprint,
      description: 'Quick and reliable',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'facial',
      name: 'Facial Recognition',
      icon: ScanFace,
      description: 'Contactless verification',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'iris',
      name: 'Iris Scan',
      icon: Eye,
      description: 'Highest accuracy',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'multi-factor',
      name: 'Multi-Factor',
      icon: Shield,
      description: 'Maximum security',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const handleVerify = async (methodId: string) => {
    setSelectedMethod(methodId);
    setVerifying(true);
    setConfidence(0);

    // Simulate biometric scanning with progress
    const interval = setInterval(() => {
      setConfidence(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate verification process
    setTimeout(() => {
      clearInterval(interval);
      setVerifying(false);
      setVerified(true);
      setConfidence(98.5);
      toast.success('Biometric verification successful!');
      onVerificationComplete?.(true, methodId);
    }, 2500);
  };

  if (verified) {
    return (
      <Card className="border-green-500 border-2">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl mb-2">Verification Successful</h3>
              <p className="text-gray-600">Your identity has been confirmed</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline" className="text-lg px-4 py-2">
                Confidence: {confidence}%
              </Badge>
            </div>
            <div className="text-sm text-gray-600">
              Method: {methods.find(m => m.id === selectedMethod)?.name}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (verifying) {
    const method = methods.find(m => m.id === selectedMethod);
    const Icon = method?.icon || Fingerprint;

    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className={`h-32 w-32 rounded-full ${method?.bgColor} flex items-center justify-center animate-pulse`}>
                <Icon className={`h-16 w-16 ${method?.color}`} />
              </div>
            </div>
            <div>
              <h3 className="text-xl mb-2">Scanning in Progress...</h3>
              <p className="text-gray-600">Please hold still</p>
            </div>
            <div className="space-y-2">
              <Progress value={confidence} className="h-3" />
              <p className="text-sm text-gray-600">{confidence}% Complete</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Verifying biometric data...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-600" />
          Biometric Verification Required
        </CardTitle>
        <CardDescription>
          Select your preferred verification method to confirm your identity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {methods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => handleVerify(method.id)}
                className="border-2 rounded-lg p-6 hover:border-blue-500 hover:bg-gray-50 transition-all text-left"
              >
                <div className={`h-12 w-12 rounded-full ${method.bgColor} flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 ${method.color}`} />
                </div>
                <h4 className="mb-1">{method.name}</h4>
                <p className="text-sm text-gray-600">{method.description}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="text-blue-900 mb-1">Why biometric verification?</p>
              <p className="text-blue-800">
                Biometric authentication ensures that each vote is cast by a verified, registered voter, 
                preventing fraud and maintaining the integrity of the democratic process.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}