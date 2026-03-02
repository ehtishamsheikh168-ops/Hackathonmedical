import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Brain,
  Heart,
  Activity,
  Calendar,
  FileText,
  Pill,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Download,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Phone,
  Mail,
  MapPin,
  Droplets,
  Stethoscope,
  Sparkles,
  Shield,
  Home,
  History,
  TrendingUp,
  Moon,
  Sun,
  ChevronDown,
  MoreVertical,
  Star,
  ArrowRight,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Thermometer,
  HeartPulse,
  Microscope,
  Plus,
  ExternalLink,
  Info,
  Zap,
} from "lucide-react";

const cls = (...a) => a.filter(Boolean).join(" ");

const PATIENT = {
  name: "Ahmed Al-Rashid",
  firstName: "Ahmed",
  age: 34,
  gender: "Male",
  bloodGroup: "O+",
  dob: "March 15, 1990",
  phone: "+971 50 123 4567",
  email: "ahmed.rashid@email.com",
  address: "Dubai, UAE",
  patientId: "MCL-2891",
};

const VITALS = [
  {
    label: "Heart Rate",
    value: "78",
    unit: "bpm",
    icon: HeartPulse,
    color: "rose",
    trend: "+2",
  },
  {
    label: "Blood Pressure",
    value: "118/76",
    unit: "mmHg",
    icon: Activity,
    color: "blue",
    trend: "Normal",
  },
  {
    label: "Temperature",
    value: "36.8",
    unit: "°C",
    icon: Thermometer,
    color: "amber",
    trend: "Normal",
  },
  {
    label: "Blood Sugar",
    value: "95",
    unit: "mg/dL",
    icon: Droplets,
    color: "teal",
    trend: "-3",
  },
];

const APPOINTMENTS = [
  {
    id: 1,
    doctor: "Dr. Sarah Mitchell",
    specialty: "Cardiologist",
    date: "Jul 12, 2025",
    time: "10:00 AM",
    status: "confirmed",
    avatar: "SM",
  },
  {
    id: 2,
    doctor: "Dr. Omar Patel",
    specialty: "General Physician",
    date: "Jul 18, 2025",
    time: "2:30 PM",
    status: "pending",
    avatar: "OP",
  },
  {
    id: 3,
    doctor: "Dr. Lisa Chen",
    specialty: "Dermatologist",
    date: "Jul 25, 2025",
    time: "11:00 AM",
    status: "pending",
    avatar: "LC",
  },
];

const HISTORY = [
  {
    id: 1,
    date: "Jun 5, 2025",
    doctor: "Dr. Sarah Mitchell",
    specialty: "Cardiology",
    diagnosis: "Mild Hypertension",
    status: "completed",
  },
  {
    id: 2,
    date: "May 20, 2025",
    doctor: "Dr. Omar Patel",
    specialty: "General",
    diagnosis: "Seasonal Allergy",
    status: "completed",
  },
  {
    id: 3,
    date: "Apr 14, 2025",
    doctor: "Dr. Lisa Chen",
    specialty: "Dermatology",
    diagnosis: "Eczema Treatment",
    status: "completed",
  },
  {
    id: 4,
    date: "Mar 3, 2025",
    doctor: "Dr. Aisha Rahman",
    specialty: "Endocrinology",
    diagnosis: "Diabetes Screening",
    status: "completed",
  },
  {
    id: 5,
    date: "Jan 28, 2025",
    doctor: "Dr. Sarah Mitchell",
    specialty: "Cardiology",
    diagnosis: "Annual Checkup",
    status: "completed",
  },
];

const PRESCRIPTION = {
  doctor: "Dr. Sarah Mitchell",
  specialty: "Cardiologist",
  date: "June 5, 2025",
  rxId: "RX-20250605-001",
  medicines: [
    {
      name: "Amlodipine",
      dose: "5mg",
      frequency: "Once daily",
      duration: "30 days",
    },
    {
      name: "Losartan",
      dose: "50mg",
      frequency: "Once daily",
      duration: "30 days",
    },
    {
      name: "Aspirin",
      dose: "75mg",
      frequency: "Once daily",
      duration: "Ongoing",
    },
  ],
  notes: "Take with food. Avoid grapefruit juice with Amlodipine.",
};

const TIMELINE = [
  {
    date: "Jun 5, 2025",
    time: "10:00 AM",
    type: "appointment",
    title: "Cardiology Consultation",
    desc: "Routine follow-up for blood pressure monitoring.",
    doctor: "Dr. Sarah Mitchell",
    icon: Calendar,
  },
  {
    date: "Jun 5, 2025",
    time: "11:30 AM",
    type: "diagnosis",
    title: "Diagnosis: Mild Hypertension",
    desc: "BP consistently above 130/85. Recommended lifestyle changes and medication.",
    doctor: "Dr. Sarah Mitchell",
    icon: Stethoscope,
  },
  {
    date: "Jun 5, 2025",
    time: "12:00 PM",
    type: "prescription",
    title: "Prescription Issued",
    desc: "Amlodipine 5mg + Losartan 50mg + Aspirin 75mg prescribed.",
    doctor: "Dr. Sarah Mitchell",
    icon: Pill,
  },
  {
    date: "May 20, 2025",
    time: "2:30 PM",
    type: "appointment",
    title: "General Physician Visit",
    desc: "Seasonal allergy symptoms — runny nose, itchy eyes.",
    doctor: "Dr. Omar Patel",
    icon: Calendar,
  },
  {
    date: "May 20, 2025",
    time: "3:00 PM",
    type: "prescription",
    title: "Antihistamine Prescribed",
    desc: "Cetirizine 10mg once daily for 14 days.",
    doctor: "Dr. Omar Patel",
    icon: Pill,
  },
  {
    date: "Apr 14, 2025",
    time: "9:00 AM",
    type: "diagnosis",
    title: "Eczema — Mild Flare",
    desc: "Topical corticosteroid cream applied. Follow-up in 4 weeks.",
    doctor: "Dr. Lisa Chen",
    icon: Stethoscope,
  },
];

const NAV = [
  { id: "dashboard", icon: Home, label: "Dashboard" },
  { id: "appointments", icon: Calendar, label: "My Appointments" },
  { id: "prescriptions", icon: Pill, label: "Prescriptions" },
  { id: "history", icon: History, label: "Medical History" },
  { id: "profile", icon: User, label: "Profile" },
];

// ── Reusable ──────────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const cfg = {
    confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    completed: "bg-sky-100 text-sky-700 border-sky-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };
  const dots = {
    confirmed: "bg-emerald-400",
    pending: "bg-amber-400",
    completed: "bg-sky-400",
    cancelled: "bg-red-400",
  };
  return (
    <span
      className={cls(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold capitalize",
        cfg[status],
      )}
    >
      <span className={cls("w-1.5 h-1.5 rounded-full", dots[status])} />
      {status}
    </span>
  );
};

const Card = ({ children, className = "", hover = true, dark = false }) => (
  <motion.div
    whileHover={
      hover
        ? {
            y: -2,
            boxShadow: dark
              ? "0 16px 32px -8px rgba(0,0,0,0.5)"
              : "0 16px 32px -8px rgba(14,165,233,0.1)",
          }
        : {}
    }
    transition={{ duration: 0.2 }}
    className={cls(
      "rounded-2xl border transition-all",
      dark
        ? "bg-slate-800 border-slate-700/80 shadow-md"
        : "bg-white border-slate-100 shadow-sm",
      className,
    )}
  >
    {children}
  </motion.div>
);

const Btn = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  icon: Icon,
  className = "",
}) => {
  const v = {
    primary:
      "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md shadow-sky-200/60 hover:shadow-sky-300/60",
    outline: "border border-slate-200 text-slate-700 hover:bg-slate-50",
    teal: "bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "text-red-500 hover:bg-red-50",
  };
  const s = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2",
  };
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={cls(
        "inline-flex items-center rounded-xl font-semibold transition-all",
        v[variant],
        s[size],
        className,
      )}
    >
      {Icon && <Icon size={13} />}
      {children}
    </motion.button>
  );
};

const Skeleton = ({ className = "" }) => (
  <div className={cls("rounded-xl animate-pulse bg-slate-200", className)} />
);

const Avatar = ({
  initials,
  size = "md",
  gradient = "from-sky-400 to-teal-500",
}) => {
  const s = {
    xs: "w-7 h-7 text-[10px]",
    sm: "w-9 h-9 text-xs",
    md: "w-11 h-11 text-sm",
    lg: "w-14 h-14 text-lg",
    xl: "w-20 h-20 text-2xl",
  };
  return (
    <div
      className={cls(
        "rounded-full bg-gradient-to-br flex items-center justify-center font-bold text-white flex-shrink-0 shadow-md",
        s[size],
        gradient,
      )}
    >
      {initials}
    </div>
  );
};

// ── Sidebar ───────────────────────────────────────────────────────────────────
const Sidebar = ({
  active,
  onNav,
  collapsed,
  onToggle,
  dark,
  mobileOpen,
  onClose,
}) => {
  const inner = (
    <div
      className={cls(
        "h-full flex flex-col",
        dark ? "bg-slate-900" : "bg-white",
      )}
    >
      <div
        className={cls(
          "flex items-center gap-3 px-4 py-5 border-b",
          dark ? "border-slate-700/60" : "border-slate-100",
        )}
      >
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-sky-200">
          <Brain size={17} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cls(
                "font-black text-base whitespace-nowrap",
                dark ? "text-white" : "text-slate-800",
              )}
            >
              Medi<span className="text-sky-500">Mind</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cls(
              "mx-3 my-3 p-3 rounded-2xl",
              dark ? "bg-slate-800" : "bg-sky-50 border border-sky-100",
            )}
          >
            <div className="flex items-center gap-2.5">
              <Avatar initials="AR" size="sm" />
              <div>
                <p
                  className={cls(
                    "text-sm font-bold",
                    dark ? "text-white" : "text-slate-800",
                  )}
                >
                  Ahmed Al-Rashid
                </p>
                <p className="text-xs text-slate-400">MCL-2891</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="flex-1 px-3 py-2 space-y-1">
        {NAV.map(({ id, icon: Icon, label }) => {
          const active_ = active === id;
          return (
            <motion.button
              key={id}
              whileHover={{ x: 2 }}
              onClick={() => {
                onNav(id);
                onClose?.();
              }}
              className={cls(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all",
                active_
                  ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md shadow-sky-200/50"
                  : dark
                    ? "text-slate-400 hover:text-white hover:bg-slate-800"
                    : "text-slate-500 hover:text-sky-600 hover:bg-sky-50",
              )}
            >
              <Icon size={16} className="flex-shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      <div
        className={cls(
          "p-3 border-t space-y-1",
          dark ? "border-slate-700/60" : "border-slate-100",
        )}
      >
        <motion.button
          whileHover={{ x: 2 }}
          className={cls(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all",
            dark
              ? "text-red-400 hover:bg-red-500/10"
              : "text-red-500 hover:bg-red-50",
          )}
        >
          <LogOut size={16} />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        <button
          onClick={onToggle}
          className={cls(
            "hidden md:flex w-full items-center justify-center py-2 rounded-xl text-xs font-medium transition-all",
            dark
              ? "text-slate-500 hover:bg-slate-800"
              : "text-slate-400 hover:bg-slate-50",
          )}
        >
          {collapsed ? (
            <ChevronRight size={14} />
          ) : (
            <span className="flex items-center gap-1">
              <ChevronLeft size={14} />
              Collapse
            </span>
          )}
        </button>
      </div>
    </div>
  );
  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 68 : 236 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cls(
          "hidden md:flex flex-col h-screen sticky top-0 border-r flex-shrink-0 overflow-hidden z-20",
          dark ? "border-slate-700/60" : "border-slate-100",
        )}
      >
        {inner}
      </motion.aside>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/40 z-30"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className={cls(
                "md:hidden fixed top-0 left-0 h-full w-64 z-40 border-r shadow-2xl",
                dark ? "border-slate-700" : "border-slate-100",
              )}
            >
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={onClose}
                  className={cls(
                    "p-2 rounded-xl",
                    dark
                      ? "text-slate-400 hover:bg-slate-700"
                      : "text-slate-500 hover:bg-slate-100",
                  )}
                >
                  <X size={16} />
                </button>
              </div>
              {inner}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// ── Topbar ────────────────────────────────────────────────────────────────────
const Topbar = ({ dark, toggleDark, openMenu, page }) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const titles = {
    dashboard: "Dashboard",
    appointments: "My Appointments",
    prescriptions: "Prescriptions",
    history: "Medical History",
    profile: "Profile",
  };
  const NOTIFS = [
    {
      text: "Appointment with Dr. Mitchell is tomorrow at 10:00 AM",
      time: "1h ago",
    },
    { text: "New prescription RX-20250605 ready to download", time: "3h ago" },
    { text: "Lab results for blood panel now available", time: "1d ago" },
  ];
  return (
    <header
      className={cls(
        "h-16 px-4 sm:px-6 flex items-center gap-3 border-b sticky top-0 z-10",
        dark
          ? "bg-slate-900/95 backdrop-blur-xl border-slate-700/60"
          : "bg-white/90 backdrop-blur-xl border-slate-100 shadow-sm",
      )}
    >
      <button
        onClick={openMenu}
        className={cls(
          "md:hidden p-2 rounded-xl",
          dark
            ? "text-slate-400 hover:bg-slate-800"
            : "text-slate-500 hover:bg-slate-100",
        )}
      >
        <Menu size={18} />
      </button>
      <div className="flex-1">
        <h1
          className={cls(
            "font-black text-base sm:text-lg",
            dark ? "text-white" : "text-slate-800",
          )}
        >
          {titles[page]}
        </h1>
        <p className="text-xs text-slate-400 hidden sm:block">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={toggleDark}
          className={cls(
            "p-2 rounded-xl border transition-all",
            dark
              ? "border-slate-700 text-yellow-400 hover:bg-slate-800"
              : "border-slate-200 text-slate-500 hover:bg-slate-50",
          )}
        >
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen((o) => !o);
              setAvatarOpen(false);
            }}
            className={cls(
              "p-2 rounded-xl border transition-all relative",
              dark
                ? "border-slate-700 text-slate-400 hover:bg-slate-800"
                : "border-slate-200 text-slate-500 hover:bg-slate-50",
            )}
          >
            <Bell size={15} />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center font-black">
              3
            </span>
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className={cls(
                  "absolute right-0 top-12 w-72 rounded-2xl border shadow-2xl z-50 overflow-hidden",
                  dark
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-slate-100",
                )}
              >
                <div
                  className={cls(
                    "px-4 py-3 flex items-center justify-between border-b",
                    dark ? "border-slate-700" : "border-slate-100",
                  )}
                >
                  <span
                    className={cls(
                      "font-bold text-sm",
                      dark ? "text-white" : "text-slate-800",
                    )}
                  >
                    Notifications
                  </span>
                  <button className="text-xs text-sky-500 font-semibold">
                    Mark all read
                  </button>
                </div>
                {NOTIFS.map((n, i) => (
                  <div
                    key={i}
                    className={cls(
                      "px-4 py-3 border-b last:border-0 flex gap-2 cursor-pointer",
                      dark
                        ? "border-slate-700 hover:bg-slate-700/50"
                        : "border-slate-50 hover:bg-slate-50",
                    )}
                  >
                    <div className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0 mt-1.5" />
                    <div>
                      <p
                        className={cls(
                          "text-xs leading-relaxed",
                          dark ? "text-slate-300" : "text-slate-700",
                        )}
                      >
                        {n.text}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="relative">
          <button
            onClick={() => {
              setAvatarOpen((o) => !o);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 transition-all ml-1"
          >
            <Avatar initials="AR" size="sm" />
            <span
              className={cls(
                "hidden sm:block text-sm font-bold",
                dark ? "text-white" : "text-slate-700",
              )}
            >
              Ahmed
            </span>
            <ChevronDown size={12} className="text-slate-400" />
          </button>
          <AnimatePresence>
            {avatarOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className={cls(
                  "absolute right-0 top-12 w-48 rounded-2xl border shadow-2xl z-50 py-1 overflow-hidden",
                  dark
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-slate-100",
                )}
              >
                {[
                  ["Profile", User],
                  ["Health Records", FileText],
                  ["Sign Out", LogOut],
                ].map(([l, Icon]) => (
                  <button
                    key={l}
                    className={cls(
                      "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-all text-left",
                      l === "Sign Out"
                        ? "text-red-500 hover:bg-red-50"
                        : dark
                          ? "text-slate-300 hover:bg-slate-700"
                          : "text-slate-600 hover:bg-slate-50",
                    )}
                  >
                    <Icon size={13} />
                    {l}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

// ── Profile Summary ───────────────────────────────────────────────────────────
const ProfileSummary = ({ dark }) => (
  <Card dark={dark} className="p-6 relative overflow-hidden">
    <div
      className={cls(
        "absolute top-0 right-0 w-48 h-48 rounded-full -translate-y-1/2 translate-x-1/2",
        dark
          ? "bg-gradient-to-br from-sky-500/10 to-teal-500/10"
          : "bg-gradient-to-br from-sky-100/80 to-teal-100/80",
      )}
    />
    <div className="relative flex flex-col sm:flex-row gap-5">
      <div className="relative flex-shrink-0">
        <Avatar initials="AR" size="xl" />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center shadow">
          <CheckCircle size={10} className="text-white" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h2
              className={cls(
                "text-2xl font-black",
                dark ? "text-white" : "text-slate-800",
              )}
            >
              {PATIENT.name}
            </h2>
            <p className="text-sky-500 text-sm font-semibold">
              Patient ID: #{PATIENT.patientId}
            </p>
          </div>
          <Btn
            variant="outline"
            size="sm"
            icon={Edit}
            className={dark ? "border-slate-600 text-slate-300" : ""}
          >
            Edit
          </Btn>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { l: `${PATIENT.age} yrs`, ic: User },
            { l: PATIENT.gender, ic: User },
            { l: PATIENT.bloodGroup, ic: Droplets },
          ].map(({ l, ic: Ic }) => (
            <span
              key={l}
              className={cls(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
                dark
                  ? "bg-slate-700 border-slate-600 text-slate-300"
                  : "bg-sky-50 border-sky-100 text-sky-700",
              )}
            >
              <Ic size={10} />
              {l}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { ic: Phone, l: "Phone", v: PATIENT.phone },
            { ic: Mail, l: "Email", v: PATIENT.email },
            { ic: MapPin, l: "Location", v: PATIENT.address },
          ].map(({ ic: Ic, l, v }) => (
            <div
              key={l}
              className={cls(
                "flex items-center gap-2 p-2.5 rounded-xl",
                dark ? "bg-slate-700/50" : "bg-slate-50",
              )}
            >
              <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
                <Ic size={12} className="text-sky-600" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400 font-medium">{l}</p>
                <p
                  className={cls(
                    "text-xs font-semibold truncate",
                    dark ? "text-slate-200" : "text-slate-700",
                  )}
                >
                  {v}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Card>
);

// ── Vitals ────────────────────────────────────────────────────────────────────
const VitalsRow = ({ dark, loading }) => {
  const colorMap = {
    rose: {
      ic: "text-rose-500",
      bdr: "border-rose-100",
      val: "text-rose-600",
      bg: "bg-rose-50 border-rose-100",
    },
    blue: {
      ic: "text-blue-500",
      bdr: "border-blue-100",
      val: "text-blue-600",
      bg: "bg-blue-50 border-blue-100",
    },
    amber: {
      ic: "text-amber-500",
      bdr: "border-amber-100",
      val: "text-amber-600",
      bg: "bg-amber-50 border-amber-100",
    },
    teal: {
      ic: "text-teal-500",
      bdr: "border-teal-100",
      val: "text-teal-600",
      bg: "bg-teal-50 border-teal-100",
    },
  };
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
      {VITALS.map((v, i) => {
        const c = colorMap[v.color];
        return loading ? (
          <Skeleton key={i} className="h-24" />
        ) : (
          <Card
            key={v.label}
            dark={dark}
            className={cls("p-4 border", dark ? "" : c.bdr)}
          >
            <div className="flex items-start justify-between mb-2">
              <div
                className={cls(
                  "w-8 h-8 rounded-xl flex items-center justify-center",
                  dark ? "bg-slate-700" : c.bg.split(" ")[0],
                )}
              >
                <v.icon size={15} className={c.ic} />
              </div>
              <span
                className={cls(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full",
                  dark
                    ? "bg-slate-700 text-slate-400"
                    : "bg-slate-100 text-slate-500",
                )}
              >
                {v.trend}
              </span>
            </div>
            <p
              className={cls("text-xl font-black", dark ? "text-white" : c.val)}
            >
              {v.value}
            </p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
              {v.label} · {v.unit}
            </p>
          </Card>
        );
      })}
    </div>
  );
};

// ── Upcoming Appointments ─────────────────────────────────────────────────────
const UpcomingAppointments = ({ dark, loading }) => {
  const grads = [
    "from-sky-400 to-blue-500",
    "from-teal-400 to-emerald-500",
    "from-violet-400 to-purple-500",
  ];
  return (
    <Card dark={dark} className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2
            className={cls(
              "font-black text-lg",
              dark ? "text-white" : "text-slate-800",
            )}
          >
            Upcoming Appointments
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {APPOINTMENTS.length} scheduled
          </p>
        </div>
        <Btn
          variant="teal"
          size="sm"
          icon={Plus}
          className={
            dark ? "bg-teal-500/10 border-teal-500/30 text-teal-400" : ""
          }
        >
          Book New
        </Btn>
      </div>
      <div className="space-y-3">
        {loading
          ? [0, 1].map((i) => <Skeleton key={i} className="h-20" />)
          : APPOINTMENTS.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ x: 3 }}
                className={cls(
                  "flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer",
                  dark
                    ? "border-slate-700 hover:border-sky-500/40 hover:bg-slate-700/40"
                    : "border-slate-100 hover:border-sky-200 hover:bg-sky-50/50",
                )}
              >
                <Avatar initials={a.avatar} size="md" gradient={grads[i % 3]} />
                <div className="flex-1 min-w-0">
                  <p
                    className={cls(
                      "font-bold text-sm",
                      dark ? "text-white" : "text-slate-800",
                    )}
                  >
                    {a.doctor}
                  </p>
                  <p className="text-xs text-slate-400">{a.specialty}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span
                      className={cls(
                        "inline-flex items-center gap-1 text-xs",
                        dark ? "text-slate-300" : "text-slate-600",
                      )}
                    >
                      <Calendar size={10} className="text-sky-500" />
                      {a.date}
                    </span>
                    <span
                      className={cls(
                        "inline-flex items-center gap-1 text-xs",
                        dark ? "text-slate-300" : "text-slate-600",
                      )}
                    >
                      <Clock size={10} className="text-teal-500" />
                      {a.time}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                  <StatusBadge status={a.status} />
                  <Btn
                    variant={a.status === "confirmed" ? "primary" : "outline"}
                    size="sm"
                    className={
                      dark && a.status !== "confirmed"
                        ? "border-slate-600 text-slate-300"
                        : ""
                    }
                  >
                    {a.status === "confirmed" ? "Join" : "Details"}
                  </Btn>
                </div>
              </motion.div>
            ))}
      </div>
    </Card>
  );
};

// ── Prescription ──────────────────────────────────────────────────────────────
const PrescriptionPreview = ({ dark, loading }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card dark={dark} className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2
            className={cls(
              "font-black text-lg",
              dark ? "text-white" : "text-slate-800",
            )}
          >
            Latest Prescription
          </h2>
          <p className="text-xs text-slate-400">
            {PRESCRIPTION.rxId} · {PRESCRIPTION.date}
          </p>
        </div>
        <div className="flex gap-2">
          <Btn
            variant="teal"
            size="sm"
            icon={Download}
            className={
              dark ? "bg-teal-500/10 border-teal-500/30 text-teal-400" : ""
            }
          >
            PDF
          </Btn>
          <Btn
            variant="outline"
            size="sm"
            icon={Eye}
            className={dark ? "border-slate-600 text-slate-300" : ""}
          >
            View
          </Btn>
        </div>
      </div>
      {loading ? (
        <Skeleton className="h-32" />
      ) : (
        <>
          <div
            className={cls(
              "flex items-center gap-3 p-3 rounded-2xl mb-4",
              dark ? "bg-slate-700/50" : "bg-slate-50",
            )}
          >
            <Avatar initials="SM" size="sm" />
            <div>
              <p
                className={cls(
                  "font-bold text-sm",
                  dark ? "text-white" : "text-slate-800",
                )}
              >
                {PRESCRIPTION.doctor}
              </p>
              <p className="text-xs text-slate-400">
                {PRESCRIPTION.specialty} · {PRESCRIPTION.date}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {(expanded
              ? PRESCRIPTION.medicines
              : PRESCRIPTION.medicines.slice(0, 2)
            ).map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={cls(
                  "flex items-center gap-3 p-3 rounded-xl border",
                  dark
                    ? "border-slate-700 bg-slate-700/30"
                    : "border-slate-100 bg-white",
                )}
              >
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Pill size={13} className="text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cls(
                      "text-sm font-bold",
                      dark ? "text-white" : "text-slate-800",
                    )}
                  >
                    {m.name}{" "}
                    <span className="text-slate-400 font-normal">
                      · {m.dose}
                    </span>
                  </p>
                  <p className="text-xs text-slate-400">
                    {m.frequency} · {m.duration}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          {PRESCRIPTION.medicines.length > 2 && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className={cls(
                "mt-3 text-xs font-semibold",
                dark ? "text-sky-400" : "text-sky-600",
              )}
            >
              {expanded
                ? "Show less ▲"
                : `+${PRESCRIPTION.medicines.length - 2} more ▼`}
            </button>
          )}
          {expanded && (
            <div
              className={cls(
                "mt-3 p-3 rounded-xl text-xs border",
                dark
                  ? "border-amber-500/20 bg-amber-500/10 text-amber-300"
                  : "border-amber-200 bg-amber-50 text-amber-700",
              )}
            >
              <strong>Note:</strong> {PRESCRIPTION.notes}
            </div>
          )}
        </>
      )}
    </Card>
  );
};

// ── AI Section ────────────────────────────────────────────────────────────────
const AISection = ({ dark }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    risk: "medium",
    summary:
      "Your blood pressure is trending toward a healthier range. Continue current medication and aim for 30 minutes of light cardio daily. Salt intake should be reduced.",
    tips: [
      "Reduce sodium intake to < 2g/day",
      "Monitor BP twice daily — morning & evening",
      "Stay hydrated — 8 glasses of water daily",
    ],
    updated: "Today at 8:42 AM",
  });

  const refresh = async () => {
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 2200));
    setLoading(false);
    setResult({
      risk: "low",
      summary:
        "Your health indicators have improved significantly this week. Blood pressure is now within normal range. Great medication compliance!",
      tips: [
        "Excellent BP trend!",
        "Medication compliance at 95%",
        "Add 10 min walks after meals",
      ],
      updated: "Just now",
    });
  };

  const riskCfg = {
    low: {
      label: "Low Risk",
      color: "text-emerald-600",
      bg: dark
        ? "bg-emerald-500/10 border-emerald-500/20"
        : "bg-emerald-50 border-emerald-200",
      dot: "bg-emerald-400",
      bar: "bg-emerald-400 w-1/3",
    },
    medium: {
      label: "Medium Risk",
      color: "text-amber-600",
      bg: dark
        ? "bg-amber-500/10 border-amber-500/20"
        : "bg-amber-50 border-amber-200",
      dot: "bg-amber-400",
      bar: "bg-amber-400 w-2/3",
    },
    high: {
      label: "High Risk",
      color: "text-red-600",
      bg: dark ? "bg-red-500/10 border-red-500/20" : "bg-red-50 border-red-200",
      dot: "bg-red-400",
      bar: "bg-red-400 w-full",
    },
  };

  return (
    <Card
      dark={dark}
      className={cls(
        "p-6 relative overflow-hidden border",
        dark
          ? "bg-gradient-to-br from-slate-800 to-slate-800/50 border-sky-500/20"
          : "bg-gradient-to-br from-sky-50/80 to-teal-50/60 border-sky-200/60",
      )}
    >
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-br from-sky-400/10 to-teal-400/10 translate-x-1/3 -translate-y-1/3 blur-2xl" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-md shadow-sky-200/40">
              <Brain size={16} className="text-white" />
            </div>
            <div>
              <h2
                className={cls(
                  "font-bold text-base",
                  dark ? "text-white" : "text-slate-800",
                )}
              >
                AI Health Insight
              </h2>
              <p className="text-[11px] text-slate-400">
                {result ? `Updated: ${result.updated}` : "Analyzing..."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cls(
                "px-2 py-0.5 rounded-full text-[10px] font-bold",
                dark ? "bg-sky-500/20 text-sky-400" : "bg-sky-100 text-sky-700",
              )}
            >
              BETA
            </span>
            <button
              onClick={refresh}
              className={cls(
                "p-2 rounded-xl transition-all",
                loading ? "animate-spin" : "",
                dark
                  ? "hover:bg-slate-700 text-slate-400"
                  : "hover:bg-white text-slate-500",
              )}
            >
              <RefreshCw size={13} />
            </button>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="l"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3 py-2"
            >
              <div className="flex items-center gap-2">
                <Loader2 size={14} className="text-sky-500 animate-spin" />
                <span
                  className={cls(
                    "text-sm",
                    dark ? "text-slate-300" : "text-slate-600",
                  )}
                >
                  AI analyzing your health data...
                </span>
              </div>
              {[1, 0.8, 0.65].map((w, i) => (
                <Skeleton
                  key={i}
                  className={`h-3`}
                  style={{ width: `${w * 100}%` }}
                />
              ))}
            </motion.div>
          ) : (
            result && (
              <motion.div
                key="r"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div
                  className={cls(
                    "p-3 rounded-xl border",
                    riskCfg[result.risk].bg,
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={cls(
                        "w-2.5 h-2.5 rounded-full",
                        riskCfg[result.risk].dot,
                      )}
                    />
                    <span
                      className={cls(
                        "text-sm font-bold",
                        riskCfg[result.risk].color,
                      )}
                    >
                      {riskCfg[result.risk].label}
                    </span>
                  </div>
                  <div
                    className={cls(
                      "h-1.5 rounded-full overflow-hidden",
                      dark ? "bg-slate-700" : "bg-white/60",
                    )}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{}}
                      transition={{ duration: 1 }}
                      className={cls(
                        "h-full rounded-full transition-all duration-1000",
                        riskCfg[result.risk].bar.split(" ").slice(0, 1)[0],
                        riskCfg[result.risk].bar.split(" ")[1],
                      )}
                    />
                  </div>
                </div>
                <p
                  className={cls(
                    "text-sm leading-relaxed",
                    dark ? "text-slate-300" : "text-slate-600",
                  )}
                >
                  {result.summary}
                </p>
                <div className="space-y-1.5">
                  {result.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle
                        size={12}
                        className="text-teal-500 flex-shrink-0 mt-0.5"
                      />
                      <span
                        className={cls(
                          "text-xs",
                          dark ? "text-slate-300" : "text-slate-600",
                        )}
                      >
                        {tip}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  className={cls(
                    "flex items-center gap-1.5 text-xs border-t pt-3",
                    dark
                      ? "border-slate-700 text-slate-500"
                      : "border-sky-200/60 text-slate-400",
                  )}
                >
                  <Shield size={10} className="text-sky-400" />
                  For informational purposes only. Consult your physician.
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

// ── History Table ─────────────────────────────────────────────────────────────
const HistoryTable = ({ dark }) => (
  <Card dark={dark} className="p-6 overflow-hidden">
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2
          className={cls(
            "font-black text-lg",
            dark ? "text-white" : "text-slate-800",
          )}
        >
          Appointment History
        </h2>
        <p className="text-xs text-slate-400">{HISTORY.length} records</p>
      </div>
    </div>
    <div className="overflow-x-auto -mx-2 px-2">
      <table className="w-full text-sm min-w-[500px]">
        <thead>
          <tr
            className={cls(
              "border-b",
              dark ? "border-slate-700" : "border-slate-100",
            )}
          >
            {["Date", "Doctor", "Specialty", "Diagnosis", "Status", ""].map(
              (h) => (
                <th
                  key={h}
                  className="text-left py-2.5 px-3 text-xs font-bold text-slate-400 whitespace-nowrap"
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {HISTORY.map((row, i) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={cls(
                "border-b last:border-0 transition-colors",
                dark
                  ? "border-slate-700/60 hover:bg-slate-700/30"
                  : "border-slate-50 hover:bg-sky-50/40",
              )}
            >
              <td className="py-3 px-3 whitespace-nowrap">
                <p
                  className={cls(
                    "font-semibold text-xs",
                    dark ? "text-white" : "text-slate-800",
                  )}
                >
                  {row.date}
                </p>
              </td>
              <td className="py-3 px-3">
                <div className="flex items-center gap-2">
                  <Avatar
                    initials={row.doctor.split(" ").pop().slice(0, 2)}
                    size="xs"
                  />
                  <span
                    className={cls(
                      "font-medium text-xs whitespace-nowrap",
                      dark ? "text-slate-300" : "text-slate-700",
                    )}
                  >
                    {row.doctor}
                  </span>
                </div>
              </td>
              <td className="py-3 px-3">
                <span
                  className={cls(
                    "text-xs",
                    dark ? "text-slate-400" : "text-slate-500",
                  )}
                >
                  {row.specialty}
                </span>
              </td>
              <td className="py-3 px-3">
                <span
                  className={cls(
                    "text-xs font-medium",
                    dark ? "text-slate-300" : "text-slate-700",
                  )}
                >
                  {row.diagnosis}
                </span>
              </td>
              <td className="py-3 px-3">
                <StatusBadge status={row.status} />
              </td>
              <td className="py-3 px-3">
                <button
                  className={cls(
                    "flex items-center gap-1 text-xs font-semibold",
                    dark ? "text-sky-400" : "text-sky-600",
                  )}
                >
                  <Eye size={11} />
                  View
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

// ── Timeline ──────────────────────────────────────────────────────────────────
const TLItem = ({ item, index, dark, last }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const tc = {
    appointment: {
      grad: "from-sky-500 to-blue-600",
      tag: dark ? "bg-sky-500/20 text-sky-400" : "bg-sky-100 text-sky-700",
    },
    diagnosis: {
      grad: "from-amber-500 to-orange-500",
      tag: dark
        ? "bg-amber-500/20 text-amber-400"
        : "bg-amber-100 text-amber-700",
    },
    prescription: {
      grad: "from-teal-500 to-emerald-500",
      tag: dark ? "bg-teal-500/20 text-teal-400" : "bg-teal-100 text-teal-700",
    },
  };
  const c = tc[item.type];
  return (
    <div ref={ref} className="flex gap-4 relative">
      {!last && (
        <div
          className={cls(
            "absolute left-[18px] top-11 bottom-0 w-0.5",
            dark ? "bg-slate-700" : "bg-slate-200",
          )}
        />
      )}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.06, type: "spring", stiffness: 300 }}
        className={cls(
          "w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0 z-10 shadow-md mt-0.5",
          c.grad,
        )}
      >
        <item.icon size={14} className="text-white" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -14 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.06 + 0.04 }}
        className={cls("flex-1 pb-5", last ? "pb-0" : "")}
      >
        <div
          className={cls(
            "p-4 rounded-2xl border hover:shadow-md transition-all",
            dark
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-slate-100",
          )}
        >
          <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
            <div className="flex items-center gap-2">
              <span
                className={cls(
                  "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                  c.tag,
                )}
              >
                {item.type}
              </span>
              <span
                className={cls(
                  "text-xs font-bold",
                  dark ? "text-white" : "text-slate-800",
                )}
              >
                {item.title}
              </span>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[10px] text-slate-400 font-semibold">
                {item.date}
              </p>
              <p className="text-[10px] text-slate-400">{item.time}</p>
            </div>
          </div>
          <p
            className={cls(
              "text-xs leading-relaxed mb-2",
              dark ? "text-slate-400" : "text-slate-500",
            )}
          >
            {item.desc}
          </p>
          <div className="flex items-center gap-1.5">
            <Avatar
              initials={item.doctor.split(" ").pop().slice(0, 2)}
              size="xs"
            />
            <span className="text-[11px] text-slate-400">{item.doctor}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Timeline = ({ dark }) => (
  <Card dark={dark} className="p-6">
    <div className="mb-5">
      <h2
        className={cls(
          "font-black text-lg",
          dark ? "text-white" : "text-slate-800",
        )}
      >
        Medical Timeline
      </h2>
      <p className="text-xs text-slate-400 mt-0.5">
        Chronological health journey
      </p>
    </div>
    <div>
      {TIMELINE.map((item, i) => (
        <TLItem
          key={i}
          item={item}
          index={i}
          dark={dark}
          last={i === TIMELINE.length - 1}
        />
      ))}
    </div>
  </Card>
);

// ── Quick Stats ───────────────────────────────────────────────────────────────
const QuickStats = ({ dark }) => {
  const items = [
    {
      label: "Total Visits",
      value: "24",
      icon: Calendar,
      g: "from-sky-500 to-blue-500 shadow-sky-200/60",
    },
    {
      label: "Prescriptions",
      value: "12",
      icon: Pill,
      g: "from-teal-500 to-emerald-500 shadow-teal-200/60",
    },
    {
      label: "Doctors Seen",
      value: "6",
      icon: Stethoscope,
      g: "from-violet-500 to-purple-500 shadow-violet-200/60",
    },
    {
      label: "Health Score",
      value: "87%",
      icon: TrendingUp,
      g: "from-emerald-500 to-green-500 shadow-emerald-200/60",
    },
  ];
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
      {items.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          whileHover={{ y: -3 }}
          className={cls(
            "p-4 rounded-2xl border transition-all",
            dark
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-slate-100 shadow-sm hover:shadow-md",
          )}
        >
          <div
            className={cls(
              "w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md mb-3",
              s.g,
            )}
          >
            <s.icon size={15} className="text-white" />
          </div>
          <p
            className={cls(
              "text-2xl font-black",
              dark ? "text-white" : "text-slate-800",
            )}
          >
            {s.value}
          </p>
          <p className="text-xs text-slate-400 font-medium mt-0.5">{s.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

// ── Pages ─────────────────────────────────────────────────────────────────────
const DashboardPage = ({ dark, loading }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-5"
  >
    <div
      className={cls(
        "relative overflow-hidden rounded-2xl p-5 sm:p-6",
        dark
          ? "bg-gradient-to-r from-sky-600/20 to-teal-600/20 border border-sky-500/20"
          : "bg-gradient-to-r from-sky-500 to-teal-500",
      )}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.5) 0%, transparent 60%)",
        }}
      />
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p
            className={cls(
              "text-sm font-semibold mb-1",
              dark ? "text-sky-400" : "text-sky-100",
            )}
          >
            Welcome back 👋
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Ahmed Al-Rashid
          </h2>
          <p
            className={cls(
              "text-sm mt-1",
              dark ? "text-slate-400" : "text-sky-100/90",
            )}
          >
            Next appointment: <strong>Jul 12</strong> with Dr. Mitchell
          </p>
        </div>
        <div
          className={cls(
            "flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm flex-shrink-0",
            dark
              ? "bg-sky-500/20 border border-sky-500/30 text-sky-400"
              : "bg-white/20 text-white border border-white/30",
          )}
        >
          <CheckCircle size={15} />
          Premium Plan
        </div>
      </div>
    </div>
    <QuickStats dark={dark} />
    <VitalsRow dark={dark} loading={loading} />
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
      <div className="xl:col-span-3">
        <ProfileSummary dark={dark} />
      </div>
      <div className="xl:col-span-2">
        <AISection dark={dark} />
      </div>
    </div>
    <UpcomingAppointments dark={dark} loading={loading} />
    <PrescriptionPreview dark={dark} loading={loading} />
    <HistoryTable dark={dark} />
    <Timeline dark={dark} />
  </motion.div>
);

const AppointmentsPage = ({ dark }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-5"
  >
    <UpcomingAppointments dark={dark} />
    <HistoryTable dark={dark} />
  </motion.div>
);

const PrescriptionsPage = ({ dark }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-5"
  >
    <PrescriptionPreview dark={dark} />
    <Card dark={dark} className="p-6">
      <h2
        className={cls(
          "font-black text-lg mb-4",
          dark ? "text-white" : "text-slate-800",
        )}
      >
        All Prescriptions
      </h2>
      <div className="space-y-3">
        {[
          {
            id: "RX-001",
            doc: "Dr. Sarah Mitchell",
            date: "Jun 5, 2025",
            meds: 3,
          },
          {
            id: "RX-002",
            doc: "Dr. Omar Patel",
            date: "May 20, 2025",
            meds: 1,
          },
          { id: "RX-003", doc: "Dr. Lisa Chen", date: "Apr 14, 2025", meds: 2 },
        ].map((rx, i) => (
          <div
            key={i}
            className={cls(
              "flex items-center justify-between p-4 rounded-2xl border",
              dark
                ? "border-slate-700 bg-slate-700/30"
                : "border-slate-100 hover:bg-sky-50/40 transition-colors",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                <FileText size={15} className="text-teal-600" />
              </div>
              <div>
                <p
                  className={cls(
                    "font-bold text-sm",
                    dark ? "text-white" : "text-slate-800",
                  )}
                >
                  {rx.id}
                </p>
                <p className="text-xs text-slate-400">
                  {rx.doc} · {rx.date} · {rx.meds} medicines
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Btn
                variant="teal"
                size="sm"
                icon={Download}
                className={
                  dark ? "bg-teal-500/10 border-teal-500/30 text-teal-400" : ""
                }
              >
                PDF
              </Btn>
              <Btn
                variant="outline"
                size="sm"
                icon={Eye}
                className={dark ? "border-slate-600 text-slate-300" : ""}
              >
                View
              </Btn>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </motion.div>
);

const HistoryPage = ({ dark }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-5"
  >
    <HistoryTable dark={dark} />
    <Timeline dark={dark} />
  </motion.div>
);

const ProfilePage = ({ dark }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-5"
  >
    <ProfileSummary dark={dark} />
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <Card dark={dark} className="p-6">
        <h2
          className={cls(
            "font-black text-lg mb-4",
            dark ? "text-white" : "text-slate-800",
          )}
        >
          Personal Information
        </h2>
        <div className="space-y-3">
          {[
            ["Full Name", PATIENT.name, User],
            ["Date of Birth", PATIENT.dob, Calendar],
            ["Gender", PATIENT.gender, User],
            ["Blood Group", PATIENT.bloodGroup, Droplets],
            ["Phone", PATIENT.phone, Phone],
            ["Email", PATIENT.email, Mail],
            ["Address", PATIENT.address, MapPin],
          ].map(([l, v, Ic]) => (
            <div
              key={l}
              className={cls(
                "flex items-center gap-3 p-3 rounded-xl",
                dark ? "bg-slate-700/40" : "bg-slate-50",
              )}
            >
              <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
                <Ic size={12} className="text-sky-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-400 font-medium">{l}</p>
                <p
                  className={cls(
                    "text-sm font-semibold truncate",
                    dark ? "text-white" : "text-slate-800",
                  )}
                >
                  {v}
                </p>
              </div>
              <button className="text-slate-400 hover:text-sky-500">
                <Edit size={12} />
              </button>
            </div>
          ))}
        </div>
        <Btn
          variant="primary"
          className="w-full justify-center mt-4"
          icon={Edit}
        >
          Update Profile
        </Btn>
      </Card>
      <div className="space-y-5">
        <Card dark={dark} className="p-6">
          <h2
            className={cls(
              "font-black text-lg mb-4",
              dark ? "text-white" : "text-slate-800",
            )}
          >
            Emergency Contact
          </h2>
          {[
            ["Name", "Fatima Al-Rashid"],
            ["Relation", "Spouse"],
            ["Phone", "+971 55 987 6543"],
          ].map(([l, v]) => (
            <div
              key={l}
              className={cls(
                "flex justify-between items-center py-2.5 border-b last:border-0 text-sm",
                dark ? "border-slate-700" : "border-slate-100",
              )}
            >
              <span className="text-slate-400">{l}</span>
              <span
                className={cls(
                  "font-bold",
                  dark ? "text-white" : "text-slate-800",
                )}
              >
                {v}
              </span>
            </div>
          ))}
        </Card>
        <Card dark={dark} className="p-6">
          <h2
            className={cls(
              "font-black text-lg mb-4",
              dark ? "text-white" : "text-slate-800",
            )}
          >
            Health Metrics
          </h2>
          {[
            ["Height", "175 cm"],
            ["Weight", "78 kg"],
            ["BMI", "25.5 — Normal"],
            ["Allergies", "None known"],
          ].map(([l, v]) => (
            <div
              key={l}
              className={cls(
                "flex justify-between items-center py-2.5 border-b last:border-0 text-sm",
                dark ? "border-slate-700" : "border-slate-100",
              )}
            >
              <span className="text-slate-400">{l}</span>
              <span
                className={cls(
                  "font-bold",
                  dark ? "text-white" : "text-slate-800",
                )}
              >
                {v}
              </span>
            </div>
          ))}
        </Card>
        <AISection dark={dark} />
      </div>
    </div>
  </motion.div>
);

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const PAGES = {
    dashboard: <DashboardPage dark={dark} loading={loading} />,
    appointments: <AppointmentsPage dark={dark} />,
    prescriptions: <PrescriptionsPage dark={dark} />,
    history: <HistoryPage dark={dark} />,
    profile: <ProfilePage dark={dark} />,
  };

  return (
    <div
      className={cls(
        "min-h-screen font-sans antialiased",
        dark ? "bg-slate-950" : "bg-slate-50/80",
      )}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');*{font-family:'Plus Jakarta Sans',sans-serif;}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:99px}`}</style>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          active={page}
          onNav={setPage}
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          dark={dark}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Topbar
            dark={dark}
            toggleDark={() => setDark((d) => !d)}
            openMenu={() => setMobileOpen(true)}
            page={page}
          />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  {PAGES[page]}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
