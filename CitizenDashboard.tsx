import { useState } from 'react';
import { Users, Vote, MessageSquare, AlertCircle, Calendar, MapPin, Fingerprint, CheckCircle2, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { elections, issues } from '../data/mockData';
import { BiometricVerification } from './BiometricVerification';
import { VotingInterface } from './VotingInterface';
import { toast } from 'sonner';

interface CitizenDashboardProps {
  onLogout: () => void;
}

export function CitizenDashboard({ onLogout }: CitizenDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('elections');
  const [reportTitle, setReportTitle] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportCategory, setReportCategory] = useState('');
  const [reportLocation, setReportLocation] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [votingElectionId, setVotingElectionId] = useState<string | null>(null);

  const handleSubmitReport = () => {
    if (!reportTitle || !reportDescription || !reportCategory || !reportLocation) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success('Issue reported successfully! Our team will investigate.');
    setReportTitle('');
    setReportDescription('');
    setReportCategory('');
    setReportLocation('');
  };

  const ongoingElections = elections.filter(e => e.status === 'ongoing');
  const upcomingElections = elections.filter(e => e.status === 'upcoming');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl">Citizen Portal</h1>
                <p className="text-sm text-gray-600">Your Voice Matters</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>Logout</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <CardContent className="pt-6">
            <h2 className="text-2xl mb-2">Welcome to Democratic Participation</h2>
            <p className="text-blue-100">Stay informed, report issues, and engage with your community to ensure fair elections.</p>
          </CardContent>
        </Card>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="elections">Elections</TabsTrigger>
            <TabsTrigger value="vote">Vote Now</TabsTrigger>
            <TabsTrigger value="verify">Biometric</TabsTrigger>
            <TabsTrigger value="report">Report</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="elections" className="space-y-6">
            {/* Ongoing Elections */}
            <Card>
              <CardHeader>
                <CardTitle>Ongoing Elections</CardTitle>
                <CardDescription>Elections currently in progress with biometric voting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ongoingElections.map((election) => (
                    <div key={election.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg mb-1">{election.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {election.date}
                            </div>
                            <Badge>{election.type}</Badge>
                            {election.biometricEnabled && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Fingerprint className="h-3 w-3" />
                                Biometric
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Badge className="bg-green-500">Live</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Voter Turnout</span>
                          <span>{((election.votedCount / election.totalVoters) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(election.votedCount / election.totalVoters) * 100}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600">
                          {election.votedCount.toLocaleString()} of {election.totalVoters.toLocaleString()} voted
                        </p>
                        {election.biometricEnabled && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center gap-1 text-purple-600">
                                <Fingerprint className="h-4 w-4" />
                                Biometric Verified
                              </span>
                              <span>{((election.biometricVerified / election.votedCount) * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Elections */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Elections</CardTitle>
                <CardDescription>Mark your calendar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingElections.map((election) => (
                    <div key={election.id} className="border rounded-lg p-4">
                      <h3 className="text-lg mb-2">{election.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {election.date}
                        </div>
                        <Badge variant="outline">{election.type}</Badge>
                        {election.biometricEnabled && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Fingerprint className="h-3 w-3" />
                            Biometric Enabled
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {election.totalVoters.toLocaleString()} registered voters
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vote">
            <Card>
              <CardHeader>
                <CardTitle>Vote Now</CardTitle>
                <CardDescription>Cast your vote securely and efficiently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ongoingElections.map((election) => (
                    <div key={election.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg mb-1">{election.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {election.date}
                            </div>
                            <Badge>{election.type}</Badge>
                            {election.biometricEnabled && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Fingerprint className="h-3 w-3" />
                                Biometric
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Badge className="bg-green-500">Live</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Voter Turnout</span>
                          <span>{((election.votedCount / election.totalVoters) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(election.votedCount / election.totalVoters) * 100}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600">
                          {election.votedCount.toLocaleString()} of {election.totalVoters.toLocaleString()} voted
                        </p>
                        {election.biometricEnabled && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center gap-1 text-purple-600">
                                <Fingerprint className="h-4 w-4" />
                                Biometric Verified
                              </span>
                              <span>{((election.biometricVerified / election.votedCount) * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={() => {
                          setVotingElectionId(election.id);
                          setHasVoted(true);
                        }}
                        className="w-full"
                      >
                        <Vote className="h-4 w-4 mr-2" />
                        Vote Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verify" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl mb-2">Biometric Voter Verification</h2>
              <p className="text-gray-600">
                Experience our secure, modern voting system powered by advanced biometric technology
              </p>
            </div>

            <BiometricVerification />

            <Card>
              <CardHeader>
                <CardTitle>Why Biometric Voting?</CardTitle>
                <CardDescription>The future of secure and transparent elections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Fingerprint className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="mb-1">Prevents Fraud</h4>
                        <p className="text-sm text-gray-600">
                          Unique biometric identifiers ensure each person can only vote once
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Vote className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="mb-1">Fast & Convenient</h4>
                        <p className="text-sm text-gray-600">
                          Quick verification process takes only 3-5 seconds on average
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="mb-1">Accessible</h4>
                        <p className="text-sm text-gray-600">
                          Multiple verification methods to accommodate all voters
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="mb-1">Secure & Private</h4>
                        <p className="text-sm text-gray-600">
                          Your biometric data is encrypted and never shared
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="report">
            <Card>
              <CardHeader>
                <CardTitle>Report an Issue</CardTitle>
                <CardDescription>Help us maintain election integrity by reporting problems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Issue Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Brief description of the issue"
                      value={reportTitle}
                      onChange={(e) => setReportTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={reportCategory} onValueChange={setReportCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fraud">Suspected Fraud</SelectItem>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="biometric">Biometric Issue</SelectItem>
                        <SelectItem value="access">Access Problem</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="District and polling station"
                      value={reportLocation}
                      onChange={(e) => setReportLocation(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Provide as much detail as possible..."
                      rows={6}
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                    />
                  </div>

                  <Button onClick={handleSubmitReport} className="w-full">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Submit Report
                  </Button>

                  <p className="text-sm text-gray-600">
                    All reports are reviewed by our team and election observers. Your identity will be kept confidential.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussions">
            <Card>
              <CardHeader>
                <CardTitle>Civic Discussions</CardTitle>
                <CardDescription>Engage with your community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="h-5 w-5 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="mb-1">How to verify your voter registration</h4>
                        <p className="text-sm text-gray-600 mb-2">Discussion started by @admin • 234 replies</p>
                        <Button variant="outline" size="sm">Join Discussion</Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="h-5 w-5 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="mb-1">First-time voter guide</h4>
                        <p className="text-sm text-gray-600 mb-2">Discussion started by @civic_guide • 567 replies</p>
                        <Button variant="outline" size="sm">Join Discussion</Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="h-5 w-5 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="mb-1">Understanding your voting rights</h4>
                        <p className="text-sm text-gray-600 mb-2">Discussion started by @rights_advocate • 189 replies</p>
                        <Button variant="outline" size="sm">Join Discussion</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Voter Resources</CardTitle>
                <CardDescription>Everything you need to know about voting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Vote className="h-5 w-5 text-indigo-600" />
                      <div>
                        <h4 className="mb-1">How to Register to Vote</h4>
                        <p className="text-sm text-gray-600">Step-by-step guide for new voters</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-indigo-600" />
                      <div>
                        <h4 className="mb-1">Find Your Polling Station</h4>
                        <p className="text-sm text-gray-600">Locate your nearest voting location</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-indigo-600" />
                      <div>
                        <h4 className="mb-1">Important Dates</h4>
                        <p className="text-sm text-gray-600">Election calendar and deadlines</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Voting Dialog */}
      <Dialog open={hasVoted && votingElectionId !== null} onOpenChange={(open) => {
        if (!open) {
          setHasVoted(false);
          setVotingElectionId(null);
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Secure Biometric Voting</DialogTitle>
            <DialogDescription>Cast your vote using biometric verification</DialogDescription>
          </DialogHeader>
          {votingElectionId && (
            <VotingInterface 
              electionId={votingElectionId}
              onVoteComplete={() => {
                setHasVoted(false);
                setVotingElectionId(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}