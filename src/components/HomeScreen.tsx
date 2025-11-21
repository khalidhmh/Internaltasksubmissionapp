import { useState } from 'react';
import { Bell, Plus, Search, Moon, Sun, LogOut } from 'lucide-react';
import type { User } from '../App';
import { SubmissionsList } from './SubmissionsList';
import { EmployeesTab } from './EmployeesTab';
import { ReportsTab } from './ReportsTab';
import { SettingsTab } from './SettingsTab';
import { AddSubmissionSheet } from './AddSubmissionSheet';
import { Button } from './ui/button';

interface HomeScreenProps {
  user: User;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

type Tab = 'submissions' | 'employees' | 'reports' | 'settings';

export function HomeScreen({ user, onLogout, isDarkMode, onToggleTheme }: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState<Tab>('submissions');
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(3);

  const isManager = user.role === 'manager';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 18) return 'مساء الخير';
    return 'مساء الخير';
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[var(--card)] border-b border-[var(--border)]">
        <div className="px-4 py-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0B0B0B] border-2 border-[#C9A227] flex items-center justify-center">
                <span className="text-[#C9A227] text-xl font-bold">ع</span>
              </div>
              <div>
                <h3 className="text-sm">{getGreeting()}، {user.name}</h3>
                <p className="text-xs text-[var(--foreground)]/60">
                  {user.role === 'manager' ? 'مدير' : 'موظف'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleTheme}
                className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#EF4444] text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              <button
                onClick={onLogout}
                className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في التسليمات..."
              className="w-full h-11 pr-11 pl-4 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/40" />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6">
        {activeTab === 'submissions' && <SubmissionsList userRole={user.role} searchQuery={searchQuery} />}
        {activeTab === 'employees' && isManager && <EmployeesTab />}
        {activeTab === 'reports' && isManager && <ReportsTab />}
        {activeTab === 'settings' && isManager && <SettingsTab />}
      </main>

      {/* FAB for Employee */}
      {!isManager && (
        <button
          onClick={() => setShowAddSheet(true)}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#C9A227] text-[#0B0B0B] rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center z-30"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {/* Bottom Navigation for Manager */}
      {isManager && (
        <nav className="fixed bottom-0 left-0 right-0 bg-[var(--card)] border-t border-[var(--border)] z-40">
          <div className="flex justify-around items-center h-16">
            {[
              { id: 'submissions', label: 'التسليمات', icon: '📋' },
              { id: 'employees', label: 'الموظفون', icon: '👥' },
              { id: 'reports', label: 'التقارير', icon: '📊' },
              { id: 'settings', label: 'الإعدادات', icon: '⚙️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#C9A227]'
                    : 'text-[var(--foreground)]/60 hover:text-[var(--foreground)]'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-xs">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 w-12 h-1 bg-[#C9A227] rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Add Submission Bottom Sheet */}
      {showAddSheet && (
        <AddSubmissionSheet
          onClose={() => setShowAddSheet(false)}
          userName={user.name}
        />
      )}
    </div>
  );
}
