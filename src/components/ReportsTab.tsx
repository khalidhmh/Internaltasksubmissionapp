import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Download, Calendar } from 'lucide-react';
import { Button } from './ui/button';

export function ReportsTab() {
  const stats = [
    { label: 'إجمالي التسليمات', value: '156', change: '+12%', color: 'text-[#C9A227]' },
    { label: 'قيد المراجعة', value: '23', change: '+5', color: 'text-[#F59E0B]' },
    { label: 'مقبول', value: '118', change: '+8', color: 'text-[#22C55E]' },
    { label: 'مرفوض', value: '15', change: '-2', color: 'text-[#EF4444]' },
  ];

  const monthlyData = [
    { month: 'يناير', total: 45, approved: 38, rejected: 7 },
    { month: 'فبراير', total: 52, approved: 46, rejected: 6 },
    { month: 'مارس', total: 59, approved: 51, rejected: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3>التقارير والإحصائيات</h3>
        <Button className="bg-[#C9A227] text-[#0B0B0B] hover:bg-[#C9A227]/90">
          <Download className="w-4 h-4 ml-2" />
          تصدير
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4"
          >
            <p className="text-xs text-[var(--foreground)]/60 mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl">{stat.value}</p>
              <span className={`text-xs ${stat.color} flex items-center gap-1`}>
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm">التسليمات الشهرية</h3>
          <button className="text-xs text-[#C9A227] flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            آخر 3 أشهر
          </button>
        </div>

        {/* Simple Bar Chart */}
        <div className="space-y-4">
          {monthlyData.map((data, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--foreground)]/60">{data.month}</span>
                <span>{data.total} تسليم</span>
              </div>
              <div className="flex gap-1 h-8">
                <div
                  className="bg-[#22C55E]/20 border border-[#22C55E]/40 rounded flex items-center justify-center text-xs"
                  style={{ width: `${(data.approved / data.total) * 100}%` }}
                >
                  {data.approved}
                </div>
                <div
                  className="bg-[#EF4444]/20 border border-[#EF4444]/40 rounded flex items-center justify-center text-xs"
                  style={{ width: `${(data.rejected / data.total) * 100}%` }}
                >
                  {data.rejected}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-4 pt-4 border-t border-[var(--border)] text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#22C55E] rounded"></div>
            <span>مقبول</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#EF4444] rounded"></div>
            <span>مرفوض</span>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
        <h3 className="text-sm mb-4">الموظفون المميزون</h3>
        <div className="space-y-3">
          {[
            { name: 'محمد علي', count: 31, rate: '95%' },
            { name: 'أحمد محمد', count: 24, rate: '92%' },
            { name: 'فاطمة أحمد', count: 18, rate: '88%' },
          ].map((employee, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-[var(--background)] rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#C9A227] text-[#0B0B0B] rounded-full flex items-center justify-center text-xs">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm">{employee.name}</p>
                  <p className="text-xs text-[var(--foreground)]/60">{employee.count} تسليم</p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm text-[#22C55E]">{employee.rate}</p>
                <p className="text-xs text-[var(--foreground)]/60">نسبة القبول</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
