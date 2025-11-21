import { motion } from 'motion/react';
import { Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  totalSubmissions: number;
  pendingSubmissions: number;
  approvedSubmissions: number;
  avatar: string;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    role: 'مهندس معماري',
    totalSubmissions: 24,
    pendingSubmissions: 3,
    approvedSubmissions: 20,
    avatar: '👨‍💼',
  },
  {
    id: '2',
    name: 'فاطمة أحمد',
    email: 'fatima@example.com',
    role: 'مهندسة مدني',
    totalSubmissions: 18,
    pendingSubmissions: 2,
    approvedSubmissions: 15,
    avatar: '👩‍💼',
  },
  {
    id: '3',
    name: 'محمد علي',
    email: 'mohammed@example.com',
    role: 'مشرف موقع',
    totalSubmissions: 31,
    pendingSubmissions: 5,
    approvedSubmissions: 25,
    avatar: '👨‍🔧',
  },
];

export function EmployeesTab() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 text-center">
          <Users className="w-5 h-5 mx-auto mb-2 text-[#C9A227]" />
          <p className="text-xs text-[var(--foreground)]/60 mb-1">إجمالي الموظفين</p>
          <p className="text-xl">{mockEmployees.length}</p>
        </div>
        
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 text-center">
          <TrendingUp className="w-5 h-5 mx-auto mb-2 text-[#22C55E]" />
          <p className="text-xs text-[var(--foreground)]/60 mb-1">النشطين</p>
          <p className="text-xl">{mockEmployees.filter(e => e.pendingSubmissions > 0).length}</p>
        </div>
        
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 text-center">
          <CheckCircle className="w-5 h-5 mx-auto mb-2 text-[#C9A227]" />
          <p className="text-xs text-[var(--foreground)]/60 mb-1">معدل القبول</p>
          <p className="text-xl">85%</p>
        </div>
      </div>

      {/* Employees List */}
      <div className="space-y-3">
        <h3>قائمة الموظفين</h3>
        
        {mockEmployees.map((employee, index) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 hover:border-[#C9A227]/30 transition-colors"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 bg-[#C9A227]/10 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                {employee.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm mb-1">{employee.name}</h3>
                <p className="text-xs text-[var(--foreground)]/60 mb-2">{employee.role}</p>
                <p className="text-xs text-[var(--foreground)]/40">{employee.email}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[var(--border)]">
              <div>
                <p className="text-xs text-[var(--foreground)]/60 mb-1">الإجمالي</p>
                <p className="text-sm">{employee.totalSubmissions}</p>
              </div>
              <div>
                <p className="text-xs text-[#F59E0B] mb-1">قيد المراجعة</p>
                <p className="text-sm text-[#F59E0B]">{employee.pendingSubmissions}</p>
              </div>
              <div>
                <p className="text-xs text-[#22C55E] mb-1">مقبول</p>
                <p className="text-sm text-[#22C55E]">{employee.approvedSubmissions}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
