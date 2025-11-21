import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Check, XCircle, MessageSquare, Calendar, MapPin, Paperclip, User, Edit, Trash2 } from 'lucide-react';
import type { Submission } from './SubmissionsList';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface SubmissionDetailsProps {
  submission: Submission;
  onClose: () => void;
  userRole: 'employee' | 'manager';
}

const statusConfig = {
  pending: {
    label: 'قيد المراجعة',
    bg: 'bg-[#F59E0B]/10',
    text: 'text-[#F59E0B]',
    icon: '⏳',
  },
  approved: {
    label: 'مقبول',
    bg: 'bg-[#22C55E]/10',
    text: 'text-[#22C55E]',
    icon: '✓',
  },
  rejected: {
    label: 'مرفوض',
    bg: 'bg-[#EF4444]/10',
    text: 'text-[#EF4444]',
    icon: '✕',
  },
};

export function SubmissionDetails({ submission, onClose, userRole }: SubmissionDetailsProps) {
  const [comment, setComment] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const status = statusConfig[submission.status];

  const handleApprove = () => {
    setIsApproving(true);
    setTimeout(() => {
      // Here you would call your API
      alert('تم قبول التسليم بنجاح');
      setIsApproving(false);
      onClose();
    }, 1000);
  };

  const handleReject = () => {
    if (!comment.trim()) {
      alert('يرجى إضافة تعليق عند الرفض');
      return;
    }
    setIsRejecting(true);
    setTimeout(() => {
      alert('تم رفض التسليم');
      setIsRejecting(false);
      onClose();
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--card)] w-full max-w-2xl max-h-[90vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)] sticky top-0 bg-[var(--card)] z-10">
          <h3>تفاصيل التسليم</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${status.bg} ${status.text}`}>
              <span className="text-lg ml-2">{status.icon}</span>
              <span className="text-sm">{status.label}</span>
            </div>
            <span className="text-sm text-[var(--foreground)]/40">{submission.number}</span>
          </div>

          {/* Title */}
          <div>
            <h2>{submission.title}</h2>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm text-[var(--foreground)]/60">الوصف</label>
            <p className="text-sm">{submission.description}</p>
          </div>

          {/* Meta Information Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-[var(--foreground)]/60 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                التاريخ والوقت
              </label>
              <p className="text-sm">{submission.date} • {submission.time}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[var(--foreground)]/60 flex items-center gap-2">
                <User className="w-4 h-4" />
                الموظف
              </label>
              <p className="text-sm">{submission.employee}</p>
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-sm text-[var(--foreground)]/60 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                المشروع
              </label>
              <p className="text-sm">{submission.project}</p>
            </div>
          </div>

          {/* Attachments */}
          {submission.attachments.length > 0 && (
            <div className="space-y-3">
              <label className="text-sm text-[var(--foreground)]/60 flex items-center gap-2">
                <Paperclip className="w-4 h-4" />
                المرفقات ({submission.attachments.length})
              </label>
              <div className="grid grid-cols-2 gap-3">
                {submission.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="p-3 bg-[var(--background)] border border-[var(--border)] rounded-lg flex items-center gap-2 hover:border-[#C9A227]/30 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-[#C9A227]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">📄</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate">{attachment}</p>
                      <p className="text-xs text-[var(--foreground)]/40">PDF</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Existing Comment (if rejected or approved) */}
          {submission.comment && (
            <div className="space-y-2 p-4 bg-[var(--background)] border border-[var(--border)] rounded-lg">
              <label className="text-sm text-[var(--foreground)]/60 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                تعليق المدير
              </label>
              <p className="text-sm">{submission.comment}</p>
            </div>
          )}

          {/* Manager Actions */}
          {userRole === 'manager' && submission.status === 'pending' && (
            <div className="space-y-4 pt-4 border-t border-[var(--border)]">
              <div className="space-y-2">
                <label className="text-sm text-[var(--foreground)]/60">التعليق</label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="أضف تعليقك هنا..."
                  className="min-h-24 resize-none"
                />
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={handleReject}
                  disabled={isRejecting || isApproving}
                  variant="outline"
                  className="flex-1 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10"
                >
                  {isRejecting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-[#EF4444] border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 ml-2" />
                      رفض
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={handleApprove}
                  disabled={isApproving || isRejecting}
                  className="flex-1 bg-[#22C55E] text-white hover:bg-[#22C55E]/90"
                >
                  {isApproving ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Check className="w-4 h-4 ml-2" />
                      قبول
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Employee Actions */}
          {userRole === 'employee' && submission.status === 'pending' && (
            <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
              <Button
                variant="outline"
                className="flex-1"
              >
                <Edit className="w-4 h-4 ml-2" />
                تعديل
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10"
              >
                <Trash2 className="w-4 h-4 ml-2" />
                سحب
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
