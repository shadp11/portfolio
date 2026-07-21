import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  ArrowDownCircleIcon,
  ArrowTopRightOnSquareIcon,
  BoltIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  CheckBadgeIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
  MoonIcon,
  PhoneIcon,
  SparklesIcon,
  SunIcon,
  XMarkIcon,
  DevicePhoneMobileIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import ProjectCard from "./components/ProjectCard";
import analyticsProjects from "./data/analyticsProjects";
import projects from "./data/projects";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

// Tech Icons Mapping with Emojis
const techIcons = {
  "SAP ERP (Fundamentals – Currently Learning)": "/icons/sap.svg",
  "Power BI": "/icons/powerbi.svg",
  "Power Apps": "/icons/powerapps.svg",
  SQL: "/icons/sql.svg",
  MySQL: "/icons/mysql.svg",
  MongoDB: "/icons/mongodb.svg",
  Python: "/icons/python.svg",
  Java: "/icons/java.svg",
  JavaScript: "/icons/javascript.svg",
  ReactJS: "/icons/react.svg",
  "Node.js": "/icons/node.svg",
  "Express.js": "/icons/express.svg",
  HTML5: "/icons/html.svg",
  CSS3: "/icons/css.svg",
  "Tailwind CSS": "/icons/tailwind.svg",
  Postman: "/icons/postman.svg",
  Git: "/icons/git.svg",
  GitHub: "/icons/github.svg",
  "VS Code": "/icons/vscode.svg",
  "Microsoft Excel": "/icons/excel.svg",
};

const skillGroups = [
  {
    title: "ERP & Business Applications",
    skills: [
      "SAP ERP (Fundamentals – Currently Learning)",
      "Power BI",
      "Power Apps",
    ],
  },
  {
    title: "Databases",
    skills: ["SQL", "MySQL", "MongoDB"],
  },
  {
    title: "Programming",
    skills: ["Python", "Java", "JavaScript"],
  },
  {
    title: "Web Development",
    skills: [
      "ReactJS",
      "Node.js",
      "Express.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    title: "Tools",
    skills: ["Postman", "Git", "GitHub", "VS Code", "Microsoft Excel"],
  },
];

const businessSkills = [
  "Business Process Analysis",
  "Requirements Analysis",
  "Functional Testing",
  "Regression Testing",
  "User Acceptance Testing (UAT)",
  "API Testing",
  "Documentation",
];

const certificates = [
  {
    title: "IT Specialist - Cybersecurity",
    organization: "Certiport",
    date: "April 2026",
    link: "https://www.credly.com/badges/4006cdae-fd28-494c-ad27-533777df06e9/public_url",
    src: "/badge1.png",
  },
  {
    title: "IT Specialist - Databases",
    organization: "Certiport",
    date: "April 2026",
    link: "https://www.credly.com/badges/f84c02a7-8301-4ee2-92ab-5a65be62e8f0/public_url",
    src: "/badge2.png",
  },
];

const experience = {
  role: "Quality Assurance Intern",
  company: "E-Science Corporation",
  duration: "December 2024 – May 2025",
  description:
    "Supported software quality and business system improvement initiatives by validating application functionality, analyzing data accuracy, performing system testing, and ensuring reliable reporting and business process execution.",

  responsibilities: [
    "Validated Power BI dashboards and business reports by reviewing data consistency, investigating discrepancies, and ensuring accurate information for decision-making.",
    "Performed data validation and database verification using Python tools/scripts and MySQL to ensure data integrity and accuracy.",
    "Conducted API testing using Postman and verified system responses to support reliable application integrations.",
    "Executed functional testing, regression testing, and User Acceptance Testing (UAT) in collaboration with developers to identify and resolve system issues.",
    "Data Analytics & Report Team (Dec 2024 – Jan 2025): Supported report validation, dashboard testing, and data quality checks for business reporting requirements.",
    "Allocation Logic System Team (Dec 2024 – May 2026): Tested system workflows, validated business rules, and assisted in improving application reliability and process accuracy.",
  ],
  tools: [
    "Power BI",
    "MySQL",
    "Postman",
    "Jira",
    "Confluence",
    "Git",
    "GitBucket",
    "AWS",
  ],
};

const contactDetails = {
  email: "kayshadelapena1230@gmail.com",
  github: "https://github.com/shadp11",
  linkedin: "https://www.linkedin.com/in/kaysha-dela-peña-52a026389/",
  phone: "+63 976 520 7383",
  location: "Las Piñas, Philippines",
};

const sectionAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const Motion = motion;

// Custom hook for typewriter animation
const useTypewriter = (
  words,
  typingSpeed = 90,
  deletingSpeed = 50,
  pauseTime = 1500,
) => {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && displayText === currentWord) {
      // Pause after typing complete word
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayText === "") {
      const timeout = setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setIsDeleting(false);
      }, 0);

      return () => clearTimeout(timeout);
    } else {
      // Type or delete characters
      timeout = setTimeout(
        () => {
          setDisplayText((prev) => {
            if (isDeleting) {
              return prev.slice(0, -1);
            } else {
              return currentWord.slice(0, prev.length + 1);
            }
          });
        },
        isDeleting ? deletingSpeed : typingSpeed,
      );
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return displayText;
};

const typewriterWords = [
  "ERP Functional Consultant",
  "Enterprise Applications Consultant",
  "Business Analyst",
  "Business Process Analyst",
];

// TypeWriter Component
const TypeWriter = ({ words = [] }) => {
  const displayText = useTypewriter(words);

  return (
    <div className="flex items-center gap-1">
      <span className="text-sky-600 dark:text-sky-400">{displayText}</span>
      <span className="inline-block h-6 w-0.5 animate-pulse bg-sky-600 dark:bg-sky-400" />
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }
    return window.localStorage.getItem("theme") || "dark";
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    console.log(import.meta.env.VITE_API_URL);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/send`,
        data,
        {
          timeout: 60000,
        },
      );

      console.log(response.data);

      alert(response.data?.message || "Message sent successfully!");

      e.target.reset();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to send message.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      {/* Floating background blobs */}

      {/* <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="fixed -top-20 -left-20 h-72 w-72 rounded-full bg-sky-500/30 blur-3xl animate-blob" />

        <div className="fixed top-1/2 -right-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl animate-blob" />

        <div className="fixed bottom-0 left-1/3 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl animate-blob" />

        <div className="fixed inset-x-0 top-0 h-72 bg-gradient-to-b from-sky-500/15 via-transparent to-transparent blur-3xl" />
      </div> */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-sm font-bold text-white shadow-lg shadow-sky-500/20">
              KD
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-slate-300">
                Kaysha Dela Peña
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                IT Graduate | Aspiring ERP Functional Consultant
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeSection === item.id
                    ? theme === "dark"
                      ? "bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20"
                      : "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle dark mode"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5 text-amber-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-slate-700" />
            )}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-20 pt-10 sm:pt-16">
        <section
          id="home"
          className="rounded-[2rem] border border-slate-200/80 bg-white/90 px-6 py-14 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none lg:flex lg:items-center lg:justify-between lg:px-16 lg:py-20"
        >
          <Motion.div
            initial="hidden"
            animate="visible"
            variants={sectionAnimation}
            className="max-w-2xl"
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-300/50 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200">
              <SparklesIcon className="h-4 w-4" /> My Portfolio
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Hi, I’m{" "}
              <span className="text-sky-600 dark:text-sky-400">
                Kaysha Dela Peña
              </span>
              .
            </h1>{" "}
            <div className="mt-3 text-xl font-semibold sm:text-2xl flex items-center gap-2">
              I am an aspiring
              <TypeWriter words={typewriterWords} />
            </div>
            <p className="mt-6 max-w-2xl text-md leading-8 text-slate-600 dark:text-slate-300">
              Information Technology graduate with a strong interest in business
              process analysis, enterprise resource planning (ERP) systems, and
              technology-driven solutions. Eager to build expertise in ERP
              applications and contribute to improving business processes
              through effective system implementation and support.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
              >
                View Projects
              </a>
              <a
                href="/Kaysha_DelaPeña_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
              >
                Contact Me
              </a>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
            className="mt-12 flex justify-center lg:mt-0"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-50 p-3 shadow-2xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
              <img
                src="/profile.jpg"
                alt="Kaysha Dela Peña profile"
                className="h-[340px] w-full object-cover rounded-[1rem]"
              />
            </div>
          </Motion.div>
        </section>

        <Motion.section
          id="about"
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionAnimation}
        >
          <div className="grid items-stretch gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-10 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
              <div className="flex items-center gap-4 text-slate-900 dark:text-white">
                <AcademicCapIcon className="h-10 w-10 text-sky-500" />
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                    About Me
                  </p>
                  <h2 className="mt-2 text-3xl font-bold">
                    Hi, I'm Kaysha Dela Peña.
                  </h2>
                </div>
              </div>
              <div className="mt-6 space-y-5 text-slate-600 dark:text-slate-300 text-[15px] text-left text-justify">
                <p>
                  I am an Information Technology graduate with a strong interest
                  in enterprise systems, business process analysis, and
                  technology-driven solutions. Through my academic projects and
                  technical experience in software development, SQL, databases,
                  data validation, and software testing, I have developed strong
                  analytical, problem-solving, and critical thinking skills. I
                  enjoy understanding how technology supports business
                  operations and aspire to build a career in ERP consulting,
                  where I can help organizations improve efficiency through
                  enterprise solutions.
                </p>
                <div className="relative rounded-3xl border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
                  <img
                    src="/nulogo.svg"
                    alt="NU Logo"
                    className="absolute top-4 right-4 h-20 w-20 object-contain"
                  />

                  <p className="text-base font-semibold text-slate-900 dark:text-white">
                    Education
                  </p>

                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    <span className="font-semibold">
                      Bachelor of Science in Information Technology
                    </span>
                    <br />
                    with specialization in Mobile and Web Applications
                  </p>

                  <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                    National University – Mall of Asia Campus | 2022 – 2026
                  </p>

                  <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li>• Graduated Summa Cum Laude</li>
                    <li>
                      • Consistent Dean's First Honor Lister (2022 – 2026)
                    </li>
                    <li>
                      • Doña Miguela M. Jhocson (Blue) Scholar (2023 – 2026)
                    </li>
                    <li>• Doña Pacita J. Ocampo (White) Scholar (2022)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col gap-6">
              <div className="flex-1 rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Career Objective
                </p>
                <p className="mt-5 text-slate-600 dark:text-slate-300 text-[15px] text-left text-justify">
                  To begin my career as an ERP Functional Consultant by applying
                  my technical knowledge, analytical skills, and understanding
                  of business processes to support enterprise system
                  implementations. I aim to continuously develop my expertise in
                  ERP platforms, collaborate with experienced professionals, and
                  contribute to projects that deliver value to organizations and
                  their clients.
                </p>
              </div>
              <div className="flex-1 rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Personal Summary
                </p>
                <p className="mt-5 text-slate-600 dark:text-slate-300 text-[15px] text-left text-justify">
                  I am a curious and adaptable learner who enjoys solving
                  problems and continuously improving my skills. I work well
                  both independently and in collaborative environments and value
                  clear communication, attention to detail, and effective time
                  management. I approach new challenges with a positive mindset
                  and am committed to delivering high-quality results while
                  growing as an ERP consulting professional.
                </p>
              </div>
            </div>
          </div>
        </Motion.section>

        <Motion.section
          id="skills"
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionAnimation}
        >
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-sky-500">
                  Skills
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                  Technical & Business Skills
                </h2>
              </div>
            </div>

            <div className="mt-10 rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300">
                  <CodeBracketIcon className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                    Technical Skills & Tools
                  </h3>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-5">
                {skillGroups.map((group) => (
                  <div
                    key={group.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                  >
                    {/* Category Header */}
                    <div className="mb-6 flex items-center gap-3">
                      <div className="rounded-xl bg-sky-100 p-3 dark:bg-slate-800">
                        {group.icon}
                      </div>

                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                        {group.title}
                      </h3>
                    </div>

                    {/* Skills */}
                    <div className="grid grid-cols-3 gap-4">
                      {group.skills.map((skill) => {
                        const icon = techIcons[skill];

                        return (
                          <div
                            key={skill}
                            className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3 transition hover:-translate-y-1 hover:border-sky-300 hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-500"
                          >
                            {icon && (
                              <img
                                src={icon}
                                alt={skill}
                                className="h-10 w-10 object-contain"
                              />
                            )}

                            <span className="text-center text-xs font-medium">
                              {skill}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300">
                  <ClipboardDocumentCheckIcon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                  Business Analysis & Testing
                </h3>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {businessSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Motion.section>

        <Motion.section
          id="projects"
          className="mt-16"
          // initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionAnimation}
        >
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-500">
              PROJECTS
            </p>

            <h3 className="mt-10 text-2xl font-bold">
              Software Development Projects
            </h3>

            <div className="mt-6 grid gap-8 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>

            <h3 className="mt-10 text-2xl font-bold">
              Business Intelligence Dashboard
            </h3>

            <div className="mt-6 grid gap-8 md:grid-cols-1">
              {analyticsProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </Motion.section>

        <Motion.section
          id="experience"
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionAnimation}
        >
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-sky-500">
                  Experience
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                  Professional timeline
                </h2>
              </div>
            </div>
            <div className="mt-10 rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-4 text-slate-950 dark:text-white">
                <div className="rounded-3xl bg-sky-500/10 p-3 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300">
                  <BriefcaseIcon className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-lg font-semibold">{experience.role}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {experience.company} · {experience.duration}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {experience.description}
              </p>

              <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {experience.responsibilities.map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Technologies Used
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {experience.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300">
                  <CheckBadgeIcon className="h-7 w-7" />
                </div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Certificates
                </p>
              </div>

              <div className="mt-6 grid gap-5 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
                {certificates.map((certificate) => (
                  <a
                    key={certificate.title}
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-sky-300/80 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-500/60">
                      <div className="flex items-center gap-4">
                        <img
                          src={certificate.src}
                          alt={certificate.title}
                          className="h-20 w-20 object-contain"
                        />
                        <div>
                          <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                            {certificate.title}
                          </h3>

                          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            {certificate.organization}
                          </p>

                          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
                            {certificate.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Motion.section>

        <Motion.section
          id="contact"
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionAnimation}
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-10 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
              <p className="text-sm uppercase tracking-[0.24em] text-sky-500">
                Contact
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                Let's build something together.
              </h2>
              <div className="mt-8 space-y-5 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-4">
                  <EnvelopeIcon className="h-6 w-6 text-sky-500" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Email
                    </p>
                    <a
                      href={`mailto:${contactDetails.email}`}
                      className="text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400"
                    >
                      {contactDetails.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <GlobeAltIcon className="h-6 w-6 text-sky-500" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      GitHub
                    </p>
                    <a
                      href={contactDetails.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400"
                    >
                      github.com/shadp11
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BriefcaseIcon className="h-6 w-6 text-sky-500" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      LinkedIn
                    </p>
                    <a
                      href={contactDetails.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400"
                    >
                      linkedin.com/in/kayshadelapeña
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <PhoneIcon className="h-6 w-6 text-sky-500" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Phone
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      {contactDetails.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPinIcon className="h-6 w-6 text-sky-500" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Location
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      {contactDetails.location}
                    </p>
                  </div>
                </div>

                <a
                  href="/Kaysha_DelaPeña_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
                >
                  Download Resume
                </a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-10 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
              <p className="text-sm uppercase tracking-[0.24em] text-sky-500">
                Send a message
              </p>
              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
                />
                <textarea
                  rows="5"
                  name="message"
                  placeholder="Message"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition dark:bg-sky-500 dark:text-slate-950 ${
                    isSubmitting
                      ? "cursor-not-allowed opacity-50"
                      : "hover:scale-105 hover:bg-slate-800 dark:hover:bg-sky-400"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </Motion.section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/80 py-8 text-slate-700 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/95 dark:text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Kaysha Dela Peña. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <a
              href={contactDetails.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              GitHub
            </a>
            <a
              href={contactDetails.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="#home"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
            >
              <ArrowTopRightOnSquareIcon className="h-4 w-4" /> Top
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
