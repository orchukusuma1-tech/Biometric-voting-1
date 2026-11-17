// Mock data for the election monitoring system

export interface Election {
  id: string;
  name: string;
  type: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  totalVoters: number;
  votedCount: number;
  pollingStations: number;
  biometricEnabled: boolean;
  biometricVerified: number;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: 'fraud' | 'technical' | 'access' | 'biometric' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'investigating' | 'resolved';
  reportedBy: string;
  location: string;
  timestamp: string;
}

export interface ObservationReport {
  id: string;
  electionId: string;
  observerId: string;
  location: string;
  timestamp: string;
  fairnessRating: number;
  transparencyRating: number;
  notes: string;
  anomalies: string[];
}

export interface AnalyticsData {
  date: string;
  turnout: number;
  registered: number;
}

export interface BiometricVerification {
  id: string;
  voterId: string;
  timestamp: string;
  method: 'fingerprint' | 'facial' | 'iris' | 'multi-factor';
  status: 'success' | 'failed' | 'retry';
  confidence: number;
  location: string;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  photoUrl: string;
  agenda: string;
  color: string;
}

export interface Ballot {
  id: string;
  electionId: string;
  position: string;
  candidates: Candidate[];
}

export interface VoteRecord {
  id: string;
  electionId: string;
  ballotId: string;
  timestamp: string;
  biometricVerified: boolean;
  verificationMethod: string;
  status: 'cast' | 'pending' | 'verified';
}

export const elections: Election[] = [
  {
    id: '1',
    name: '2026 Presidential Election',
    type: 'Presidential',
    date: '2026-11-03',
    status: 'upcoming',
    totalVoters: 150000000,
    votedCount: 0,
    pollingStations: 12000,
    biometricEnabled: true,
    biometricVerified: 0
  },
  {
    id: '2',
    name: 'State Assembly Elections',
    type: 'State',
    date: '2026-05-15',
    status: 'ongoing',
    totalVoters: 25000000,
    votedCount: 12500000,
    pollingStations: 3500,
    biometricEnabled: true,
    biometricVerified: 12485000
  },
  {
    id: '3',
    name: 'Municipal Council Elections',
    type: 'Local',
    date: '2026-03-20',
    status: 'completed',
    totalVoters: 5000000,
    votedCount: 3750000,
    pollingStations: 800,
    biometricEnabled: true,
    biometricVerified: 3748500
  }
];

export const issues: Issue[] = [
  {
    id: '1',
    title: 'Voting Machine Malfunction',
    description: 'Multiple voting machines at Station 42 experiencing software errors',
    category: 'technical',
    severity: 'high',
    status: 'investigating',
    reportedBy: 'Observer #234',
    location: 'District 5, Station 42',
    timestamp: '2026-04-09T08:30:00Z'
  },
  {
    id: '2',
    title: 'Long Queue Times',
    description: 'Excessive wait times reported, over 3 hours',
    category: 'access',
    severity: 'medium',
    status: 'reported',
    reportedBy: 'Citizen #1829',
    location: 'District 12, Station 88',
    timestamp: '2026-04-09T09:15:00Z'
  },
  {
    id: '3',
    title: 'Suspicious Activity',
    description: 'Unauthorized personnel attempting to access ballot storage',
    category: 'fraud',
    severity: 'critical',
    status: 'investigating',
    reportedBy: 'Observer #156',
    location: 'District 3, Station 15',
    timestamp: '2026-04-09T07:45:00Z'
  },
  {
    id: '4',
    title: 'Missing Voter Rolls',
    description: 'Voter registration records not available at polling station',
    category: 'technical',
    severity: 'high',
    status: 'resolved',
    reportedBy: 'Observer #089',
    location: 'District 8, Station 56',
    timestamp: '2026-04-09T06:00:00Z'
  },
  {
    id: '5',
    title: 'Biometric Scanner Offline',
    description: 'Fingerprint scanner not responding, requiring manual verification fallback',
    category: 'biometric',
    severity: 'high',
    status: 'investigating',
    reportedBy: 'Observer #201',
    location: 'District 2, Station 23',
    timestamp: '2026-04-09T10:20:00Z'
  },
  {
    id: '6',
    title: 'Multiple Failed Verifications',
    description: 'Facial recognition system showing high failure rate (>15%)',
    category: 'biometric',
    severity: 'medium',
    status: 'reported',
    reportedBy: 'Analyst #045',
    location: 'District 6, Station 71',
    timestamp: '2026-04-09T11:00:00Z'
  }
];

export const observationReports: ObservationReport[] = [
  {
    id: '1',
    electionId: '2',
    observerId: 'OBS-234',
    location: 'District 5, Station 42',
    timestamp: '2026-04-09T10:00:00Z',
    fairnessRating: 4.5,
    transparencyRating: 4.0,
    notes: 'Overall process running smoothly. Minor technical issues with one machine.',
    anomalies: ['Voting machine software error']
  },
  {
    id: '2',
    electionId: '2',
    observerId: 'OBS-156',
    location: 'District 3, Station 15',
    timestamp: '2026-04-09T08:30:00Z',
    fairnessRating: 3.0,
    transparencyRating: 3.5,
    notes: 'Security concerns identified. Local authorities notified.',
    anomalies: ['Unauthorized access attempt', 'Inadequate security personnel']
  },
  {
    id: '3',
    electionId: '2',
    observerId: 'OBS-089',
    location: 'District 8, Station 56',
    timestamp: '2026-04-09T09:00:00Z',
    fairnessRating: 5.0,
    transparencyRating: 5.0,
    notes: 'Excellent adherence to protocols. Efficient and transparent process.',
    anomalies: []
  }
];

export const turnoutData: AnalyticsData[] = [
  { date: '08:00', turnout: 250000, registered: 25000000 },
  { date: '09:00', turnout: 1200000, registered: 25000000 },
  { date: '10:00', turnout: 3500000, registered: 25000000 },
  { date: '11:00', turnout: 5800000, registered: 25000000 },
  { date: '12:00', turnout: 7500000, registered: 25000000 },
  { date: '13:00', turnout: 9200000, registered: 25000000 },
  { date: '14:00', turnout: 10800000, registered: 25000000 },
  { date: '15:00', turnout: 12500000, registered: 25000000 }
];

export const regionData = [
  { name: 'District 1', turnout: 68, registered: 2500000 },
  { name: 'District 2', turnout: 54, registered: 3200000 },
  { name: 'District 3', turnout: 45, registered: 1800000 },
  { name: 'District 4', turnout: 72, registered: 2100000 },
  { name: 'District 5', turnout: 61, registered: 2800000 },
  { name: 'District 6', turnout: 58, registered: 2400000 },
  { name: 'District 7', turnout: 49, registered: 3100000 },
  { name: 'District 8', turnout: 66, registered: 1900000 }
];

export const biometricVerifications: BiometricVerification[] = [
  {
    id: '1',
    voterId: 'V-2024-001234',
    timestamp: '2026-04-09T08:15:00Z',
    method: 'fingerprint',
    status: 'success',
    confidence: 98.5,
    location: 'District 1, Station 5'
  },
  {
    id: '2',
    voterId: 'V-2024-005678',
    timestamp: '2026-04-09T08:16:00Z',
    method: 'facial',
    status: 'success',
    confidence: 97.2,
    location: 'District 1, Station 5'
  },
  {
    id: '3',
    voterId: 'V-2024-009012',
    timestamp: '2026-04-09T08:18:00Z',
    method: 'multi-factor',
    status: 'success',
    confidence: 99.8,
    location: 'District 3, Station 12'
  },
  {
    id: '4',
    voterId: 'V-2024-003456',
    timestamp: '2026-04-09T08:20:00Z',
    method: 'fingerprint',
    status: 'failed',
    confidence: 45.3,
    location: 'District 2, Station 8'
  },
  {
    id: '5',
    voterId: 'V-2024-003456',
    timestamp: '2026-04-09T08:22:00Z',
    method: 'facial',
    status: 'success',
    confidence: 96.1,
    location: 'District 2, Station 8'
  }
];

export const biometricStats = {
  totalVerifications: 12485000,
  successRate: 99.88,
  avgConfidence: 97.8,
  avgVerificationTime: 3.2, // seconds
  methodBreakdown: [
    { method: 'Fingerprint', count: 7891000, success: 99.85 },
    { method: 'Facial Recognition', count: 3245000, success: 99.90 },
    { method: 'Iris Scan', count: 892000, success: 99.95 },
    { method: 'Multi-Factor', count: 457000, success: 99.98 }
  ],
  hourlyVerifications: [
    { time: '08:00', verifications: 145000, success: 99.90 },
    { time: '09:00', verifications: 892000, success: 99.88 },
    { time: '10:00', verifications: 1654000, success: 99.87 },
    { time: '11:00', verifications: 2123000, success: 99.89 },
    { time: '12:00', verifications: 1987000, success: 99.86 },
    { time: '13:00', verifications: 2234000, success: 99.88 },
    { time: '14:00', verifications: 2156000, success: 99.90 },
    { time: '15:00', verifications: 1294000, success: 99.91 }
  ]
};

export const issuesByCategory = [
  { category: 'Technical', count: 45, resolved: 32 },
  { category: 'Fraud', count: 12, resolved: 8 },
  { category: 'Access', count: 28, resolved: 20 },
  { category: 'Biometric', count: 18, resolved: 15 },
  { category: 'Other', count: 15, resolved: 12 }
];

export const ballots: Ballot[] = [
  {
    id: 'ballot-1',
    electionId: '2',
    position: 'State Assembly Representative',
    candidates: [
      {
        id: 'cand-1',
        name: 'Sarah Johnson',
        party: 'Democratic Party',
        photoUrl: '',
        agenda: 'Focused on healthcare reform, education funding, and environmental protection',
        color: '#3b82f6'
      },
      {
        id: 'cand-2',
        name: 'Michael Chen',
        party: 'Republican Party',
        photoUrl: '',
        agenda: 'Committed to economic growth, tax reduction, and infrastructure development',
        color: '#ef4444'
      },
      {
        id: 'cand-3',
        name: 'Patricia Williams',
        party: 'Green Party',
        photoUrl: '',
        agenda: 'Advocating for renewable energy, climate action, and social justice',
        color: '#10b981'
      },
      {
        id: 'cand-4',
        name: 'Robert Martinez',
        party: 'Independent',
        photoUrl: '',
        agenda: 'Fighting corruption, promoting transparency, and community development',
        color: '#8b5cf6'
      }
    ]
  },
  {
    id: 'ballot-2',
    electionId: '1',
    position: 'President of the United States',
    candidates: [
      {
        id: 'pres-1',
        name: 'Elizabeth Thompson',
        party: 'Democratic Party',
        photoUrl: '',
        agenda: 'Universal healthcare, climate change action, and economic equality',
        color: '#3b82f6'
      },
      {
        id: 'pres-2',
        name: 'James Anderson',
        party: 'Republican Party',
        photoUrl: '',
        agenda: 'Strong defense, free market economy, and traditional values',
        color: '#ef4444'
      }
    ]
  }
];

export const voteRecords: VoteRecord[] = [
  {
    id: '1',
    electionId: '1',
    ballotId: '1',
    timestamp: '2026-04-09T08:15:00Z',
    biometricVerified: true,
    verificationMethod: 'fingerprint',
    status: 'verified'
  },
  {
    id: '2',
    electionId: '1',
    ballotId: '1',
    timestamp: '2026-04-09T08:16:00Z',
    biometricVerified: true,
    verificationMethod: 'facial',
    status: 'verified'
  },
  {
    id: '3',
    electionId: '1',
    ballotId: '1',
    timestamp: '2026-04-09T08:18:00Z',
    biometricVerified: true,
    verificationMethod: 'multi-factor',
    status: 'verified'
  },
  {
    id: '4',
    electionId: '1',
    ballotId: '1',
    timestamp: '2026-04-09T08:20:00Z',
    biometricVerified: false,
    verificationMethod: 'fingerprint',
    status: 'pending'
  },
  {
    id: '5',
    electionId: '1',
    ballotId: '1',
    timestamp: '2026-04-09T08:22:00Z',
    biometricVerified: true,
    verificationMethod: 'facial',
    status: 'verified'
  }
];