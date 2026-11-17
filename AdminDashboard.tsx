import { useState } from 'react';
import { ShieldCheck, Users, AlertTriangle, CheckCircle, Activity, Database, Fingerprint } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { elections, issues, biometricStats } from '../data/mockData';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  const stats = [
    {
      title: 'Active Elections',
      value: elections.filter(e => e.status === 'ongoing').length.toString(),
      icon: Activity,
      color: 'text-blue-600'
    },
    {
      title: 'Total Users',
      value: '15,234',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Active Issues',
      value: issues.filter(i => i.status !== 'resolved').length.toString(),
      icon: AlertTriangle,
      color: 'text-yellow-600'
    },
    {
      title: 'System Health',
      value: '98.5%',
      icon: CheckCircle,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-2xl">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">System Management & Monitoring</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>Logout</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="biometric">Biometric</TabsTrigger>
            <TabsTrigger value="elections">Elections</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Overview</CardTitle>
                <CardDescription>Real-time monitoring of election system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm">Database Status</p>
                      <p className="text-2xl">Operational</p>
                    </div>
                    <Database className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm">API Response Time</p>
                      <p className="text-2xl">142ms</p>
                    </div>
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm">Biometric Verification Success Rate</p>
                      <p className="text-2xl">{biometricStats.successRate}%</p>
                    </div>
                    <Fingerprint className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="biometric" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Verifications</CardTitle>
                  <Fingerprint className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{(biometricStats.totalVerifications / 1000000).toFixed(2)}M</div>
                  <p className="text-xs text-muted-foreground">Today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{biometricStats.successRate}%</div>
                  <Progress value={biometricStats.successRate} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Verification Time</CardTitle>
                  <Activity className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{biometricStats.avgVerificationTime}s</div>
                  <p className="text-xs text-muted-foreground">Per verification</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Verification Methods Performance</CardTitle>
                <CardDescription>Breakdown by biometric type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {biometricStats.methodBreakdown.map((method) => (
                    <div key={method.method} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p>{method.method}</p>
                          <p className="text-sm text-gray-600">
                            {(method.count / 1000000).toFixed(2)}M verifications
                          </p>
                        </div>
                        <Badge variant={method.success > 99.9 ? "default" : "secondary"}>
                          {method.success}% Success
                        </Badge>
                      </div>
                      <Progress value={method.success} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Biometric Issues</CardTitle>
                <CardDescription>System alerts and failures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {issues.filter(i => i.category === 'biometric').map((issue) => (
                    <div key={issue.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4>{issue.title}</h4>
                        <Badge variant={issue.severity === 'high' ? 'destructive' : 'default'}>
                          {issue.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{issue.location}</span>
                        <span>•</span>
                        <Badge variant="outline">{issue.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="elections">
            <Card>
              <CardHeader>
                <CardTitle>Election Management</CardTitle>
                <CardDescription>Monitor and manage all elections</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Election Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Turnout</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {elections.map((election) => (
                      <TableRow key={election.id}>
                        <TableCell>{election.name}</TableCell>
                        <TableCell>{election.type}</TableCell>
                        <TableCell>{election.date}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              election.status === 'ongoing' ? 'default' : 
                              election.status === 'completed' ? 'secondary' : 
                              'outline'
                            }
                          >
                            {election.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {((election.votedCount / election.totalVoters) * 100).toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues">
            <Card>
              <CardHeader>
                <CardTitle>Issue Management</CardTitle>
                <CardDescription>Review and resolve reported issues</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {issues.map((issue) => (
                      <TableRow key={issue.id}>
                        <TableCell>{issue.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{issue.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              issue.severity === 'critical' ? 'destructive' :
                              issue.severity === 'high' ? 'default' :
                              'secondary'
                            }
                          >
                            {issue.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>{issue.status}</TableCell>
                        <TableCell>{issue.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Monitoring</CardTitle>
                <CardDescription>Platform security and access control</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p>Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Enabled for all admin accounts</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p>Encryption Status</p>
                      <p className="text-sm text-gray-600">AES-256 encryption active</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p>Last Security Audit</p>
                      <p className="text-sm text-gray-600">April 1, 2026 - No issues found</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}