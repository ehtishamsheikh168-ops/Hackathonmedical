import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Heart, Activity, Users, Calendar, FileText, Bell, LogOut,
  ChevronLeft, ChevronRight, Menu, X, Plus, Search, Download, Eye,
  TrendingUp, DollarSign, Stethoscope, Pill, Clock, CheckCircle,
  AlertCircle, XCircle, ArrowRight, Sparkles, Shield, BarChart2,
  UserPlus, ClipboardList, MessageSquare, RefreshCw, Moon, Sun,
  Home, Settings, HelpCircle, ChevronDown, Star, Zap, Lock, Mail,
  User, Phone, MapPin, Edit, Trash2, Filter, MoreVertical, Send,
  Loader2, AlertTriangle, Info, ThumbsUp, Upload, Printer
} from "lucide-react";

// ─── THEME ──────────────────────────────────────────────────────────────────
const useTheme = () => {
  const [dark, setDark] = useState(false);
  return { dark, toggle: () => setDark(d => !d) };
};

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const PATIENTS = [
  { id: 1, name: "Sarah Johnson", age: 34, condition: "Hypertension", status: "confirmed", date: "Today 09:00", avatar: "SJ" },
  { id: 2, name: "Marcus Lee", age: 52, condition: "Diabetes Type 2", status: "pending", date: "Today 10:30", avatar: "ML" },
  { id: 3, name: "Emma Wilson", age: 28, condition: "Anxiety Disorder", status: "completed", date: "Yesterday", avatar: "EW" },
  { id: 4, name: "James Carter", age: 67, condition: "Arthritis", status: "confirmed", date: "Today 14:00", avatar: "JC" },
  { id: 5, name: "Priya Sharma", age: 41, condition: "Migraine", status: "pending", date: "Tomorrow", avatar: "PS" },
];

const STATS_ADMIN = [
  { label: "Total Patients", value: "3,842", icon: Users, change: "+12%", color: "blue" },
  { label: "Total Doctors", value: "48", icon: Stethoscope, change: "+3%", color: "teal" },
  { label: "Monthly Appts", value: "1,284", icon: Calendar, change: "+8%", color: "indigo" },
  { label: "Revenue", value: "$94,200", icon: DollarSign, change: "+21%", color: "emerald" },
];

const ACTIVITY = [
  { text: "Dr. Smith added new prescription for Marcus Lee", time: "2m ago", icon: Pill, color: "blue" },
  { text: "Sarah Johnson appointment confirmed for 9:00 AM", time: "15m ago", icon: CheckCircle, color: "green" },
  { text: "New patient Emma Wilson registered", time: "1h ago", icon: UserPlus, color: "teal" },
  { text: "Lab results uploaded for James Carter", time: "2h ago", icon: Upload, color: "indigo" },
  { text: "Subscription renewed: Pro Plan", time: "3h ago", icon: Star, color: "amber" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const cls = (...args) => args.filter(Boolean).join(" ");

const StatusBadge = ({ status }) => {
  const map = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    confirmed: "bg-blue-100 text-blue-700 border-blue-200",
    completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <span className={cls("px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize", map[status] || map.pending)}>
      {status}
    </span>
  );
};

const Avatar = ({ initials, size = "md", color = "blue" }) => {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-lg" };
  const colors = { blue: "from-blue-400 to-blue-600", teal: "from-teal-400 to-teal-600", indigo: "from-indigo-400 to-indigo-600" };
  return (
    <div className={cls("rounded-full bg-gradient-to-br flex items-center justify-center font-semibold text-white flex-shrink-0", sizes[size], colors[color] || colors.blue)}>
      {initials}
    </div>
  );
};

const Card = ({ children, className = "", hover = true, glass = false }) => (
  <motion.div
    whileHover={hover ? { y: -2, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.12)" } : {}}
    transition={{ duration: 0.2 }}
    className={cls(
      "rounded-2xl border p-6",
      glass ? "bg-white/70 backdrop-blur-sm border-white/80 shadow-lg" : "bg-white border-slate-100 shadow-sm",
      className
    )}
  >
    {children}
  </motion.div>
);

const Btn = ({ children, variant = "primary", size = "md", onClick, className = "", icon: Icon, disabled }) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 shadow-md shadow-blue-200",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    outline: "border border-slate-200 text-slate-700 hover:bg-slate-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200",
    ghost: "text-slate-600 hover:bg-slate-100",
  };
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={cls("flex items-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed", variants[variant], sizes[size], className)}
    >
      {Icon && <Icon size={16} />}
      {children}
    </motion.button>
  );
};

const Input = ({ label, icon: Icon, error, type = "text", placeholder, value, onChange, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
    <div className="relative">
      {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cls(
          "w-full rounded-xl border bg-white/80 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all outline-none",
          Icon && "pl-9",
          error ? "border-red-300 focus:ring-2 focus:ring-red-200" : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        )}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{error}</p>}
  </div>
);

// ─── SIDEBAR NAV ─────────────────────────────────────────────────────────────
const NAV_ITEMS = {
  admin: [
    { icon: Home, label: "Dashboard", id: "admin-dashboard" },
    { icon: Users, label: "Patients", id: "patients" },
    { icon: Stethoscope, label: "Doctors", id: "doctors" },
    { icon: Calendar, label: "Appointments", id: "appointments" },
    { icon: BarChart2, label: "Analytics", id: "analytics" },
    { icon: Brain, label: "AI Assistant", id: "ai" },
    { icon: Settings, label: "Settings", id: "settings" },
  ],
  doctor: [
    { icon: Home, label: "Dashboard", id: "doctor-dashboard" },
    { icon: Users, label: "My Patients", id: "patients" },
    { icon: Calendar, label: "Schedule", id: "appointments" },
    { icon: Pill, label: "Prescriptions", id: "prescriptions" },
    { icon: Brain, label: "AI Assistant", id: "ai" },
    { icon: FileText, label: "Reports", id: "reports" },
  ],
  receptionist: [
    { icon: Home, label: "Dashboard", id: "receptionist-dashboard" },
    { icon: UserPlus, label: "Add Patient", id: "add-patient" },
    { icon: Calendar, label: "Appointments", id: "appointments" },
    { icon: ClipboardList, label: "Records", id: "records" },
  ],
  patient: [
    { icon: Home, label: "Dashboard", id: "patient-dashboard" },
    { icon: Calendar, label: "My Appointments", id: "appointments" },
    { icon: Pill, label: "Prescriptions", id: "prescriptions" },
    { icon: FileText, label: "Medical History", id: "history" },
    { icon: Brain, label: "AI Checker", id: "ai" },
  ],
};

const Sidebar = ({ collapsed, onToggle, role, activePage, onNav, dark }) => {
  const items = NAV_ITEMS[role] || NAV_ITEMS.admin;
  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cls("h-screen flex flex-col border-r sticky top-0 flex-shrink-0 overflow-hidden z-20",
        dark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-100")}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-100/50">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-200">
          <Brain size={18} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className={cls("font-bold text-base whitespace-nowrap", dark ? "text-white" : "text-slate-800")}
            >
              MediMind <span className="text-blue-500">AI</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map(({ icon: Icon, label, id }) => {
          const active = activePage === id;
          return (
            <motion.button
              key={id}
              whileHover={{ x: 2 }}
              onClick={() => onNav(id)}
              className={cls(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md shadow-blue-200"
                  : dark
                  ? "text-slate-400 hover:text-white hover:bg-slate-800"
                  : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
              )}
            >
              <Icon size={18} className="flex-shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      {/* Role Badge */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-3 mb-3 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100"
          >
            <p className="text-xs text-slate-500">Logged in as</p>
            <p className="text-sm font-semibold text-blue-700 capitalize">{role}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle */}
      <button
        onClick={onToggle}
        className={cls("m-3 flex items-center justify-center w-8 h-8 rounded-lg border transition-all",
          dark ? "border-slate-700 text-slate-400 hover:bg-slate-800" : "border-slate-200 text-slate-500 hover:bg-slate-50")}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
};

// ─── TOPBAR ──────────────────────────────────────────────────────────────────
const Topbar = ({ role, onLogout, dark, onToggleTheme }) => {
  const roleNames = { admin: "Dr. Admin Kumar", doctor: "Dr. Sarah Mitchell", receptionist: "Alex Rivera", patient: "James Carter" };
  return (
    <header className={cls("h-16 px-6 flex items-center justify-between border-b sticky top-0 z-10",
      dark ? "bg-slate-900 border-slate-700" : "bg-white/80 backdrop-blur-sm border-slate-100")}>
      <div>
        <h2 className={cls("text-sm font-semibold", dark ? "text-white" : "text-slate-800")}>{roleNames[role]}</h2>
        <p className="text-xs text-slate-400 capitalize">{role} Portal</p>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onToggleTheme} className={cls("p-2 rounded-xl border transition-all", dark ? "border-slate-700 text-yellow-400 hover:bg-slate-800" : "border-slate-200 text-slate-500 hover:bg-slate-50")}>
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <div className="relative">
          <button className={cls("p-2 rounded-xl border transition-all", dark ? "border-slate-700 text-slate-400 hover:bg-slate-800" : "border-slate-200 text-slate-500 hover:bg-slate-50")}>
            <Bell size={16} />
          </button>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">3</span>
        </div>
        <Avatar initials={roleNames[role].split(" ").map(w => w[0]).slice(0, 2).join("")} size="sm" />
        <Btn variant="ghost" size="sm" icon={LogOut} onClick={onLogout} className="text-red-500 hover:bg-red-50">
          <span className="hidden sm:inline">Logout</span>
        </Btn>
      </div>
    </header>
  );
};

// ─── PAGE: LOGIN ──────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin, onGo }) => {
  const [form, setForm] = useState({ email: "", password: "", role: "admin" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.password.length < 4) e.password = "Password too short";
    return e;
  };

  const submit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    await new Promise(r => setTimeout(r, 600));
    onLogin(form.role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-teal-100/50 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-indigo-100/30 blur-2xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl border border-white shadow-2xl shadow-blue-100 p-8 relative z-10"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-200">
            <Brain size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">MediMind <span className="text-blue-500">AI</span></h1>
            <p className="text-xs text-slate-400">Clinic Management System</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-1">Welcome back</h2>
        <p className="text-sm text-slate-500 mb-6">Sign in to your account to continue</p>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-8 gap-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle size={32} className="text-emerald-500" />
              </div>
              <p className="font-semibold text-slate-800">Login successful!</p>
              <p className="text-sm text-slate-500">Redirecting to dashboard...</p>
            </motion.div>
          ) : (
            <motion.div key="form" className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Login as</label>
                <div className="grid grid-cols-4 gap-2">
                  {["admin", "doctor", "receptionist", "patient"].map(r => (
                    <button
                      key={r}
                      onClick={() => setForm(f => ({ ...f, role: r }))}
                      className={cls("py-2 px-1 rounded-xl border text-xs font-medium capitalize transition-all",
                        form.role === r ? "bg-blue-500 text-white border-blue-500 shadow-md" : "border-slate-200 text-slate-600 hover:border-blue-300")}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <Input label="Email" icon={Mail} type="email" placeholder="you@clinic.com"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} error={errors.email} />
              <Input label="Password" icon={Lock} type="password" placeholder="••••••••"
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} error={errors.password} />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="checkbox" className="rounded" /> Remember me
                </label>
                <button className="text-sm text-blue-500 hover:underline">Forgot password?</button>
              </div>
              <Btn variant="primary" size="lg" className="w-full justify-center" onClick={submit} disabled={loading}>
                {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : "Sign In"}
              </Btn>
              <p className="text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <button onClick={() => onGo("register")} className="text-blue-500 font-medium hover:underline">Create one</button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// ─── PAGE: REGISTER ───────────────────────────────────────────────────────────
const RegisterPage = ({ onGo }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "patient", password: "", confirm: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Required";
    if (!form.email.includes("@")) e.email = "Invalid email";
    if (form.password.length < 6) e.password = "Min 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    return e;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-blue-50 p-4 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-3xl border border-white shadow-2xl shadow-teal-100 p-8 relative z-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-lg">
            <Brain size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">MediMind <span className="text-blue-500">AI</span></h1>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Create account</h2>
        <p className="text-sm text-slate-500 mb-6">Join our clinic management platform</p>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Full Name" icon={User} placeholder="John Doe" value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))} error={errors.name} />
            <Input label="Phone" icon={Phone} placeholder="+1 234 567" value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          </div>
          <Input label="Email Address" icon={Mail} type="email" placeholder="you@clinic.com"
            value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} error={errors.email} />
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">Register as</label>
            <div className="grid grid-cols-4 gap-2">
              {["admin", "doctor", "receptionist", "patient"].map(r => (
                <button key={r} onClick={() => setForm(f => ({ ...f, role: r }))}
                  className={cls("py-2 px-1 rounded-xl border text-xs font-medium capitalize transition-all",
                    form.role === r ? "bg-teal-500 text-white border-teal-500" : "border-slate-200 text-slate-600 hover:border-teal-300")}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Password" icon={Lock} type="password" placeholder="••••••••"
              value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} error={errors.password} />
            <Input label="Confirm Password" icon={Lock} type="password" placeholder="••••••••"
              value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} error={errors.confirm} />
          </div>
          {form.password && (
            <div>
              <div className="flex gap-1">
                {[1,2,3,4].map(i => (
                  <div key={i} className={cls("h-1.5 flex-1 rounded-full transition-all",
                    form.password.length >= i*3
                      ? form.password.length >= 12 ? "bg-emerald-400" : form.password.length >= 8 ? "bg-blue-400" : "bg-amber-400"
                      : "bg-slate-200")} />
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-1">{form.password.length < 6 ? "Weak" : form.password.length < 10 ? "Good" : "Strong"} password</p>
            </div>
          )}
          <Btn variant="primary" size="lg" className="w-full justify-center" onClick={() => { const e = validate(); setErrors(e); }}>
            Create Account
          </Btn>
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <button onClick={() => onGo("login")} className="text-blue-500 font-medium hover:underline">Sign in</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// ─── STAT CARD ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon: Icon, change, color, dark }) => {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    teal: "from-teal-500 to-teal-600",
    indigo: "from-indigo-500 to-indigo-600",
    emerald: "from-emerald-500 to-emerald-600",
    amber: "from-amber-500 to-amber-600",
  };
  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <p className={cls("text-2xl font-bold", dark ? "text-white" : "text-slate-800")}>{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp size={12} className="text-emerald-500" />
              <span className="text-xs text-emerald-600 font-medium">{change} this month</span>
            </div>
          )}
        </div>
        <div className={cls("w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg", colors[color] || colors.blue)}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
    </Card>
  );
};

// ─── CHART PLACEHOLDER ────────────────────────────────────────────────────────
const ChartPlaceholder = ({ title }) => {
  const bars = [65, 80, 55, 90, 70, 85, 75, 95, 60, 88, 72, 91];
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-700">{title}</h3>
        <select className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-600 outline-none">
          <option>Last 12 months</option>
          <option>Last 6 months</option>
        </select>
      </div>
      <div className="flex items-end gap-2 h-32">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-500 to-teal-400 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-slate-400">
        {["J","F","M","A","M","J","J","A","S","O","N","D"].map(m => <span key={m}>{m}</span>)}
      </div>
    </Card>
  );
};

// ─── PATIENT TABLE ────────────────────────────────────────────────────────────
const PatientTable = ({ dark }) => {
  const [search, setSearch] = useState("");
  const filtered = PATIENTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className={cls("font-semibold", dark ? "text-white" : "text-slate-700")}>Patient List</h3>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search patients..."
              className="pl-8 pr-4 py-1.5 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white" />
          </div>
          <Btn variant="outline" size="sm" icon={Filter}>Filter</Btn>
          <Btn variant="primary" size="sm" icon={Plus}>Add</Btn>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              {["Patient", "Age", "Condition", "Next Visit", "Status", ""].map(h => (
                <th key={h} className="text-left py-2 px-3 text-xs font-medium text-slate-500 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <Avatar initials={p.avatar} size="sm" color={["blue","teal","indigo"][i%3]} />
                    <span className={cls("font-medium", dark ? "text-white" : "text-slate-800")}>{p.name}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-slate-500">{p.age}</td>
                <td className="py-3 px-3 text-slate-600">{p.condition}</td>
                <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{p.date}</td>
                <td className="py-3 px-3"><StatusBadge status={p.status} /></td>
                <td className="py-3 px-3">
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors"><Eye size={14} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors"><Edit size={14} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
const AdminDashboard = ({ dark }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className={cls("text-2xl font-bold", dark ? "text-white" : "text-slate-800")}>Admin Dashboard</h1>
        <p className="text-sm text-slate-400 mt-0.5">Overview of your clinic's performance</p>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white text-sm font-semibold shadow-lg">
        <Zap size={14} /> Pro Plan
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {STATS_ADMIN.map(s => <StatCard key={s.label} {...s} dark={dark} />)}
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <ChartPlaceholder title="Monthly Appointments" />
      <ChartPlaceholder title="Revenue Overview" />
    </div>
    <Card>
      <h3 className={cls("font-semibold mb-4", dark ? "text-white" : "text-slate-700")}>Recent Activity</h3>
      <div className="space-y-3">
        {ACTIVITY.map((a, i) => {
          const Icon = a.icon;
          const colorMap = { blue:"bg-blue-100 text-blue-600", green:"bg-emerald-100 text-emerald-600", teal:"bg-teal-100 text-teal-600", indigo:"bg-indigo-100 text-indigo-600", amber:"bg-amber-100 text-amber-600" };
          return (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className={cls("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", colorMap[a.color] || colorMap.blue)}>
                <Icon size={14} />
              </div>
              <p className="text-sm text-slate-600 flex-1">{a.text}</p>
              <span className="text-xs text-slate-400 whitespace-nowrap">{a.time}</span>
            </motion.div>
          );
        })}
      </div>
    </Card>
    <PatientTable dark={dark} />
  </motion.div>
);

// ─── DOCTOR DASHBOARD ─────────────────────────────────────────────────────────
const DoctorDashboard = ({ dark }) => {
  const [aiOpen, setAiOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className={cls("text-2xl font-bold", dark ? "text-white" : "text-slate-800")}>Doctor Dashboard</h1>
        <p className="text-sm text-slate-400">Dr. Sarah Mitchell · General Physician</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Today's Patients" value="12" icon={Users} color="blue" dark={dark} />
        <StatCard label="Prescriptions" value="47" icon={Pill} color="teal" dark={dark} />
        <StatCard label="Avg Rating" value="4.9 ★" icon={Star} color="amber" dark={dark} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <Card>
            <h3 className="font-semibold text-slate-700 mb-4">Today's Appointments</h3>
            <div className="space-y-3">
              {PATIENTS.slice(0,4).map((p, i) => (
                <motion.div key={p.id} whileHover={{ x: 2 }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                  <Avatar initials={p.avatar} size="sm" color={["blue","teal","indigo"][i%3]} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 text-sm truncate">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.condition}</p>
                  </div>
                  <div className="text-right mr-2">
                    <p className="text-xs font-medium text-slate-700 whitespace-nowrap">{p.date}</p>
                    <StatusBadge status={p.status} />
                  </div>
                  <Btn variant="outline" size="sm">Start</Btn>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-blue-600 to-teal-600 text-white border-0 shadow-xl shadow-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Brain size={16} className="text-white" />
              </div>
              <span className="font-semibold">AI Assistant</span>
              <span className="ml-auto text-[10px] bg-white/20 px-2 py-0.5 rounded-full">BETA</span>
            </div>
            <p className="text-sm text-white/80 mb-4">AI-powered diagnostic support and clinical insights.</p>
            <button onClick={() => setAiOpen(!aiOpen)}
              className="w-full py-2.5 rounded-xl bg-white/20 hover:bg-white/30 transition-all text-sm font-medium flex items-center justify-center gap-2">
              <Sparkles size={14} /> Ask AI Assistant
            </button>
            <AnimatePresence>
              {aiOpen && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 bg-white/10 rounded-xl">
                  <p className="text-xs text-white/90">"Patient shows elevated glucose with fatigue – consider HbA1c test and dietary consult."</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-2 h-2 rounded-full bg-amber-300" />
                    <span className="text-[11px] text-white/70">Medium Risk</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
          <Card>
            <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Calendar size={16} className="text-blue-500" /> Schedule
            </h3>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {["S","M","T","W","T","F","S"].map((d,i) => <div key={i} className="text-slate-400 font-medium py-1">{d}</div>)}
              {Array.from({length:28},(_,i)=>i+1).map(d => (
                <div key={d} className={cls("py-1.5 rounded-lg cursor-pointer transition-all text-slate-600 hover:bg-blue-50",
                  d===1?"bg-blue-500 text-white font-bold":d===5||d===12||d===18?"bg-teal-100 text-teal-700 font-medium":"")}>
                  {d}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

// ─── RECEPTIONIST DASHBOARD ───────────────────────────────────────────────────
const ReceptionistDashboard = ({ dark, onNav }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className={cls("text-2xl font-bold", dark ? "text-white" : "text-slate-800")}>Reception Desk</h1>
        <p className="text-sm text-slate-400">Manage appointments and patient flow</p>
      </div>
      <Btn variant="primary" icon={UserPlus} onClick={() => onNav("add-patient")}>Add Patient</Btn>
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div className="xl:col-span-2">
        <Card>
          <h3 className="font-semibold text-slate-700 mb-4">Today's Queue</h3>
          <div className="space-y-2">
            {PATIENTS.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 flex-shrink-0">{i+1}</div>
                <Avatar initials={p.avatar} size="sm" color="blue" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.date} · {p.condition}</p>
                </div>
                <StatusBadge status={p.status} />
                <button className="p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-blue-500"><MoreVertical size={14} /></button>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="h-fit">
        <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <Calendar size={16} className="text-teal-500" /> Quick Book
        </h3>
        <div className="space-y-3">
          <Input label="Patient Name" icon={User} placeholder="Search patient..." />
          <Input label="Doctor" icon={Stethoscope} placeholder="Select doctor..." />
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">Date & Time</label>
            <input type="datetime-local" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">Reason</label>
            <textarea rows={3} placeholder="Brief description..."
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none" />
          </div>
          <Btn variant="primary" className="w-full justify-center">Book Appointment</Btn>
        </div>
      </Card>
    </div>
  </motion.div>
);

// ─── PATIENT DASHBOARD ────────────────────────────────────────────────────────
const PatientDashboard = ({ dark }) => {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [symptoms, setSymptoms] = useState("");

  const checkSymptoms = async () => {
    setAiLoading(true);
    setAiResult(null);
    await new Promise(r => setTimeout(r, 2000));
    setAiLoading(false);
    setAiResult({ risk: "medium", text: "Based on your symptoms, you may have a mild respiratory infection. Recommended actions: rest, hydration, and consider a GP visit if symptoms persist beyond 3 days." });
  };

  const timeline = [
    { date: "Jan 15, 2025", title: "General Checkup", doctor: "Dr. Mitchell", note: "Blood pressure slightly elevated. Advised low-sodium diet.", status: "completed" },
    { date: "Mar 3, 2025", title: "Follow-up Visit", doctor: "Dr. Mitchell", note: "BP normalized. Continue current medication.", status: "completed" },
    { date: "May 20, 2025", title: "Lab Results Review", doctor: "Dr. Patel", note: "HbA1c within normal range. Good progress.", status: "completed" },
    { date: "Jul 1, 2025", title: "Annual Physical (upcoming)", doctor: "Dr. Mitchell", note: "Scheduled", status: "confirmed" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className={cls("text-2xl font-bold", dark ? "text-white" : "text-slate-800")}>My Health Portal</h1>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Profile */}
        <Card glass className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center text-2xl font-bold text-white mb-3 shadow-lg shadow-blue-200">JC</div>
          <h3 className="text-lg font-bold text-slate-800">James Carter</h3>
          <p className="text-sm text-slate-400">Patient ID: #MCL-2891</p>
          <div className="w-full mt-4 space-y-2">
            {[["Age","67"],["Blood Type","O+"],["Allergies","Penicillin"],["Primary Dr.","Dr. Mitchell"]].map(([k,v]) => (
              <div key={k} className="flex justify-between text-sm px-2">
                <span className="text-slate-400">{k}</span>
                <span className="font-medium text-slate-700">{v}</span>
              </div>
            ))}
          </div>
          <Btn variant="outline" size="sm" className="mt-4 w-full justify-center" icon={Edit}>Edit Profile</Btn>
        </Card>

        {/* Appointments & Prescription */}
        <div className="space-y-3">
          <Card>
            <h3 className="font-semibold text-slate-700 mb-3">Upcoming Appointments</h3>
            {PATIENTS.slice(0,2).map((p,i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-blue-50 transition-colors mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Calendar size={16} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">Dr. Mitchell</p>
                  <p className="text-xs text-slate-400">{p.date} · {p.condition}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </Card>
          <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                <Pill size={16} className="text-teal-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-800 text-sm">Latest Prescription</p>
                <p className="text-xs text-slate-500">Issued: June 15, 2025</p>
              </div>
              <Btn variant="primary" size="sm" icon={Download}>PDF</Btn>
            </div>
          </Card>
        </div>

        {/* AI Symptom Checker */}
        <Card className="border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
              <Brain size={14} className="text-white" />
            </div>
            <h3 className="font-semibold text-slate-700">AI Symptom Checker</h3>
          </div>
          <textarea rows={4} value={symptoms} onChange={e => setSymptoms(e.target.value)}
            placeholder="Describe your symptoms... e.g., headache, fever, fatigue"
            className="w-full text-sm border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none mb-3" />
          <Btn variant="primary" size="sm" className="w-full justify-center" icon={aiLoading ? Loader2 : Sparkles} onClick={checkSymptoms} disabled={aiLoading || !symptoms}>
            {aiLoading ? "Analyzing..." : "Check Symptoms"}
          </Btn>
          <AnimatePresence>
            {aiLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 p-3 bg-blue-50 rounded-xl flex items-center gap-2">
                <Loader2 size={14} className="text-blue-500 animate-spin" />
                <span className="text-sm text-blue-600">AI is analyzing your symptoms...</span>
              </motion.div>
            )}
            {aiResult && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-xs font-semibold text-amber-600 capitalize">{aiResult.risk} Risk</span>
                </div>
                <p className="text-sm text-slate-700">{aiResult.text}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>

      {/* Medical History Timeline */}
      <Card>
        <h3 className="font-semibold text-slate-700 mb-5">Medical History Timeline</h3>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 to-teal-200" />
          <div className="space-y-6">
            {timeline.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-300 flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                  <Heart size={14} className="text-blue-500" />
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="font-medium text-slate-800 text-sm">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.date} · {item.doctor}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-sm text-slate-600 mt-1 bg-slate-50 rounded-xl px-3 py-2">{item.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// ─── AI PAGE ──────────────────────────────────────────────────────────────────
const AIPage = ({ dark }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I'm MediMind AI. I can help with symptom analysis, drug interactions, and clinical decision support. How can I assist you today?" }
  ]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setMessages(m => [...m, { role: "ai", text: "Based on the information provided, I recommend a comprehensive evaluation including CBC, metabolic panel, and HbA1c. The symptoms suggest a possible metabolic disorder. Risk level: Medium. Please consult with the attending physician for a definitive diagnosis." }]);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-200">
          <Brain size={22} className="text-white" />
        </div>
        <div>
          <h1 className={cls("text-2xl font-bold", dark ? "text-white" : "text-slate-800")}>AI Clinical Assistant</h1>
          <p className="text-sm text-slate-400">Powered by MediMind AI · Always verify with a physician</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { level: "Low Risk", color: "emerald", dot: "bg-emerald-400", desc: "Routine monitoring" },
          { level: "Medium Risk", color: "amber", dot: "bg-amber-400", desc: "Further evaluation" },
          { level: "High Risk", color: "red", dot: "bg-red-400", desc: "Immediate attention" },
        ].map(r => (
          <div key={r.level} className={`p-3 rounded-xl border bg-${r.color}-50 border-${r.color}-100`}>
            <div className="flex items-center gap-2 mb-1">
              <div className={cls("w-2.5 h-2.5 rounded-full", r.dot)} />
              <span className={`text-sm font-semibold text-${r.color}-700`}>{r.level}</span>
            </div>
            <p className={`text-xs text-${r.color}-600`}>{r.desc}</p>
          </div>
        ))}
      </div>

      <Card className="h-96 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className={cls("flex gap-2", m.role === "user" && "flex-row-reverse")}>
              {m.role === "ai" && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow">
                  <Brain size={14} className="text-white" />
                </div>
              )}
              <div className={cls("max-w-sm px-4 py-2.5 rounded-2xl text-sm",
                m.role === "ai"
                  ? "bg-gradient-to-br from-blue-50 to-teal-50 text-slate-700 border border-blue-100 rounded-tl-none"
                  : "bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-tr-none")}>
                {m.text}
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow">
                <Brain size={14} className="text-white" />
              </div>
              <div className="px-4 py-3 bg-blue-50 rounded-2xl rounded-tl-none border border-blue-100 flex gap-1">
                {[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{animationDelay:`${i*0.15}s`}} />)}
              </div>
            </div>
          )}
        </div>
        <div className="p-3 border-t border-slate-100 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Describe symptoms or ask a clinical question..."
            className="flex-1 px-4 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
          <Btn variant="primary" icon={Send} onClick={send} disabled={!input.trim() || loading}>Send</Btn>
        </div>
      </Card>

      <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
        <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700">AI suggestions are for clinical decision support only. Always verify with qualified medical professionals before making treatment decisions.</p>
      </div>
    </motion.div>
  );
};

// ─── ADD PATIENT PAGE ─────────────────────────────────────────────────────────
const AddPatientPage = ({ dark }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
    <h1 className={cls("text-2xl font-bold mb-6", dark ? "text-white" : "text-slate-800")}>Add New Patient</h1>
    <Card>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name" icon={User} placeholder="John" />
          <Input label="Last Name" icon={User} placeholder="Doe" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Date of Birth" type="date" />
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">Gender</label>
            <select className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100">
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
        </div>
        <Input label="Email Address" icon={Mail} type="email" placeholder="patient@email.com" />
        <Input label="Phone Number" icon={Phone} placeholder="+1 234 567 890" />
        <Input label="Address" icon={MapPin} placeholder="123 Main Street, City" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Blood Type" placeholder="e.g., A+" />
          <Input label="Emergency Contact" placeholder="Name, Phone" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1.5">Medical History / Notes</label>
          <textarea rows={4} placeholder="Known conditions, allergies, previous surgeries..."
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none" />
        </div>
        <div className="flex gap-3">
          <Btn variant="primary" size="lg" icon={Plus}>Register Patient</Btn>
          <Btn variant="outline" size="lg">Cancel</Btn>
        </div>
      </div>
    </Card>
  </motion.div>
);

// ─── PLACEHOLDER PAGE ─────────────────────────────────────────────────────────
const PlaceholderPage = ({ title, dark }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center mb-4">
      <Activity size={28} className="text-blue-500" />
    </div>
    <h2 className={cls("text-xl font-bold mb-2", dark ? "text-white" : "text-slate-800")}>{title}</h2>
    <p className="text-slate-400 text-sm">This section is under development</p>
  </motion.div>
);

// ─── PAGE REGISTRY ────────────────────────────────────────────────────────────
const PAGES = {
  "admin-dashboard": (p) => <AdminDashboard {...p} />,
  "doctor-dashboard": (p) => <DoctorDashboard {...p} />,
  "receptionist-dashboard": (p) => <ReceptionistDashboard {...p} />,
  "patient-dashboard": (p) => <PatientDashboard {...p} />,
  "patients": (p) => <div className="space-y-4"><h1 className={cls("text-2xl font-bold", p.dark?"text-white":"text-slate-800")}>Patient Management</h1><PatientTable {...p} /></div>,
  "ai": (p) => <AIPage {...p} />,
  "add-patient": (p) => <AddPatientPage {...p} />,
};

const HOME_PAGES = { admin: "admin-dashboard", doctor: "doctor-dashboard", receptionist: "receptionist-dashboard", patient: "patient-dashboard" };

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("login");
  const [role, setRole] = useState("admin");
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("admin-dashboard");
  const { dark, toggle: toggleDark } = useTheme();

  const login = (r) => {
    setRole(r);
    setActivePage(HOME_PAGES[r] || "admin-dashboard");
    setScreen("app");
  };

  const renderPage = () => {
    const page = PAGES[activePage];
    const props = { dark, onNav: setActivePage, role };
    return page ? page(props) : <PlaceholderPage title={activePage.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase())} dark={dark} />;
  };

  return (
    <div className={cls("min-h-screen font-sans antialiased", dark ? "bg-slate-950" : "bg-slate-50")}>
      <AnimatePresence mode="wait">
        {screen === "login" && (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoginPage onLogin={login} onGo={setScreen} />
          </motion.div>
        )}
        {screen === "register" && (
          <motion.div key="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <RegisterPage onGo={setScreen} />
          </motion.div>
        )}
        {screen === "app" && (
          <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-screen overflow-hidden">
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c=>!c)} role={role} activePage={activePage} onNav={setActivePage} dark={dark} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
              <Topbar role={role} onLogout={() => setScreen("login")} dark={dark} onToggleTheme={toggleDark} />
              {/* Demo role switcher */}
              <div className={cls("px-4 py-2 flex items-center gap-2 border-b text-xs flex-wrap", dark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-100")}>
                <span className="text-slate-400 mr-1">🎭 Demo switch:</span>
                {["admin","doctor","receptionist","patient"].map(r => (
                  <button key={r} onClick={() => login(r)}
                    className={cls("px-3 py-1 rounded-lg capitalize font-medium transition-all",
                      role === r ? "bg-blue-500 text-white shadow-sm" : dark ? "text-slate-400 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-100")}>
                    {r}
                  </button>
                ))}
              </div>
              <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.div key={activePage} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                    {renderPage()}
                  </motion.div>
                </AnimatePresence>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}