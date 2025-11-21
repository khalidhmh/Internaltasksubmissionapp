import { motion } from 'motion/react';
import { Clock, User, ChevronLeft, Paperclip } from 'lucide-react';
import type { Submission } from './SubmissionsList';

interface SubmissionCardProps {
  submission: Submission;
  onClick: () => void;
  showEmployee?: boolean;
}

const statusConfig = {
  pending: {
    label: 'قيد المراجعة',
    bg: 'bg-[#F59E0B]/10',
    text: 'text-[#F59E0B]',
    border: 'border-[#F59E0B]/20',
  },
  approved: {
    label: 'مقبول',
    bg: 'bg-[#22C55E]/10',
    text: 'text-[#22C55E]',
    border: 'border-[#22C55E]/20',
  },
  rejected: {
    label: 'مرفوض',
    bg: 'bg-[#EF4444]/10',
    text: 'text-[#EF4444]',
    border: 'border-[#EF4444]/20',
  },
};

export function SubmissionCard({ submission, onClick, showEmployee = false }: SubmissionCardProps) {
  const status = statusConfig[submission.status];

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 text-right hover:border-[#C9A227]/30 transition-colors group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm mb-1 group-hover:text-[#C9A227] transition-colors">
            {submission.title}
          </h3>
          <p className="text-xs text-[var(--foreground)]/40">{submission.number}</p>
        </div>
        <ChevronLeft className="w-5 h-5 text-[var(--foreground)]/40 group-hover:text-[#C9A227] transition-colors flex-shrink-0 mr-2" />
      </div>

      {/* Status Chip */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${status.bg} ${status.text} ${status.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ml-1.5 ${status.text.replace('text-', 'bg-')}`} />
          {status.label}
        </span>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-xs text-[var(--foreground)]/60">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{submission.date} • {submission.time}</span>
        </div>
        
        {showEmployee && (
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>{submission.employee}</span>
          </div>
        )}

        {submission.attachments.length > 0 && (
          <div className="flex items-center gap-1.5">
            <Paperclip className="w-4 h-4" />
            <span>{submission.attachments.length}</span>
          </div>
        )}
      </div>

      {/* Preview Attachment */}
      {submission.attachments.length > 0 && (
        <div className="mt-3 pt-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-2 text-xs">
            <div className="px-2 py-1 bg-[var(--background)] rounded border border-[var(--border)] truncate">
              {submission.attachments[0]}
            </div>
            {submission.attachments.length > 1 && (
              <span className="text-[var(--foreground)]/40">
                +{submission.attachments.length - 1}
              </span>
            )}
          </div>
        </div>
      )}
    </motion.button>
  );
}
