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
  ChevronRight,
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
  PieChart,
  BarChart3,
  Users,
  FileCheck,
  AlertTriangle,
  Star,
  ArrowUp,
  ArrowDown,
  Filter,
  Search,
  Plus,
  Minus,
  MoreVertical,
  Home,
  TrendingUp as TrendingUpIcon,
  DollarSign,
  Calculator,
  CreditCard as CreditCardIcon2,
  Building,
  Briefcase,
  GraduationCap,
  Heart,
  Globe,
  Mail as MailIcon,
  Phone as PhoneIcon,
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

  const [showLoanApplication, setShowLoanApplication] = useState(false);
  const [showTransactionUpload, setShowTransactionUpload] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [creditScoreResults, setCreditScoreResults] = useState<any>(null);
  const [loanApplicationData, setLoanApplicationData] = useState({
    amount: '',
    term: '',
    purpose: '',
    bank: '',
    income: '',
    employment: '',
    panCard: '',
  });
  const [transactionFile, setTransactionFile] = useState<File | null>(null);

  // Debug state changes
  useEffect(() => {
    console.log('showTransactionUpload state:', showTransactionUpload);
  }, [showTransactionUpload]);

  const handleApplyNewLoan = () => {
    setShowLoanApplication(true);
  };

  const handleLoanApplicationSubmit = () => {
    if (loanApplicationData.amount && loanApplicationData.term && loanApplicationData.purpose) {
      setApplicationSubmitted(true);
      setShowLoanApplication(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleTransactionFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File upload triggered');
    const file = event.target.files?.[0];
    console.log('Selected file:', file);
    
    if (file) {
      console.log('File type:', file.type);
      console.log('File name:', file.name);
      
      if (file.type === "text/csv" || file.name.endsWith('.csv')) {
        setTransactionFile(file);
        console.log('File successfully set:', file.name);
        alert(`✅ File "${file.name}" uploaded successfully!`);
      } else {
        console.log('Invalid file type');
        alert('❌ Please upload a valid CSV file');
      }
    } else {
      console.log('No file selected');
    }
  };

  const handleTransactionAnalysis = () => {
    if (transactionFile) {
      // Simulate credit score calculation based on the Python algorithm
      const mockCreditResults = {
        monthly_income: 25000,
        monthly_obligations: 7500,
        liquidity_buffer_days: 45,
        account_age_days: 180,
        total_transactions: 156,
        has_stable_income: true,
        acceptance_rate: 78,
        risk_category: 'LOW_RISK',
        recommendations: [
          'Strong income stability detected',
          'Good liquidity buffer maintained',
          'Low debt-to-income ratio',
          'Account shows consistent activity'
        ],
        loan_eligibility: {
          max_amount: 500000,
          max_tenure: '24 months',
          interest_rate_range: '8.5% - 12.5%',
          processing_fee: '2% of loan amount'
        }
      };
      
      setCreditScoreResults(mockCreditResults);
      setShowTransactionUpload(false);
    } else {
      alert('Please upload a transaction file first');
    }
  };

  const handleLoanApplicationDataChange = (field: string, value: string) => {
    setLoanApplicationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleSetGoals = () => {
    const goal = prompt('What financial goal would you like to set?');
    if (goal) {
      alert(`Goal set: "${goal}"\n\nWe'll help you track your progress!`);
    }
  };

  const handleTrackExpenses = () => {
    alert('Expense Tracking:\n\nMonthly Spending Analysis:\n• Shopping: ₹15,000\n• Food: ₹8,000\n• Transport: ₹4,000\n• Entertainment: ₹3,000\n• Utilities: ₹6,000\n• Others: ₹2,000\n\nTotal: ₹38,000\n\nThis would open detailed expense tracking with categorization and budget alerts.');
  };

  const handleImproveScore = () => {
    alert('Credit Score Improvement Plan:\n\nCurrent Score: 77\nTarget Score: 750+\n\nAction Items:\n1. Pay all bills on time\n2. Reduce credit utilization to <30%\n3. Avoid new credit applications\n4. Keep old credit cards active\n5. Monitor credit report regularly\n\nExpected improvement: 50-80 points in 6 months');
  };

  const handleRewards = () => {
    alert('CreditCompass Rewards:\n\n🏆 Current Level: Silver\n📊 Points Earned: 2,450\n\nAvailable Rewards:\n• ₹500 cashback (1,000 points)\n• 5% discount on processing fees (800 points)\n• Free credit report (500 points)\n• Priority support (300 points)');
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

  const handleUPIProviderChange = (provider: string) => {
    setUpiProvider(provider);
  };

  const handleUPIIdChange = (id: string) => {
    setUpiId(id);
  };

  const handleLinkUPISubmit = () => {
    if (upiProvider && upiId && upiId.includes('@')) {
      // Add new UPI account to userData
      const newUPIAccount = {
        id: `upi${Date.now()}`,
        provider: upiProvider,
        upiId: upiId,
        linked: true,
        lastTransaction: new Date().toISOString().split('T')[0],
        balance: "₹0",
        transactions: [
          {
            id: `tx${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            description: "Account Linked",
            amount: 0,
            category: "Account",
            type: "credit"
          }
        ]
      };
      
      // In a real app, this would save to backend
      alert(`✅ UPI Account Linked Successfully!\n\nProvider: ${upiProvider}\nUPI ID: ${upiId}\n\nWe'll now sync your transactions for better financial insights.\n\nNote: You can unlink anytime from UPI settings.`);
      setShowLinkUPI(false);
      setUpiProvider('');
      setUpiId('');
    } else {
      alert('❌ Please select a provider and enter a valid UPI ID');
    }
  };

  const handleSyncTransactions = () => {
    setShowSyncTransactions(true);
    // Simulate syncing
    setTimeout(() => {
      setShowSyncTransactions(false);
      alert('🔄 Transactions synced successfully!\n\n15 new transactions found across your linked UPI accounts.');
    }, 2000);
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

  const handleViewTransactionHistory = () => {
    setShowViewTransactions(!showViewTransactions);
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 70) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Welcome back, <span className="gradient-text">{userData.name.split(" ")[0]}</span>
              </h1>
              <p className="text-muted-foreground mt-2">Manage your loans and track your financial journey</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2" onClick={handleRefresh}>
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="hero" size="sm" className="gap-2" onClick={handleApplyNewLoan}>
                <CreditCard className="w-4 h-4" />
                Apply for New Loan
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 p-1 bg-background rounded-lg border">
            {["overview", "analytics", "loans", "profile"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className="capitalize"
              >
                {tab}
              </Button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="space-y-6">
                <div className="glass-card p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display font-semibold text-lg text-foreground">Profile</h2>
                    <Button variant="ghost" size="sm" className="gap-2" onClick={handleEditProfile}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">{userData.avatar}</span>
                      </div>
                      <Button variant="outline" size="sm" className="absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8">
                        <Camera className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground">{userData.name}</h3>
                      <p className="text-sm text-muted-foreground">{userData.occupation}</p>
                      <p className="text-xs text-muted-foreground">Member since {userData.memberSince}</p>
                    </div>
                  </div>
                </div>

                {/* Credit Score Card */}
                <div className="glass-card p-6">
                  <h2 className="font-display font-semibold text-lg text-foreground mb-6">AI Credit Score</h2>
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
                  <h2 className="font-display font-semibold text-lg text-foreground mb-6">Recent Loan Applications</h2>
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

                {/* Inline Components */}
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

                {showTrackStatus && (
                  <div className="glass-card p-6 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display font-semibold text-lg text-foreground">🔍 Application Tracking</h3>
                      <Button variant="ghost" size="sm" onClick={() => setShowTrackStatus(null)}>
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    {loanApplications.filter(l => l.id === showTrackStatus).map(loan => (
                      <div key={loan.id} className="text-sm">
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-muted-foreground">Application ID</span>
                            <span className="font-medium">{loan.id}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Status</span>
                            <span className="font-medium uppercase">{loan.status}</span>
                          </div>
                        </div>
                        <div className="mb-4 p-3 bg-primary/5 rounded-lg">
                          <h5 className="font-medium mb-2">📊 Real-time Status</h5>
                          <div className="space-y-1">
                            <p><span className="text-muted-foreground">Current Stage:</span> Document Verification</p>
                            <p><span className="text-muted-foreground">Progress:</span> 75% Complete</p>
                            <p><span className="text-muted-foreground">Next Step:</span> Credit Assessment</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {showWhyRejected && (
                  <div className="glass-card p-6 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display font-semibold text-lg text-foreground">❌ Application Rejected</h3>
                      <Button variant="ghost" size="sm" onClick={() => setShowWhyRejected(null)}>
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    {loanApplications.filter(l => l.id === showWhyRejected).map(loan => (
                      <div key={loan.id} className="text-sm">
                        <div className="mb-4 p-3 bg-destructive/10 rounded-lg">
                          <h5 className="font-medium mb-2">📋 Reason for Rejection</h5>
                          <p>{loan.reason}</p>
                        </div>
                        <div className="mb-4">
                          <h5 className="font-medium mb-2">💡 Improvement Recommendations</h5>
                          <div className="space-y-2">
                            <p>• Improve credit score to 750+</p>
                            <p>• Reduce debt-to-income ratio below 40%</p>
                            <p>• Maintain stable employment for 3+ years</p>
                            <p>• Pay all bills on time for 6 months</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Actions */}
                <div className="grid md:grid-cols-5 gap-4 mt-6">
                  <Button variant="outline" className="gap-2 h-auto p-4 flex-col" onClick={handleImproveScore}>
                    <Shield className="w-6 h-6 text-primary" />
                    <span className="text-sm">Improve Score</span>
                  </Button>
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
                  <Button variant="outline" className="gap-2 h-auto p-4 flex-col" onClick={handleLinkUPI}>
                    <Smartphone className="w-6 h-6 text-primary" />
                    <span className="text-sm">Link UPI</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Loan Application Modal */}
          {showLoanApplication && (
            <div className="glass-card p-6 mt-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-lg text-foreground">📝 Loan Application</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowLoanApplication(false)}>
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Loan Amount (₹)</label>
                    <input
                      type="number"
                      placeholder="500000"
                      className="w-full p-2 border border-border rounded-lg bg-background"
                      value={loanApplicationData.amount}
                      onChange={(e) => handleLoanApplicationDataChange('amount', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Loan Term</label>
                    <select 
                      className="w-full p-2 border border-border rounded-lg bg-background"
                      value={loanApplicationData.term}
                      onChange={(e) => handleLoanApplicationDataChange('term', e.target.value)}
                    >
                      <option value="">Select term...</option>
                      <option value="6 months">6 months</option>
                      <option value="12 months">12 months</option>
                      <option value="24 months">24 months</option>
                      <option value="36 months">36 months</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Purpose</label>
                  <select 
                    className="w-full p-2 border border-border rounded-lg bg-background"
                    value={loanApplicationData.purpose}
                    onChange={(e) => handleLoanApplicationDataChange('purpose', e.target.value)}
                  >
                    <option value="">Select purpose...</option>
                    <option value="Home Renovation">Home Renovation</option>
                    <option value="Vehicle Purchase">Vehicle Purchase</option>
                    <option value="Emergency Fund">Emergency Fund</option>
                    <option value="Education">Education</option>
                    <option value="Medical">Medical</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Preferred Bank</label>
                  <select 
                    className="w-full p-2 border border-border rounded-lg bg-background"
                    value={loanApplicationData.bank}
                    onChange={(e) => handleLoanApplicationDataChange('bank', e.target.value)}
                  >
                    <option value="">Select bank...</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="SBI">SBI</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Bank">Kotak Bank</option>
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Monthly Income (₹)</label>
                    <input
                      type="number"
                      placeholder="50000"
                      className="w-full p-2 border border-border rounded-lg bg-background"
                      value={loanApplicationData.income}
                      onChange={(e) => handleLoanApplicationDataChange('income', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Employment Type</label>
                    <select 
                      className="w-full p-2 border border-border rounded-lg bg-background"
                      value={loanApplicationData.employment}
                      onChange={(e) => handleLoanApplicationDataChange('employment', e.target.value)}
                    >
                      <option value="">Select employment...</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Self-employed">Self-employed</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">PAN Card Number</label>
                  <input
                    type="text"
                    placeholder="ABCPJ1234K"
                    className="w-full p-2 border border-border rounded-lg bg-background"
                    value={loanApplicationData.panCard}
                    onChange={(e) => handleLoanApplicationDataChange('panCard', e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowLoanApplication(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleLoanApplicationSubmit}>
                    Submit Application
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Application Submitted Confirmation */}
          {applicationSubmitted && (
            <div className="glass-card p-6 mt-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">🎉 Application Submitted Successfully!</h3>
                <p className="text-muted-foreground mb-4">
                  Your loan application has been submitted successfully. Application ID: LA-2026-{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  You can upload your transaction history in the Profile section for credit assessment
                </p>
                <Button onClick={() => setApplicationSubmitted(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
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
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">Monthly Spending</h3>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-accent mb-2">₹38K</div>
                    <p className="text-accent font-medium">This Month</p>
                    <p className="text-sm text-muted-foreground">12% less than last month</p>
                  </div>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">Savings Rate</h3>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-success mb-2">54%</div>
                    <p className="text-success font-medium">Excellent</p>
                    <p className="text-sm text-muted-foreground">Above recommended 30%</p>
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
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-lg text-foreground mb-6">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{userData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="font-medium">{userData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <p className="font-medium">{userData.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">{userData.dateOfBirth}</p>
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
              </div>

              {/* UPI Accounts Management */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold text-lg text-foreground">UPI Accounts</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2" onClick={handleSyncTransactions}>
                      <RefreshCw className="w-4 h-4" />
                      Sync
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2" onClick={handleViewTransactionHistory}>
                      <Eye className="w-4 h-4" />
                      View History
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
                          <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => handleManageUPI(upi.id)}>
                            <Settings className="w-3 h-3 mr-1" />
                            Manage
                          </Button>
                        </div>
                      )}
                      {!upi.linked && (
                        <div className="text-center py-2">
                          <Button variant="outline" size="sm" onClick={handleLinkUPI}>
                            <Link className="w-3 h-3 mr-1" />
                            Link Account
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Transaction History Modal */}
              {showViewTransactions && (
                <div className="glass-card p-6 mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-lg text-foreground">📊 Transaction History</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowViewTransactions(false)}>
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Filter className="w-4 h-4" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Search className="w-4 h-4" />
                          Search
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Showing all transactions from linked UPI accounts
                      </div>
                    </div>
                    <div className="space-y-3">
                      {userData.recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/30 transition-all duration-200">
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
                </div>
              )}

              {/* UPI Linking Modal */}
              {showLinkUPI && (
                <div className="glass-card p-6 mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-lg text-foreground">🔗 Link UPI Account</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowLinkUPI(false)}>
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Select UPI Provider</label>
                      <select 
                        className="w-full p-2 border border-border rounded-lg bg-background"
                        value={upiProvider}
                        onChange={(e) => handleUPIProviderChange(e.target.value)}
                      >
                        <option value="">Choose a provider...</option>
                        <option value="Google Pay">Google Pay</option>
                        <option value="PhonePe">PhonePe</option>
                        <option value="Paytm">Paytm</option>
                        <option value="Amazon Pay">Amazon Pay</option>
                        <option value="BHIM">BHIM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Enter UPI ID</label>
                      <input
                        type="text"
                        placeholder="username@bank"
                        className="w-full p-2 border border-border rounded-lg bg-background"
                        value={upiId}
                        onChange={(e) => handleUPIIdChange(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setShowLinkUPI(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleLinkUPISubmit}>
                        Link Account
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Transaction Upload Section */}
              <div className="glass-card p-6" style={{ position: 'relative', zIndex: 10 }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold text-lg text-foreground">📊 Credit Assessment</h3>
                  <div className="flex gap-2" style={{ position: 'relative', zIndex: 20 }}>
                    {/* Test button */}
                    <button 
                      style={{ 
                        backgroundColor: 'red', 
                        color: 'white', 
                        padding: '8px 16px', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 30
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        alert('Test button clicked!');
                        console.log('Test button clicked');
                        setShowTransactionUpload(true);
                      }}
                      onMouseDown={(e) => {
                        console.log('Mouse down on test button');
                      }}
                    >
                      TEST UPLOAD
                    </button>
                    <Button 
                      variant="hero" 
                      size="sm" 
                      className="gap-2" 
                      style={{ position: 'relative', zIndex: 25 }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Upload button clicked');
                        setShowTransactionUpload(true);
                      }}
                      onMouseDown={(e) => {
                        console.log('Mouse down on upload button');
                      }}
                    >
                      <Upload className="w-4 h-4" />
                      Upload Transaction History
                    </Button>
                  </div>
                </div>
                <div className="text-center py-8">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload your 3-month transaction history for credit assessment
                  </p>
                  <p className="text-xs text-muted-foreground">
                    This will help us calculate your loan acceptance rate
                  </p>
                </div>
              </div>

              {/* Transaction Upload Modal */}
              {showTransactionUpload && (
                <div className="glass-card p-6 mt-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-semibold text-lg text-foreground">📊 Upload Transaction History</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowTransactionUpload(false)}>
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Upload CSV File</label>
                      <div 
                        className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                        onClick={() => {
                          console.log('Drop zone clicked');
                          document.getElementById('transaction-file-profile')?.click();
                        }}
                      >
                        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload your 3-month transaction history in CSV format
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Format: user_id,date,description,amount,type,balance,category
                        </p>
                        <input
                          type="file"
                          accept=".csv"
                          onChange={handleTransactionFileUpload}
                          className="hidden"
                          id="transaction-file-profile"
                        />
                        <Button 
                          variant="outline" 
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Choose File button clicked');
                            document.getElementById('transaction-file-profile')?.click();
                          }}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                        {transactionFile && (
                          <p className="text-sm text-success mt-2">
                            ✅ {transactionFile.name} selected
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">📋 What we analyze:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Monthly income stability</li>
                        <li>• Debt-to-income ratio</li>
                        <li>• Liquidity buffer (emergency funds)</li>
                        <li>• Account maturity and consistency</li>
                        <li>• Transaction patterns and spending habits</li>
                      </ul>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setShowTransactionUpload(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleTransactionAnalysis} disabled={!transactionFile}>
                        Analyze Transactions
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Credit Score Results */}
              {creditScoreResults && (
                <div className="glass-card p-6 mt-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-semibold text-lg text-foreground">🎯 Credit Assessment Results</h3>
                    <Button variant="ghost" size="sm" onClick={() => setCreditScoreResults(null)}>
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-center mb-6">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="64" cy="64" r="56" stroke="hsl(210, 40%, 96%)" strokeWidth="12" fill="none" />
                            <circle cx="64" cy="64" r="56" stroke={creditScoreResults.acceptance_rate >= 70 ? "hsl(173, 58%, 39%)" : creditScoreResults.acceptance_rate >= 40 ? "hsl(38, 92%, 50%)" : "hsl(0, 84%, 60%)"} strokeWidth="12" fill="none" strokeDasharray={`${352 * creditScoreResults.acceptance_rate / 100} 352`} strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl font-display font-bold text-foreground">{creditScoreResults.acceptance_rate}%</span>
                          </div>
                        </div>
                        <h4 className="font-semibold text-lg text-foreground">Acceptance Rate</h4>
                        <p className={`text-sm font-medium ${creditScoreResults.risk_category === 'LOW_RISK' ? 'text-success' : creditScoreResults.risk_category === 'MEDIUM_RISK' ? 'text-warning' : 'text-destructive'}`}>
                          {creditScoreResults.risk_category.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">📊 Financial Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Monthly Income</span>
                          <span className="font-medium">₹{creditScoreResults.monthly_income.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Monthly Obligations</span>
                          <span className="font-medium">₹{creditScoreResults.monthly_obligations.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Liquidity Buffer</span>
                          <span className="font-medium">{creditScoreResults.liquidity_buffer_days} days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Account Age</span>
                          <span className="font-medium">{creditScoreResults.account_age_days} days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Transactions</span>
                          <span className="font-medium">{creditScoreResults.total_transactions}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">💡 Key Findings</h4>
                      <ul className="space-y-2">
                        {creditScoreResults.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">🏆 Loan Eligibility</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Maximum Amount</span>
                          <span className="font-medium">₹{creditScoreResults.loan_eligibility.max_amount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Maximum Tenure</span>
                          <span className="font-medium">{creditScoreResults.loan_eligibility.max_tenure}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Interest Rate</span>
                          <span className="font-medium">{creditScoreResults.loan_eligibility.interest_rate_range}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Processing Fee</span>
                          <span className="font-medium">{creditScoreResults.loan_eligibility.processing_fee}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <Button variant="hero" onClick={() => setCreditScoreResults(null)}>
                      Close
                    </Button>
                    <Button variant="outline">
                      Download Report
                    </Button>
                  </div>
                </div>
              )}

              {/* Sync Transactions Modal */}
              {showSyncTransactions && (
                <div className="glass-card p-6 mt-4">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4">
                      <RefreshCw className="w-full h-full text-primary animate-spin" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">Syncing Transactions</h3>
                    <p className="text-muted-foreground">Connecting to your linked UPI accounts...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
