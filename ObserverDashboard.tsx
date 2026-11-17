import { useState } from 'react';
import { Eye, FileText, MapPin, AlertTriangle, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { observationReports, issues } from '../data/mockData';
import { toast } from 'sonner';

interface ObserverDashboardProps {
  onLogout: () => void;
}

export function ObserverDashboard({ onLogout }: ObserverDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('monitoring');
  const [location, setLocation] = useState('');
  const [fairnessRating, setFairnessRating] = useState([4]);
  const [transparencyRating, setTransparencyRating] = useState([4]);
  const [notes, setNotes] = useState('');
  const [anomalies, setAnomalies] = useState('');

  const handleSubmitReport = () => {
    if (!location || !notes) {
      toast.error('Please fill in required fields');
      return;
    }

    toast.success('Observation report submitted successfully!');
    setLocation('');
    setFairnessRating([4]);
    setTransparencyRating([4]);
    setNotes('');
    setAnomalies('');
  };

  const criticalIssues = issues.filter(i => i.severity === 'critical' || i.severity === 'high');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Eye className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl">Election Observer Portal</h1>
                <p className="text-sm text-gray-600">Monitor & Report</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>Logout</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">23</div>
              <p className="text-xs text-muted-foreground">Total submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stations Monitored</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">15</div>
              <p className="text-xs text-muted-foreground">Across 8 districts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{criticalIssues.length}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="submit">Submit Report</TabsTrigger>
            <TabsTrigger value="reports">My Reports</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Monitoring Dashboard</CardTitle>
                <CardDescription>Real-time election monitoring overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <h4>Average Fairness Rating</h4>
                      </div>
                      <p className="text-3xl">4.2/5.0</p>
                      <p className="text-sm text-gray-600">Based on all reports</p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                        <h4>Transparency Score</h4>
                      </div>
                      <p className="text-3xl">4.1/5.0</p>
                      <p className="text-sm text-gray-600">Trending positive</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="mb-3">Recent Observations</h4>
                    <div className="space-y-3">
                      {observationReports.slice(0, 3).map((report) => (
                        <div key={report.id} className="flex items-start justify-between pb-3 border-b last:border-0">
                          <div>
                            <p className="text-sm">{report.location}</p>
                            <p className="text-xs text-gray-600">
                              {new Date(report.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline">F: {report.fairnessRating}</Badge>
                            <Badge variant="outline">T: {report.transparencyRating}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle>Submit Observation Report</CardTitle>
                <CardDescription>Provide detailed insights on election fairness and transparency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Polling Station Location *</Label>
                    <Input 
                      id="location" 
                      placeholder="e.g., District 5, Station 42"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Fairness Rating *</Label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        value={fairnessRating} 
                        onValueChange={setFairnessRating}
                        max={5}
                        min={1}
                        step={0.5}
                        className="flex-1"
                      />
                      <span className="text-2xl w-12 text-center">{fairnessRating[0]}</span>
                    </div>
                    <p className="text-sm text-gray-600">Rate the fairness of the election process (1-5)</p>
                  </div>

                  <div className="space-y-3">
                    <Label>Transparency Rating *</Label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        value={transparencyRating} 
                        onValueChange={setTransparencyRating}
                        max={5}
                        min={1}
                        step={0.5}
                        className="flex-1"
                      />
                      <span className="text-2xl w-12 text-center">{transparencyRating[0]}</span>
                    </div>
                    <p className="text-sm text-gray-600">Rate the transparency of procedures (1-5)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Observation Notes *</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Describe the overall process, adherence to protocols, and any observations..."
                      rows={5}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="anomalies">Anomalies Detected (Optional)</Label>
                    <Textarea 
                      id="anomalies" 
                      placeholder="List any irregularities, concerns, or issues observed (one per line)"
                      rows={4}
                      value={anomalies}
                      onChange={(e) => setAnomalies(e.target.value)}
                    />
                  </div>

                  <Button onClick={handleSubmitReport} className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Submit Observation Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>My Observation Reports</CardTitle>
                <CardDescription>View all your submitted reports</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Fairness</TableHead>
                      <TableHead>Transparency</TableHead>
                      <TableHead>Anomalies</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {observationReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{new Date(report.timestamp).toLocaleString()}</TableCell>
                        <TableCell>{report.location}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{report.fairnessRating}/5</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{report.transparencyRating}/5</Badge>
                        </TableCell>
                        <TableCell>
                          {report.anomalies.length > 0 ? (
                            <Badge variant="destructive">{report.anomalies.length}</Badge>
                          ) : (
                            <Badge variant="secondary">None</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Critical Alerts</CardTitle>
                <CardDescription>High priority issues requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {criticalIssues.map((issue) => (
                    <div key={issue.id} className="border rounded-lg p-4 border-l-4 border-l-red-500">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <h4>{issue.title}</h4>
                        </div>
                        <Badge variant="destructive">{issue.severity}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {issue.location}
                        </div>
                        <span>•</span>
                        <span>{new Date(issue.timestamp).toLocaleString()}</span>
                        <span>•</span>
                        <Badge variant="outline">{issue.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
