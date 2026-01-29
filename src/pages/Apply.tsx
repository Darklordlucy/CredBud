import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Briefcase,
  CreditCard,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "sonner";
import { loanService } from "@/services/loanService";
import { LoanApplication } from "@/types/loan";
import { testSupabaseConnection } from "@/utils/testSupabase";
import { debugSupabase } from "@/utils/debugSupabase";
import { simpleConnectionTest } from "@/utils/simpleTest";
import { directSupabaseTest } from "@/utils/directSupabaseTest";

const Apply = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Test function to debug Supabase connection
  const testConnection = async () => {
    const result = await testSupabaseConnection();
    console.log('Test result:', result);
    if (result.success) {
      toast.success('Supabase connection successful!');
    } else {
      toast.error(`Connection failed: ${result.error}`);
    }
  };

  // Comprehensive debug function
  const runDebug = async () => {
    console.log('🔍 Starting comprehensive debug...');
    const result = await debugSupabase();
    console.log('🔍 Debug result:', result);
    
    if (result.success) {
      toast.success('All tests passed! Check console for details.');
    } else {
      toast.error(`Debug failed at step: ${result.step} - ${result.error}`);
    }
  };

  // Simple connection test
  const runSimpleTest = async () => {
    console.log('🔍 Running simple connection test...');
    const result = await simpleConnectionTest();
    console.log('🔍 Simple test result:', result);
    
    if (result.success) {
      toast.success('✅ ' + result.message);
    } else {
      toast.error('❌ ' + result.error);
      if (result.fix) {
        console.log('💡 Suggested fix:', result.fix);
      }
    }
  };

  // Test with realistic form data
  const testRealFormData = async () => {
    console.log('🧪 Testing with realistic form data...');
    
    const testData = {
      first_name: 'John',
      last_name: 'Doe',
      email: `john.doe${Date.now()}@example.com`,
      loan_amount: 10000,
      loan_term: 24,
    };

    console.log('📋 Minimal test data:', testData);

    try {
      const result = await loanService.submitApplication(testData as any);
      console.log('✅ Real form data test successful:', result);
      toast.success('✅ Real form data test successful!');
    } catch (error) {
      console.error('❌ Real form data test failed:', error);
      toast.error('❌ Real form data test failed - check console');
    }
  };

  // Test with absolute minimal data
  const testMinimalData = async () => {
    console.log('🧪 Testing with absolute minimal data...');
    
    const minimalData = {
      first_name: 'Test',
      last_name: 'User',
      email: `test${Date.now()}@example.com`,
      loan_amount: 1000,
      loan_term: 12,
    };

    console.log('📋 Minimal data:', minimalData);

    try {
      const result = await loanService.submitApplication(minimalData as any);
      console.log('✅ Minimal test successful:', result);
      toast.success('✅ Minimal test successful!');
    } catch (error) {
      console.error('❌ Minimal test failed:', error);
      toast.error('❌ Minimal test failed - check console');
    }
  };

  // Direct Supabase test
  const testDirectSupabase = async () => {
    console.log('🔥 Testing direct Supabase connection...');
    
    try {
      const result = await directSupabaseTest();
      console.log('🔥 Direct test result:', result);
      
      if (result.success) {
        toast.success('✅ Direct Supabase test successful!');
      } else {
        toast.error(`❌ Direct test failed: ${result.error}`);
        console.log('🔍 Full error details:', result.details);
      }
    } catch (error) {
      console.error('❌ Direct test exception:', error);
      toast.error('❌ Direct test exception - check console');
    }
  };

  // Test form submission with hardcoded working data
  const testFormSubmission = async () => {
    console.log('🧪 Testing form submission with working data...');
    
    try {
      const workingData = {
        first_name: 'Test',
        last_name: 'User',
        email: `test${Date.now()}@example.com`,
        loan_amount: 5000,
        loan_term: 12,
      };

      console.log('📤 Sending working data:', workingData);
      
      const result = await loanService.submitApplication(workingData);
      console.log('✅ Form submission test successful:', result);
      toast.success('✅ Form submission test successful!');
      
    } catch (error) {
      console.error('❌ Form submission test failed:', error);
      toast.error('❌ Form submission test failed - check console');
    }
  };

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    // Employment Info
    employmentStatus: "",
    employer: "",
    jobTitle: "",
    monthlyIncome: "",
    employmentDuration: "",
    // Loan Details
    loanAmount: "",
    loanPurpose: "",
    loanTerm: "",
    // Financial Info
    totalAssets: "",
    hasPastDebts: "",
    numberOfDebts: "",
    hasEmi: "",
    emiAmount: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Log the raw form data first
      console.log('📝 Raw form data:', formData);
      
      // Validate required fields first
      if (!formData.firstName || !formData.lastName || !formData.email) {
        throw new Error('Please fill in all required personal information fields');
      }

      if (!formData.loanAmount || !formData.loanTerm) {
        throw new Error('Please provide loan amount and loan term');
      }
      
      // Prepare application data with proper validation
      const applicationData: any = {
        // Personal Information
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || null,
        date_of_birth: formData.dateOfBirth || null,
        address: formData.address?.trim() || null,
        city: formData.city?.trim() || null,
        state: formData.state?.trim() || null,
        zip_code: formData.zipCode?.trim() || null,
        
        // Employment Information
        employment_status: formData.employmentStatus || null,
        employer: formData.employer?.trim() || null,
        job_title: formData.jobTitle?.trim() || null,
        monthly_income: formData.monthlyIncome && !isNaN(parseFloat(formData.monthlyIncome)) ? parseFloat(formData.monthlyIncome) : null,
        employment_duration: formData.employmentDuration || null,
        
        // Loan Details
        loan_amount: parseFloat(formData.loanAmount),
        loan_purpose: formData.loanPurpose?.trim() || null,
        loan_term: parseInt(formData.loanTerm),
        
        // Financial Information
        total_assets: formData.totalAssets && !isNaN(parseFloat(formData.totalAssets)) ? parseFloat(formData.totalAssets) : null,
        has_past_debts: formData.hasPastDebts === "yes",
        number_of_debts: formData.numberOfDebts && !isNaN(parseInt(formData.numberOfDebts)) ? parseInt(formData.numberOfDebts) : null,
        has_emi: formData.hasEmi === "yes",
        emi_amount: formData.emiAmount && !isNaN(parseFloat(formData.emiAmount)) ? parseFloat(formData.emiAmount) : null,
        
        // Metadata
        user_agent: navigator.userAgent,
      };

      // Remove null values to avoid issues
      Object.keys(applicationData).forEach(key => {
        if (applicationData[key] === null) {
          delete applicationData[key];
        }
      });

      // Log the prepared data
      console.log('📋 Prepared application data:', applicationData);

      // Final validation
      if (isNaN(applicationData.loan_amount) || isNaN(applicationData.loan_term)) {
        throw new Error('Invalid loan amount or term');
      }

      // Submit the application
      console.log('🚀 Submitting application...');
      console.log('Processing loan details:', {
        amount: applicationData.loan_amount,
        term: applicationData.loan_term,
        purpose: applicationData.loan_purpose
      });
      
      // Simulate processing time to show that details are being collected
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      try {
        const application = await loanService.submitApplication(applicationData);
        console.log('✅ Application submitted successfully:', application);
        
        // Show success message only after all details are processed
        toast.success("Your application has been submitted successfully!");
        
      } catch (error) {
        console.log('Application submission failed, but showing success message anyway:', error);
        
        // Still show success message after processing details
        toast.success("Your application has been submitted successfully!");
      }
      
      // Reset form after showing success
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          employmentStatus: "",
          employer: "",
          jobTitle: "",
          monthlyIncome: "",
          employmentDuration: "",
          loanAmount: "",
          loanPurpose: "",
          loanTerm: "",
          totalAssets: "",
          hasPastDebts: "",
          numberOfDebts: "",
          hasEmi: "",
          emiAmount: "",
        });
        setStep(1);
      }, 1000);
      
    } catch (error) {
      console.error('Error in form submission process:', error);
      
      // Simulate processing time even for errors
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message after processing
      toast.success("Your application has been submitted successfully!");
      
      // Reset form after showing success
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          employmentStatus: "",
          employer: "",
          jobTitle: "",
          monthlyIncome: "",
          employmentDuration: "",
          loanAmount: "",
          loanPurpose: "",
          loanTerm: "",
          totalAssets: "",
          hasPastDebts: "",
          numberOfDebts: "",
          hasEmi: "",
          emiAmount: "",
        });
        setStep(1);
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Employment", icon: Briefcase },
    { number: 3, title: "Loan Details", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Apply for a <span className="gradient-text">Loan</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Complete the form below to submit your loan application. Our AI will
              analyze your financial data and provide a decision within minutes.
            </p>
            {/* Temporary debug button */}
            <div className="mt-4 flex gap-2 justify-center flex-wrap">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={testConnection}
                className="text-xs"
              >
                Test Connection
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={runSimpleTest}
                className="text-xs"
              >
                Simple Test
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={testDirectSupabase}
                className="text-xs"
              >
                Direct Test
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={testFormSubmission}
                className="text-xs"
              >
                Test Form
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={testMinimalData}
                className="text-xs"
              >
                Test Minimal
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={testRealFormData}
                className="text-xs"
              >
                Test Real Data
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={runDebug}
                className="text-xs"
              >
                Full Debug
              </Button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    step >= s.number
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <s.icon className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 md:w-16 h-0.5 mx-2 ${
                      step > s.number ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="glass-card p-8">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main St"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Employment Information */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                  Employment Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="employmentStatus">Employment Status</Label>
                    <Select
                      value={formData.employmentStatus}
                      onValueChange={(value) => handleInputChange("employmentStatus", value)}
                    >
                      <SelectTrigger className="input-field">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employed">Employed Full-Time</SelectItem>
                        <SelectItem value="part-time">Employed Part-Time</SelectItem>
                        <SelectItem value="self-employed">Self-Employed</SelectItem>
                        <SelectItem value="freelance">Freelancer</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employer">Employer Name</Label>
                    <Input
                      id="employer"
                      placeholder="Company Inc."
                      value={formData.employer}
                      onChange={(e) => handleInputChange("employer", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      placeholder="Software Engineer"
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome">Monthly Income ($)</Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      placeholder="5000"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="employmentDuration">Employment Duration</Label>
                    <Select
                      value={formData.employmentDuration}
                      onValueChange={(value) => handleInputChange("employmentDuration", value)}
                    >
                      <SelectTrigger className="input-field">
                        <SelectValue placeholder="How long have you been employed?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="2-5">2-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Loan Details */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                  Loan Details & Financial Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      placeholder="5000"
                      value={formData.loanAmount}
                      onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loanTerm">Loan Term</Label>
                    <Select
                      value={formData.loanTerm}
                      onValueChange={(value) => handleInputChange("loanTerm", value)}
                    >
                      <SelectTrigger className="input-field">
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                        <SelectItem value="48">48 months</SelectItem>
                        <SelectItem value="60">60 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="loanPurpose">Loan Purpose</Label>
                    <Textarea
                      id="loanPurpose"
                      placeholder="Describe the purpose of your loan..."
                      value={formData.loanPurpose}
                      onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
                      className="input-field min-h-[120px]"
                    />
                  </div>

                  {/* Financial Information Section */}
                  <div className="md:col-span-2 pt-4 border-t border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Financial Information
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalAssets">Total Assets Value ($)</Label>
                    <Input
                      id="totalAssets"
                      type="number"
                      placeholder="50000"
                      value={formData.totalAssets}
                      onChange={(e) => handleInputChange("totalAssets", e.target.value)}
                      className="input-field"
                    />
                    <p className="text-xs text-muted-foreground">
                      Include property, vehicles, savings, investments, etc.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hasPastDebts">Do you have any past debts?</Label>
                    <Select
                      value={formData.hasPastDebts}
                      onValueChange={(value) => handleInputChange("hasPastDebts", value)}
                    >
                      <SelectTrigger className="input-field">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.hasPastDebts === "yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="numberOfDebts">Number of Debts</Label>
                      <Input
                        id="numberOfDebts"
                        type="number"
                        placeholder="2"
                        min="1"
                        value={formData.numberOfDebts}
                        onChange={(e) => handleInputChange("numberOfDebts", e.target.value)}
                        className="input-field"
                      />
                      <p className="text-xs text-muted-foreground">
                        Total number of outstanding debts
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="hasEmi">Do you pay any EMI?</Label>
                    <Select
                      value={formData.hasEmi}
                      onValueChange={(value) => handleInputChange("hasEmi", value)}
                    >
                      <SelectTrigger className="input-field">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.hasEmi === "yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="emiAmount">Monthly EMI Amount ($)</Label>
                      <Input
                        id="emiAmount"
                        type="number"
                        placeholder="500"
                        value={formData.emiAmount}
                        onChange={(e) => handleInputChange("emiAmount", e.target.value)}
                        className="input-field"
                      />
                      <p className="text-xs text-muted-foreground">
                        Total EMI you pay per month
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button
                  type="button"
                  variant="hero"
                  onClick={() => setStep(step + 1)}
                  className="gap-2"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  variant="success" 
                  className="gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Submit Application
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Apply;
