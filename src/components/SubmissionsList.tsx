import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, FileText } from 'lucide-react';
import { SubmissionCard } from './SubmissionCard';
import { SubmissionDetails } from './SubmissionDetails';

export interface Submission {
  id: string;
  title: string;
  number: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  time: string;
  employee: string;
  description: string;
  project: string;
  attachments: string[];
  comment?: string;
}

interface SubmissionsListProps {
  userRole: 'employee' | 'manager';
  searchQuery: string;
}

const mockSubmissions: Submission[] = [
  {
    id: '1',
    title: 'تسليم مخططات المشروع الشرقي',
    number: '#2024-001',
    status: 'pending',
    date: '2024-11-21',
    time: '09:30',
    employee: 'أحمد محمد',
    description: 'تسليم المخططات النهائية للمشروع الشرقي مع جميع التعديلات المطلوبة',
    project: 'المشروع الشرقي',
    attachments: ['plan1.pdf', 'plan2.pdf'],
  },
  {
    id: '2',
    title: 'تقرير موقع البناء - الفرع الشمالي',
    number: '#2024-002',
    status: 'approved',
    date: '2024-11-20',
    time: '14:15',
    employee: 'سارة أحمد',
    description: 'تقرير يومي عن سير العمل في موقع البناء بالفرع الشمالي',
    project: 'الفرع الشمالي',
    attachments: ['report.pdf'],
    comment: 'ممتاز، استمروا',
  },
  {
    id: '3',
    title: 'جدول المواعيد النهائي',
    number: '#2024-003',
    status: 'rejected',
    date: '2024-11-19',
    time: '11:00',
    employee: 'محمد علي',
    description: 'جدول المواعيد النهائي لتسليم الوحدات',
    project: 'المجمع السكني',
    attachments: ['schedule.xlsx'],
    comment: 'يرجى مراجعة التواريخ المحددة',
  },
];

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected';
type FilterDate = 'today' | 'week' | 'month' | 'custom';

export function SubmissionsList({ userRole, searchQuery }: SubmissionsListProps) {
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [dateFilter, setDateFilter] = useState<FilterDate>('week');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const filteredSubmissions = mockSubmissions.filter((sub) => {
    // Status filter
    if (statusFilter !== 'all' && sub.status !== statusFilter) return false;
    
    // Search filter
    if (searchQuery && !sub.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !sub.number.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const statusCounts = {
    all: mockSubmissions.length,
    pending: mockSubmissions.filter(s => s.status === 'pending').length,
    approved: mockSubmissions.filter(s => s.status === 'approved').length,
    rejected: mockSubmissions.filter(s => s.status === 'rejected').length,
  };

  const filters: { id: FilterStatus; label: string; color: string }[] = [
    { id: 'all', label: 'الكل', color: 'bg-[var(--foreground)]/10 text-[var(--foreground)]' },
    { id: 'pending', label: 'قيد المراجعة', color: 'bg-[#F59E0B]/10 text-[#F59E0B]' },
    { id: 'approved', label: 'مقبول', color: 'bg-[#22C55E]/10 text-[#22C55E]' },
    { id: 'rejected', label: 'مرفوض', color: 'bg-[#EF4444]/10 text-[#EF4444]' },
  ];

  const dateFilters: { id: FilterDate; label: string }[] = [
    { id: 'today', label: 'اليوم' },
    { id: 'week', label: 'هذا الأسبوع' },
    { id: 'month', label: 'هذا الشهر' },
    { id: 'custom', label: 'مخصص' },
  ];

  return (
    <div className="space-y-6">
      {/* Status Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setStatusFilter(filter.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-all ${
              statusFilter === filter.id
                ? filter.color + ' scale-105'
                : 'bg-[var(--card)] text-[var(--foreground)]/60 hover:bg-[var(--card)]/80'
            }`}
          >
            {filter.label} ({statusCounts[filter.id]})
          </button>
        ))}
      </div>

      {/* Date Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Calendar className="w-5 h-5 text-[var(--foreground)]/40 flex-shrink-0" />
        {dateFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setDateFilter(filter.id)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-sm transition-all ${
              dateFilter === filter.id
                ? 'bg-[#C9A227] text-[#0B0B0B]'
                : 'bg-[var(--card)] text-[var(--foreground)]/60 hover:bg-[var(--card)]/80'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Submissions List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredSubmissions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-[var(--card)] rounded-full flex items-center justify-center">
                <FileText className="w-10 h-10 text-[var(--foreground)]/20" />
              </div>
              <h3 className="mb-2">لا توجد تسليمات</h3>
              <p className="text-sm text-[var(--foreground)]/60">
                {userRole === 'employee' 
                  ? 'لا توجد تسليمات بعد. اضغط على زر + لإضافة تسليم جديد'
                  : 'لا توجد تسليمات مطابقة للبحث'}
              </p>
            </motion.div>
          ) : (
            filteredSubmissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <SubmissionCard
                  submission={submission}
                  onClick={() => setSelectedSubmission(submission)}
                  showEmployee={userRole === 'manager'}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Submission Details Modal */}
      {selectedSubmission && (
        <SubmissionDetails
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
          userRole={userRole}
        />
      )}
    </div>
  );
}
