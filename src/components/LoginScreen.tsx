import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Lock, User, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import type { User as UserType } from '../App';

interface LoginScreenProps {
  onLogin: (user: UserType, rememberMe: boolean) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Mock users for demo
  const mockUsers: Record<string, UserType> = {
    'employee@example.com': { id: '1', name: 'أحمد محمد', email: 'employee@example.com', role: 'employee' },
    'manager@example.com': { id: '2', name: 'سارة أحمد', email: 'manager@example.com', role: 'manager' },
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    
    if (!username.trim()) {
      newErrors.username = 'من فضلك أدخل اسم المستخدم أو البريد';
    }
    
    if (!password.trim()) {
      newErrors.password = 'من فضلك أدخل كلمة المرور';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = mockUsers[username];
      
      if (user && password === 'password') {
        onLogin(user, rememberMe);
      } else {
        setErrors({ general: 'بيانات الدخول غير صحيحة' });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0B0B0B] border-2 border-[#C9A227] flex items-center justify-center">
            <span className="text-[#C9A227] text-3xl font-bold">ع</span>
          </div>
          <h2 className="text-[#C9A227] mb-2">تسجيل الدخول</h2>
          <p className="text-sm text-[var(--foreground)]/60">العالمية المتحدة - نظام التسليمات</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-sm">اسم المستخدم أو البريد</label>
            <div className="relative">
              <Input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors({ ...errors, username: undefined, general: undefined });
                }}
                placeholder="أدخل اسم المستخدم أو البريد"
                className={`pr-10 ${errors.username ? 'border-[#EF4444]' : ''}`}
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/40" />
            </div>
            {errors.username && (
              <p className="text-sm text-[#EF4444]">{errors.username}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm">كلمة المرور</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: undefined, general: undefined });
                }}
                placeholder="أدخل كلمة المرور"
                className={`pr-10 pl-10 ${errors.password ? 'border-[#EF4444]' : ''}`}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/40" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground)]/40 hover:text-[var(--foreground)]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-[#EF4444]">{errors.password}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label htmlFor="remember" className="text-sm cursor-pointer">
                تذكّرني على هذا الجهاز
              </label>
            </div>
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="text-sm text-[#C9A227] hover:underline"
            >
              نسيت كلمة المرور؟
            </button>
          </div>

          {/* General Error */}
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg"
            >
              <p className="text-sm text-[#EF4444]">{errors.general}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !username || !password}
            className="w-full bg-[#C9A227] text-[#0B0B0B] hover:bg-[#C9A227]/90 disabled:opacity-50 disabled:cursor-not-allowed h-12 rounded-lg"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-[#0B0B0B] border-t-transparent rounded-full"
              />
            ) : (
              'دخول'
            )}
          </Button>

          {/* SSO Placeholder */}
          <Button
            type="button"
            variant="outline"
            className="w-full border-[var(--border)] hover:bg-[var(--card)] h-12 rounded-lg"
            disabled
          >
            <Shield className="w-5 h-5 ml-2" />
            تسجيل الدخول عبر الشركة (قريباً)
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-[var(--card)] rounded-lg border border-[var(--border)]">
          <p className="text-xs text-[var(--foreground)]/60 mb-2">للتجربة:</p>
          <p className="text-xs">موظف: employee@example.com / password</p>
          <p className="text-xs">مدير: manager@example.com / password</p>
        </div>
      </motion.div>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--card)] rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="mb-4">إعادة تعيين كلمة المرور</h3>
            <p className="text-sm text-[var(--foreground)]/60 mb-4">
              أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
            </p>
            <Input type="email" placeholder="البريد الإلكتروني" className="mb-4" />
            <div className="flex gap-3">
              <Button
                onClick={() => setShowResetModal(false)}
                variant="outline"
                className="flex-1"
              >
                إلغاء
              </Button>
              <Button
                onClick={() => setShowResetModal(false)}
                className="flex-1 bg-[#C9A227] text-[#0B0B0B]"
              >
                إرسال
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
