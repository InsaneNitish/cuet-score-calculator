"use client";

import { useState, useEffect, useCallback } from "react";
import { parseResponseSheet } from "../lib/parser";
import { Loader2, Calculator, Trophy, User, Hash, Check, Sun, Moon, Link as LinkIcon, CheckCircle2, XCircle, Upload, X, ArrowRight, ArrowLeft, Sparkles, Shield, BarChart3, HelpCircle } from "lucide-react";
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const answerKeys = {
  SCQP09: {
    "43244927278": "432449107502", "43244927279": "432449107507", "43244927280": "432449107512", "43244927281": "432449107516", "43244927282": "432449107518", "43244927283": "432449107522", "43244927284": "432449107526", "43244927285": "432449107530", "43244927286": "432449107535", "43244927287": "432449107537", "43244927288": "432449107541", "43244927289": "432449107546", "43244927290": "432449107552", "43244927291": "432449107553", "43244927292": "432449107560", "43244927293": "432449107561", "43244927294": "432449107567", "43244927295": "432449107572", "43244927296": "432449107574", "43244927297": "432449107578", "43244927298": "432449107581", "43244927299": "432449107586", "43244927300": "432449107589", "43244927301": "432449107593", "43244927302": "432449107599", "43244927303": "432449107601", "43244927304": "432449107608", "43244927305": "432449107609", "43244927306": "432449107614", "43244927307": "432449107618", "43244927308": "432449107624", "43244927309": "432449107628", "43244927310": "432449107630", "43244927311": "432449107635", "43244927312": "432449107639", "43244927313": "432449107643", "43244927314": "432449107645", "43244927315": "432449107650", "43244927316": "432449107654", "43244927317": "432449107660", "43244927318": "432449107661", "43244927319": "432449107668", "43244927320": "432449107670", "43244927321": "432449107675", "43244927322": "432449107678", "43244927323": "432449107681", "43244927324": "432449107687", "43244927325": "432449107692", "43244927326": "432449107696", "43244927327": "432449107698", "43244927328": "432449107702", "43244927329": "432449107708", "43244927330": "432449107711", "43244927331": "432449107716", "43244927332": "432449107717", "43244927333": "432449107723", "43244927334": "432449107728", "43244927335": "432449107729", "43244927336": "432449107733", "43244927337": "432449107738", "43244927338": "432449107743", "43244927339": "432449107745", "43244927340": "432449107750", "43244927341": "432449107754", "43244927342": "432449107759", "43244927343": "432449107762", "43244927344": "432449107767", "43244927345": "432449107770", "43244927346": "432449107775", "43244927347": "432449107778", "43244927348": "432449107782", "43244927349": "432449107785", "43244927350": "432449107790", "43244927351": "432449107796", "43244927352": "432449107798"
  },
  MTQP04: {
    "43244918097": "43244970904", "43244918098": "43244970905", "43244918099": "43244970909", "43244918100": "43244970913", "43244918101": "43244970919", "43244918102": "43244970922", "43244918103": "43244970926", "43244918104": "43244970930", "43244918105": "43244970936", "43244918106": "43244970939", "43244918107": "43244970941", "43244918108": "43244970948", "43244918109": "43244970951", "43244918110": "43244970955", "43244918111": "43244970959", "43244918112": "43244970964", "43244918113": "43244970968", "43244918114": "43244970970", "43244918115": "43244970975", "43244918116": "43244970977", "43244918117": "43244970982", "43244918118": "43244970988", "43244918119": "43244970990", "43244918120": "43244970996", "43244918121": "43244970999", "43244918122": "43244971003", "43244918123": "43244971005", "43244918124": "43244971012", "43244918125": "43244971015", "43244918126": "43244971018", "43244918127": "43244971023", "43244918128": "43244971025", "43244918129": "43244971029", "43244918130": "43244971035", "43244918131": "43244971037", "43244918132": "43244971041", "43244918133": "43244971047", "43244918134": "43244971051", "43244918135": "43244971053", "43244918136": "43244971058", "43244918137": "43244971062", "43244918138": "43244971065", "43244918139": "43244971069", "43244918140": "43244971076", "43244918141": "43244971077", "43244918142": "43244971081", "43244918143": "43244971085", "43244918144": "43244971089", "43244918145": "43244971093", "43244918146": "43244971097", "43244918147": "43244971101", "43244918148": "43244971105", "43244918149": "43244971109", "43244918150": "43244971115", "43244918151": "43244971118", "43244918152": "43244971124", "43244918153": "43244971128", "43244918154": "43244971132", "43244918155": "43244971133", "43244918156": "43244971140", "43244918157": "43244971144", "43244918158": "43244971147", "43244918159": "43244971152", "43244918160": "43244971153", "43244918161": "43244971159", "43244918162": "43244971164", "43244918163": "43244971165", "43244918164": "43244971169", "43244918165": "43244971174", "43244918166": "43244971177", "43244918167": "43244971184", "43244918168": "43244971187", "43244918169": "43244971191", "43244918170": "43244971193", "43244918171": "43244971200"
  }
};

// ─── Onboarding Tour Steps ──────────────────────────────────────────────────
const tourSteps = [
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Welcome to CUET Ranker 🎓",
    description: "Your ultimate CUET PG 2026 score calculator & leaderboard. Let's take a quick tour to get you started!",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    icon: <Calculator className="w-8 h-8" />,
    title: "Score Calculator",
    description: "Paste your Digialm response sheet URL, select your paper, and get your exact score with detailed question-by-question analysis instantly.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Live Leaderboard",
    description: "See where you rank among all participants. Scores are synced in real-time with global analytics, charts, and percentile breakdowns.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Privacy Protected",
    description: "Your identity is fully anonymized on the leaderboard. No names or roll numbers are ever shown — only scores and ranks.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    icon: <Upload className="w-8 h-8" />,
    title: "Contribute Answer Keys",
    description: "Help the community! Submit answer keys for other subjects so everyone can benefit. Keys are reviewed before being added.",
    gradient: "from-blue-500 to-cyan-600",
  },
];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const leaderboardContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const leaderboardItem = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

// ─── Onboarding Tour Component ──────────────────────────────────────────────
function OnboardingTour({ onComplete }) {
  const [step, setStep] = useState(0);
  const currentStep = tourSteps[step];
  const isLast = step === tourSteps.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: [null, Math.random() * -200 - 50],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Tour Card */}
      <motion.div
        key={step}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -30 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800 overflow-hidden">
          {/* Gradient Header */}
          <div className={`bg-gradient-to-r ${currentStep.gradient} p-8 pb-12 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            {/* Skip button */}
            <button
              onClick={onComplete}
              className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold tracking-wide backdrop-blur-sm transition-all"
            >
              Skip Tour <X className="w-3 h-3" />
            </button>

            <div className="relative z-10 flex flex-col items-center text-center text-white">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.15, stiffness: 400 }}
                className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mb-4 ring-4 ring-white/10"
              >
                {currentStep.icon}
              </motion.div>
              <h2 className="text-2xl font-black tracking-tight">{currentStep.title}</h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 -mt-4">
            <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium text-center">
                {currentStep.description}
              </p>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {tourSteps.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === step ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (isLast) {
                    onComplete();
                  } else {
                    setStep(s => s + 1);
                  }
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all ${
                  isLast 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-emerald-500/30' 
                    : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-indigo-500/30'
                }`}
              >
                {isLast ? "Get Started" : "Next"} 
                {isLast ? <Sparkles className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const [activeTab, setActiveTab] = useState("calculator"); 
  const [paper, setPaper] = useState("SCQP09");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const [leaderboardPaper, setLeaderboardPaper] = useState("SCQP09");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [currentRank, setCurrentRank] = useState(null);

  const [contributeForm, setContributeForm] = useState({ subjectCode: '', subjectName: '', contributorName: '', rawText: '' });
  const [submittingContribution, setSubmittingContribution] = useState(false);

  // Onboarding Tour State
  const [showTour, setShowTour] = useState(false);

  useEffect(() => { 
    setMounted(true);
    // Check if user has completed the tour before
    const tourDone = localStorage.getItem('cuet_tour_completed');
    if (!tourDone) {
      setShowTour(true);
    }
  }, []);

  const completeTour = useCallback(() => {
    setShowTour(false);
    localStorage.setItem('cuet_tour_completed', 'true');
  }, []);

  useEffect(() => {
    if (activeTab === "leaderboard") {
      fetchLeaderboard();
    }
  }, [activeTab, leaderboardPaper]);

  const fetchLeaderboard = async () => {
    setLoadingLeaderboard(true);
    try {
      const res = await fetch(`/api/leaderboard?paper=${leaderboardPaper}&t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-store' }
      });
      const data = await res.json();
      if (res.ok) {
        setLeaderboardData(data.leaderboard || []);
      } else {
        toast.error("Failed to sync leaderboard: " + data.error);
      }
    } catch (err) {
      toast.error("Networking error occurred.");
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  const handleCalculate = async () => {
    setResults(null);
    setShowConfetti(false);
    setCurrentRank(null);

    if (!url.trim()) {
      toast.error("Please insert a valid Digialm URL.");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Bypassing CORS & Fetching Matrix...");

    try {
      // Step 1: Force Fetch bypassing CORS via Backend Proxy Route
      const fetchRes = await fetch("/api/fetch-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!fetchRes.ok) {
        const errorData = await fetchRes.json();
        throw new Error(errorData.error || "Failed to locate URL correctly.");
      }

      toast.loading("Analyzing HTML Data...", { id: loadingToast });
      const htmlString = await fetchRes.text();
      
      // Step 2: Parse natively utilizing mapped Cheerio Hook
      const { candidateName, rollNumber, questions: parsedQuestions } = parseResponseSheet(htmlString);

      if (parsedQuestions.length === 0) {
        throw new Error("HTML mapped correctly but no response data found. Ensure the link isn't expired.");
      }

      let totalScore = 0;
      let totalAttempted = 0;
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      let answerKeyMissingCount = 0;
      const tableData = [];
      const currentAnswerKey = answerKeys[paper];

      parsedQuestions.forEach((q) => {
        const correctOptionId = currentAnswerKey[q.questionId]; 
        let evaluationStatus = "Not Attempted";
        let scoreGiven = 0;

        if (q.status === "Answered" && q.chosenOptionId) {
          totalAttempted += 1;
          
          if (correctOptionId) {
            if (q.chosenOptionId === correctOptionId) {
              evaluationStatus = "Correct"; scoreGiven = 4; correctAnswers += 1; totalScore += 4;
            } else {
              evaluationStatus = "Incorrect"; scoreGiven = -1; incorrectAnswers += 1; totalScore -= 1;
            }
          } else {
             evaluationStatus = "Answer Key Missing";
             answerKeyMissingCount += 1;
          }
        }

        tableData.push({
          questionId: q.questionId, chosenOptionId: q.chosenOptionId || "N/A",
          correctOptionId: correctOptionId || "Unknown", status: evaluationStatus, score: scoreGiven,
        });
      });

      const accuracy = totalAttempted > 0 ? ((correctAnswers / totalAttempted) * 100).toFixed(0) : 0;

      // Determine if there's a severe answer key mismatch (wrong subject selected)
      const hasAnswerKeyMismatch = answerKeyMissingCount > (totalAttempted * 0.5);

      setResults({
        candidateName, rollNumber, totalScore, totalAttempted, correctAnswers, incorrectAnswers, accuracy, tableData, hasAnswerKeyMismatch, answerKeyMissingCount,
      });

      if (hasAnswerKeyMismatch) {
        toast.error(`⚠️ ${answerKeyMissingCount} questions have missing answer keys! You likely selected the WRONG paper. Score NOT saved to leaderboard.`, { id: loadingToast, duration: 8000 });
      } else {
        toast.success(`Score Calculated: ${totalScore} XP`, { id: loadingToast });
      }

      if (totalScore >= 200 && !hasAnswerKeyMismatch) {
        setShowConfetti(true);
        toast('Incredible Performance! 🎉', { duration: 6000 });
        setTimeout(() => setShowConfetti(false), 8000);
      }

      // Only save to DB if NO answer key mismatch detected AND valid data
      if (candidateName !== 'Unknown' && rollNumber !== 'Unknown' && !hasAnswerKeyMismatch) {
        const bgSync = async () => {
           try {
              await fetch("/api/scores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: candidateName, rollNo: rollNumber, paper: paper, score: totalScore })
              });
              
              const rankRes = await fetch(`/api/leaderboard?paper=${paper}&t=${Date.now()}`, { cache: 'no-store' });
              const rankData = await rankRes.json();
              
              if (rankRes.ok && rankData.leaderboard) {
                 const rankIndex = rankData.leaderboard.findIndex(r => r.rollNo === rollNumber);
                 setCurrentRank(rankIndex !== -1 ? rankIndex + 1 : 'N/A');
              } else {
                 setCurrentRank('N/A');
              }
           } catch (e) {
              setCurrentRank('N/A');
              console.error("Rank Sync Error:", e);
           }
        };
        bgSync();
      } else if (hasAnswerKeyMismatch) {
        setCurrentRank('—');
      }

    } catch (err) {
      toast.error(err.message, { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleContribute = async (e) => {
     e.preventDefault();
     if (!contributeForm.subjectCode.trim() || !contributeForm.subjectName.trim() || !contributeForm.rawText.trim()) {
       toast.error("Please fill in Subject Code, Name, and Raw Text!");
       return;
     }
     setSubmittingContribution(true);
     try {
       const res = await fetch('/api/contribute', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           subject_code: contributeForm.subjectCode,
           subject_name: contributeForm.subjectName,
           contributor_name: contributeForm.contributorName,
           raw_text: contributeForm.rawText
         })
       });
       if (res.ok) {
         toast.success("Thanks! Your key is under review.");
         setContributeForm({ subjectCode: '', subjectName: '', contributorName: '', rawText: '' });
       } else {
         const data = await res.json();
         toast.error("Failed to submit: " + (data.error || "Unknown error"));
       }
     } catch (err) {
       toast.error("Error connecting to server.");
     }
     setSubmittingContribution(false);
  };

  if (!mounted) return null; // Prevent Hydration Mismatch on Theme Switches

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500 relative">
      
      {showConfetti && <Confetti recycle={false} numberOfPieces={800} gravity={0.25} /> }

      {/* Onboarding Tour Overlay */}
      <AnimatePresence>
        {showTour && <OnboardingTour onComplete={completeTour} />}
      </AnimatePresence>

      {/* Theme Toggler */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="absolute top-6 right-6 p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all z-50 text-slate-900 dark:text-slate-100"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      {/* Re-launch Tour Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowTour(true)}
        title="Take a Tour"
        className="absolute top-6 right-20 p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all z-50 text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400"
      >
        <HelpCircle className="w-5 h-5" />
      </motion.button>

      <div className="max-w-4xl mx-auto space-y-12 pb-20">
        
        {/* Universal Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 pt-4"
        >
          <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
             <Trophy className="h-10 w-10 text-indigo-500 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            CUET <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Ranker</span>
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 font-medium">
            Next-Gen Digialm Processor & Global Leaderboard Integration.
          </p>
        </motion.div>

        {/* Tab Selection */}
        <div className="flex justify-center">
          <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl inline-flex shadow-sm border border-slate-200 dark:border-slate-800 w-full sm:w-auto relative">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('calculator')}
              className={`relative z-10 flex-1 sm:flex-none px-8 py-3 rounded-xl text-sm font-bold tracking-wide transition-colors duration-200 flex items-center justify-center gap-2 ${
                activeTab === 'calculator' ? 'text-white dark:text-slate-900' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {activeTab === 'calculator' && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-slate-900 dark:bg-slate-100 rounded-xl -z-10 shadow-md" />
              )}
              <Calculator className="h-4 w-4" /> Score Calculator
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('leaderboard')}
              className={`relative z-10 flex-1 sm:flex-none px-8 py-3 rounded-xl text-sm font-bold tracking-wide transition-colors duration-200 flex items-center justify-center gap-2 ${
                activeTab === 'leaderboard' ? 'text-white dark:text-slate-900' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {activeTab === 'leaderboard' && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-slate-900 dark:bg-slate-100 rounded-xl -z-10 shadow-md" />
              )}
              <Trophy className="h-4 w-4" /> Leaderboard
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('contribute')}
              className={`relative z-10 flex-1 sm:flex-none px-8 py-3 rounded-xl text-sm font-bold tracking-wide transition-colors duration-200 flex items-center justify-center gap-2 ${
                activeTab === 'contribute' ? 'text-white dark:text-slate-900' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {activeTab === 'contribute' && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-slate-900 dark:bg-slate-100 rounded-xl -z-10 shadow-md" />
              )}
              <Upload className="h-4 w-4" /> Contribute
            </motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'calculator' ? (
            <motion.div key="calc" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
              
              {/* Premium Input Bento Card */}
              <div className="bg-white dark:bg-slate-900 shadow-xl dark:shadow-2xl rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 transition-all">
                <div className="flex flex-col gap-6">
                  
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/50">
                    <div>
                      <label className="text-sm font-bold tracking-wide dark:text-slate-200">Exam Architecture</label>
                      <p className="text-xs text-slate-500 mt-1">Select your exact paper routing key.</p>
                    </div>
                    <select
                      value={paper}
                      onChange={(e) => setPaper(e.target.value)}
                      className="rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-5 py-3 bg-white dark:bg-slate-900 font-bold cursor-pointer text-sm shadow-sm transition-all"
                    >
                      <option value="SCQP09">SCQP09 (CS/IT)</option>
                      <option value="MTQP04">MTQP04 (Mathematics)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-bold tracking-wide flex items-center gap-2 dark:text-slate-200">
                      <LinkIcon className="w-4 h-4 text-slate-400" /> Secure Digialm URL
                    </label>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://cdn3.digialm.com/per/g28/pub/..."
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-5 py-4 bg-slate-50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-inner"
                    />
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCalculate}
                    disabled={loading}
                    className="flex justify-center items-center gap-2 w-full md:w-auto self-end rounded-2xl bg-slate-900 dark:bg-indigo-600 px-10 py-4 text-sm font-bold text-white shadow-lg hover:shadow-xl focus:outline-none disabled:opacity-50 transition-all"
                  >
                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Check className="h-5 w-5" />}
                    {loading ? "Decrypting Protocol..." : "Calculate Matrix"}
                  </motion.button>
                </div>
              </div>

              {/* Render Results if state exists */}
              {results && (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20, staggerChildren: 0.1 }} className="space-y-6 relative">
                  
                  {/* Answer Key Mismatch Warning Banner */}
                  {results.hasAnswerKeyMismatch && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-amber-50 dark:bg-amber-500/10 border-2 border-amber-300 dark:border-amber-500/30 rounded-2xl p-5 flex items-start gap-4"
                    >
                      <div className="bg-amber-100 dark:bg-amber-500/20 p-2.5 rounded-xl shrink-0">
                        <XCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-black text-amber-800 dark:text-amber-300 text-sm">⚠️ Wrong Paper Detected — Score NOT Saved</h4>
                        <p className="text-amber-700 dark:text-amber-400/80 text-xs mt-1 leading-relaxed">
                          {results.answerKeyMissingCount} out of {results.totalAttempted} answered questions have no matching answer key. 
                          This usually means you selected the <strong>wrong paper code</strong> for your response sheet. 
                          Please select the correct paper and recalculate. Your score was <strong>not submitted</strong> to the leaderboard to protect accuracy.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Ambient Lighting Behind Dashboard */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[100px] -z-10 rounded-full pointer-events-none" />

                  {/* Profile Card */}
                  <motion.div 
                    whileHover={{ scale: 1.01, y: -2 }}
                    className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 flex items-center shadow-lg border border-white/50 dark:border-slate-800/80 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <div className="flex items-center gap-5 relative z-10">
                      <div className="h-20 w-20 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 ring-4 ring-white dark:ring-slate-950">
                         <User className="h-10 w-10" />
                      </div>
                      <div className="text-slate-900 dark:text-slate-100">
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-sm">{results.candidateName}</h2>
                        <p className="text-sm font-bold text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5 mt-1">
                          <Hash className="w-4 h-4" /> ID: {results.rollNumber}
                        </p>
                      </div>
                    </div>
                    
                    <div className="ml-auto flex flex-col items-end relative z-10 mr-2 sm:mr-4">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1"><Trophy className="w-3 h-3"/> Global Rank</span>
                       <div className={`border shadow-xl rounded-xl px-5 py-2 text-3xl font-black min-w-[70px] text-center flex items-center justify-center relative overflow-hidden group ${
                         results.hasAnswerKeyMismatch 
                           ? 'bg-slate-200 text-slate-500 border-slate-300 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700' 
                           : 'bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 border-yellow-300 dark:border-yellow-500/50'
                       }`}>
                           <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none" />
                           {results.hasAnswerKeyMismatch ? '—' : (currentRank === null ? <Loader2 className="animate-spin h-6 w-6 text-yellow-800" /> : `#${currentRank}`)}
                       </div>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Accuracy Card */}
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      className="col-span-2 md:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col items-center justify-center relative overflow-hidden"
                    >
                       <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
                       <span className="text-slate-500 font-black uppercase tracking-widest text-xs mb-3 z-10">Accuracy Rate</span>
                       <div className="relative flex items-center justify-center z-10 mt-2">
                          <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl scale-75 animate-pulse" />
                          <svg className="w-28 h-28 transform -rotate-90 drop-shadow-xl">
                            <circle cx="56" cy="56" r="46" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="12" fill="transparent" />
                            <motion.circle 
                              initial={{ strokeDashoffset: 289 }}
                              animate={{ strokeDashoffset: 289 - (results.accuracy / 100) * 289 }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              cx="56" cy="56" r="46" 
                              className="stroke-[url(#gradient)]" 
                              strokeWidth="12" fill="transparent" 
                              strokeDasharray="289" 
                              strokeLinecap="round" 
                            />
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#818cf8" />
                                <stop offset="100%" stopColor="#c084fc" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span className="absolute text-2xl font-black text-slate-800 dark:text-slate-100 drop-shadow-md">{results.accuracy}%</span>
                       </div>
                    </motion.div>
                    
                    {/* Total Score Card - Animated Number Counting */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="col-span-2 flex flex-col justify-center text-center p-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 text-white rounded-3xl shadow-2xl shadow-indigo-500/40 border border-white/20 relative overflow-hidden group"
                    >
                      {/* Animated Grid Background */}
                      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                      
                      <span className="font-black uppercase tracking-widest text-sm text-indigo-100 z-10 drop-shadow-md">Global XP Earned</span>
                      <motion.h3 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="text-7xl sm:text-8xl font-black z-10 tracking-tighter mt-1 drop-shadow-2xl"
                      >
                        {results.totalScore}
                      </motion.h3>
                      <div className="absolute -bottom-6 -right-6 text-white/10">
                        <Trophy className="w-48 h-48" />
                      </div>
                    </motion.div>

                    {/* Breakdown Card */}
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      className="col-span-2 md:col-span-4 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col relative overflow-hidden"
                    >
                       <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
                       <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl" />
                       
                       <span className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm mb-6 flex items-center justify-between z-10">
                         Combat Metrics
                         <span className="text-slate-400 text-xs tracking-normal font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                           Attempted: {results.totalAttempted}
                         </span>
                       </span>
                       
                       {/* Glowing Thicker Progress Bar */}
                       <div className="flex w-full h-8 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800/80 mb-8 p-1 gap-1 z-10 shadow-inner">
                         <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(results.correctAnswers / results.totalAttempted) * 100}%` }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="bg-emerald-500 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.5)] relative overflow-hidden flex items-center justify-center font-black text-xs text-white"
                          >
                            {results.correctAnswers > 0 && <span className="opacity-80 absolute whitespace-nowrap">{results.correctAnswers} WIN</span>}
                          </motion.div>
                         <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(results.incorrectAnswers / results.totalAttempted) * 100}%` }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="bg-rose-500 rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.5)] relative overflow-hidden flex items-center justify-center font-black text-xs text-white"
                          >
                            {results.incorrectAnswers > 0 && <span className="opacity-80 absolute whitespace-nowrap">{results.incorrectAnswers} LOSS</span>}
                          </motion.div>
                       </div>
                       
                       {/* Granular Stats below Progress Bar */}
                       <div className="flex justify-between items-center w-full px-4 z-10">
                         <div className="flex flex-col items-center bg-emerald-50 dark:bg-emerald-500/10 px-6 py-3 rounded-2xl border border-emerald-100 dark:border-emerald-500/20">
                            <span className="text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest text-[10px] mb-1">Correct</span>
                            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{results.correctAnswers}</span>
                         </div>
                         <div className="flex flex-col items-center px-6 py-3">
                            <span className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-1">Total</span>
                            <span className="text-xl font-bold text-slate-500 dark:text-slate-400">{results.totalAttempted}</span>
                         </div>
                         <div className="flex flex-col items-center bg-rose-50 dark:bg-rose-500/10 px-6 py-3 rounded-2xl border border-rose-100 dark:border-rose-500/20">
                            <span className="text-rose-600 dark:text-rose-400 font-black uppercase tracking-widest text-[10px] mb-1">Incorrect</span>
                            <span className="text-3xl font-black text-rose-600 dark:text-rose-400">{results.incorrectAnswers}</span>
                         </div>
                       </div>
                    </motion.div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800"
                  >
                     <h3 className="text-xl font-black mb-6 dark:text-white flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl">
                          <CheckCircle2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> 
                        </div>
                        Granular Question Analysis
                     </h3>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                           <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                              <tr>
                                 <th className="px-4 py-3 rounded-tl-xl">Question ID</th>
                                 <th className="px-4 py-3">Chosen Option</th>
                                 <th className="px-4 py-3">Correct Option</th>
                                 <th className="px-4 py-3 rounded-tr-xl">Status</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                              {results.tableData.map((row, idx) => (
                                 <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                    <td className="px-4 py-3 font-mono text-slate-900 dark:text-slate-200">{row.questionId}</td>
                                    <td className="px-4 py-3 font-mono text-slate-500">{row.chosenOptionId}</td>
                                    <td className="px-4 py-3 font-mono text-slate-500">{row.correctOptionId}</td>
                                    <td className="px-4 py-3">
                                       <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                          row.status === 'Correct' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                          row.status === 'Incorrect' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' :
                                          row.status === 'Answer Key Missing' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                                          'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                       }`}>
                                          {row.status}
                                       </span>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div key="leaderboard" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 shadow-sm rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                   <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl">
                     <Trophy className="h-6 w-6 text-indigo-500" />
                   </div>
                   <div>
                     <h2 className="text-xl font-bold text-slate-900 dark:text-white">Rankings</h2>
                     <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Supabase Multi-Region Sync Active</p>
                   </div>
                </div>
                <select
                  value={leaderboardPaper}
                  onChange={(e) => setLeaderboardPaper(e.target.value)}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 outline-none px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold cursor-pointer text-sm"
                >
                  <option value="SCQP09">Paper: SCQP09</option>
                  <option value="MTQP04">Paper: MTQP04</option>
                </select>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800 min-h-[400px]">
                {loadingLeaderboard ? (
                  <div className="flex flex-col items-center justify-center h-[400px]">
                    <Loader2 className="animate-spin h-8 w-8 text-indigo-500 mb-4" />
                  </div>
                ) : leaderboardData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center px-4 opacity-50">
                    <Trophy className="h-12 w-12 text-slate-400 mb-4" />
                    <h3 className="text-lg font-bold">Database Empty</h3>
                  </div>
                ) : (
                  <div className="overflow-x-auto p-4">
                    <motion.div variants={leaderboardContainer} initial="hidden" animate="show" className="flex flex-col gap-3">
                      {leaderboardData.slice(0, 10).map((entry, idx) => (
                        <motion.div key={idx} variants={leaderboardItem} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors">
                          <div className="flex items-center gap-4">
                            <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-black text-sm ${
                              idx === 0 ? 'bg-gradient-to-br from-amber-200 to-yellow-400 text-amber-800 shadow-lg shadow-amber-200/50 dark:shadow-amber-500/20 ring-2 ring-amber-300/50' :
                              idx === 1 ? 'bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 dark:from-slate-600 dark:to-slate-700 dark:text-slate-200 shadow-md' :
                              idx === 2 ? 'bg-gradient-to-br from-orange-200 to-amber-300 text-orange-800 shadow-md' :
                              'bg-slate-100 dark:bg-slate-800 text-slate-400'
                            }`}>
                              #{idx + 1}
                            </span>
                            <div>
                               <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                 Anonymous Scholar <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase tracking-widest font-black ${
                                   idx === 0 ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                                   idx === 1 ? 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300' :
                                   idx === 2 ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400' :
                                   'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400'
                                 }`}>Rank {idx + 1}</span>
                               </p>
                               <p className="text-slate-400 dark:text-slate-500 text-[10px] tracking-wider mt-0.5 font-medium">
                                 {entry.paper} • Score below
                               </p>
                            </div>
                          </div>
                          <div className="px-5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xl font-black dark:text-white flex items-center gap-1.5">
                            <BarChart3 className="w-4 h-4 text-indigo-400" />
                            {entry.score} <span className="text-xs font-bold text-slate-400">XP</span>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                    
                    {/* Global Analytics Section */
                     (function() {
                        const count = leaderboardData.length;
                        const avg = count > 0 ? Math.round(leaderboardData.reduce((acc, curr) => acc + curr.score, 0) / count) : 0;
                        const high = count > 0 ? leaderboardData[0].score : 0;
                        const p10Index = Math.max(0, Math.floor(count * 0.1) - 1);
                        const top10PercentScore = count > 0 ? leaderboardData[p10Index].score : 0;
                        
                        return (
                           <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/50">
                              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                                <Calculator className="w-5 h-5 text-indigo-500" /> Global Metrics & Percentiles
                              </h3>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-950/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                                   <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2 block">Total Competitors</span>
                                   <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{count}</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-950/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                                   <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2 block">Highest Score</span>
                                   <span className="text-2xl font-black text-amber-500">{high} <span className="text-sm font-bold opacity-50 text-slate-500">XP</span></span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-950/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                                   <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2 block">Top 10% Cutoff</span>
                                   <span className="text-2xl font-black text-indigo-500">{top10PercentScore} <span className="text-sm font-bold opacity-50 text-slate-500">XP</span></span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-950/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                                   <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2 block">Average Score</span>
                                   <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{avg} <span className="text-sm font-bold opacity-50 text-slate-500">XP</span></span>
                                </div>
                              </div>
                              
                              {count > 0 && (
                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                                    <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                                       <h4 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest">Global Score Distribution</h4>
                                       <div className="h-[250px] w-full">
                                          <ResponsiveContainer width="100%" height="100%">
                                             <BarChart data={
                                                Object.entries(
                                                   leaderboardData.reduce((acc, curr) => {
                                                      const s = curr.score;
                                                      if(s<=50) acc["0-50"]++;
                                                      else if(s<=100) acc["51-100"]++;
                                                      else if(s<=150) acc["101-150"]++;
                                                      else if(s<=200) acc["151-200"]++;
                                                      else acc["200+"]++;
                                                      return acc;
                                                   }, {"0-50":0, "51-100":0, "101-150":0, "151-200":0, "200+":0})
                                                ).map(([k,v]) => ({ name: k, Candidates: v }))
                                             }>
                                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                                <Tooltip cursor={{fill: 'rgba(99, 102, 241, 0.05)'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', color: '#000'}} labelStyle={{fontWeight:'bold', color:'#6366f1'}}/>
                                                <Bar dataKey="Candidates" fill="#818cf8" radius={[6, 6, 0, 0]} />
                                             </BarChart>
                                          </ResponsiveContainer>
                                       </div>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                                       <h4 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest">Competitive Tiering</h4>
                                       <div className="h-[250px] w-full relative">
                                          <ResponsiveContainer width="100%" height="100%">
                                             <PieChart>
                                                <Pie 
                                                   data={Object.entries(
                                                      leaderboardData.reduce((acc, curr) => {
                                                         const s = curr.score;
                                                         if(s>=top10PercentScore && top10PercentScore>0) acc["Elite (Top 10%)"]++;
                                                         else if(s>=avg) acc["Strong Competitor"]++;
                                                         else acc["Average Range"]++;
                                                         return acc;
                                                      }, {"Elite (Top 10%)":0, "Strong Competitor":0, "Average Range":0})
                                                   ).map(([k,v]) => ({ name: k, value: v })).filter(x => x.value > 0)} 
                                                   cx="50%" cy="50%" innerRadius={65} outerRadius={85} paddingAngle={5} dataKey="value" stroke="none"
                                                >
                                                  {['#f59e0b', '#818cf8', '#94a3b8'].map((color, index) => <Cell key={`cell-${index}`} fill={color} />)}
                                                </Pie>
                                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}/>
                                             </PieChart>
                                          </ResponsiveContainer>
                                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                            <span className="text-3xl font-black text-slate-800 dark:text-slate-100">{leaderboardData.length}</span>
                                            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Users</span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              )}
                           </div>
                        );
                     })()
                    }
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'contribute' && (
            <motion.div
              key="contribute"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-2xl rounded-3xl p-6 sm:p-10"
            >
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 p-3 rounded-2xl">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Contribute Key</h2>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Help expanding the calculator for upcoming subjects.</p>
                </div>
              </div>

              <form onSubmit={handleContribute} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Subject Code *</label>
                       <input required type="text" placeholder="e.g. COQP11" value={contributeForm.subjectCode} onChange={(e)=>setContributeForm({...contributeForm, subjectCode: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950/50 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 outline-none p-4 rounded-xl focus:border-indigo-500 transition-colors placeholder:text-slate-400 font-medium" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Subject Name *</label>
                       <input required type="text" placeholder="e.g. Computer Science" value={contributeForm.subjectName} onChange={(e)=>setContributeForm({...contributeForm, subjectName: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950/50 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 outline-none p-4 rounded-xl focus:border-indigo-500 transition-colors placeholder:text-slate-400 font-medium" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Your Name <span className="opacity-50">(Optional for Credits)</span></label>
                    <input type="text" placeholder="Your Name" value={contributeForm.contributorName} onChange={(e)=>setContributeForm({...contributeForm, contributorName: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950/50 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 outline-none p-4 rounded-xl focus:border-indigo-500 transition-colors placeholder:text-slate-400 font-medium" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Raw NTA Key Content *</label>
                    <textarea required placeholder="Paste all text from the NTA PDF here..." value={contributeForm.rawText} onChange={(e)=>setContributeForm({...contributeForm, rawText: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950/50 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 outline-none p-4 rounded-xl focus:border-indigo-500 transition-colors placeholder:text-slate-400 font-medium h-48 resize-y" />
                 </div>
                 
                 <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={submittingContribution}
                    type="submit"
                    className="w-full py-4 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold tracking-wide shadow-xl flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {submittingContribution ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                    <span>{submittingContribution ? 'Submitting...' : 'Submit Contribution'}</span>
                 </motion.button>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      
      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-sm font-medium text-slate-400 dark:text-slate-500">
        Made with ❤️ by <span className="font-bold text-slate-900 dark:text-slate-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors cursor-pointer">Nitish Thakur</span>
      </footer>
    </main>
  );
}
