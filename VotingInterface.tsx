import { useState } from 'react';
import { Vote, CheckCircle, Shield, Fingerprint, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { BiometricVerification } from './BiometricVerification';
import { ballots, elections } from '../data/mockData';
import { toast } from 'sonner';

interface VotingInterfaceProps {
  electionId: string;
  onVoteComplete?: () => void;
}

type VotingStep = 'start' | 'biometric' | 'ballot' | 'confirm' | 'complete';

export function VotingInterface({ electionId, onVoteComplete }: VotingInterfaceProps) {
  const [step, setStep] = useState<VotingStep>('start');
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [biometricVerified, setBiometricVerified] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<string>('');

  const election = elections.find(e => e.id === electionId);
  const ballot = ballots.find(b => b.electionId === electionId);

  if (!election || !ballot) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">Election not available for voting</p>
        </CardContent>
      </Card>
    );
  }

  const handleBiometricComplete = (success: boolean, method?: string) => {
    if (success) {
      setBiometricVerified(true);
      setVerificationMethod(method || 'biometric');
      setTimeout(() => setStep('ballot'), 1500);
    }
  };

  const handleCandidateSelect = (candidateId: string) => {
    setSelectedCandidate(candidateId);
  };

  const handleConfirmVote = () => {
    setStep('confirm');
  };

  const handleCastVote = () => {
    setStep('complete');
    toast.success('Your vote has been successfully cast and encrypted!');
    setTimeout(() => {
      onVoteComplete?.();
    }, 3000);
  };

  const selectedCandidateData = ballot.candidates.find(c => c.id === selectedCandidate);

  // Start Screen
  if (step === 'start') {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="h-6 w-6 text-blue-600" />
              {election.name}
            </CardTitle>
            <CardDescription>Cast your vote securely using biometric verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Voting Process
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <span>Biometric verification to confirm your identity</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <span>Select your preferred candidate</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <span>Review and confirm your choice</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <span>Vote is encrypted and securely recorded</span>
                </div>
              </div>
            </div>

            <Alert>
              <Fingerprint className="h-4 w-4" />
              <AlertDescription>
                Your vote is completely anonymous. Biometric verification only confirms your identity, 
                not your voting choice. All votes are encrypted end-to-end.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 border rounded-lg text-center">
                <p className="text-gray-600 mb-1">Position</p>
                <p>{ballot.position}</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <p className="text-gray-600 mb-1">Candidates</p>
                <p>{ballot.candidates.length}</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <p className="text-gray-600 mb-1">Type</p>
                <p>{election.type}</p>
              </div>
            </div>

            <Button onClick={() => setStep('biometric')} className="w-full" size="lg">
              Begin Voting Process
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Biometric Verification Step
  if (step === 'biometric') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Step 1 of 3: Biometric Verification</span>
        </div>
        <BiometricVerification 
          onVerificationComplete={(success) => handleBiometricComplete(success, 'fingerprint')}
        />
      </div>
    );
  }

  // Ballot Selection Step
  if (step === 'ballot') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Verified • Step 2 of 3: Select Candidate</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Your Candidate for {ballot.position}</CardTitle>
            <CardDescription>Choose one candidate to cast your vote</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ballot.candidates.map((candidate) => (
                <button
                  key={candidate.id}
                  onClick={() => handleCandidateSelect(candidate.id)}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                    selectedCandidate === candidate.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="h-16 w-16 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0"
                      style={{ backgroundColor: candidate.color }}
                    >
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg">{candidate.name}</h4>
                          <Badge 
                            variant="outline" 
                            style={{ borderColor: candidate.color, color: candidate.color }}
                          >
                            {candidate.party}
                          </Badge>
                        </div>
                        {selectedCandidate === candidate.id && (
                          <CheckCircle className="h-6 w-6 text-blue-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{candidate.agenda}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setStep('start')}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleConfirmVote}
                disabled={!selectedCandidate}
                className="flex-1"
              >
                Continue to Review
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Confirmation Step
  if (step === 'confirm') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Step 3 of 3: Confirm Your Vote</span>
        </div>

        <Card className="border-2 border-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-yellow-600" />
              Review Your Vote
            </CardTitle>
            <CardDescription>Please verify your selection before casting your vote</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertDescription>
                Once you cast your vote, it cannot be changed. Please review carefully.
              </AlertDescription>
            </Alert>

            {selectedCandidateData && (
              <div className="p-6 border-2 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600 mb-4">You are voting for:</p>
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="h-20 w-20 rounded-full flex items-center justify-center text-white text-3xl"
                    style={{ backgroundColor: selectedCandidateData.color }}
                  >
                    {selectedCandidateData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-2xl mb-1">{selectedCandidateData.name}</h3>
                    <Badge 
                      variant="outline"
                      style={{ borderColor: selectedCandidateData.color, color: selectedCandidateData.color }}
                    >
                      {selectedCandidateData.party}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Position: {ballot.position}</p>
              </div>
            )}

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h4>Biometric Verification Complete</h4>
              </div>
              <p className="text-sm text-gray-600">
                Method: {verificationMethod} • Confidence: 98.5%
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setStep('ballot')}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Change Selection
              </Button>
              <Button 
                onClick={handleCastVote}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Vote className="h-4 w-4 mr-2" />
                Cast My Vote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Completion Step
  if (step === 'complete') {
    return (
      <Card className="border-2 border-green-500">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl mb-2">Vote Successfully Cast!</h2>
              <p className="text-gray-600">Your vote has been securely recorded and encrypted</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg text-left space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Confirmation ID:</span>
                <span className="font-mono">VT-{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Timestamp:</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Biometric Verified:</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Encryption:</span>
                <span>AES-256</span>
              </div>
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription className="text-left">
                Your vote is completely anonymous and encrypted. No one, including election officials, 
                can trace your vote back to you. Thank you for participating in democracy!
              </AlertDescription>
            </Alert>

            <div className="pt-4">
              <p className="text-sm text-gray-600">
                You have successfully completed the voting process for {election.name}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
