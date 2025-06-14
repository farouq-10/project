import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Calendar, Lock, CheckCircle, Phone, Upload, Home, Percent } from 'lucide-react';

export function PaymentPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'visa' | 'instapay'>('visa');
  const [verificationImage, setVerificationImage] = useState<File | null>(null);
  const [paymentPercentage, setPaymentPercentage] = useState<50 | 75 | 100>(100);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [cardErrors, setCardErrors] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [successDetails, setSuccessDetails] = useState<{
    method: 'visa' | 'instapay';
    amount: number;
    date: string;
    transactionId: string;
    percentage?: number;
    phoneNumber?: string;
  } | null>(null);

  // This would come from your state management solution
  const orderTotal = 15000; // Example total

  // Company phone number for Instapay
  const COMPANY_PHONE = "+20 1234567890"; // Example Egyptian number

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters except +
    let cleaned = value.replace(/[^\d+]/g, '');
    
    // Ensure it starts with + if not present
    if (!cleaned.startsWith('+')) {
      cleaned = '+' + cleaned;
    }

    // Format the number with spaces
    let formatted = cleaned;
    if (cleaned.length > 3) {
      formatted = cleaned.slice(0, 3) + ' ' + cleaned.slice(3);
      if (cleaned.length > 6) {
        formatted = formatted.slice(0, 7) + ' ' + formatted.slice(7);
      }
      if (cleaned.length > 10) {
        formatted = formatted.slice(0, 11) + ' ' + formatted.slice(11);
      }
    }

    return formatted;
  };

  const validatePhoneNumber = (number: string) => {
    // Remove spaces for validation
    const cleaned = number.replace(/\s/g, '');
    
    // Check if it starts with + and country code
    if (!cleaned.startsWith('+')) {
      return 'Phone number must start with country code (e.g., +20 for Egypt)';
    }

    // Check if it has the correct length (including + and country code)
    // Most international numbers are between 10 and 15 digits
    if (cleaned.length < 11 || cleaned.length > 16) {
      return 'Phone number must be between 10 and 15 digits (excluding +)';
    }

    // Check if it only contains + and numbers
    if (!/^\+\d+$/.test(cleaned)) {
      return 'Phone number can only contain numbers and country code';
    }

    return '';
  };

  const validateCardNumber = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    if (!cleaned) return 'Card number is required';
    if (!/^\d{16}$/.test(cleaned)) return 'Card number must be 16 digits';
    return '';
  };

  const validateExpiry = (expiry: string) => {
    if (!expiry) return 'Expiry date is required';
    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry)) return 'Invalid format (MM/YY)';
    
    const [month, year] = expiry.split('/');
    const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    const today = new Date();
    
    if (expDate < today) return 'Card has expired';
    return '';
  };

  const validateCVV = (cvv: string) => {
    if (!cvv) return 'CVV is required';
    if (!/^\d{3,4}$/.test(cvv)) return 'CVV must be 3 or 4 digits';
    return '';
  };

  const validateCardName = (name: string) => {
    if (!name.trim()) return 'Cardholder name is required';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
    if (name.trim().length < 3) return 'Name is too short';
    return '';
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g) || [];
    return groups.join(' ').substr(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhoneNumber(value);
    setPhoneNumber(formatted);
    setPhoneError(validatePhoneNumber(formatted));
  };

  const handleCardInput = (field: keyof typeof cardDetails) => (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let error = '';

    switch (field) {
      case 'number':
        value = formatCardNumber(value);
        error = validateCardNumber(value);
        break;
      case 'expiry':
        value = formatExpiry(value);
        error = validateExpiry(value);
        break;
      case 'cvv':
        value = value.replace(/\D/g, '').slice(0, 4);
        error = validateCVV(value);
        break;
      case 'name':
        error = validateCardName(value);
        break;
    }

    setCardDetails(prev => ({ ...prev, [field]: value }));
    setCardErrors(prev => ({ ...prev, [field]: error }));
  };

  const generateTransactionId = () => {
    return 'TXN' + Date.now().toString().slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const simulatePaymentProcessing = async (): Promise<boolean> => {
    try {
      // Simulate API call to process payment
      setProcessingStatus('Initializing payment...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate card processing
      setProcessingStatus('Processing payment...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate bank verification
      setProcessingStatus('Verifying with bank...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate final processing
      setProcessingStatus('Finalizing payment...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate successful completion
      setProcessingStatus('Payment completed successfully!');
      return true;
    } catch (error) {
      setProcessingStatus('Payment failed. Please try again.');
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'visa') {
      // Validate all card fields
      const errors = {
        number: validateCardNumber(cardDetails.number),
        expiry: validateExpiry(cardDetails.expiry),
        cvv: validateCVV(cardDetails.cvv),
        name: validateCardName(cardDetails.name)
      };

      setCardErrors(errors);

      if (Object.values(errors).some(error => error)) {
        setProcessingStatus('Please correct the card details');
        return;
      }
    } else if (paymentMethod === 'instapay' && phoneError) {
      setProcessingStatus('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      const success = await simulatePaymentProcessing();
      if (success) {
        const form = e.target as HTMLFormElement;
        form.reset();
        
        const finalAmount = paymentMethod === 'instapay' 
          ? (orderTotal * paymentPercentage / 100)
          : orderTotal;
        
        setSuccessDetails({
          method: paymentMethod,
          amount: finalAmount,
          date: formatDate(new Date()),
          transactionId: generateTransactionId(),
          ...(paymentMethod === 'instapay' && { 
            percentage: paymentPercentage,
            phoneNumber: phoneNumber 
          })
        });
        
        setPaymentSuccess(true);
      }
    } catch (error) {
      setProcessingStatus('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess && successDetails) {
    return (
      <main className="flex-1 flex items-center justify-center py-12 px-4 min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
        <div className="max-w-md w-full backdrop-blur-xl bg-white/[0.03] rounded-2xl p-8 border border-white/10 shadow-2xl shadow-purple-500/10">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-ping bg-green-500/20 rounded-full"></div>
                <div className="absolute inset-0 animate-pulse bg-green-500/10 rounded-full blur-xl"></div>
                <CheckCircle className="relative h-16 w-16 text-green-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Payment Successful!
              </h2>
              <p className="text-green-400/80 font-medium">
                Your payment has been processed successfully
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/[0.03] backdrop-blur-lg rounded-xl p-6 space-y-4 border border-white/5">
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">Amount Paid</span>
                  <div className="text-right">
                    <span className="font-semibold text-white text-lg">${successDetails.amount.toLocaleString()}</span>
                    {successDetails.percentage && successDetails.percentage !== 100 && (
                      <div className="text-sm text-purple-400">
                        {successDetails.percentage}% of ${orderTotal.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">Payment Method</span>
                  <span className="font-medium text-white flex items-center gap-2">
                    {successDetails.method === 'visa' ? (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-500/20">
                        <CreditCard className="h-4 w-4 text-purple-400" />
                        <span className="text-purple-400">Visa Card</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-500/20">
                        <Phone className="h-4 w-4 text-purple-400" />
                        <span className="text-purple-400">Instapay</span>
                      </div>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">Transaction ID</span>
                  <span className="font-mono text-white bg-white/5 px-3 py-1 rounded-lg text-sm">{successDetails.transactionId}</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">Date & Time</span>
                  <span className="text-white">{successDetails.date}</span>
                </div>
                {successDetails.phoneNumber && (
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-gray-400">Phone Number</span>
                    <span className="text-white">{successDetails.phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate('/')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
                  text-white rounded-lg py-3 px-4 font-medium transition-all duration-300 
                  flex items-center justify-center gap-2 group"
              >
                <Home className="h-5 w-5 transition-transform group-hover:scale-110" />
                Return to Home Page
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Complete Your Payment
          </h1>
          <p className="text-lg text-gray-400">
            Choose your preferred payment method below
          </p>
          {processingStatus && !loading && processingStatus.includes('failed') && (
            <p className="mt-4 text-red-400 bg-red-500/10 py-2 px-4 rounded-lg inline-block">{processingStatus}</p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('visa')}
                  className={`group relative p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                    paymentMethod === 'visa'
                      ? 'border-purple-400/50 bg-purple-400/10 shadow-lg shadow-purple-500/20'
                      : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`p-3 rounded-lg ${paymentMethod === 'visa' ? 'bg-purple-400/20' : 'bg-white/5'}`}>
                      <CreditCard className={`h-6 w-6 ${paymentMethod === 'visa' ? 'text-purple-400' : 'text-gray-400'}`} />
                    </div>
                    <span className={`font-medium ${paymentMethod === 'visa' ? 'text-purple-400' : 'text-gray-400'}`}>Visa Card</span>
                  </div>
                  {paymentMethod === 'visa' && (
                    <div className="absolute inset-0 border-2 border-purple-400/50 rounded-xl animate-pulse"></div>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('instapay')}
                  className={`group relative p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                    paymentMethod === 'instapay'
                      ? 'border-purple-400/50 bg-purple-400/10 shadow-lg shadow-purple-500/20'
                      : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`p-3 rounded-lg ${paymentMethod === 'instapay' ? 'bg-purple-400/20' : 'bg-white/5'}`}>
                      <Phone className={`h-6 w-6 ${paymentMethod === 'instapay' ? 'text-purple-400' : 'text-gray-400'}`} />
                    </div>
                    <span className={`font-medium ${paymentMethod === 'instapay' ? 'text-purple-400' : 'text-gray-400'}`}>Instapay</span>
                  </div>
                  {paymentMethod === 'instapay' && (
                    <div className="absolute inset-0 border-2 border-purple-400/50 rounded-xl animate-pulse"></div>
                  )}
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="backdrop-blur-lg bg-white/[0.03] rounded-xl border border-white/10 p-8 space-y-8">
                {paymentMethod === 'visa' ? (
                  <>
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-purple-400" />
                        <span>Card Details</span>
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Card Number
                          </label>
                          <div className="relative group">
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              value={cardDetails.number}
                              onChange={handleCardInput('number')}
                              maxLength={19}
                              className={`w-full bg-white/5 border rounded-lg px-4 py-3 pl-11 text-white placeholder:text-gray-500 
                                focus:outline-none focus:ring-2 transition-all duration-300 group-hover:border-white/20
                                ${cardErrors.number 
                                  ? 'border-red-400/50 focus:ring-red-400/50 focus:border-red-400/50' 
                                  : 'border-white/10 focus:ring-purple-400/50 focus:border-purple-400/50'
                                }`}
                              required
                            />
                            <CreditCard className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 
                              ${cardErrors.number ? 'text-red-400' : 'text-gray-400 group-hover:text-gray-300'} 
                              transition-colors`}
                            />
                          </div>
                          {cardErrors.number && (
                            <p className="mt-2 text-sm text-red-400">{cardErrors.number}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Expiry Date
                            </label>
                            <div className="relative group">
                              <input
                                type="text"
                                placeholder="MM/YY"
                                value={cardDetails.expiry}
                                onChange={handleCardInput('expiry')}
                                maxLength={5}
                                className={`w-full bg-white/5 border rounded-lg px-4 py-3 pl-11 text-white placeholder:text-gray-500 
                                  focus:outline-none focus:ring-2 transition-all duration-300 group-hover:border-white/20
                                  ${cardErrors.expiry 
                                    ? 'border-red-400/50 focus:ring-red-400/50 focus:border-red-400/50' 
                                    : 'border-white/10 focus:ring-purple-400/50 focus:border-purple-400/50'
                                  }`}
                                required
                              />
                              <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 
                                ${cardErrors.expiry ? 'text-red-400' : 'text-gray-400 group-hover:text-gray-300'} 
                                transition-colors`}
                              />
                            </div>
                            {cardErrors.expiry && (
                              <p className="mt-2 text-sm text-red-400">{cardErrors.expiry}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              CVV
                            </label>
                            <div className="relative group">
                              <input
                                type="text"
                                placeholder="123"
                                value={cardDetails.cvv}
                                onChange={handleCardInput('cvv')}
                                maxLength={4}
                                className={`w-full bg-white/5 border rounded-lg px-4 py-3 pl-11 text-white placeholder:text-gray-500 
                                  focus:outline-none focus:ring-2 transition-all duration-300 group-hover:border-white/20
                                  ${cardErrors.cvv 
                                    ? 'border-red-400/50 focus:ring-red-400/50 focus:border-red-400/50' 
                                    : 'border-white/10 focus:ring-purple-400/50 focus:border-purple-400/50'
                                  }`}
                                required
                              />
                              <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 
                                ${cardErrors.cvv ? 'text-red-400' : 'text-gray-400 group-hover:text-gray-300'} 
                                transition-colors`}
                              />
                            </div>
                            {cardErrors.cvv && (
                              <p className="mt-2 text-sm text-red-400">{cardErrors.cvv}</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            placeholder="Name on card"
                            value={cardDetails.name}
                            onChange={handleCardInput('name')}
                            className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder:text-gray-500 
                              focus:outline-none focus:ring-2 transition-all duration-300 group-hover:border-white/20
                              ${cardErrors.name 
                                ? 'border-red-400/50 focus:ring-red-400/50 focus:border-red-400/50' 
                                : 'border-white/10 focus:ring-purple-400/50 focus:border-purple-400/50'
                              }`}
                            required
                          />
                          {cardErrors.name && (
                            <p className="mt-2 text-sm text-red-400">{cardErrors.name}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                        <Phone className="h-5 w-5 text-purple-400" />
                        <span>Instapay Details</span>
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Payment Amount
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            <button
                              type="button"
                              onClick={() => setPaymentPercentage(50)}
                              className={`relative p-3 rounded-lg border backdrop-blur-sm transition-all duration-300 ${
                                paymentPercentage === 50
                                  ? 'border-purple-400/50 bg-purple-400/10 text-purple-400'
                                  : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex flex-col items-center gap-1">
                                <Percent className="h-4 w-4" />
                                <span className="font-medium">50%</span>
                                <span className="text-xs">${(orderTotal * 0.5).toLocaleString()}</span>
                              </div>
                              {paymentPercentage === 50 && (
                                <div className="absolute inset-0 border-2 border-purple-400/50 rounded-lg animate-pulse"></div>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => setPaymentPercentage(75)}
                              className={`relative p-3 rounded-lg border backdrop-blur-sm transition-all duration-300 ${
                                paymentPercentage === 75
                                  ? 'border-purple-400/50 bg-purple-400/10 text-purple-400'
                                  : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex flex-col items-center gap-1">
                                <Percent className="h-4 w-4" />
                                <span className="font-medium">75%</span>
                                <span className="text-xs">${(orderTotal * 0.75).toLocaleString()}</span>
                              </div>
                              {paymentPercentage === 75 && (
                                <div className="absolute inset-0 border-2 border-purple-400/50 rounded-lg animate-pulse"></div>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => setPaymentPercentage(100)}
                              className={`relative p-3 rounded-lg border backdrop-blur-sm transition-all duration-300 ${
                                paymentPercentage === 100
                                  ? 'border-purple-400/50 bg-purple-400/10 text-purple-400'
                                  : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex flex-col items-center gap-1">
                                <Percent className="h-4 w-4" />
                                <span className="font-medium">100%</span>
                                <span className="text-xs">${orderTotal.toLocaleString()}</span>
                              </div>
                              {paymentPercentage === 100 && (
                                <div className="absolute inset-0 border-2 border-purple-400/50 rounded-lg animate-pulse"></div>
                              )}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Your Phone Number
                          </label>
                          <div className="relative group">
                            <input
                              type="tel"
                              placeholder="+20 123 456 7890"
                              value={phoneNumber}
                              onChange={handlePhoneChange}
                              className={`w-full bg-white/5 border rounded-lg px-4 py-3 pl-11 text-white placeholder:text-gray-500 
                                focus:outline-none transition-all duration-300 group-hover:border-white/20
                                ${phoneError 
                                  ? 'border-red-400/50 focus:ring-red-400/50 focus:border-red-400/50' 
                                  : 'border-white/10 focus:ring-purple-400/50 focus:border-purple-400/50'
                                }`}
                              required
                            />
                            <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 
                              ${phoneError ? 'text-red-400' : 'text-gray-400 group-hover:text-gray-300'} 
                              transition-colors`}
                            />
                          </div>
                          {phoneError && (
                            <p className="mt-2 text-sm text-red-400">{phoneError}</p>
                          )}
                          <p className="mt-2 text-sm text-gray-500">Enter your phone number with country code (e.g., +20 for Egypt)</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Company Phone Number
                          </label>
                          <div className="relative group">
                            <input
                              type="tel"
                              value={COMPANY_PHONE}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pl-11 text-white placeholder:text-gray-500 
                                focus:outline-none opacity-75 cursor-not-allowed"
                              disabled
                            />
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                          <p className="mt-2 text-sm text-gray-500">This is our company's Instapay number</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Transfer Verification Image
                          </label>
                          <div className="relative group">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setVerificationImage(e.target.files?.[0] || null)}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pl-11 text-white 
                                file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500/20 
                                file:text-purple-400 file:font-medium hover:file:bg-purple-500/30 
                                focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 
                                transition-all duration-300 group-hover:border-white/20"
                              required
                            />
                            <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-6 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
                      text-white rounded-lg px-4 py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed 
                      transition-all duration-300 group overflow-hidden"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="animate-pulse">{processingStatus}</span>
                      </span>
                    ) : (
                      <>
                        <span className="relative z-10">Complete Payment</span>
                        <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-purple-600 to-pink-600 transition-transform duration-300"></div>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-8 backdrop-blur-lg bg-white/[0.03] rounded-xl border border-white/10 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white font-medium">
                    ${((paymentMethod === 'instapay' ? orderTotal * paymentPercentage / 100 : orderTotal) * 0.9).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white font-medium">
                    ${((paymentMethod === 'instapay' ? orderTotal * paymentPercentage / 100 : orderTotal) * 0.1).toLocaleString()}
                  </span>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Total</span>
                    <div className="text-right">
                      <span className="text-lg text-white font-bold">
                        ${(paymentMethod === 'instapay' ? orderTotal * paymentPercentage / 100 : orderTotal).toLocaleString()}
                      </span>
                      {paymentMethod === 'instapay' && paymentPercentage !== 100 && (
                        <div className="text-sm text-purple-400">
                          {paymentPercentage}% of ${orderTotal.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}