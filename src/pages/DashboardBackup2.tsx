import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Edit,
  Download,
  Bell,
  Shield,
  Activity,
  Target,
  Eye,
  RefreshCw,
  Info,
  Zap,
  Award,
  Upload,
  Smartphone,
  Link,
  Wallet,
  Settings,
  UserPlus,
  Camera,
  Lock,
  Key,
  CreditCard as CreditCardIcon,
  Banknote,
} from "lucide-react";

const userData = {
  name: "Rajesh Kumar",
  email: "rajesh.kumar@example.com",
  phone: "+91 98765 43210",
  address: "123 MG Road, Bangalore, Karnataka 560001",
  memberSince: "January 2026",
  avatar: "RK",
  creditScore: 77,
  dateOfBirth: "15 March 1990",
  panCard: "ABCPJ1234K",
  aadhaar: "****-****-1234",
  occupation: "Software Engineer",
  annualIncome: "₹12,00,000",
  employmentType: "Full-time",
  workExperience: "5 years",
  upiAccounts: [
    { id: "upi1", provider: "Google Pay", upiId: "rajesh.kumar@okicici", linked: true, lastTransaction: "2026-01-20", balance: "₹45,230" },
    { id: "upi2", provider: "PhonePe", upiId: "rajeshkumar@ybl", linked: false, lastTransaction: null, balance: null },
  ],
  bankAccounts: [
    { id: "bank1", name: "HDFC Bank", accountNumber: "****-****-1234", type: "Savings", balance: "₹1,25,000" },
    { id: "bank2", name: "ICICI Bank", accountNumber: "****-****-5678", type: "Current", balance: "₹2,50,000" },
  ],
  recentTransactions: [
    { id: "tx1", date: "2026-01-20", description: "Amazon Purchase", amount: -2500, category: "Shopping", type: "debit" },
    { id: "tx2", date: "2026-01-19", description: "Salary Credit", amount: 100000, category: "Income", type: "credit" },
    { id: "tx3", date: "2026-01-18", description: "Restaurant Bill", amount: -1200, category: "Food", type: "debit" },
    { id: "tx4", date: "2026-01-17", description: "Freelance Payment", amount: 15000, category: "Income", type: "credit" },
  ],
};

type LoanApplication = {
  id: string;
  amount: number;
  term: string;
  purpose: string;
  status: "approved" | "pending" | "rejected";
  appliedDate: string;
  bank: string;
  monthlyPayment?: number;
  reason?: string;
  decisionDate?: string;
  interestRate?: string;
  nextPaymentDate?: string;
  remainingAmount?: number;
};

const loanApplications: LoanApplication[] = [
  {
    id: "LA-2026-001",
    amount: 500000,
    term: "12 months",
    purpose: "Home Renovation",
    status: "approved",
    appliedDate: "2026-01-15",
    bank: "HDFC Bank",
    monthlyPayment: 43650,
    decisionDate: "2026-01-16",
    interestRate: "8.5%",
    nextPaymentDate: "2026-02-15",
    remainingAmount: 456350,
  },
  {
    id: "LA-2026-002",
    amount: 300000,
    term: "6 months",
    purpose: "Emergency Fund",
    status: "pending",
    appliedDate: "2026-01-20",
    bank: "ICICI Bank",
  },
  {
    id: "LA-2023-003",
    amount: 800000,
    term: "24 months",
    purpose: "Vehicle Purchase",
    status: "rejected",
    appliedDate: "2023-12-10",
    bank: "SBI",
    reason: "Insufficient income stability",
    decisionDate: "2023-12-12",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);
  const [showLoanDetails, setShowLoanDetails] = useState<string | null>(null);
  const [showTrackStatus, setShowTrackStatus] = useState<string | null>(null);
  const [showWhyRejected, setShowWhyRejected] = useState<string | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showLinkUPI, setShowLinkUPI] = useState(false);
  const [showSecuritySettings, setShowSecuritySettings] = useState(false);
  const [showUploadDocument, setShowUploadDocument] = useState(false);
  const [showManageUPI, setShowManageUPI] = useState<string | null>(null);
  const [showViewTransactions, setShowViewTransactions] = useState(false);
  const [showSyncTransactions, setShowSyncTransactions] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [upiProvider, setUpiProvider] = useState('');
  const [upiId, setUpiId] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [securityOption, setSecurityOption] = useState('');

  const handleApplyNewLoan = () => {
    window.location.href = '/apply';
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleImproveScore = () => {
    alert('Credit Score Improvement Tips:\n\n1. Pay all bills on time\n2. Keep credit utilization below 30%\n3. Don\'t close old credit cards\n\nYour current score: 77\nTarget score: 850+');
  };

  const handleTrackExpenses = () => {
    alert('Expense Tracking Features:\n\n• Categorize expenses automatically\n• Set spending limits\n• Track subscriptions\n\nYour average monthly spending: ₹49K');
  };

  const handleSetGoals = () => {
    const goal = prompt('What financial goal would you like to set?');
    if (goal) {
      alert(`Goal set: "${goal}"\n\nWe\'ll help you track your progress!`);
    }
  };

  const handleRewards = () => {
    alert('CreditCompass Rewards:\n\n🏆 Current Level: Silver\n📊 Points Earned: 2,450\n\nAvailable Rewards:\n• ₹500 cashback (1,000 points)');
  };

  const handleViewLoanDetails = (loanId: string) => {
    setShowLoanDetails(loanId === showLoanDetails ? null : loanId);
  };

  const handleDownloadLoan = (loanId: string) => {
    const loan = loanApplications.find(l => l.id === loanId);
    if (loan) {
      const documentData = {
        loanId: loan.id,
        applicationDetails: {
          applicantName: userData.name,
          amount: loan.amount,
          purpose: loan.purpose,
          term: loan.term,
          status: loan.status,
          bank: loan.bank,
          appliedDate: loan.appliedDate,
          decisionDate: loan.decisionDate,
        },
        financialDetails: {
          monthlyEMI: loan.monthlyPayment,
          interestRate: loan.interestRate,
          processingFee: loan.amount * 0.02,
          totalAmount: loan.amount * 1.1,
        },
        paymentSchedule: {
          nextPaymentDate: loan.nextPaymentDate,
          remainingAmount: loan.remainingAmount,
        },
        documents: [
          'Application Form',
          'Identity Verification',
          'Income Proof',
          'Bank Statement',
          'Address Proof',
        ],
        generatedAt: new Date().toISOString(),
      };
      
      const blob = new Blob([JSON.stringify(documentData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `loan-${loan.id}-${loan.status}-documents.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleTrackStatus = (loanId: string) => {
    setShowTrackStatus(loanId === showTrackStatus ? null : loanId);
  };

  const handleWhyRejected = (loanId: string) => {
    setShowWhyRejected(loanId === showWhyRejected ? null : loanId);
  };

  const handleEditProfile = () => {
    setShowEditProfile(!showEditProfile);
  };

  const handleLinkUPI = () => {
    setShowLinkUPI(!showLinkUPI);
  };

  const handleSecuritySettings = () => {
    setShowSecuritySettings(!showSecuritySettings);
  };

  const handleUploadDocument = () => {
    setShowUploadDocument(!showUploadDocument);
  };

  const handleManageUPI = (upiAccountId: string) => {
    setShowManageUPI(upiAccountId === showManageUPI ? null : upiAccountId);
  };

  const handleViewTransactions = () => {
    setShowViewTransactions(!showViewTransactions);
  };

  const handleSyncTransactions = () => {
    setShowSyncTransactions(!showSyncTransactions);
  };

  const handleUPIProviderChange = (provider: string) => {
    setUpiProvider(provider);
  };

  const handleUPIIdChange = (id: string) => {
    setUpiId(id);
  };

  const handleDocumentTypeChange = (type: string) => {
    setDocumentType(type);
  };

  const handleSecurityOptionChange = (option: string) => {
    setSecurityOption(option);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "pending":
        return <Clock className="w-5 h-5 text-accent" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-accent/10 text-accent";
      case "rejected":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Welcome back, <span className="gradient-text">{userData.name.split(" ")[0]}</span>
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your loan applications and track your credit profile.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={refreshing}
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="hero" className="gap-2" onClick={handleApplyNewLoan}>
                <CreditCard className="w-4 h-4" />
                Apply for New Loan
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
            {["overview", "analytics", "loans", "profile"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display font-semibold text-lg text-foreground">
                      Profile
                    </h2>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">{userData.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{userData.name}</h3>
                      <p className="text-sm text-muted-foreground">Member since {userData.memberSince}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{userData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{userData.address}</span>
                    </div>
                  </div>
                </div>

                {/* Credit Score Card */}
                <div className="glass-card p-6">
                  <h2 className="font-display font-semibold text-lg text-foreground mb-6">
                    AI Credit Score
                  </h2>
                  <div className="text-center mb-6">
                    <div className="relative w-32 h-32 mx-auto">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="hsl(210, 40%, 96%)" strokeWidth="12" fill="none" />
                        <circle cx="64" cy="64" r="56" stroke="hsl(173, 58%, 39%)" strokeWidth="12" fill="none" strokeDasharray={`${352 * userData.creditScore / 100} 352`} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-display font-bold text-foreground">{userData.creditScore}</span>
                      </div>
                    </div>
                    <p className="text-success font-medium mt-2">Good</p>
                    <p className="text-xs text-muted-foreground">Updated Jan 20, 2026</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                {/* Quick Stats */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="stat-card">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-success/10">
                        <IndianRupee className="w-5 h-5 text-success" />
                      </div>
                      <span className="text-sm text-muted-foreground">Active Loan</span>
                    </div>
                    <div className="text-2xl font-display font-bold text-foreground">₹5L</div>
                    <p className="text-xs text-muted-foreground mt-1">HDFC Bank</p>
                  </div>
                  <div className="stat-card">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">Applications</span>
                    </div>
                    <div className="text-2xl font-display font-bold text-foreground">3</div>
                    <p className="text-xs text-muted-foreground mt-1">2 pending</p>
                  </div>
                  <div className="stat-card">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <TrendingUp className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-sm text-muted-foreground">Approval Rate</span>
                    </div>
                    <div className="text-2xl font-display font-bold text-foreground">67%</div>
                    <p className="text-xs text-muted-foreground mt-1">+5% this month</p>
                  </div>
                </div>

                {/* Loan Applications */}
                <div className="glass-card p-6">
                  <h2 className="font-display font-semibold text-lg text-foreground mb-6">
                    Loan Applications
                  </h2>
                  <div className="space-y-4">
                    {loanApplications.map((loan) => (
                      <div key={loan.id} className="p-4 rounded-xl border border-border hover:border-primary/30 transition-all duration-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            {getStatusIcon(loan.status)}
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-foreground">₹{(loan.amount / 100000).toFixed(1)}L</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(loan.status)}`}>
                                  {loan.status}
                                </span>
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{loan.bank}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{loan.purpose} • {loan.term}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Applied: {loan.appliedDate}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {loan.status === "approved" && (
                              <>
                                <div className="text-right">
                                  <p className="text-xs text-muted-foreground">Monthly EMI</p>
                                  <p className="font-semibold text-foreground">₹{(loan.monthlyPayment / 1000).toFixed(0)}K</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" className="gap-1" onClick={() => handleViewLoanDetails(loan.id)}>
                                    <Eye className="w-3 h-3" />
                                    Details
                                  </Button>
                                  <Button variant="outline" size="sm" className="gap-1" onClick={() => handleDownloadLoan(loan.id)}>
                                    <Download className="w-3 h-3" />
                                    Download
                                  </Button>
                                </div>
                              </>
                            )}
                            {loan.status === "pending" && (
                              <div className="text-right">
                                <p className="text-sm text-accent">Decision in progress...</p>
                                <Button variant="outline" size="sm" className="gap-1 mt-2" onClick={() => handleTrackStatus(loan.id)}>
                                  <Eye className="w-3 h-3" />
                                  Track Status
                                </Button>
                              </div>
                            )}
                            {loan.status === "rejected" && (
                              <div className="text-right">
                                <p className="text-sm text-destructive">{loan.reason}</p>
                                <Button variant="outline" size="sm" className="gap-1 mt-2" onClick={() => handleWhyRejected(loan.id)}>
                                  <Info className="w-3 h-3" />
                                  Why Rejected?
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inline Loan Details Component */}
                {showLoanDetails && (
                  <div className="glass-card p-6 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display font-semibold text-lg text-foreground">📋 Loan Details</h3>
                      <Button variant="ghost" size="sm" onClick={() => setShowLoanDetails(null)}>
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    {loanApplications.filter(l => l.id === showLoanDetails).map(loan => (
                      <div key={loan.id} className="text-sm">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-muted-foreground">Application ID</p>
                            <p className="font-medium">{loan.id}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Status</p>
                            <p className="font-medium uppercase">{loan.status}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Bank</p>
                            <p className="font-medium">{loan.bank}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Amount</p>
                            <p className="font-medium">₹{(loan.amount / 100000).toFixed(1)}L</p>
                          </div>
                        </div>
                        {loan.monthlyPayment && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <h5 className="font-medium mb-3">💰 Financial Details</h5>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Monthly EMI</p>
                                <p className="font-medium">₹{(loan.monthlyPayment / 1000).toFixed(0)}K</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Interest Rate</p>
                                <p className="font-medium">{loan.interestRate || 'N/A'}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-4 gap-4 mt-6">
                  <Button variant="outline" className="gap-2 h-auto p-4 flex-col" onClick={handleTrackExpenses}>
                    <Activity className="w-6 h-6 text-accent" />
                    <span className="text-sm">Track Expenses</span>
                  </Button>
                  <Button variant="outline" className="gap-2 h-auto p-4 flex-col" onClick={handleSetGoals}>
                    <Target className="w-6 h-6 text-success" />
                    <span className="text-sm">Set Goals</span>
                  </Button>
                  <Button variant="outline" className="gap-2 h-auto p-4 flex-col" onClick={handleRewards}>
                    <Award className="w-6 h-6 text-warning" />
                    <span className="text-sm">Rewards</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Section */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">Financial Analytics</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">Credit Score Analysis</h3>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">{userData.creditScore}</div>
                    <p className="text-success font-medium">Good Score</p>
                    <p className="text-sm text-muted-foreground">Updated Jan 20, 2026</p>
                  </div>
                  <div className="space-y-4 mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Income Stability</span>
                      <span className="text-sm font-medium">85/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Payment History</span>
                      <span className="text-sm font-medium">90/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Savings Behavior</span>
                      <span className="text-sm font-medium">62/100</span>
                    </div>
                  </div>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">Monthly Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Income</span>
                      <span className="text-sm font-semibold text-success">₹91K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Spending</span>
                      <span className="text-sm font-semibold text-warning">₹49K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Savings Rate</span>
                      <span className="text-sm font-semibold text-primary">54%</span>
                    </div>
                  </div>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">Loan Statistics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Applications</span>
                      <span className="text-sm font-semibold">{loanApplications.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Success Rate</span>
                      <span className="text-sm font-semibold text-success">67%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Loans</span>
                      <span className="text-sm font-semibold">1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loans Tab */}
          {activeTab === "loans" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-foreground">Loan Management</h2>
                <Button variant="hero" className="gap-2" onClick={handleApplyNewLoan}>
                  <CreditCard className="w-4 h-4" />
                  Apply for New Loan
                </Button>
              </div>

              <div className="grid sm:grid-cols-4 gap-4">
                <div className="stat-card">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm text-muted-foreground">Approved</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground">1</div>
                  <p className="text-xs text-muted-foreground mt-1">₹5L total</p>
                </div>
                <div className="stat-card">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="text-sm text-muted-foreground">Pending</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground">1</div>
                  <p className="text-xs text-muted-foreground mt-1">₹3L total</p>
                </div>
                <div className="stat-card">
                  <div className="flex items-center gap-3 mb-2">
                    <XCircle className="w-5 h-5 text-destructive" />
                    <span className="text-sm text-muted-foreground">Rejected</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground">1</div>
                  <p className="text-xs text-muted-foreground mt-1">₹8L total</p>
                </div>
                <div className="stat-card">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground">33%</div>
                  <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-lg text-foreground mb-6">All Loan Applications</h3>
                <div className="space-y-4">
                  {loanApplications.map((loan) => (
                    <div key={loan.id} className="p-4 rounded-xl border border-border hover:border-primary/30 transition-all duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          {getStatusIcon(loan.status)}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-foreground">₹{(loan.amount / 100000).toFixed(1)}L</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(loan.status)}`}>
                                {loan.status}
                              </span>
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{loan.bank}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{loan.purpose} • {loan.term}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Applied: {loan.appliedDate}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {loan.status === "approved" && (
                            <>
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">Monthly EMI</p>
                                <p className="font-semibold text-foreground">₹{(loan.monthlyPayment / 1000).toFixed(0)}K</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="gap-1" onClick={() => handleViewLoanDetails(loan.id)}>
                                  <Eye className="w-3 h-3" />
                                  Details
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1" onClick={() => handleDownloadLoan(loan.id)}>
                                  <Download className="w-3 h-3" />
                                  Download
                                </Button>
                              </div>
                            </>
                          )}
                          {loan.status === "pending" && (
                            <div className="text-right">
                              <p className="text-sm text-accent">Decision in progress...</p>
                              <Button variant="outline" size="sm" className="gap-1 mt-2">
                                <Eye className="w-3 h-3" />
                                Track Status
                              </Button>
                            </div>
                          )}
                          {loan.status === "rejected" && (
                            <div className="text-right">
                              <p className="text-sm text-destructive">{loan.reason}</p>
                              <Button variant="outline" size="sm" className="gap-1 mt-2">
                                <Info className="w-3 h-3" />
                                Why Rejected?
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-foreground">Profile Settings</h2>
                <Button variant="outline" size="sm" className="gap-2" onClick={handleEditProfile}>
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>

              {/* Profile Summary Card */}
              <div className="glass-card p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{userData.avatar}</span>
                    </div>
                    <Button variant="outline" size="sm" className="absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8">
                      <Camera className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{userData.name}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Occupation</p>
                        <p className="font-medium">{userData.occupation}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Annual Income</p>
                        <p className="font-medium">{userData.annualIncome}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Experience</p>
                        <p className="font-medium">{userData.workExperience}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Member Since</p>
                        <p className="font-medium">{userData.memberSince}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-6">Personal Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{userData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">{userData.dateOfBirth}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="font-medium">{userData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <p className="font-medium">{userData.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">PAN Card</p>
                      <p className="font-medium">{userData.panCard}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Aadhaar Number</p>
                      <p className="font-medium">{userData.aadhaar}</p>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-6">Address Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Address</p>
                      <p className="font-medium">{userData.address}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">City</p>
                        <p className="font-medium">Bangalore</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">State</p>
                        <p className="font-medium">Karnataka</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">PIN Code</p>
                        <p className="font-medium">560001</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Country</p>
                        <p className="font-medium">India</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* UPI Accounts Section */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold text-lg text-foreground">UPI Accounts</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2" onClick={handleSyncTransactions}>
                      <RefreshCw className="w-4 h-4" />
                      Sync
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2" onClick={handleViewTransactions}>
                      <Eye className="w-4 h-4" />
                      View Transactions
                    </Button>
                    <Button variant="hero" size="sm" className="gap-2" onClick={handleLinkUPI}>
                      <Link className="w-4 h-4" />
                      Link UPI
                    </Button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {userData.upiAccounts.map((upi) => (
                    <div key={upi.id} className={`p-4 rounded-lg border ${upi.linked ? 'border-success/30 bg-success/5' : 'border-border bg-muted/30'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${upi.linked ? 'bg-success/10' : 'bg-muted'}`}>
                            <Smartphone className={`w-4 h-4 ${upi.linked ? 'text-success' : 'text-muted-foreground'}`} />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{upi.provider}</h4>
                            <p className="text-sm text-muted-foreground">{upi.upiId}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${upi.linked ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                          {upi.linked ? 'Linked' : 'Not Linked'}
                        </div>
                      </div>
                      {upi.linked && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Balance</span>
                            <span className="font-medium">{upi.balance}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last Transaction</span>
                            <span className="font-medium">{upi.lastTransaction}</span>
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => handleManageUPI(upi.upiId)}>
                            <Settings className="w-3 h-3 mr-1" />
                            Manage
                          </Button>
                        </div>
                      )}
                      {!upi.linked && (
                        <div className="text-center py-2">
                          <Button variant="outline" size="sm" onClick={() => handleLinkUPI()}>
                            <Link className="w-3 h-3 mr-1" />
                            Link Account
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bank Accounts Section */}
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-lg text-foreground mb-6">Bank Accounts</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {userData.bankAccounts.map((bank) => (
                    <div key={bank.id} className="p-4 rounded-lg border border-border bg-muted/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Banknote className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{bank.name}</h4>
                            <p className="text-sm text-muted-foreground">{bank.accountNumber}</p>
                          </div>
                        </div>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                          {bank.type}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Balance</span>
                        <span className="font-medium">{bank.balance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold text-lg text-foreground">Recent Transactions</h3>
                  <Button variant="outline" size="sm" className="gap-2" onClick={handleViewTransactions}>
                    <Eye className="w-4 h-4" />
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {userData.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${transaction.type === 'credit' ? 'bg-success/10' : 'bg-destructive/10'}`}>
                          {transaction.type === 'credit' ? (
                            <TrendingUp className="w-4 h-4 text-success" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-destructive" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.category} • {transaction.date}</p>
                        </div>
                      </div>
                      <span className={`font-semibold ${transaction.type === 'credit' ? 'text-success' : 'text-destructive'}`}>
                        {transaction.type === 'credit' ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents Section */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold text-lg text-foreground">Documents</h3>
                  <Button variant="outline" size="sm" className="gap-2" onClick={handleUploadDocument}>
                    <Upload className="w-4 h-4" />
                    Upload Document
                  </Button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="w-4 h-4 text-success" />
                      <span className="text-xs text-success">Verified</span>
                    </div>
                    <p className="font-medium text-sm">PAN Card</p>
                    <p className="text-xs text-muted-foreground">Uploaded on Jan 15, 2026</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="w-4 h-4 text-success" />
                      <span className="text-xs text-success">Verified</span>
                    </div>
                    <p className="font-medium text-sm">Aadhaar Card</p>
                    <p className="text-xs text-muted-foreground">Uploaded on Jan 15, 2026</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="w-4 h-4 text-warning" />
                      <span className="text-xs text-warning">Pending</span>
                    </div>
                    <p className="font-medium text-sm">Bank Statement</p>
                    <p className="text-xs text-muted-foreground">Uploaded on Jan 20, 2026</p>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-lg text-foreground mb-6">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleSecuritySettings}>Manage</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-medium">Password & Security</p>
                        <p className="text-sm text-muted-foreground">Manage password and security options</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleSecuritySettings}>Settings</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-warning" />
                      <div>
                        <p className="font-medium">Login Activity</p>
                        <p className="text-sm text-muted-foreground">View recent login attempts</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleSecuritySettings}>View</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
