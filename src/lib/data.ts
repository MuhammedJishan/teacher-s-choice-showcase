import fireImg from "@/assets/fire.jpg";
import quakeImg from "@/assets/earthquake.jpg";
import floodImg from "@/assets/flood.jpg";
import cycloneImg from "@/assets/cyclone.jpg";
import otherImg from "@/assets/other.jpg";

export type ModuleStatus = "available" | "coming-soon";

export interface DisasterModule {
  slug: string;
  name: string;
  short: string;
  description: string;
  status: ModuleStatus;
  image: string;
  lessons: number;
  objectives: string[];
  eta?: string;
}

export const modules: DisasterModule[] = [
  {
    slug: "fire",
    name: "Fire Safety",
    short: "Fire",
    description: "Prevent, detect and respond to fires. Learn evacuation routes, extinguisher use and assembly protocols.",
    status: "available",
    image: fireImg,
    lessons: 12,
    objectives: [
      "Identify common fire hazards in classrooms and labs",
      "Use the PASS technique with a fire extinguisher",
      "Follow the RACE response protocol",
      "Navigate evacuation routes to assembly points",
      "Respond correctly to smoke and blocked exits",
    ],
  },
  {
    slug: "earthquake",
    name: "Earthquake Preparedness",
    short: "Earthquake",
    description: "Master Drop, Cover and Hold On, recognise safe zones and plan post-quake evacuation.",
    status: "coming-soon",
    image: quakeImg,
    lessons: 10,
    eta: "Term 2, 2027",
    objectives: [
      "Practise Drop, Cover and Hold On",
      "Identify safe and unsafe zones in a building",
      "Prepare a personal emergency kit",
      "Plan a safe post-quake evacuation",
    ],
  },
  {
    slug: "flood",
    name: "Flood Preparedness",
    short: "Flood",
    description: "Understand flood warnings, move to higher ground and stay safe around floodwater.",
    status: "coming-soon",
    image: floodImg,
    lessons: 9,
    eta: "Term 3, 2027",
    objectives: [
      "Interpret flood alerts and warning levels",
      "Know when and how to move to higher ground",
      "Avoid hazards of moving water",
      "Support community relief efforts",
    ],
  },
  {
    slug: "cyclone",
    name: "Cyclone Preparedness",
    short: "Cyclone",
    description: "Track cyclone warnings, secure your space and shelter safely through high winds.",
    status: "coming-soon",
    image: cycloneImg,
    lessons: 8,
    eta: "Term 4, 2027",
    objectives: [
      "Understand cyclone categories and warnings",
      "Secure classrooms and homes before landfall",
      "Choose a safe indoor shelter",
      "Stay safe during the eye and aftermath",
    ],
  },
  {
    slug: "other",
    name: "Other Emergencies",
    short: "Other",
    description: "Lockdowns, medical emergencies, gas leaks and more — future expansion for all-hazard readiness.",
    status: "coming-soon",
    image: otherImg,
    lessons: 6,
    eta: "Future expansion",
    objectives: [
      "Respond to medical emergencies and basic first aid",
      "Follow lockdown and shelter-in-place procedures",
      "Recognise gas leaks and chemical hazards",
      "Communicate clearly during any emergency",
    ],
  },
];

export const getModule = (slug: string) => modules.find((m) => m.slug === slug);

export const student = {
  name: "Aarav Sharma",
  className: "Grade 9 – B",
  xp: 2840,
  nextLevelXp: 3500,
  level: 7,
  levelTitle: "Safety Scout",
  preparedness: 78,
  streak: 9,
  rank: 4,
};

export const fireLessons = [
  { id: 1, title: "Understanding the Fire Triangle", minutes: 8, xp: 50, done: true },
  { id: 2, title: "Common Fire Hazards at School", minutes: 10, xp: 60, done: true },
  { id: 3, title: "Smoke Alarms & Detection", minutes: 7, xp: 50, done: true },
  { id: 4, title: "The RACE Response Protocol", minutes: 12, xp: 80, done: true },
  { id: 5, title: "Fire Extinguishers: The PASS Technique", minutes: 11, xp: 80, done: true },
  { id: 6, title: "Reading Evacuation Maps", minutes: 9, xp: 70, done: false },
  { id: 7, title: "Stop, Drop and Roll", minutes: 6, xp: 50, done: false },
  { id: 8, title: "Escaping Through Smoke", minutes: 10, xp: 80, done: false },
  { id: 9, title: "Assembly Points & Headcounts", minutes: 8, xp: 60, done: false },
  { id: 10, title: "Helping Classmates with Disabilities", minutes: 12, xp: 90, done: false },
  { id: 11, title: "Lab & Kitchen Fire Safety", minutes: 10, xp: 70, done: false },
  { id: 12, title: "Final Fire Safety Assessment", minutes: 20, xp: 150, done: false },
];

export const simulations = [
  { id: "sim-1", title: "Classroom Evacuation", difficulty: "Beginner", minutes: 6, xp: 120, best: 92, location: "Block A · Floor 2" },
  { id: "sim-2", title: "Science Lab Fire", difficulty: "Intermediate", minutes: 9, xp: 180, best: 74, location: "Chemistry Lab" },
  { id: "sim-3", title: "Blocked Stairwell", difficulty: "Intermediate", minutes: 8, xp: 180, best: null, location: "Main Building" },
  { id: "sim-4", title: "Library Smoke Escape", difficulty: "Advanced", minutes: 12, xp: 250, best: null, location: "Central Library" },
];

export const badges = [
  { id: "b1", name: "Preparedness Pioneer", desc: "Complete your first lesson", earned: true, tone: "teal" },
  { id: "b2", name: "Knowledge Explorer", desc: "Ace the extinguisher quiz", earned: true, tone: "amber" },
  { id: "b3", name: "Smart Evacuator", desc: "Choose the safest route every time", earned: true, tone: "indigo" },
  { id: "b4", name: "Calm Decision Maker", desc: "Stay calm in 5 timed scenarios", earned: true, tone: "teal" },
  { id: "b5", name: "Hazard Detective", desc: "Spot 20 hazards in simulations", earned: false, tone: "amber" },
  { id: "b6", name: "Safety Champion", desc: "Guide a group to safety", earned: false, tone: "indigo" },
  { id: "b7", name: "Fire Safety Graduate", desc: "Complete all fire lessons", earned: false, tone: "teal" },
  { id: "b8", name: "Multi-Hazard Hero", desc: "Complete two disaster modules", earned: false, tone: "indigo" },
] as const;

export const recentActivities = [
  { title: "Completed “The PASS Technique”", time: "2 hours ago", xp: 80, kind: "lesson" },
  { title: "Classroom Evacuation · Score 92%", time: "Yesterday", xp: 120, kind: "simulation" },
  { title: "Earned badge “Smart Evacuator”", time: "Yesterday", xp: 50, kind: "badge" },
  { title: "Completed “RACE Response Protocol”", time: "2 days ago", xp: 80, kind: "lesson" },
];

export const leaderboard = [
  { name: "Priya Nair", cls: "9-B", xp: 3420, score: 91 },
  { name: "Rohan Mehta", cls: "9-A", xp: 3180, score: 88 },
  { name: "Ananya Iyer", cls: "9-B", xp: 2990, score: 85 },
  { name: "Aarav Sharma", cls: "9-B", xp: 2840, score: 78, me: true },
  { name: "Kabir Singh", cls: "9-C", xp: 2710, score: 80 },
  { name: "Meera Joshi", cls: "9-A", xp: 2560, score: 76 },
  { name: "Vihaan Rao", cls: "9-C", xp: 2390, score: 72 },
  { name: "Saanvi Gupta", cls: "9-B", xp: 2205, score: 70 },
  { name: "Arjun Das", cls: "9-A", xp: 2010, score: 67 },
  { name: "Isha Kapoor", cls: "9-C", xp: 1880, score: 64 },
];

export const weeklyXp = [
  { day: "Mon", xp: 120 },
  { day: "Tue", xp: 260 },
  { day: "Wed", xp: 180 },
  { day: "Thu", xp: 340 },
  { day: "Fri", xp: 220 },
  { day: "Sat", xp: 90 },
  { day: "Sun", xp: 300 },
];

export const skillRadar = [
  { skill: "Hazard ID", value: 86 },
  { skill: "Response", value: 78 },
  { skill: "Evacuation", value: 90 },
  { skill: "Equipment", value: 72 },
  { skill: "First Aid", value: 55 },
  { skill: "Teamwork", value: 68 },
];

/* ---------------- Teacher ---------------- */

export const teacher = { name: "Mrs. Kavita Rao", school: "Greenfield Public School" };

export const classes = ["Grade 9 – A", "Grade 9 – B", "Grade 9 – C", "Grade 10 – A"];

export const students = [
  { id: 1, name: "Priya Nair", cls: "Grade 9 – B", progress: 92, xp: 3420, score: 91, status: "Active" },
  { id: 2, name: "Rohan Mehta", cls: "Grade 9 – A", progress: 88, xp: 3180, score: 88, status: "Active" },
  { id: 3, name: "Ananya Iyer", cls: "Grade 9 – B", progress: 84, xp: 2990, score: 85, status: "Active" },
  { id: 4, name: "Aarav Sharma", cls: "Grade 9 – B", progress: 42, xp: 2840, score: 78, status: "Active" },
  { id: 5, name: "Kabir Singh", cls: "Grade 9 – C", progress: 75, xp: 2710, score: 80, status: "Active" },
  { id: 6, name: "Meera Joshi", cls: "Grade 9 – A", progress: 70, xp: 2560, score: 76, status: "Idle" },
  { id: 7, name: "Vihaan Rao", cls: "Grade 9 – C", progress: 63, xp: 2390, score: 72, status: "Active" },
  { id: 8, name: "Saanvi Gupta", cls: "Grade 9 – B", progress: 58, xp: 2205, score: 70, status: "Idle" },
  { id: 9, name: "Arjun Das", cls: "Grade 9 – A", progress: 51, xp: 2010, score: 67, status: "Active" },
  { id: 10, name: "Isha Kapoor", cls: "Grade 9 – C", progress: 46, xp: 1880, score: 64, status: "Inactive" },
  { id: 11, name: "Dev Malhotra", cls: "Grade 10 – A", progress: 81, xp: 3050, score: 83, status: "Active" },
  { id: 12, name: "Tara Menon", cls: "Grade 10 – A", progress: 38, xp: 1420, score: 59, status: "Inactive" },
];

export const classPerformance = [
  { week: "W1", "9-A": 58, "9-B": 62, "9-C": 55 },
  { week: "W2", "9-A": 63, "9-B": 66, "9-C": 59 },
  { week: "W3", "9-A": 67, "9-B": 71, "9-C": 62 },
  { week: "W4", "9-A": 70, "9-B": 74, "9-C": 66 },
  { week: "W5", "9-A": 74, "9-B": 77, "9-C": 70 },
  { week: "W6", "9-A": 77, "9-B": 81, "9-C": 73 },
];

export const moduleCompletion = [
  { name: "Fire Triangle", value: 96 },
  { name: "Hazards", value: 89 },
  { name: "RACE", value: 81 },
  { name: "PASS", value: 74 },
  { name: "Evac Maps", value: 58 },
  { name: "Smoke Escape", value: 41 },
];

export const teacherActivities = [
  { who: "Priya Nair", what: "scored 96% in Science Lab Fire", time: "12 min ago" },
  { who: "Kabir Singh", what: "completed Reading Evacuation Maps", time: "40 min ago" },
  { who: "Ananya Iyer", what: "earned badge Hazard Detective", time: "1 hour ago" },
  { who: "Rohan Mehta", what: "started Blocked Stairwell", time: "2 hours ago" },
  { who: "Meera Joshi", what: "submitted Fire Drill Reflection", time: "3 hours ago" },
];

export interface Scenario {
  id: string;
  title: string;
  location: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  exits: number;
  hazards: string[];
  status: "Published" | "Draft";
  plays: number;
}

export const initialScenarios: Scenario[] = [
  { id: "s1", title: "Classroom Evacuation", location: "Block A · Floor 2", difficulty: "Beginner", exits: 2, hazards: ["Smoke in corridor"], status: "Published", plays: 312 },
  { id: "s2", title: "Science Lab Fire", location: "Chemistry Lab", difficulty: "Intermediate", exits: 1, hazards: ["Chemical spill", "Electrical fire"], status: "Published", plays: 204 },
  { id: "s3", title: "Blocked Stairwell", location: "Main Building", difficulty: "Intermediate", exits: 3, hazards: ["Blocked stair B", "Low visibility"], status: "Published", plays: 148 },
  { id: "s4", title: "Library Smoke Escape", location: "Central Library", difficulty: "Advanced", exits: 2, hazards: ["Heavy smoke", "Crowding"], status: "Draft", plays: 0 },
];

export interface Assignment {
  id: string;
  title: string;
  cls: string;
  activity: string;
  due: string;
  submitted: number;
  total: number;
}

export const activities = [
  ...fireLessons.map((l) => `Lesson: ${l.title}`),
  ...simulations.map((s) => `Simulation: ${s.title}`),
];

export const initialAssignments: Assignment[] = [
  { id: "a1", title: "PASS Technique Mastery", cls: "Grade 9 – B", activity: "Lesson: Fire Extinguishers: The PASS Technique", due: "2026-10-28", submitted: 24, total: 32 },
  { id: "a2", title: "Evacuation Drill Prep", cls: "Grade 9 – A", activity: "Simulation: Classroom Evacuation", due: "2026-10-30", submitted: 18, total: 30 },
  { id: "a3", title: "Lab Safety Challenge", cls: "Grade 10 – A", activity: "Simulation: Science Lab Fire", due: "2026-11-04", submitted: 6, total: 28 },
];

export const reports = [
  { title: "Term 1 Preparedness Summary", type: "School-wide", date: "Oct 20, 2026", size: "2.4 MB" },
  { title: "Grade 9 – B Progress Report", type: "Class", date: "Oct 18, 2026", size: "860 KB" },
  { title: "Fire Drill Readiness Audit", type: "Compliance", date: "Oct 12, 2026", size: "1.1 MB" },
  { title: "Simulation Performance Breakdown", type: "Analytics", date: "Oct 05, 2026", size: "1.8 MB" },
];

export const challenges = [
  { id: "c1", title: "Spot the Hazards: Classroom", type: "Hazard identification", xp: 100, minutes: 5, done: true, score: 90 },
  { id: "c2", title: "Safe or Unsafe?", type: "Decision-making", xp: 120, minutes: 6, done: true, score: 85 },
  { id: "c3", title: "Know Your Alarms", type: "Warning signals", xp: 80, minutes: 4, done: false, score: null },
  { id: "c4", title: "What Would You Do?", type: "Scenario quiz", xp: 150, minutes: 8, done: false, score: null },
  { id: "c5", title: "60-Second Response Mission", type: "Timed mission", xp: 200, minutes: 1, done: false, score: null },
];

export interface QuizQ { q: string; options: string[]; answer: number; why: string }
export const sampleQuiz: QuizQ[] = [
  { q: "You hear the fire alarm during class. What should you do first?", options: ["Collect your bag and phone", "Stop, stay calm and follow your teacher to the nearest exit", "Look for the fire", "Wait for a friend"], answer: 1, why: "Belongings waste time. Calmly following the evacuation route keeps everyone safe." },
  { q: "The corridor is filling with smoke. How should you move?", options: ["Run upright quickly", "Stay low and crawl below the smoke", "Use the lift", "Open every door you pass"], answer: 1, why: "Cleaner, cooler air stays near the floor. Lifts can fail during fires." },
  { q: "What does the 'P' in PASS stand for?", options: ["Push", "Pull the pin", "Point", "Pause"], answer: 1, why: "PASS = Pull the pin, Aim low, Squeeze the handle, Sweep side to side." },
  { q: "Your exit is blocked. What is the best decision?", options: ["Push through the blockage", "Use the alternate exit shown on the evacuation map", "Hide in a cupboard", "Go back for your teacher"], answer: 1, why: "Every room has an alternate route. Knowing your evacuation map is key." },
];

export const upcomingAssignments = [
  { title: "PASS Technique Mastery", due: "Oct 28", by: "Mrs. Kavita Rao" },
  { title: "Know Your Alarms challenge", due: "Oct 31", by: "Mrs. Kavita Rao" },
];
