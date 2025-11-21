import { motion } from 'motion/react';
import { Bell, Lock, Globe, HelpCircle, Info, ChevronLeft } from 'lucide-react';

export function SettingsTab() {
  const settingsGroups = [
    {
      title: 'عام',
      items: [
        { icon: Bell, label: 'الإشعارات', value: 'مفعّلة', color: 'text-[#C9A227]' },
        { icon: Globe, label: 'اللغة', value: 'العربية', color: 'text-[#C9A227]' },
      ],
    },
    {
      title: 'الأمان',
      items: [
        { icon: Lock, label: 'تغيير كلمة المرور', color: 'text-[#C9A227]' },
        { icon: Lock, label: 'المصادقة الثنائية', value: 'غير مفعّلة', color: 'text-[#C9A227]' },
      ],
    },
    {
      title: 'الدعم',
      items: [
        { icon: HelpCircle, label: 'مركز المساعدة', color: 'text-[#C9A227]' },
        { icon: Info, label: 'عن التطبيق', value: 'v1.0.0', color: 'text-[#C9A227]' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h3>الإعدادات</h3>

      {settingsGroups.map((group, groupIndex) => (
        <motion.div
          key={groupIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIndex * 0.1 }}
          className="space-y-3"
        >
          <h3 className="text-sm text-[var(--foreground)]/60">{group.title}</h3>
          
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
            {group.items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                className={`w-full flex items-center justify-between p-4 hover:bg-[var(--background)] transition-colors ${
                  itemIndex !== group.items.length - 1 ? 'border-b border-[var(--border)]' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-sm">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.value && (
                    <span className="text-sm text-[var(--foreground)]/60">{item.value}</span>
                  )}
                  <ChevronLeft className="w-5 h-5 text-[var(--foreground)]/40" />
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      ))}

      {/* App Info */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 text-center">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#0B0B0B] border-2 border-[#C9A227] flex items-center justify-center">
          <span className="text-[#C9A227] text-3xl font-bold">ع</span>
        </div>
        <h3 className="text-sm mb-1">العالمية المتحدة</h3>
        <p className="text-xs text-[var(--foreground)]/60 mb-1">نظام التسليمات الداخلي</p>
        <p className="text-xs text-[var(--foreground)]/40">الإصدار 1.0.0</p>
      </div>
    </div>
  );
}
