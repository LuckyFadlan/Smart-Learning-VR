import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  Atom,
  BarChart3,
  BookOpen,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  LayoutDashboard,
  Lock,
  Menu,
  MessageSquareText,
  Play,
  Power,
  Rocket,
  Search,
  Smartphone,
  Sparkles,
  Star,
  Telescope,
  User,
  Wifi,
  X,
} from 'lucide-react';
import VRScene from './VRScene.jsx';

const subjects = [
  {
    title: 'Astronomy',
    icon: Telescope,
    accent: 'from-pulse to-aurora',
    modules: 12,
    progress: 74,
    note: 'Solar systems, orbital motion, stellar life cycles',
    labTitle: 'Solar Motion Fundamentals',
    labFocus: 'Interactive orbital mechanics simulation',
    subtopics: ['Solar System', 'Orbital Motion', 'Moon Phases', 'Stellar Life Cycle'],
  },
  {
    title: 'Physics',
    icon: Atom,
    accent: 'from-mint to-pulse',
    modules: 9,
    progress: 58,
    note: 'Forces, waves, fields, quantum fundamentals',
    labTitle: 'Quantum Force Field',
    labFocus: 'Particle energy, orbitals, and magnetic fields',
    subtopics: ['Forces', 'Energy Transfer', 'Waves', 'Electric Fields'],
  },
  {
    title: 'Biology',
    icon: FlaskConical,
    accent: 'from-plasma to-solar',
    modules: 8,
    progress: 43,
    note: 'Cells, ecosystems, genetics, human systems',
    labTitle: 'Inside the Living Cell',
    labFocus: 'DNA, organelles, and cellular energy systems',
    subtopics: ['Cell Structure', 'DNA & Genes', 'Mitochondria', 'Ecosystems'],
  },
  {
    title: 'AI Literacy',
    icon: BrainCircuit,
    accent: 'from-aurora to-plasma',
    modules: 10,
    progress: 68,
    note: 'Prompting, model behavior, ethics, data patterns',
    labTitle: 'Neural Network Studio',
    labFocus: 'Inputs, hidden layers, outputs, and training signals',
    subtopics: ['Data Inputs', 'Neural Networks', 'Prompting', 'AI Ethics'],
  },
];

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'vr', label: 'VR Lab', icon: Rocket },
  { id: 'quiz', label: 'Quiz', icon: CheckCircle2 },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const quizBank = {
  Astronomy: {
    'Solar System': [
      {
        prompt: 'Which force keeps planets moving in orbit around the Sun?',
        answers: ['Gravity', 'Magnetism', 'Photosynthesis', 'Friction'],
        correct: 0,
      },
      {
        prompt: 'Which planet is famous for its wide ring system?',
        answers: ['Mars', 'Saturn', 'Mercury', 'Venus'],
        correct: 1,
      },
      {
        prompt: 'What object sits at the center of our solar system?',
        answers: ['Earth', 'The Moon', 'The Sun', 'Jupiter'],
        correct: 2,
      },
      {
        prompt: 'Why do planets look like they move along paths in the VR lab?',
        answers: ['They follow orbital paths', 'They stop rotating', 'They create oxygen', 'They become stars'],
        correct: 0,
      },
    ],
    'Orbital Motion': [
      {
        prompt: 'What does a larger orbital distance usually mean?',
        answers: ['A shorter year', 'A longer orbital period', 'No rotation', 'No atmosphere'],
        correct: 1,
      },
      {
        prompt: 'Which pair controls a stable orbit?',
        answers: ['Gravity and forward velocity', 'Color and size', 'Sound and heat', 'Clouds and rain'],
        correct: 0,
      },
      {
        prompt: 'What happens if orbital speed is too low?',
        answers: ['The object may fall inward', 'The object becomes invisible', 'Gravity disappears', 'The orbit becomes a plant'],
        correct: 0,
      },
      {
        prompt: 'Why is a VR orbit useful for learning?',
        answers: ['It makes scale and motion visible', 'It removes all data', 'It replaces science', 'It hides cause and effect'],
        correct: 0,
      },
    ],
    'Moon Phases': [
      {
        prompt: 'What causes Moon phases?',
        answers: ['The Moon reflecting sunlight from different angles', 'The Moon changing size', 'Clouds covering space', 'Earth turning into a star'],
        correct: 0,
      },
      {
        prompt: 'A full Moon happens when we see what?',
        answers: ['The fully lit side facing Earth', 'No sunlight at all', 'Only the Moon core', 'A planet ring'],
        correct: 0,
      },
      {
        prompt: 'Why is a VR phase model useful?',
        answers: ['It shows Sun, Earth, and Moon positions together', 'It hides the light source', 'It removes motion', 'It replaces observation'],
        correct: 0,
      },
      {
        prompt: 'What object provides the light in Moon phase simulations?',
        answers: ['The Sun', 'Mars', 'Saturn rings', 'Earth clouds'],
        correct: 0,
      },
    ],
    'Stellar Life Cycle': [
      {
        prompt: 'Stars are mainly powered by what process?',
        answers: ['Nuclear fusion', 'Photosynthesis', 'Friction only', 'Sound waves'],
        correct: 0,
      },
      {
        prompt: 'A nebula can act as what in a star life cycle?',
        answers: ['A star-forming cloud', 'A finished quiz', 'A planet surface', 'A classroom device'],
        correct: 0,
      },
      {
        prompt: 'What happens when a massive star reaches its final stage?',
        answers: ['It may explode as a supernova', 'It becomes a cell', 'It stops gravity everywhere', 'It becomes a prompt'],
        correct: 0,
      },
      {
        prompt: 'Why arrange star stages in VR?',
        answers: ['To compare scale, color, and sequence', 'To remove time', 'To hide changes', 'To simplify into one dot'],
        correct: 0,
      },
    ],
  },
  Physics: {
    Forces: [
      {
        prompt: 'What is a force?',
        answers: ['A push or pull', 'A color', 'A living cell', 'A database'],
        correct: 0,
      },
      {
        prompt: 'Which unit measures force?',
        answers: ['Newton', 'Liter', 'Byte', 'Degree Celsius'],
        correct: 0,
      },
      {
        prompt: 'What can a force change?',
        answers: ['Motion', 'Only color', 'Only text', 'Nothing'],
        correct: 0,
      },
      {
        prompt: 'In the Physics VR lab, field lines help show what?',
        answers: ['Invisible interactions', 'Plant growth', 'Planet names', 'Login status'],
        correct: 0,
      },
    ],
    'Energy Transfer': [
      {
        prompt: 'What is energy transfer?',
        answers: ['Energy moving between systems', 'Deleting matter', 'Stopping all motion', 'Changing a username'],
        correct: 0,
      },
      {
        prompt: 'An excited electron has what kind of state?',
        answers: ['Higher energy', 'No mass', 'No charge', 'No position'],
        correct: 0,
      },
      {
        prompt: 'Which form can energy take?',
        answers: ['Kinetic', 'Alphabetical', 'Transparent', 'Archived'],
        correct: 0,
      },
      {
        prompt: 'Why animate particles in VR?',
        answers: ['To reveal motion and energy changes', 'To remove variables', 'To hide measurements', 'To stop interaction'],
        correct: 0,
      },
    ],
    Waves: [
      {
        prompt: 'What does wave amplitude describe?',
        answers: ['Wave height or strength', 'Number of planets', 'DNA length only', 'Quiz score'],
        correct: 0,
      },
      {
        prompt: 'What does frequency describe?',
        answers: ['How often a wave repeats', 'How heavy a wave is', 'How old a cell is', 'How bright a planet is'],
        correct: 0,
      },
      {
        prompt: 'Why animate waves in VR?',
        answers: ['To show motion, amplitude, and wavelength spatially', 'To remove patterns', 'To freeze particles forever', 'To hide vibration'],
        correct: 0,
      },
      {
        prompt: 'Sound and light are both studied through what concept?',
        answers: ['Waves', 'Genes', 'Mitochondria', 'Prompting'],
        correct: 0,
      },
    ],
    'Electric Fields': [
      {
        prompt: 'Electric field lines show what?',
        answers: ['Force direction around charges', 'Moon brightness', 'Cell size', 'Student names'],
        correct: 0,
      },
      {
        prompt: 'Opposite electric charges usually do what?',
        answers: ['Attract', 'Always disappear', 'Create DNA', 'Become stars'],
        correct: 0,
      },
      {
        prompt: 'Similar charges usually do what?',
        answers: ['Repel', 'Fuse into water', 'Stop motion', 'Create quizzes'],
        correct: 0,
      },
      {
        prompt: 'What can students select in an electric field VR lab?',
        answers: ['Charges and field lines', 'Only text paragraphs', 'Only attendance data', 'Only login forms'],
        correct: 0,
      },
    ],
  },
  Biology: {
    'Cell Structure': [
      {
        prompt: 'What part of a cell stores genetic instructions?',
        answers: ['Nucleus', 'Keyboard', 'Orbit', 'Magnet'],
        correct: 0,
      },
      {
        prompt: 'What surrounds and protects a cell?',
        answers: ['Cell membrane', 'Solar ring', 'Prompt token', 'Electric outlet'],
        correct: 0,
      },
      {
        prompt: 'Which organelle helps produce usable cell energy?',
        answers: ['Mitochondria', 'Mercury', 'Electron cloud', 'Router'],
        correct: 0,
      },
      {
        prompt: 'Why is a 3D cell lab useful?',
        answers: ['It shows spatial relationships between organelles', 'It hides cell parts', 'It removes labels', 'It turns cells into stars'],
        correct: 0,
      },
    ],
    'DNA & Genes': [
      {
        prompt: 'What shape is DNA commonly modeled as?',
        answers: ['Double helix', 'Flat square', 'Single dot', 'Straight wall'],
        correct: 0,
      },
      {
        prompt: 'Genes are segments of what molecule?',
        answers: ['DNA', 'Water', 'Iron', 'Oxygen'],
        correct: 0,
      },
      {
        prompt: 'What does DNA help encode?',
        answers: ['Biological instructions', 'Planet orbits', 'Wi-Fi passwords', 'Keyboard shortcuts'],
        correct: 0,
      },
      {
        prompt: 'In the Biology VR lab, selecting the helix focuses on what?',
        answers: ['Genetic structure', 'Gravity', 'Neural layers', 'Magnetic poles'],
        correct: 0,
      },
    ],
    Mitochondria: [
      {
        prompt: 'Mitochondria are often linked to what cell process?',
        answers: ['Energy production', 'Planet rotation', 'Electric charges only', 'Prompt writing'],
        correct: 0,
      },
      {
        prompt: 'What molecule is commonly associated with usable cell energy?',
        answers: ['ATP', 'HTML', 'Saturn', 'Quartz'],
        correct: 0,
      },
      {
        prompt: 'Why show mitochondria in VR?',
        answers: ['To connect organelle structure with energy flow', 'To hide organelles', 'To remove metabolism', 'To make planets'],
        correct: 0,
      },
      {
        prompt: 'Mitochondria are found inside what?',
        answers: ['Cells', 'Stars only', 'Network routers', 'Quiz buttons'],
        correct: 0,
      },
    ],
    Ecosystems: [
      {
        prompt: 'An ecosystem includes organisms and what else?',
        answers: ['Their environment', 'Only one cell', 'Only planets', 'Only code'],
        correct: 0,
      },
      {
        prompt: 'A food web shows what?',
        answers: ['Energy relationships between organisms', 'Electron orbitals', 'Moon shadows', 'Prompt tokens'],
        correct: 0,
      },
      {
        prompt: 'Why simulate ecosystems interactively?',
        answers: ['To show how changing one part affects others', 'To make every organism isolated', 'To remove cause and effect', 'To hide biodiversity'],
        correct: 0,
      },
      {
        prompt: 'Producers in ecosystems usually get energy from what?',
        answers: ['Sunlight', 'GitHub', 'VR headsets', 'Magnetic fields'],
        correct: 0,
      },
    ],
  },
  'AI Literacy': {
    'Data Inputs': [
      {
        prompt: 'What is an input in an AI system?',
        answers: ['Data given to the model', 'The final answer only', 'A planet ring', 'A cell membrane'],
        correct: 0,
      },
      {
        prompt: 'Why does data quality matter?',
        answers: ['It affects model output', 'It changes gravity', 'It removes all bias automatically', 'It stops computation'],
        correct: 0,
      },
      {
        prompt: 'What can input tokens represent?',
        answers: ['Pieces of text or data', 'Only planets', 'Only cells', 'Only passwords'],
        correct: 0,
      },
      {
        prompt: 'In the AI VR lab, moving cubes represent what?',
        answers: ['Training signals', 'Cell nuclei', 'Planet moons', 'Friction blocks'],
        correct: 0,
      },
    ],
    'Neural Networks': [
      {
        prompt: 'What is a hidden layer?',
        answers: ['A processing layer between input and output', 'A deleted file', 'A planet orbit', 'A microscope lens'],
        correct: 0,
      },
      {
        prompt: 'What does an output node produce?',
        answers: ['A prediction or response', 'A cell wall', 'A magnetic ring', 'A telescope'],
        correct: 0,
      },
      {
        prompt: 'What do connections between nodes represent?',
        answers: ['Learned relationships or weights', 'Random decoration', 'Planet gravity only', 'DNA bases only'],
        correct: 0,
      },
      {
        prompt: 'Why visualize AI as a network?',
        answers: ['To make data flow easier to understand', 'To hide decisions', 'To replace learning', 'To stop questions'],
        correct: 0,
      },
    ],
    Prompting: [
      {
        prompt: 'What is a prompt?',
        answers: ['An instruction or input given to an AI model', 'A planet orbit', 'A cell organelle', 'A magnetic pole'],
        correct: 0,
      },
      {
        prompt: 'A clearer prompt usually helps produce what?',
        answers: ['More relevant output', 'No output', 'Less context', 'Random gravity'],
        correct: 0,
      },
      {
        prompt: 'Why practice prompting in VR?',
        answers: ['To see input, context, and output flow visually', 'To remove feedback', 'To hide examples', 'To replace thinking'],
        correct: 0,
      },
      {
        prompt: 'Which prompt is more useful?',
        answers: ['Explain with examples for grade 10 students', 'Do it', 'Random', 'Nothing'],
        correct: 0,
      },
    ],
    'AI Ethics': [
      {
        prompt: 'AI ethics asks us to consider what?',
        answers: ['Fairness, privacy, and responsible use', 'Only animation speed', 'Only planet color', 'Only cell size'],
        correct: 0,
      },
      {
        prompt: 'Bias in AI can come from what?',
        answers: ['Training data and design choices', 'Moon phases only', 'Mitochondria only', 'Orbit rings only'],
        correct: 0,
      },
      {
        prompt: 'Why show AI decisions in a simulation?',
        answers: ['To discuss transparency and impact', 'To hide all reasoning', 'To avoid questions', 'To remove human judgment'],
        correct: 0,
      },
      {
        prompt: 'Teachers should use AI literacy lessons to build what?',
        answers: ['Critical and responsible users', 'Blind trust only', 'No discussion', 'Only memorization'],
        correct: 0,
      },
    ],
  },
};

const weeklyProgress = [
  { day: 'Mon', value: 38 },
  { day: 'Tue', value: 52 },
  { day: 'Wed', value: 47 },
  { day: 'Thu', value: 71 },
  { day: 'Fri', value: 83 },
  { day: 'Sat', value: 68 },
  { day: 'Sun', value: 77 },
];

function getSubject(title) {
  return subjects.find((subject) => subject.title === title) ?? subjects[0];
}

const roleProfiles = {
  student: {
    label: 'Student',
    name: 'Maya',
    accessLabel: 'Student Access',
    idLabel: 'Student ID',
    idValue: 'maya.stellar',
    consoleLabel: 'VR student console',
    welcome: 'Welcome back, Maya',
    mission: 'Your learning mission is ready',
  },
  teacher: {
    label: 'Teacher',
    name: 'Ms. Rivera',
    accessLabel: 'Teacher Access',
    idLabel: 'Teacher ID',
    idValue: 'ms.rivera.stem',
    consoleLabel: 'Teacher command center',
    welcome: 'Welcome back, Ms. Rivera',
    mission: 'Your classroom VR session is ready',
  },
};

function Login({ onLogin }) {
  const [role, setRole] = useState('student');
  const profile = roleProfiles[role];

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-10">
      <div className="grid-fade pointer-events-none absolute inset-0 opacity-55" />
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <section className="animate-slide-up">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-pulse/30 bg-pulse/10 px-4 py-2 text-sm font-semibold text-pulse">
            <Sparkles size={16} />
            Immersive learning platform
          </div>
          <h1 className="max-w-3xl font-display text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            Smart Learning <span className="animate-shimmer text-gradient">VR</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
            Explore curriculum through interactive 3D simulations, adaptive quizzes, and an AI tutor built for focused
            study sessions.
          </p>
          <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
            {[
              ['3D labs', 'Four simulation modes'],
              ['AI coach', 'Context-aware help'],
              ['Analytics', 'Progress signals'],
            ].map(([label, value]) => (
              <div key={label} className="glass-subtle rounded-[8px] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/48">{label}</p>
                <p className="mt-2 text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="neon-border animate-float-slow rounded-[8px]">
          <div className="glass rounded-[8px] p-5 sm:p-7">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-plasma">{profile.accessLabel}</p>
                <h2 className="mt-2 font-display text-3xl font-bold text-white">Login</h2>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-[8px] bg-white/10 text-pulse shadow-neon">
                <Lock size={22} />
              </div>
            </div>
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                onLogin(role);
              }}
            >
              <div>
                <span className="mb-2 block text-sm text-white/70">Access Mode</span>
                <div className="grid gap-2 sm:grid-cols-2">
                  {Object.entries(roleProfiles).map(([value, item]) => (
                    <button
                      key={value}
                      type="button"
                      className={`rounded-[8px] border px-4 py-3 text-left transition ${
                        role === value
                          ? 'border-pulse/60 bg-pulse/14 text-pulse shadow-neon'
                          : 'border-white/10 bg-white/7 text-white/64 hover:border-white/24 hover:text-white'
                      }`}
                      onClick={() => setRole(value)}
                    >
                      <span className="block font-semibold">{item.label}</span>
                      <span className="mt-1 block text-xs text-white/48">
                        {value === 'teacher' ? 'Assign and monitor VR learning' : 'Explore labs and quizzes'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">{profile.idLabel}</span>
                <div className="flex items-center gap-3 rounded-[8px] border border-white/12 bg-white/8 px-4 py-3 focus-within:border-pulse/70">
                  <User className="text-white/44" size={18} />
                  <input
                    className="w-full bg-transparent text-white outline-none placeholder:text-white/34"
                    placeholder={profile.idValue}
                    value={profile.idValue}
                    readOnly
                  />
                </div>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/70">Passcode</span>
                <div className="flex items-center gap-3 rounded-[8px] border border-white/12 bg-white/8 px-4 py-3 focus-within:border-pulse/70">
                  <Lock className="text-white/44" size={18} />
                  <input
                    className="w-full bg-transparent text-white outline-none placeholder:text-white/34"
                    type="password"
                    placeholder="********"
                    defaultValue="orbitlab"
                  />
                </div>
              </label>
              <button className="group mt-2 flex w-full items-center justify-center gap-2 rounded-[8px] bg-gradient-to-r from-pulse via-aurora to-plasma px-5 py-4 font-bold text-white shadow-neon transition duration-300 hover:scale-[1.01] hover:shadow-plasma">
                Enter Learning Hub
                <ChevronRight className="transition group-hover:translate-x-1" size={20} />
              </button>
            </form>
            <div className="mt-6 rounded-[8px] border border-mint/18 bg-mint/8 p-4 text-sm leading-6 text-white/72">
              Prototype credentials are pre-filled. One login flow opens role-based workspaces for students and teachers.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Sidebar({ activeView, setActiveView, open, setOpen, role }) {
  const profile = roleProfiles[role];

  return (
    <>
      <button
        className="fixed left-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-[8px] border border-white/14 bg-white/10 text-white backdrop-blur-xl lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-void/86 p-5 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-gradient-to-br from-pulse to-plasma shadow-neon">
              <GraduationCap size={23} />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-white">Smart Learning</p>
              <p className="text-xs text-white/48">{profile.consoleLabel}</p>
            </div>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-[8px] bg-white/8 text-white lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation">
            <X size={18} />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                className={`flex w-full items-center gap-3 rounded-[8px] px-4 py-3 text-left font-semibold transition ${
                  isActive
                    ? 'bg-pulse/16 text-pulse shadow-neon'
                    : 'text-white/66 hover:bg-white/9 hover:text-white'
                }`}
                onClick={() => {
                  setActiveView(item.id);
                  setOpen(false);
                }}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-5 right-5 rounded-[8px] border border-plasma/22 bg-plasma/10 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-plasma">
            {role === 'teacher' ? 'Live Class' : 'Current Streak'}
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-white">{role === 'teacher' ? '32 learners' : '18 days'}</p>
          <p className="mt-1 text-sm text-white/58">
            {role === 'teacher' ? '3 VR sessions ready for guided class delivery.' : 'Next milestone unlocks the Nebula badge.'}
          </p>
        </div>
      </aside>
      {open && <button aria-label="Close navigation overlay" className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}
    </>
  );
}

function Topbar({ activeSubject, role = 'student' }) {
  const profile = roleProfiles[role];

  return (
    <header className="flex flex-col gap-4 rounded-[8px] border border-white/10 bg-white/7 p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pulse">{profile.welcome}</p>
        <h2 className="mt-1 font-display text-3xl font-bold text-white">
          {profile.mission.replace('learning', activeSubject).replace('classroom', activeSubject)}
        </h2>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-white/8 px-4 py-3">
          <Search size={18} className="text-white/46" />
          <input className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/36 sm:w-52" placeholder="Search lessons" />
        </div>
        <button className="flex items-center justify-center gap-2 rounded-[8px] bg-white px-4 py-3 font-bold text-ink transition hover:bg-pulse">
          <Play size={18} />
          Resume
        </button>
      </div>
    </header>
  );
}

function SubtopicPanel({ activeSubject, activeSubtopic, setActiveSubtopic }) {
  const subject = getSubject(activeSubject);

  return (
    <section className="glass rounded-[8px] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mint">Sub materi</p>
          <h3 className="font-display text-2xl font-bold text-white">{subject.labTitle}</h3>
        </div>
        <BookOpen className="text-pulse" size={26} />
      </div>
      <p className="mb-4 text-sm leading-6 text-white/62">{subject.labFocus}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {subject.subtopics.map((topic, index) => (
          <button
            key={topic}
            className={`rounded-[8px] border p-4 text-left transition ${
              activeSubtopic === topic
                ? 'border-pulse/60 bg-pulse/14 shadow-neon'
                : 'border-white/10 bg-white/7 hover:border-pulse/40 hover:bg-pulse/10'
            }`}
            onClick={() => setActiveSubtopic(topic)}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/44">Section {index + 1}</span>
              <Star size={16} className="text-solar" />
            </div>
            <p className="font-semibold text-white">{topic}</p>
            <p className="mt-2 text-sm leading-6 text-white/56">
              Dedicated VR micro-simulation, concept checkpoint, and quiz practice for this section.
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

function VRDevicePanel({ activeSubject }) {
  const [mode, setMode] = useState('Digital VR');
  const [connected, setConnected] = useState(false);

  return (
    <section className="glass rounded-[8px] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pulse">Hybrid VR Access</p>
          <h3 className="font-display text-2xl font-bold text-white">Connect Learning Device</h3>
        </div>
        <div className={`grid h-12 w-12 place-items-center rounded-[8px] ${connected ? 'bg-mint/16 text-mint' : 'bg-white/8 text-pulse'}`}>
          <Wifi size={24} />
        </div>
      </div>
      <p className="text-sm leading-6 text-white/64">
        Smart Learning VR supports two modes: browser-based Digital VR for laptops/tablets and headset mode for immersive
        classroom or home VR sessions.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          { label: 'Digital VR', detail: 'Use keyboard, touch, or mouse', icon: Smartphone },
          { label: 'Headset VR', detail: 'Pair a VR headset or lab device', icon: Rocket },
        ].map((item) => {
          const Icon = item.icon;
          const active = mode === item.label;
          return (
            <button
              key={item.label}
              className={`rounded-[8px] border p-4 text-left transition ${
                active
                  ? 'border-pulse/60 bg-pulse/14 text-white shadow-neon'
                  : 'border-white/10 bg-white/7 text-white/64 hover:border-white/24 hover:text-white'
              }`}
              onClick={() => {
                setMode(item.label);
                setConnected(false);
              }}
            >
              <div className="mb-3 flex items-center gap-3">
                <Icon size={20} className={active ? 'text-pulse' : 'text-white/48'} />
                <span className="font-semibold">{item.label}</span>
              </div>
              <p className="text-sm leading-6 text-white/58">{item.detail}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3 rounded-[8px] border border-white/10 bg-black/16 p-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/44">Current session</p>
          <p className="mt-2 font-display text-xl font-bold text-white">
            {activeSubject} Lab · {mode}
          </p>
          <p className={`mt-1 text-sm ${connected ? 'text-mint' : 'text-white/54'}`}>
            {connected ? 'Device bridge ready for immersive lesson sync.' : 'Ready to launch in browser or connect a VR device.'}
          </p>
        </div>
        <button
          className={`flex items-center justify-center gap-2 rounded-[8px] px-5 py-3 font-bold transition ${
            connected ? 'bg-mint text-ink hover:bg-white' : 'bg-gradient-to-r from-pulse to-plasma text-white shadow-neon hover:scale-[1.01]'
          }`}
          onClick={() => setConnected((current) => !current)}
        >
          <Power size={18} />
          {connected ? 'Connected' : mode === 'Headset VR' ? 'Pair Headset' : 'Launch Digital VR'}
        </button>
      </div>
    </section>
  );
}

function SimulationControlPanel({
  activeSubject,
  activeSubtopic,
  setActiveSubtopic,
  speedMultiplier,
  setSpeedMultiplier,
  guidedMode,
  setGuidedMode,
}) {
  const subject = getSubject(activeSubject);

  return (
    <section className="glass rounded-[8px] p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pulse">Interactive VR Controls</p>
          <h3 className="font-display text-2xl font-bold text-white">{activeSubtopic} Simulation</h3>
        </div>
        <div className="rounded-[8px] border border-mint/20 bg-mint/10 px-4 py-2 text-sm font-semibold text-mint">
          {activeSubject} module
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/44">Choose VR section</p>
          <div className="flex flex-wrap gap-2">
            {subject.subtopics.map((topic) => (
              <button
                key={topic}
                className={`rounded-[8px] border px-3 py-2 text-sm font-semibold transition ${
                  activeSubtopic === topic
                    ? 'border-pulse/60 bg-pulse/14 text-pulse'
                    : 'border-white/10 bg-white/7 text-white/58 hover:border-white/24 hover:text-white'
                }`}
                onClick={() => setActiveSubtopic(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[8px] border border-white/10 bg-black/16 p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Simulation speed</span>
            <span className="font-display text-xl font-bold text-pulse">{speedMultiplier.toFixed(1)}x</span>
          </div>
          <input
            className="w-full accent-cyan-300"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speedMultiplier}
            onChange={(event) => setSpeedMultiplier(Number(event.target.value))}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className={`rounded-[8px] border px-3 py-2 text-sm font-semibold transition ${
                guidedMode ? 'border-mint/60 bg-mint/12 text-mint' : 'border-white/10 bg-white/7 text-white/58'
              }`}
              onClick={() => setGuidedMode((current) => !current)}
            >
              Guided labels {guidedMode ? 'On' : 'Off'}
            </button>
            <button
              className="rounded-[8px] border border-white/10 bg-white/7 px-3 py-2 text-sm font-semibold text-white/70 transition hover:border-white/24 hover:text-white"
              onClick={() => {
                setSpeedMultiplier(1);
                setGuidedMode(true);
              }}
            >
              Reset lab
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeacherConsole({ activeSubject, activeSubtopic }) {
  return (
    <section className="glass rounded-[8px] p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-plasma">Teacher Role</p>
          <h3 className="font-display text-2xl font-bold text-white">Classroom Orchestrator</h3>
        </div>
        <GraduationCap className="text-pulse" size={28} />
      </div>
      <p className="mb-5 text-sm leading-6 text-white/64">
        In this prototype, the teacher is a facilitator: assigning VR modules, launching guided sessions, monitoring
        live engagement, and using analytics to decide follow-up instruction.
      </p>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Assign', `${activeSubject} - ${activeSubtopic}`],
          ['Guide', 'Live VR class mode'],
          ['Monitor', '32 students online'],
          ['Intervene', '6 students need support'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[8px] border border-white/10 bg-white/7 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-white/44">{label}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-white">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MarketTargetPanel() {
  return (
    <section className="glass rounded-[8px] p-5">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mint">Market Target</p>
        <h3 className="mt-1 font-display text-2xl font-bold text-white">STEM Schools and Hybrid Labs</h3>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ['Primary users', 'SMP/SMA/SMK students learning abstract STEM concepts through spatial simulation.'],
          ['Teacher buyers', 'Science and ICT teachers who need guided VR lessons, quiz evidence, and class monitoring.'],
          ['Institution buyers', 'Schools, tutoring centers, and edtech labs adopting hybrid VR without requiring every learner to own a headset.'],
        ].map(([label, text]) => (
          <div key={label} className="rounded-[8px] border border-white/10 bg-white/7 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-pulse">{label}</p>
            <p className="mt-3 text-sm leading-6 text-white/64">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SubjectCards({ activeSubject, setActiveSubject, setActiveView }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
      {subjects.map((subject) => {
        const Icon = subject.icon;
        const active = activeSubject === subject.title;
        return (
          <button
            key={subject.title}
            className={`group min-h-[230px] rounded-[8px] p-[1px] text-left transition duration-300 hover:-translate-y-1 ${
              active ? 'bg-gradient-to-br ' + subject.accent : 'bg-white/12 hover:bg-white/24'
            }`}
            onClick={() => {
              setActiveSubject(subject.title);
              setActiveView('vr');
            }}
          >
            <div className="flex h-full flex-col rounded-[8px] bg-ink/88 p-5 backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <div className={`grid h-12 w-12 place-items-center rounded-[8px] bg-gradient-to-br ${subject.accent} text-white shadow-neon`}>
                  <Icon size={24} />
                </div>
                <span className="rounded-full border border-white/12 px-3 py-1 text-xs font-semibold text-white/64">{subject.modules} modules</span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-white">{subject.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-white/62">{subject.note}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {subject.subtopics.slice(0, 3).map((topic) => (
                  <span key={topic} className="rounded-full border border-white/10 bg-white/7 px-3 py-1 text-xs text-white/58">
                    {topic}
                  </span>
                ))}
              </div>
              <div className="mt-5">
                <div className="mb-2 flex justify-between text-xs text-white/50">
                  <span>Completion</span>
                  <span>{subject.progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full rounded-full bg-gradient-to-r ${subject.accent}`} style={{ width: `${subject.progress}%` }} />
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </section>
  );
}

function Dashboard({
  activeSubject,
  activeSubtopic,
  setActiveSubject,
  setActiveSubtopic,
  setActiveView,
  role,
  speedMultiplier,
  setSpeedMultiplier,
  guidedMode,
  setGuidedMode,
}) {
  const subject = getSubject(activeSubject);

  return (
    <div className="space-y-5">
      <Topbar activeSubject={activeSubject} role={role} />
      <div className="grid gap-5 2xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-5">
          <SubjectCards activeSubject={activeSubject} setActiveSubject={setActiveSubject} setActiveView={setActiveView} />
          {role === 'teacher' && <TeacherConsole activeSubject={activeSubject} activeSubtopic={activeSubtopic} />}
          <MarketTargetPanel />
          <SimulationControlPanel
            activeSubject={activeSubject}
            activeSubtopic={activeSubtopic}
            setActiveSubtopic={setActiveSubtopic}
            speedMultiplier={speedMultiplier}
            setSpeedMultiplier={setSpeedMultiplier}
            guidedMode={guidedMode}
            setGuidedMode={setGuidedMode}
          />
          <div className="glass rounded-[8px] p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mint">Live lesson</p>
                <h3 className="font-display text-2xl font-bold text-white">
                  {subject.labTitle}: {activeSubtopic}
                </h3>
              </div>
              <Rocket className="text-pulse" size={28} />
            </div>
            <VRScene
              activeSubject={activeSubject}
              activeSubtopic={activeSubtopic}
              speedMultiplier={speedMultiplier}
              guidedMode={guidedMode}
            />
          </div>
          <div className="grid gap-5 xl:grid-cols-2">
            <SubtopicPanel
              activeSubject={activeSubject}
              activeSubtopic={activeSubtopic}
              setActiveSubtopic={setActiveSubtopic}
            />
            <VRDevicePanel activeSubject={activeSubject} />
          </div>
        </div>
        <div className="space-y-5">
          <ProgressPanel />
          <QuizPanel compact activeSubject={activeSubject} />
        </div>
      </div>
    </div>
  );
}

function ProgressPanel() {
  return (
    <section className="glass rounded-[8px] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-plasma">Analytics</p>
          <h3 className="font-display text-2xl font-bold text-white">Learning Pulse</h3>
        </div>
        <Activity className="text-mint" size={26} />
      </div>
      <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
        {[
          ['Focus', '92%', 'text-pulse'],
          ['Quiz Avg', '86%', 'text-mint'],
          ['VR Time', '4.8h', 'text-plasma'],
        ].map(([label, value, color]) => (
          <div key={label} className="rounded-[8px] border border-white/10 bg-white/7 p-4">
            <p className="text-sm text-white/54">{label}</p>
            <p className={`mt-2 font-display text-3xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex h-44 items-end gap-2 rounded-[8px] border border-white/10 bg-black/18 p-4">
        {weeklyProgress.map((item) => (
          <div key={item.day} className="flex h-full flex-1 flex-col justify-end gap-2">
            <div className="min-h-4 rounded-t-[8px] bg-gradient-to-t from-aurora via-pulse to-mint shadow-neon transition hover:brightness-125" style={{ height: `${item.value}%` }} />
            <span className="text-center text-xs text-white/46">{item.day}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuizPanel({ compact = false, activeSubject = 'Astronomy', activeSubtopic = 'Solar System' }) {
  const [quizSubject, setQuizSubject] = useState(activeSubject);
  const sections = Object.keys(quizBank[quizSubject] ?? quizBank.Astronomy);
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [answers, setAnswers] = useState({});
  const questions = quizBank[quizSubject]?.[activeSection] ?? quizBank[quizSubject]?.[sections[0]] ?? [];
  const displayQuestions = compact ? questions.slice(0, 2) : questions;

  useEffect(() => {
    setQuizSubject(activeSubject);
  }, [activeSubject]);

  useEffect(() => {
    if (Object.keys(quizBank[quizSubject] ?? {}).includes(activeSubtopic)) {
      setActiveSection(activeSubtopic);
    }
  }, [activeSubtopic, quizSubject]);

  useEffect(() => {
    const nextSections = Object.keys(quizBank[quizSubject] ?? quizBank.Astronomy);
    if (!nextSections.includes(activeSection)) {
      setActiveSection(nextSections[0]);
    }
  }, [activeSection, quizSubject]);

  const score = useMemo(
    () =>
      displayQuestions.reduce((total, question, index) => {
        const answerKey = `${quizSubject}-${activeSection}-${index}`;
        return total + (answers[answerKey] === question.correct ? 1 : 0);
      }, 0),
    [activeSection, answers, displayQuestions, quizSubject],
  );

  return (
    <section className="glass rounded-[8px] p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-solar">Adaptive Quiz</p>
          <h3 className="font-display text-2xl font-bold text-white">{quizSubject} Checkpoint</h3>
        </div>
        <div className="rounded-[8px] border border-solar/22 bg-solar/10 px-4 py-2 text-right">
          <p className="text-xs text-white/48">Score</p>
          <p className="font-display text-xl font-bold text-solar">{score}/{displayQuestions.length}</p>
        </div>
      </div>

      {!compact && (
        <div className="mb-4 flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <button
              key={subject.title}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                quizSubject === subject.title
                  ? 'border-pulse/60 bg-pulse/14 text-pulse'
                  : 'border-white/10 bg-white/7 text-white/60 hover:border-white/24 hover:text-white'
              }`}
              onClick={() => setQuizSubject(subject.title)}
            >
              {subject.title}
            </button>
          ))}
        </div>
      )}

      <div className="mb-5 flex flex-wrap gap-2">
        {sections.map((section) => (
          <button
            key={section}
            className={`rounded-[8px] border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
              activeSection === section
                ? 'border-solar/60 bg-solar/12 text-solar'
                : 'border-white/10 bg-black/12 text-white/52 hover:border-solar/35 hover:text-white'
            }`}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </div>

      <div className={`grid gap-4 ${compact ? '' : 'lg:grid-cols-2 2xl:grid-cols-4'}`}>
        {displayQuestions.map((question, index) => {
          const answerKey = `${quizSubject}-${activeSection}-${index}`;
          return (
          <article key={question.prompt} className="rounded-[8px] border border-white/10 bg-white/7 p-4">
            <p className="mb-4 min-h-[48px] text-sm font-semibold leading-6 text-white">{question.prompt}</p>
            <div className="space-y-2">
              {question.answers.map((answer, answerIndex) => {
                const chosen = answers[answerKey] === answerIndex;
                const correct = question.correct === answerIndex;
                return (
                  <button
                    key={answer}
                    className={`flex w-full items-center justify-between rounded-[8px] border px-3 py-2 text-left text-sm transition ${
                      chosen
                        ? correct
                          ? 'border-mint/60 bg-mint/12 text-mint'
                          : 'border-plasma/60 bg-plasma/12 text-plasma'
                        : 'border-white/10 bg-black/12 text-white/70 hover:border-pulse/45 hover:text-white'
                    }`}
                    onClick={() => setAnswers((current) => ({ ...current, [answerKey]: answerIndex }))}
                  >
                    {answer}
                    {chosen && <CheckCircle2 size={16} />}
                  </button>
                );
              })}
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}

function Analytics({ role = 'student' }) {
  return (
    <div className="space-y-5">
      <Topbar activeSubject="Analytics" role={role} />
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <ProgressPanel />
        <section className="glass rounded-[8px] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pulse">Mastery Map</p>
          <h3 className="mt-1 font-display text-2xl font-bold text-white">Subject Growth</h3>
          <div className="mt-6 space-y-5">
            {subjects.map((subject) => (
              <div key={subject.title}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-white">{subject.title}</span>
                  <span className="text-sm text-white/54">{subject.progress}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full rounded-full bg-gradient-to-r ${subject.accent}`} style={{ width: `${subject.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function AIAssistant({ activeSubject }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'I can explain orbital motion, generate quiz hints, or summarize your VR lab activity.' },
    { role: 'student', text: 'Why does Earth not fly away from the Sun?' },
    { role: 'assistant', text: 'Gravity bends Earth toward the Sun while its forward velocity keeps it continuously falling around the orbit.' },
  ]);
  const [draft, setDraft] = useState('');

  const send = () => {
    if (!draft.trim()) return;
    const userText = draft.trim();
    setMessages((current) => [
      ...current,
      { role: 'student', text: userText },
      {
        role: 'assistant',
        text: `For ${activeSubject}, I would connect that to the current simulation and show it as a visual cause-effect chain.`,
      },
    ]);
    setDraft('');
  };

  return (
    <aside className="glass sticky top-5 hidden max-h-[calc(100vh-2.5rem)] w-80 shrink-0 rounded-[8px] p-4 xl:flex xl:flex-col">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-[8px] bg-gradient-to-br from-plasma to-pulse shadow-neon">
          <Bot size={20} />
        </div>
        <div>
          <p className="font-display font-bold text-white">Nova AI</p>
          <p className="text-xs text-white/48">Study assistant</p>
        </div>
      </div>
      <div className="scrollbar-soft flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`rounded-[8px] p-3 text-sm leading-6 ${message.role === 'assistant' ? 'bg-pulse/10 text-white/78' : 'bg-white/10 text-white'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          className="min-w-0 flex-1 rounded-[8px] border border-white/10 bg-white/8 px-3 py-3 text-sm text-white outline-none placeholder:text-white/34 focus:border-pulse/65"
          placeholder="Ask Nova"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') send();
          }}
        />
        <button className="grid h-12 w-12 shrink-0 place-items-center rounded-[8px] bg-pulse text-ink transition hover:bg-mint" onClick={send} aria-label="Send message">
          <MessageSquareText size={19} />
        </button>
      </div>
    </aside>
  );
}

function AppShell({ initialRole = 'student' }) {
  const [activeView, setActiveView] = useState('dashboard');
  const [activeSubject, setActiveSubject] = useState('Astronomy');
  const [activeSubtopic, setActiveSubtopic] = useState('Solar System');
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [guidedMode, setGuidedMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role] = useState(initialRole);

  useEffect(() => {
    const subject = getSubject(activeSubject);
    if (!subject.subtopics.includes(activeSubtopic)) {
      setActiveSubtopic(subject.subtopics[0]);
    }
  }, [activeSubject, activeSubtopic]);

  const content = {
    dashboard: (
      <Dashboard
        activeSubject={activeSubject}
        activeSubtopic={activeSubtopic}
        setActiveSubject={setActiveSubject}
        setActiveSubtopic={setActiveSubtopic}
        setActiveView={setActiveView}
        role={role}
        speedMultiplier={speedMultiplier}
        setSpeedMultiplier={setSpeedMultiplier}
        guidedMode={guidedMode}
        setGuidedMode={setGuidedMode}
      />
    ),
    vr: (
      <div className="space-y-5">
        <Topbar activeSubject={activeSubject} role={role} />
        <SimulationControlPanel
          activeSubject={activeSubject}
          activeSubtopic={activeSubtopic}
          setActiveSubtopic={setActiveSubtopic}
          speedMultiplier={speedMultiplier}
          setSpeedMultiplier={setSpeedMultiplier}
          guidedMode={guidedMode}
          setGuidedMode={setGuidedMode}
        />
        <VRScene
          activeSubject={activeSubject}
          activeSubtopic={activeSubtopic}
          speedMultiplier={speedMultiplier}
          guidedMode={guidedMode}
        />
        <div className="grid gap-5 xl:grid-cols-2">
          <SubtopicPanel
            activeSubject={activeSubject}
            activeSubtopic={activeSubtopic}
            setActiveSubtopic={setActiveSubtopic}
          />
          <VRDevicePanel activeSubject={activeSubject} />
        </div>
        <SubjectCards activeSubject={activeSubject} setActiveSubject={setActiveSubject} setActiveView={setActiveView} />
      </div>
    ),
    quiz: (
      <div className="space-y-5">
        <Topbar activeSubject="Quiz" role={role} />
        <QuizPanel activeSubject={activeSubject} activeSubtopic={activeSubtopic} />
      </div>
    ),
    analytics: <Analytics role={role} />,
  }[activeView];

  return (
    <div className="min-h-screen">
      <Sidebar activeView={activeView} setActiveView={setActiveView} open={sidebarOpen} setOpen={setSidebarOpen} role={role} />
      <main className="relative min-h-screen px-4 pb-6 pt-20 lg:ml-72 lg:pt-5">
        <div className="grid-fade pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative flex max-w-[1720px] gap-5">
          <section className="min-w-0 flex-1">{content}</section>
          <AIAssistant activeSubject={activeSubject} />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('student');

  return loggedIn ? (
    <AppShell initialRole={role} />
  ) : (
    <Login
      onLogin={(nextRole) => {
        setRole(nextRole);
        setLoggedIn(true);
      }}
    />
  );
}
