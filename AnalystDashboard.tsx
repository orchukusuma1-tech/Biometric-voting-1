import { useState } from 'react';
import { BarChart3, TrendingUp, Download, FileBarChart, PieChart as PieChartIcon, Fingerprint } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { turnoutData, regionData, issuesByCategory, biometricStats } from '../data/mockData';
import { toast } from 'sonner';

interface AnalystDashboardProps {
  onLogout: () => void;
}

export function AnalystDashboard({ onLogout }: AnalystDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedElection, setSelectedElection] = useState('2');

  const handleExportReport = () => {
    toast.success('Report exported successfully!');
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const currentTurnout = ((12500000 / 25000000) * 100).toFixed(1);
  const avgRegionalTurnout = (regionData.reduce((acc, r) => acc + r.turnout, 0) / regionData.length).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl">Data Analyst Portal</h1>
                <p className="text-sm text-gray-600">Real-time Analytics & Insights</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>Logout</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Select value={selectedElection} onValueChange={setSelectedElection}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select election" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">State Assembly Elections (Ongoing)</SelectItem>
                <SelectItem value="1">Presidential Election (Upcoming)</SelectItem>
                <SelectItem value="3">Municipal Council Elections (Completed)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Turnout</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{currentTurnout}%</div>
              <p className="text-xs text-muted-foreground">+12.3% from last hour</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Votes Cast</CardTitle>
              <FileBarChart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">12.5M</div>
              <p className="text-xs text-muted-foreground">50% of registered voters</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Regional Turnout</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{avgRegionalTurnout}%</div>
              <p className="text-xs text-muted-foreground">Across 8 districts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues Resolved</CardTitle>
              <PieChartIcon className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">72%</div>
              <p className="text-xs text-muted-foreground">72 of 100 total issues</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="biometric">Biometric</TabsTrigger>
            <TabsTrigger value="turnout">Turnout</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hourly Turnout Trend</CardTitle>
                  <CardDescription>Real-time voter participation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={turnoutData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="turnout" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Votes Cast"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Performance</CardTitle>
                  <CardDescription>Turnout by district</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={regionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="turnout" fill="#10b981" name="Turnout %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>AI-powered analysis summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="mb-1">Strong Turnout Momentum</h4>
                      <p className="text-sm text-gray-600">
                        Voter turnout is trending 8.2% higher than the same period in the previous election.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="mb-1">District 4 Leading</h4>
                      <p className="text-sm text-gray-600">
                        District 4 shows the highest turnout at 72%, significantly above the regional average.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <FileBarChart className="h-5 w-5 text-yellow-600 mt-1" />
                    <div>
                      <h4 className="mb-1">Technical Issues Declining</h4>
                      <p className="text-sm text-gray-600">
                        Technical issue reports have decreased by 35% since the morning, indicating improved system stability.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="biometric" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <Fingerprint className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{biometricStats.successRate}%</div>
                  <p className="text-xs text-muted-foreground">Verification accuracy</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{biometricStats.avgConfidence}%</div>
                  <p className="text-xs text-muted-foreground">Match quality</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Time</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{biometricStats.avgVerificationTime}s</div>
                  <p className="text-xs text-muted-foreground">Per verification</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                  <FileBarChart className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{(biometricStats.totalVerifications / 1000000).toFixed(1)}M</div>
                  <p className="text-xs text-muted-foreground">Today</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Verification Methods Distribution</CardTitle>
                <CardDescription>Performance by biometric type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={biometricStats.methodBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="method" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="count" fill="#3b82f6" name="Total Scans" />
                    <Bar yAxisId="right" dataKey="success" fill="#10b981" name="Success Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hourly Verification Trend</CardTitle>
                <CardDescription>Real-time biometric verification performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={biometricStats.hourlyVerifications}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="verifications" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      name="Verifications"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="success" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Success %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {biometricStats.methodBreakdown.map((method, index) => (
                <div key={method.method} className="border rounded-lg p-4">
                  <div 
                    className="h-2 rounded-full mb-3"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <h4 className="mb-2">{method.method}</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total:</span>
                      <span>{(method.count / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Success:</span>
                      <span className="text-green-600">{method.success}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="turnout">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Turnout Analysis</CardTitle>
                <CardDescription>Comprehensive voter participation metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={turnoutData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="turnout" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        name="Votes Cast"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="registered" 
                        stroke="#94a3b8" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Total Registered"
                      />
                    </LineChart>
                  </ResponsiveContainer>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Peak Hour</p>
                      <p className="text-2xl">15:00</p>
                      <p className="text-sm text-gray-600">Highest activity period</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Avg Hourly Growth</p>
                      <p className="text-2xl">1.8M</p>
                      <p className="text-sm text-gray-600">Votes per hour</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Projected Final</p>
                      <p className="text-2xl">68%</p>
                      <p className="text-sm text-gray-600">Estimated turnout</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regional">
            <Card>
              <CardHeader>
                <CardTitle>Regional Breakdown</CardTitle>
                <CardDescription>Performance metrics by district</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={regionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
                      <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="turnout" fill="#10b981" name="Turnout %" />
                      <Bar yAxisId="right" dataKey="registered" fill="#3b82f6" name="Registered Voters" />
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="space-y-2">
                    {regionData.map((district, index) => (
                      <div key={district.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl text-gray-400">#{index + 1}</div>
                          <div>
                            <p>{district.name}</p>
                            <p className="text-sm text-gray-600">
                              {district.registered.toLocaleString()} registered voters
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl">{district.turnout}%</p>
                          <p className="text-sm text-gray-600">Turnout</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues">
            <Card>
              <CardHeader>
                <CardTitle>Issue Analytics</CardTitle>
                <CardDescription>Reported issues by category and resolution status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={issuesByCategory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#ef4444" name="Total Issues" />
                        <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
                      </BarChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={issuesByCategory}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ category, count }) => `${category}: ${count}`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {issuesByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {issuesByCategory.map((category, index) => (
                      <div key={category.category} className="border rounded-lg p-4">
                        <div 
                          className="h-2 rounded-full mb-3"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <h4 className="mb-2">{category.category}</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Total:</span>
                            <span>{category.count}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Resolved:</span>
                            <span className="text-green-600">{category.resolved}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Rate:</span>
                            <span>{((category.resolved / category.count) * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
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