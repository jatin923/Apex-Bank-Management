import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import Login from './pages/Login';
import SignupWizard from './pages/SignupWizard';
import QuickDepositModal from './components/QuickDepositModal';
import QuickWithdrawModal from './components/QuickWithdrawModal';
import FastCashModal from './components/FastCashModal';
import ChangePinModal from './components/ChangePinModal';

const App = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'

  // Modals state
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [fastCashOpen, setFastCashOpen] = useState(false);
  const [changePinOpen, setChangePinOpen] = useState(false);

  // If user is not authenticated, render Login or Signup Wizard
  if (!user) {
    return authView === 'login' ? (
      <Login onNavigateSignup={() => setAuthView('signup')} />
    ) : (
      <SignupWizard onNavigateLogin={() => setAuthView('login')} />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        onOpenDeposit={() => setDepositOpen(true)}
        onOpenWithdraw={() => setWithdrawOpen(true)}
      />

      {/* Main Layout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenDeposit={() => setDepositOpen(true)}
          onOpenWithdraw={() => setWithdrawOpen(true)}
          onOpenFastCash={() => setFastCashOpen(true)}
          onOpenChangePin={() => setChangePinOpen(true)}
        />

        {/* Tab Content Area */}
        <div className="flex-1 min-w-0">
          {activeTab === 'dashboard' && (
            <Dashboard
              onOpenDeposit={() => setDepositOpen(true)}
              onOpenWithdraw={() => setWithdrawOpen(true)}
              onOpenFastCash={() => setFastCashOpen(true)}
              onOpenChangePin={() => setChangePinOpen(true)}
            />
          )}

          {activeTab === 'transactions' && <Transactions />}

          {activeTab === 'settings' && (
            <Settings onOpenChangePin={() => setChangePinOpen(true)} />
          )}
        </div>
      </main>

      {/* Transaction Modals */}
      <QuickDepositModal
        isOpen={depositOpen}
        onClose={() => setDepositOpen(false)}
      />

      <QuickWithdrawModal
        isOpen={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
      />

      <FastCashModal
        isOpen={fastCashOpen}
        onClose={() => setFastCashOpen(false)}
      />

      <ChangePinModal
        isOpen={changePinOpen}
        onClose={() => setChangePinOpen(false)}
      />
    </div>
  );
};

export default App;
