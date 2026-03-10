import { useState, useEffect, FormEvent } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Send, 
  Home as HomeIcon, 
  Search, 
  MapPin, 
  Building2, 
  ChevronRight,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Types
interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  category: string;
}

// Components
const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-zinc-900 text-white p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <Briefcase size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-zinc-900">InternHub</span>
        </Link>
        <div className="flex gap-8">
          <Link to="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Home</Link>
          <Link to="/internships" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Explore</Link>
          <Link to="/apply" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Quick Apply</Link>
        </div>
      </div>
    </div>
  </nav>
);

const Home = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-5xl mx-auto px-4 py-20 text-center"
  >
    <span className="inline-block py-1 px-3 rounded-full bg-zinc-100 text-zinc-600 text-xs font-semibold uppercase tracking-wider mb-6">
      Launch Your Career
    </span>
    <h1 className="text-5xl sm:text-7xl font-bold text-zinc-900 tracking-tight mb-8 leading-[1.1]">
      Find your dream <br />
      <span className="text-zinc-400 italic">internship</span> today.
    </h1>
    <p className="text-lg text-zinc-600 max-w-2xl mx-auto mb-12 leading-relaxed">
      Connect with top companies and gain real-world experience. 
      Browse hundreds of opportunities tailored for students.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link 
        to="/internships" 
        className="bg-zinc-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-zinc-800 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-zinc-200"
      >
        Browse Internships
      </Link>
      <Link 
        to="/apply" 
        className="bg-white border border-zinc-200 text-zinc-900 px-8 py-4 rounded-2xl font-semibold hover:bg-zinc-50 transition-all"
      >
        Submit Application
      </Link>
    </div>
  </motion.div>
);

const InternshipList = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/internships')
      .then(res => res.json())
      .then(data => {
        setInternships(data);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <Loader2 className="animate-spin text-zinc-400" size={32} />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">Available Roles</h2>
          <p className="text-zinc-500">Discover opportunities across various industries.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-400 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-100">
          <Search size={14} />
          <span>{internships.length} opportunities found</span>
        </div>
      </div>
      
      <div className="grid gap-6">
        {internships.map((intern, idx) => (
          <motion.div
            key={intern.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-white border border-zinc-200 p-6 rounded-2xl hover:border-zinc-900 transition-all hover:shadow-xl hover:shadow-zinc-100 cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-zinc-900 group-hover:text-zinc-900">{intern.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    <span className="text-sm text-zinc-500 flex items-center gap-1">
                      <Building2 size={14} /> {intern.company}
                    </span>
                    <span className="text-sm text-zinc-500 flex items-center gap-1">
                      <MapPin size={14} /> {intern.location}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded-md">
                      {intern.category}
                    </span>
                  </div>
                </div>
              </div>
              <Link 
                to={`/apply/${intern.id}`}
                className="flex items-center gap-2 text-sm font-semibold text-zinc-900 bg-zinc-50 px-4 py-2 rounded-xl group-hover:bg-zinc-900 group-hover:text-white transition-all"
              >
                Apply Now <ChevronRight size={16} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    student_name: '',
    student_email: '',
    cover_letter: '',
    internship_id: id || ''
  });
  const [internships, setInternships] = useState<Internship[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/internships')
      .then(res => res.json())
      .then(setInternships);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => navigate('/internships'), 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto py-24 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-2xl shadow-zinc-100"
        >
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">Application Sent!</h2>
          <p className="text-zinc-500 mb-8">We've received your application. The company will review it and get back to you soon.</p>
          <p className="text-xs text-zinc-400">Redirecting you back to explore more roles...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Submit Application</h2>
        <p className="text-zinc-500">Take the first step towards your career.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-zinc-200 p-8 rounded-3xl shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700">Select Internship</label>
          <select 
            required
            value={formData.internship_id}
            onChange={e => setFormData({ ...formData, internship_id: e.target.value })}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all"
          >
            <option value="">Choose a role...</option>
            {internships.map(intern => (
              <option key={intern.id} value={intern.id}>{intern.title} at {intern.company}</option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-700">Full Name</label>
            <input 
              required
              type="text"
              placeholder="John Doe"
              value={formData.student_name}
              onChange={e => setFormData({ ...formData, student_name: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-700">Email Address</label>
            <input 
              required
              type="email"
              placeholder="john@example.com"
              value={formData.student_email}
              onChange={e => setFormData({ ...formData, student_email: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700">Cover Letter (Optional)</label>
          <textarea 
            rows={5}
            placeholder="Tell us why you're a great fit..."
            value={formData.cover_letter}
            onChange={e => setFormData({ ...formData, cover_letter: e.target.value })}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all resize-none"
          />
        </div>

        <button 
          disabled={submitting}
          type="submit"
          className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {submitting ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /> Submit Application</>}
        </button>
      </form>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-50 font-sans selection:bg-zinc-900 selection:text-white">
        <Navbar />
        <main className="pb-24">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/internships" element={<InternshipList />} />
              <Route path="/apply" element={<ApplicationForm />} />
              <Route path="/apply/:id" element={<ApplicationForm />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <footer className="border-t border-zinc-200 py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-zinc-900 text-white p-1 rounded-md">
                <Briefcase size={16} />
              </div>
              <span className="font-bold text-lg tracking-tight text-zinc-900">InternHub</span>
            </div>
            <p className="text-sm text-zinc-400">© 2026 InternHub. Empowering the next generation of talent.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
