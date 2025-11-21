import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Upload, Calendar, MapPin, FileText, Paperclip, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface AddSubmissionSheetProps {
  onClose: () => void;
  userName: string;
}

export function AddSubmissionSheet({ onClose, userName }: AddSubmissionSheetProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('');
  const [date, setDate] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert('تم إرسال التسليم بنجاح');
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  const isValid = title.trim() && description.trim() && project.trim() && date;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--card)] w-full max-h-[90vh] rounded-t-3xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)] sticky top-0 bg-[var(--card)] z-10">
          <h3>تسليم جديد</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--background)] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#C9A227]" />
              عنوان المهمة *
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: تسليم مخططات المشروع"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm">وصف المهمة *</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب وصف تفصيلي للمهمة..."
              className="min-h-24 resize-none"
              required
            />
          </div>

          {/* Project */}
          <div className="space-y-2">
            <label className="text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C9A227]" />
              المشروع / العميل *
            </label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full h-11 px-3 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
              required
            >
              <option value="">اختر المشروع</option>
              <option value="المشروع الشرقي">المشروع الشرقي</option>
              <option value="الفرع الشمالي">الفرع الشمالي</option>
              <option value="المجمع السكني">المجمع السكني</option>
              <option value="البرج التجاري">البرج التجاري</option>
              <option value="الفيلات الراقية">الفيلات الراقية</option>
            </select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C9A227]" />
              تاريخ التسليم *
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Attachments */}
          <div className="space-y-3">
            <label className="text-sm flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-[#C9A227]" />
              المرفقات
            </label>
            
            {/* Upload Button */}
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[var(--border)] rounded-lg cursor-pointer hover:border-[#C9A227]/50 transition-colors">
              <Upload className="w-8 h-8 text-[var(--foreground)]/40 mb-2" />
              <p className="text-sm text-[var(--foreground)]/60">اضغط لرفع الملفات</p>
              <p className="text-xs text-[var(--foreground)]/40 mt-1">PDF, PNG, JPG (حتى 10MB)</p>
              <input
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Attachments List */}
            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-3 bg-[var(--background)] border border-[var(--border)] rounded-lg"
                  >
                    <div className="w-10 h-10 bg-[#C9A227]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {file.type.includes('image') ? (
                        <ImageIcon className="w-5 h-5 text-[#C9A227]" />
                      ) : (
                        <FileText className="w-5 h-5 text-[#C9A227]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{file.name}</p>
                      <p className="text-xs text-[var(--foreground)]/40">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="p-2 hover:bg-[#EF4444]/10 rounded-lg text-[#EF4444] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="p-4 bg-[#C9A227]/10 border border-[#C9A227]/20 rounded-lg">
            <p className="text-xs text-[var(--foreground)]/80">
              💡 تأكد من مراجعة جميع البيانات قبل الإرسال. سيتم إشعار المدير فور استلام التسليم.
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border)] sticky bottom-0 bg-[var(--card)]">
          <div className="flex gap-3">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={isSubmitting}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              className="flex-1 bg-[#C9A227] text-[#0B0B0B] hover:bg-[#C9A227]/90 disabled:opacity-50"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-[#0B0B0B] border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Upload className="w-4 h-4 ml-2" />
                  إرسال التسليم
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
