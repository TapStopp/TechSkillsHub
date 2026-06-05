// Realistic demo data for Marist CSM TechSkillsHub.
// Drives the entire clickable demo without a live database.
import type {
  Badge,
  Competency,
  Credential,
  EventItem,
  InterviewSlot,
  MentorshipOpportunity,
  Organization,
  Pathway,
  PortfolioItem,
  StudentProfile,
  TranscriptEntry,
  User,
  UserBadge,
  UserCompetencyProgress,
  UserCredential,
  UserPathwayProgress,
  XpTransaction,
} from "@/lib/types";

// Build dates relative to "now" so the demo always shows upcoming events.
const now = new Date();
function inDays(days: number, hour = 17, min = 0) {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  d.setHours(hour, min, 0, 0);
  return d.toISOString();
}
function endAfter(iso: string, minutes: number) {
  return new Date(new Date(iso).getTime() + minutes * 60000).toISOString();
}

// The seeded "current student" for the mock SSO session.
export const CURRENT_USER_ID = "u-student-1";

export const users: User[] = [
  {
    id: "u-student-1",
    email: "ava.thompson@marist.edu",
    name: "Ava Thompson",
    role: "STUDENT",
    avatarColor: "#a4123f",
    title: "B.S. Computer Science '27",
  },
  {
    id: "u-student-2",
    email: "diego.martinez@marist.edu",
    name: "Diego Martinez",
    role: "STUDENT",
    avatarColor: "#1d4ed8",
    title: "B.S. Data Science '26",
  },
  {
    id: "u-student-3",
    email: "priya.nair@marist.edu",
    name: "Priya Nair",
    role: "STUDENT",
    avatarColor: "#0f766e",
    title: "B.S. Cybersecurity '27",
  },
  {
    id: "u-student-4",
    email: "liam.oconnor@marist.edu",
    name: "Liam O'Connor",
    role: "ORG_LEADER",
    avatarColor: "#b45309",
    title: "B.S. Software Development '26",
  },
  {
    id: "u-student-5",
    email: "grace.kim@marist.edu",
    name: "Grace Kim",
    role: "STUDENT",
    avatarColor: "#7c3aed",
    title: "B.S. Information Technology '28",
  },
  {
    id: "u-faculty-1",
    email: "dr.alan.rivera@marist.edu",
    name: "Dr. Alan Rivera",
    role: "FACULTY",
    avatarColor: "#0369a1",
    title: "Associate Professor, Computer Science",
    company: "Marist CSM",
  },
  {
    id: "u-faculty-2",
    email: "dr.susan.lee@marist.edu",
    name: "Dr. Susan Lee",
    role: "FACULTY",
    avatarColor: "#9d174d",
    title: "Professor, Data Science & Analytics",
    company: "Marist CSM",
  },
  {
    id: "u-alumni-1",
    email: "marcus.bell@alumni.marist.edu",
    name: "Marcus Bell",
    role: "ALUMNI",
    avatarColor: "#15803d",
    title: "Software Engineer",
    company: "IBM",
  },
  {
    id: "u-industry-1",
    email: "nina.patel@bluechip.com",
    name: "Nina Patel",
    role: "INDUSTRY_PARTNER",
    avatarColor: "#c2410c",
    title: "Engineering Manager",
    company: "BlueChip Cloud",
  },
];

export const studentProfiles: StudentProfile[] = [
  {
    userId: "u-student-1",
    major: "Computer Science",
    gradYear: 2027,
    careerTrack: "Software Engineering",
    interests: ["Full-stack", "AI/ML", "Open source"],
    summary:
      "Junior CS major focused on full-stack development and applied machine learning. Active in the ACM chapter and seeking a summer 2026 SWE internship.",
    totalXp: 2840,
    serviceHours: 32,
  },
  {
    userId: "u-student-2",
    major: "Data Science",
    gradYear: 2026,
    careerTrack: "Data Analytics",
    interests: ["Visualization", "Statistics", "Python"],
    summary: "Senior data science major specializing in analytics and visualization.",
    totalXp: 3920,
    serviceHours: 45,
  },
  {
    userId: "u-student-3",
    major: "Cybersecurity",
    gradYear: 2027,
    careerTrack: "Security Engineering",
    interests: ["Pen testing", "Cloud security", "CTFs"],
    summary: "Cybersecurity major and competitive CTF player.",
    totalXp: 2510,
    serviceHours: 28,
  },
  {
    userId: "u-student-4",
    major: "Software Development",
    gradYear: 2026,
    careerTrack: "Software Engineering",
    interests: ["DevOps", "Cloud", "Leadership"],
    summary: "ACM President leading hackathons and tech talks.",
    totalXp: 4380,
    serviceHours: 61,
  },
  {
    userId: "u-student-5",
    major: "Information Technology",
    gradYear: 2028,
    careerTrack: "Cloud & Infrastructure",
    interests: ["Networking", "Cloud", "Automation"],
    summary: "First-year IT student exploring cloud infrastructure.",
    totalXp: 980,
    serviceHours: 8,
  },
];

export const organizations: Organization[] = [
  {
    id: "org-acm",
    name: "ACM Student Chapter",
    slug: "acm",
    description:
      "Marist's Association for Computing Machinery chapter — hackathons, tech talks, and coding workshops for all CSM majors.",
    category: "Computer Science",
    logoColor: "#a4123f",
    memberCount: 142,
  },
  {
    id: "org-wics",
    name: "Women in Computing Society",
    slug: "wics",
    description:
      "A community empowering women and non-binary students in computing through mentorship, events, and networking.",
    category: "Community",
    logoColor: "#9d174d",
    memberCount: 88,
  },
  {
    id: "org-cyber",
    name: "Cyber Defense Club",
    slug: "cyber-defense",
    description:
      "Hands-on cybersecurity practice, CTF competitions, and blue-team/red-team exercises.",
    category: "Cybersecurity",
    logoColor: "#0f766e",
    memberCount: 64,
  },
  {
    id: "org-data",
    name: "Data Science Society",
    slug: "data-science",
    description:
      "Workshops on machine learning, analytics, and data visualization with real-world datasets.",
    category: "Data Science",
    logoColor: "#1d4ed8",
    memberCount: 73,
  },
];

export const badges: Badge[] = [
  { id: "b-1", name: "First Steps", description: "Attended your first CSM event.", category: "Engagement", icon: "footprints", tier: "bronze", xpValue: 50 },
  { id: "b-2", name: "Hackathon Hero", description: "Participated in a 24-hour hackathon.", category: "Competition", icon: "trophy", tier: "gold", xpValue: 300 },
  { id: "b-3", name: "Mentor Match", description: "Connected with a faculty or industry mentor.", category: "Mentorship", icon: "users", tier: "silver", xpValue: 150 },
  { id: "b-4", name: "Interview Ready", description: "Completed three mock technical interviews.", category: "Career", icon: "mic", tier: "gold", xpValue: 250 },
  { id: "b-5", name: "Credential Collector", description: "Earned an industry credential.", category: "Credentials", icon: "badge-check", tier: "silver", xpValue: 200 },
  { id: "b-6", name: "Service Star", description: "Logged 25+ service hours.", category: "Service", icon: "heart", tier: "silver", xpValue: 180 },
  { id: "b-7", name: "Pathway Pioneer", description: "Completed a guided learning pathway.", category: "Learning", icon: "route", tier: "gold", xpValue: 280 },
  { id: "b-8", name: "Portfolio Pro", description: "Published five portfolio artifacts.", category: "Portfolio", icon: "folder", tier: "silver", xpValue: 160 },
  { id: "b-9", name: "Community Builder", description: "Led an organization event.", category: "Leadership", icon: "megaphone", tier: "platinum", xpValue: 400 },
  { id: "b-10", name: "Reflection Writer", description: "Submitted reflections for five events.", category: "Engagement", icon: "pen", tier: "bronze", xpValue: 90 },
];

export const userBadges: UserBadge[] = [
  { badgeId: "b-1", earnedAt: inDays(-120), progress: 100 },
  { badgeId: "b-2", earnedAt: inDays(-40), progress: 100 },
  { badgeId: "b-3", earnedAt: inDays(-30), progress: 100 },
  { badgeId: "b-6", earnedAt: inDays(-15), progress: 100 },
  { badgeId: "b-10", earnedAt: inDays(-8), progress: 100 },
  { badgeId: "b-4", earnedAt: inDays(0), progress: 66 },
  { badgeId: "b-5", earnedAt: inDays(0), progress: 40 },
  { badgeId: "b-7", earnedAt: inDays(0), progress: 75 },
];

export const events: EventItem[] = [
  {
    id: "e-1",
    title: "Full-Stack Workshop: Build with Next.js",
    description:
      "Hands-on session building a full-stack app with Next.js, Prisma, and PostgreSQL. Laptops required; all skill levels welcome.",
    category: "WORKSHOP",
    startsAt: inDays(2, 17),
    endsAt: endAfter(inDays(2, 17), 120),
    location: "Hancock Center 2023",
    isRemote: false,
    capacity: 40,
    rsvpCount: 27,
    xpReward: 80,
    isCsmSpecific: true,
    orgId: "org-acm",
    competencyTag: "Technology",
    badgeIds: ["b-7"],
  },
  {
    id: "e-2",
    title: "Spring Tech Career Fair",
    description:
      "Meet 30+ employers hiring for internships and full-time roles across software, data, cloud, and security.",
    category: "CAREER_FAIR",
    startsAt: inDays(6, 11),
    endsAt: endAfter(inDays(6, 11), 240),
    location: "McCann Center",
    isRemote: false,
    capacity: 300,
    rsvpCount: 184,
    xpReward: 120,
    isCsmSpecific: false,
    competencyTag: "Career Management",
    badgeIds: [],
  },
  {
    id: "e-3",
    title: "Red Fox Hackathon 2026",
    description:
      "24-hour hackathon with tracks in AI, cloud, and social good. Prizes, mentors, food, and swag provided.",
    category: "HACKATHON",
    startsAt: inDays(12, 9),
    endsAt: endAfter(inDays(12, 9), 1440),
    location: "Hancock Center Atrium",
    isRemote: false,
    capacity: 120,
    rsvpCount: 96,
    xpReward: 300,
    isCsmSpecific: true,
    orgId: "org-acm",
    competencyTag: "Technology",
    badgeIds: ["b-2"],
  },
  {
    id: "e-4",
    title: "Cloud Security Tech Talk (IBM)",
    description:
      "An IBM security engineer covers cloud threat modeling, zero-trust, and breaking into security careers.",
    category: "TECH_TALK",
    startsAt: inDays(4, 18),
    endsAt: endAfter(inDays(4, 18), 90),
    location: "Remote (Zoom)",
    isRemote: true,
    capacity: 200,
    rsvpCount: 58,
    xpReward: 70,
    isCsmSpecific: true,
    orgId: "org-cyber",
    competencyTag: "Technology",
    badgeIds: [],
  },
  {
    id: "e-5",
    title: "Mock Interview Marathon",
    description:
      "Back-to-back mock technical interviews with faculty, alumni, and industry partners. Sign up for a slot.",
    category: "INTERVIEW_PREP",
    startsAt: inDays(9, 13),
    endsAt: endAfter(inDays(9, 13), 300),
    location: "Donnelly Hall 245",
    isRemote: false,
    capacity: 60,
    rsvpCount: 41,
    xpReward: 150,
    isCsmSpecific: true,
    competencyTag: "Career Management",
    badgeIds: ["b-4"],
  },
  {
    id: "e-6",
    title: "WiCS Networking Night",
    description:
      "Connect with women in tech from regional employers over dinner and lightning talks.",
    category: "NETWORKING",
    startsAt: inDays(8, 18),
    endsAt: endAfter(inDays(8, 18), 120),
    location: "Student Center 3rd Floor",
    isRemote: false,
    capacity: 80,
    rsvpCount: 52,
    xpReward: 90,
    isCsmSpecific: true,
    orgId: "org-wics",
    competencyTag: "Communication",
    badgeIds: [],
  },
  {
    id: "e-7",
    title: "Data Viz Workshop: Telling Stories with Data",
    description:
      "Build interactive dashboards and learn the principles of effective data storytelling.",
    category: "WORKSHOP",
    startsAt: inDays(5, 16),
    endsAt: endAfter(inDays(5, 16), 90),
    location: "Hancock Center 1012",
    isRemote: false,
    capacity: 35,
    rsvpCount: 22,
    xpReward: 80,
    isCsmSpecific: true,
    orgId: "org-data",
    competencyTag: "Technology",
    badgeIds: [],
  },
  {
    id: "e-8",
    title: "Community Coding for Nonprofits",
    description:
      "Volunteer to build websites and tools for local nonprofits. Earn service hours and real-world experience.",
    category: "SERVICE",
    startsAt: inDays(14, 10),
    endsAt: endAfter(inDays(14, 10), 300),
    location: "Hancock Center 2018",
    isRemote: false,
    capacity: 30,
    rsvpCount: 18,
    xpReward: 130,
    isCsmSpecific: true,
    orgId: "org-acm",
    competencyTag: "Leadership",
    badgeIds: ["b-6"],
  },
];

// Events the current student has already RSVP'd to (by id).
export const initialRsvpEventIds = ["e-1", "e-3", "e-5"];
// Events the current student has already checked into.
export const initialCheckInEventIds = ["e-4"];

export const pathways: Pathway[] = [
  {
    id: "p-1",
    title: "Software Engineering Internship Readiness",
    slug: "swe-internship-readiness",
    description:
      "Go from coursework to internship-ready: data structures, system design basics, projects, and interview prep.",
    category: "Software Engineering",
    estimatedHours: 40,
    steps: [
      { id: "p1s1", title: "Build a portfolio project", detail: "Ship a full-stack app and publish to GitHub.", order: 1 },
      { id: "p1s2", title: "Master core data structures", detail: "Arrays, hashmaps, trees, graphs.", order: 2 },
      { id: "p1s3", title: "Complete 3 mock interviews", detail: "Practice with faculty and alumni.", order: 3 },
      { id: "p1s4", title: "Polish resume & LinkedIn", detail: "Get reviewed at the career center.", order: 4 },
      { id: "p1s5", title: "Apply to 10 internships", detail: "Track applications and follow up.", order: 5 },
    ],
  },
  {
    id: "p-2",
    title: "Cybersecurity Analyst Track",
    slug: "cybersecurity-analyst",
    description: "Foundations of security operations, threat detection, and a recognized credential.",
    category: "Cybersecurity",
    estimatedHours: 35,
    steps: [
      { id: "p2s1", title: "Security fundamentals", detail: "CIA triad, networking, threat models.", order: 1 },
      { id: "p2s2", title: "Hands-on labs", detail: "Complete 5 Cyber Defense Club labs.", order: 2 },
      { id: "p2s3", title: "Earn Security+ ", detail: "Study for and pass CompTIA Security+.", order: 3 },
      { id: "p2s4", title: "Compete in a CTF", detail: "Place in a capture-the-flag event.", order: 4 },
    ],
  },
  {
    id: "p-3",
    title: "Data Analytics Foundations",
    slug: "data-analytics-foundations",
    description: "Python, SQL, statistics, and visualization for data-driven roles.",
    category: "Data Science",
    estimatedHours: 30,
    steps: [
      { id: "p3s1", title: "Python for data", detail: "pandas, numpy, notebooks.", order: 1 },
      { id: "p3s2", title: "SQL mastery", detail: "Joins, aggregations, window functions.", order: 2 },
      { id: "p3s3", title: "Statistics essentials", detail: "Distributions, hypothesis testing.", order: 3 },
      { id: "p3s4", title: "Build a dashboard", detail: "Publish an interactive analytics dashboard.", order: 4 },
    ],
  },
];

export const userPathwayProgress: UserPathwayProgress[] = [
  { pathwayId: "p-1", status: "IN_PROGRESS", completedSteps: 3 },
  { pathwayId: "p-3", status: "IN_PROGRESS", completedSteps: 1 },
];

export const competencies: Competency[] = [
  { id: "c-1", name: "Critical Thinking", framework: "NACE", description: "Identify and respond to problems using sound reasoning.", category: "Core" },
  { id: "c-2", name: "Communication", framework: "NACE", description: "Articulate ideas clearly in writing and speech.", category: "Core" },
  { id: "c-3", name: "Teamwork", framework: "NACE", description: "Collaborate effectively across diverse teams.", category: "Core" },
  { id: "c-4", name: "Technology", framework: "NACE", description: "Apply technologies ethically and effectively.", category: "Core" },
  { id: "c-5", name: "Leadership", framework: "NACE", description: "Motivate and guide others toward goals.", category: "Core" },
  { id: "c-6", name: "Career Management", framework: "NACE", description: "Identify and pursue career opportunities.", category: "Core" },
  { id: "c-7", name: "Professional Ethics", framework: "NACE", description: "Act with integrity and accountability.", category: "Core" },
  { id: "c-8", name: "Computational Problem Solving", framework: "CSM", description: "Decompose and solve problems algorithmically.", category: "CSM Custom" },
  { id: "c-9", name: "Software Craftsmanship", framework: "CSM", description: "Write clean, tested, maintainable code.", category: "CSM Custom" },
];

export const userCompetencyProgress: UserCompetencyProgress[] = [
  { competencyId: "c-1", level: 4, percent: 80 },
  { competencyId: "c-2", level: 3, percent: 64 },
  { competencyId: "c-3", level: 4, percent: 78 },
  { competencyId: "c-4", level: 4, percent: 88 },
  { competencyId: "c-5", level: 2, percent: 45 },
  { competencyId: "c-6", level: 3, percent: 60 },
  { competencyId: "c-7", level: 3, percent: 70 },
  { competencyId: "c-8", level: 4, percent: 82 },
  { competencyId: "c-9", level: 3, percent: 66 },
];

export const credentials: Credential[] = [
  { id: "cr-1", name: "Google Data Analytics Certificate", provider: "Google", careerTrack: "Data Analytics", major: "Data Science", cost: "$49/mo", difficulty: "Beginner", duration: "3–6 months", modality: "Online", description: "Foundational data analytics with spreadsheets, SQL, R, and Tableau.", url: "https://grow.google" },
  { id: "cr-2", name: "IBM SkillsBuild: Cybersecurity Fundamentals", provider: "IBM SkillsBuild", careerTrack: "Security Engineering", major: "Cybersecurity", cost: "Free", difficulty: "Beginner", duration: "20 hours", modality: "Online", description: "Core cybersecurity concepts and hands-on labs.", url: "https://skillsbuild.org" },
  { id: "cr-3", name: "Microsoft Applied Skills: Azure AI", provider: "Microsoft", careerTrack: "AI/ML", major: "Computer Science", cost: "Free", difficulty: "Intermediate", duration: "10–15 hours", modality: "Online", description: "Validate skills building AI solutions on Azure.", url: "https://learn.microsoft.com" },
  { id: "cr-4", name: "AWS Certified Cloud Practitioner", provider: "AWS", careerTrack: "Cloud & Infrastructure", major: "Information Technology", cost: "$100 exam", difficulty: "Beginner", duration: "1–2 months", modality: "Online + Exam", description: "Foundational understanding of AWS cloud.", url: "https://aws.amazon.com/certification" },
  { id: "cr-5", name: "CompTIA Security+", provider: "CompTIA", careerTrack: "Security Engineering", major: "Cybersecurity", cost: "$392 exam", difficulty: "Intermediate", duration: "2–3 months", modality: "Online + Exam", description: "Industry-standard entry-level security certification.", url: "https://comptia.org" },
  { id: "cr-6", name: "Google Cloud Digital Leader", provider: "Google", careerTrack: "Cloud & Infrastructure", major: "Information Technology", cost: "$99 exam", difficulty: "Beginner", duration: "1 month", modality: "Online + Exam", description: "Cloud fundamentals and Google Cloud products.", url: "https://cloud.google.com/certification" },
  { id: "cr-7", name: "Meta Front-End Developer Certificate", provider: "Meta", careerTrack: "Software Engineering", major: "Computer Science", cost: "$49/mo", difficulty: "Beginner", duration: "4–6 months", modality: "Online", description: "Front-end development with React.", url: "https://coursera.org" },
  { id: "cr-8", name: "IBM Data Science Professional", provider: "IBM", careerTrack: "Data Analytics", major: "Data Science", cost: "$49/mo", difficulty: "Intermediate", duration: "4–6 months", modality: "Online", description: "End-to-end data science with Python and ML.", url: "https://coursera.org" },
];

export const userCredentials: UserCredential[] = [
  { credentialId: "cr-3", status: "IN_PROGRESS" },
  { credentialId: "cr-7", status: "PLANNED" },
  { credentialId: "cr-1", status: "SAVED" },
];

export const portfolioItems: PortfolioItem[] = [
  { id: "pf-1", userId: "u-student-1", title: "RedFox Study Buddy", type: "GITHUB", url: "https://github.com/example/study-buddy", description: "Full-stack study group matcher built at Red Fox Hackathon.", isPublic: true },
  { id: "pf-2", userId: "u-student-1", title: "Personal Portfolio Site", type: "LINK", url: "https://ava.dev", description: "My developer portfolio built with Next.js and Tailwind.", isPublic: true },
  { id: "pf-3", userId: "u-student-1", title: "ML Image Classifier", type: "PROJECT", url: "https://github.com/example/img-classify", description: "CNN that classifies plant species; 92% accuracy.", isPublic: true },
  { id: "pf-4", userId: "u-student-1", title: "LinkedIn Profile", type: "LINKEDIN", url: "https://linkedin.com/in/example", description: "Professional profile and experience.", isPublic: true },
  { id: "pf-5", userId: "u-student-1", title: "Data Structures Notes (PDF)", type: "FILE", description: "Comprehensive notes from CMPT 220.", isPublic: false },
];

export const mentorshipOpportunities: MentorshipOpportunity[] = [
  { id: "m-1", mentorId: "u-faculty-1", kind: "RESEARCH", title: "Undergraduate Research: Applied ML", description: "Join a faculty research project applying ML to healthcare data. 6–8 hrs/week.", careerTrack: "AI/ML", expertise: ["Machine Learning", "Python", "Research Methods"], availability: "Spring 2026", isOpen: true },
  { id: "m-2", mentorId: "u-alumni-1", kind: "CAREER_GUIDANCE", title: "Breaking into Big Tech — Alumni Mentor", description: "1:1 career guidance from an IBM software engineer and Marist alum.", careerTrack: "Software Engineering", expertise: ["Interviews", "System Design", "Career Growth"], availability: "Biweekly, evenings", isOpen: true },
  { id: "m-3", mentorId: "u-industry-1", kind: "INTERNSHIP", title: "Cloud Engineering Internship Pipeline", description: "Mentorship + internship referral track at BlueChip Cloud.", careerTrack: "Cloud & Infrastructure", expertise: ["AWS", "Kubernetes", "DevOps"], availability: "Rolling", isOpen: true },
  { id: "m-4", mentorId: "u-faculty-2", kind: "PORTFOLIO_REVIEW", title: "Data Portfolio Review", description: "Get detailed feedback on your data science portfolio and projects.", careerTrack: "Data Analytics", expertise: ["Data Viz", "Statistics", "Storytelling"], availability: "Office hours", isOpen: true },
];

export const interviewSlots: InterviewSlot[] = [
  { id: "is-1", interviewerId: "u-faculty-1", topic: "Algorithms", startsAt: inDays(3, 14), durationMin: 45, modality: "Remote", isBooked: false },
  { id: "is-2", interviewerId: "u-alumni-1", topic: "System Design", startsAt: inDays(3, 16), durationMin: 60, modality: "Remote", isBooked: false },
  { id: "is-3", interviewerId: "u-industry-1", topic: "Cloud", startsAt: inDays(5, 15), durationMin: 45, modality: "In Person", isBooked: false },
  { id: "is-4", interviewerId: "u-faculty-2", topic: "Databases", startsAt: inDays(6, 13), durationMin: 45, modality: "Remote", isBooked: false },
  { id: "is-5", interviewerId: "u-faculty-1", topic: "Behavioral", startsAt: inDays(7, 11), durationMin: 30, modality: "In Person", isBooked: false },
  { id: "is-6", interviewerId: "u-alumni-1", topic: "Data Analytics", startsAt: inDays(8, 17), durationMin: 45, modality: "Remote", isBooked: false },
  { id: "is-7", interviewerId: "u-industry-1", topic: "Cybersecurity", startsAt: inDays(9, 10), durationMin: 60, modality: "Remote", isBooked: false },
  { id: "is-8", interviewerId: "u-faculty-2", topic: "AI", startsAt: inDays(10, 14), durationMin: 45, modality: "Remote", isBooked: false },
];

export const transcriptEntries: TranscriptEntry[] = [
  { id: "t-1", userId: "u-student-1", category: "EVENT", title: "Red Fox Hackathon 2025", detail: "Built a study-buddy app; 2nd place overall.", hours: 24, occurredAt: inDays(-40) },
  { id: "t-2", userId: "u-student-1", category: "LEADERSHIP", title: "ACM Workshop Co-Lead", detail: "Co-led an intro to Git workshop for 30 students.", hours: 6, occurredAt: inDays(-25) },
  { id: "t-3", userId: "u-student-1", category: "SERVICE", title: "Community Coding for Nonprofits", detail: "Built a website for a local food bank.", hours: 12, occurredAt: inDays(-18) },
  { id: "t-4", userId: "u-student-1", category: "BADGE", title: "Earned: Service Star", detail: "Logged 25+ service hours.", hours: 0, occurredAt: inDays(-15) },
  { id: "t-5", userId: "u-student-1", category: "EVENT", title: "Cloud Security Tech Talk (IBM)", detail: "Attended and submitted a reflection.", hours: 1.5, occurredAt: inDays(-5) },
];

export const xpTransactions: XpTransaction[] = [
  { id: "x-1", userId: "u-student-1", amount: 300, reason: "Red Fox Hackathon participation", createdAt: inDays(-40) },
  { id: "x-2", userId: "u-student-1", amount: 150, reason: "ACM Workshop leadership", createdAt: inDays(-25) },
  { id: "x-3", userId: "u-student-1", amount: 130, reason: "Community service event", createdAt: inDays(-18) },
  { id: "x-4", userId: "u-student-1", amount: 90, reason: "Reflection submitted", createdAt: inDays(-8) },
  { id: "x-5", userId: "u-student-1", amount: 70, reason: "Cloud Security Tech Talk check-in", createdAt: inDays(-5) },
];

// Leaderboard ordering uses studentProfiles totalXp; this is the display roster.
export const leaderboardUserIds = [
  "u-student-4",
  "u-student-2",
  "u-student-1",
  "u-student-3",
  "u-student-5",
];
