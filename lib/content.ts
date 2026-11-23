/** Prefix a /public asset with the deployment base path (next/link does this for routes only). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const profile = {
  name: "Mounir Chemloul",
  role: "AI & Software Engineer",
  location: "Algiers, Algeria",
  email: "chemloulmounir@gmail.com",
  github: "https://github.com/MounZ17",
  linkedin: "https://www.linkedin.com/in/mounir-chemloul",
  cv: "/cv/Mounir_Chemloul_CV.pdf",
};

/** Each project lives inside its own visual environment. */
export type ThemeKind = "clinic" | "orbit" | "endoscopy" | "blueprint" | "radar" | "cartography" | "network";

export interface Theme {
  kind: ThemeKind;
  /** Short name of the environment, shown as a label. */
  label: string;
  /** Environment background, text, secondary text, accent and line colours. */
  bg: string;
  ink: string;
  muted: string;
  accent: string;
  line: string;
  /** A readable shade of the accent for text and rules on white. */
  tone: string;
  /** The same, for text and rules on the dark site background. */
  toneDark: string;
  /** Whether the environment is dark (drives contrast of overlays). */
  dark: boolean;
}

export interface Media {
  src: string;
  alt: string;
  caption: string;
  wide?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  /** Where / for whom it was built. */
  context: string;
  /** Leave empty when unknown — never guess dates. */
  year: string;
  role: string;
  domain: string;
  summary: string;
  challenge: string;
  approach: string[];
  outcome: string;
  metrics: { value: string; label: string }[];
  highlights: string[];
  stack: string[];
  team: string;
  links: { label: string; href: string }[];
  media: Media[];
  theme: Theme;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "medboard",
    title: "MedBoard",
    context: "Independent product",
    year: "2025 – 2026",
    role: "Product design & full-stack engineering",
    domain: "Multi-tenant SaaS · Healthcare",
    summary:
      "A multi-tenant SaaS for medical practices — patient intake, records, prescriptions and a live waiting room — with every clinic isolated in its own PostgreSQL schema.",
    challenge:
      "In a real practice, a large share of consultation time was disappearing into paperwork. The goal: a doctor opens a patient file that is already prepared, and several clinics can share one platform without any risk of data crossing between them.",
    approach: [
      "Patients answer a symptom questionnaire before they are seen; their answers feed directly into the medical record.",
      "The doctor's workspace is built in Next.js, React and Tailwind: calendar, live waiting room, patient files, prescriptions, stock and statistics, on a Django REST API secured with JWT.",
      "With django-tenants, every clinic lives in its own PostgreSQL schema behind its own subdomain. Even a badly filtered query cannot leak one clinic's patients into another — the database enforces the separation, not the application code.",
      "Clinical risk stays in view: allergies, history and ongoing treatments sit in a permanent banner on every patient file. Patient identifiers are random tokens rather than hashes that could be recomputed from someone's identity.",
    ],
    outcome:
      "A production-ready stack shipped with Docker Compose — Postgres 16, Gunicorn, Next.js and nginx with TLS — designed and built end to end by one engineer.",
    metrics: [
      { value: "1 schema", label: "per clinic, isolation enforced by the database" },
      { value: "6", label: "clinical modules in one workspace" },
      { value: "End-to-end", label: "product design, build and deployment" },
    ],
    highlights: [
      "Schema-per-tenant isolation with django-tenants on PostgreSQL",
      "Pre-consultation questionnaire that feeds the medical record",
      "Prescriptions, waiting room, stock and statistics in one dashboard",
      "Dockerised production stack behind nginx with TLS",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Django REST Framework", "PostgreSQL", "django-tenants", "JWT", "Docker", "nginx"],
    team: "Designed and built solo",
    links: [],
    media: [
      {
        src: "/media/medboard-patient-file.png",
        alt: "MedBoard patient file with a red allergies banner, ongoing treatments, history and tabs for records, prescriptions and forms",
        caption: "The patient file — allergies, ongoing treatments and history stay pinned above every tab. Demo data; all patients are fictional.",
        wide: true,
      },
      {
        src: "/media/medboard-dashboard.png",
        alt: "MedBoard dashboard with waiting-patient, total-patient and appointment counters, the live waiting list and a month calendar",
        caption: "The doctor's dashboard and live waiting room.",
      },
      {
        src: "/media/medboard-calendar.png",
        alt: "MedBoard weekly calendar with colour-coded appointments",
        caption: "The weekly appointment calendar.",
      },
    ],
    theme: {
      kind: "clinic",
      label: "Clinical SaaS",
      bg: "#e6efee",
      ink: "#0c2f31",
      muted: "#4c6b6c",
      accent: "#0f5b61",
      line: "#e5484d",
      tone: "#0f5b61",
      toneDark: "#5cc8cd",
      dark: false,
    },
    featured: true,
  },
  {
    slug: "urban-change-detection",
    title: "Urban Change Detection",
    context: "Algerian Space Agency (ASAL) · M.Sc. thesis",
    year: "2022 – 2023",
    role: "Deep learning research & engineering",
    domain: "Remote sensing · Deep learning",
    summary:
      "Detecting what changed in a city between two satellite images, with a Siamese VGG-16 and attention that outperforms the baseline on every test pair.",
    challenge:
      "Given two aerial images of the same place taken years apart, identify exactly which pixels changed — new buildings, cleared land, new roads — reliably enough to support urban monitoring.",
    approach: [
      "Built and benchmarked two architectures on SYSU-CD, a dataset of 20,000 aerial image pairs at 0.5 m per pixel.",
      "The first fine-tunes Xception as a change classifier. The second — the strongest — is a Siamese VGG-16 feature extractor sharpened by CBAM channel-and-spatial attention.",
      "A Euclidean distance map compares the two dates, and deep supervision (DSLayer) guides training at several depths of the network.",
    ],
    outcome:
      "The attention model beat the plain VGG-16 baseline on precision, recall and F1 on every test pair, reaching up to 93.7% F1 and 87.9% validation accuracy.",
    metrics: [
      { value: "93.7%", label: "F1 on test pairs (vs. 88.5% baseline)" },
      { value: "87.9%", label: "validation accuracy after 50 epochs" },
      { value: "20k", label: "image pairs at 0.5 m / pixel" },
    ],
    highlights: [
      "Two architectures designed, trained and benchmarked",
      "CBAM attention on a Siamese VGG-16 backbone",
      "Deep supervision for more stable training",
      "Validated on real Google Earth image pairs",
    ],
    stack: ["Python", "TensorFlow / Keras", "VGG-16", "Xception", "CBAM", "Google Colab"],
    team: "With Elias Ferdji · supervised by Dr. M. Iftene",
    links: [
      { label: "Read the thesis (PDF, French)", href: "https://github.com/MounZ17/Change-detection-project/blob/main/Change%20detection.pdf" },
    ],
    media: [
      {
        src: "/media/change-detection.jpg",
        alt: "Satellite image of a campus next to the predicted black-and-white change mask",
        caption: "Model output on a Google Earth pair: the image (left) and the predicted change mask (right).",
      },
    ],
    theme: {
      kind: "orbit",
      label: "Earth observation",
      bg: "#081325",
      ink: "#e8f0ff",
      muted: "#8aa0c4",
      accent: "#f5a524",
      line: "#5ad1ff",
      tone: "#a8650a",
      toneDark: "#f5b546",
      dark: true,
    },
  },
  {
    slug: "gi-lesion-detection",
    title: "GI Lesion Detection",
    context: "USTHB · M.Sc. research implementation",
    year: "2021 – 2022",
    role: "Computer vision engineering",
    domain: "Medical imaging · Computer vision",
    summary:
      "Implementing a published research pipeline that isolates disease regions — ulcers, bleeding, polyps — in wireless capsule endoscopy images.",
    challenge:
      "Reproduce Sharif et al. (2019), which detects gastrointestinal diseases in capsule endoscopy frames by fusing deep CNN features with geometric ones — starting from the paper's equations, not from an existing library.",
    approach: [
      "Contrast stretching, top-hat and bottom-hat morphology bring out bright and dark structures; a median filter removes noise.",
      "The image moves to CIELAB, where statistics on the a/b chrominance planes — fused, then thresholded by mean deviation and conditional probability — separate lesions from healthy tissue.",
      "For each segmented lesion, geometric descriptors (area, major and minor axes, orientation, eccentricity) build the feature matrix consumed by the classifier.",
    ],
    outcome:
      "A complete classical computer-vision segmentation pipeline, written from the equations and ready for fusion with VGG-16 / VGG-19 deep features.",
    metrics: [
      { value: "5", label: "geometric descriptors per lesion" },
      { value: "CIELAB", label: "chrominance-based segmentation" },
      { value: "From paper", label: "pipeline implemented from the equations" },
    ],
    highlights: [
      "Full classical CV pipeline written from the equations",
      "CIELAB chrominance statistics for robust segmentation",
      "Geometric lesion descriptors ready for CNN feature fusion",
    ],
    stack: ["Python", "NumPy", "OpenCV", "Jupyter", "VGG-16 / VGG-19"],
    team: "With Mazigh Djillali & Elias Ferdji · supervised by I. Setitra",
    links: [{ label: "Code on GitHub", href: "https://github.com/MounZ17/Geometric-features-based-gastrointestinal-tract-diseases-detection" }],
    media: [],
    theme: {
      kind: "endoscopy",
      label: "Capsule endoscopy",
      bg: "#14080c",
      ink: "#fbe9ee",
      muted: "#c08a98",
      accent: "#ff6b8a",
      line: "#6ff0d4",
      tone: "#c2334f",
      toneDark: "#ff8aa3",
      dark: true,
    },
  },
  {
    slug: "3d-reconstruction",
    title: "3D Reconstruction",
    context: "USTHB · Visual computing",
    year: "",
    role: "Computer vision engineering",
    domain: "Multi-view geometry",
    summary:
      "From two photographs to a 3D point cloud: camera calibration, SIFT matching, epipolar geometry and triangulation in Python.",
    challenge:
      "Recover the 3D structure of an object from just two photographs — with every step of the geometry made explicit rather than hidden behind a black-box reconstruction tool.",
    approach: [
      "Checkerboard shots calibrate the camera, recovering its intrinsic matrix and distortion coefficients.",
      "On a stereo pair, SIFT keypoints are matched with a brute-force matcher filtered by Lowe's ratio test.",
      "The essential matrix is estimated from normalised matches and decomposed into its four candidate poses to recover the camera motion; linear triangulation then lifts every correspondence into 3D.",
    ],
    outcome: "A working two-view reconstruction pipeline whose output is rendered as a 3D point cloud.",
    metrics: [
      { value: "2 → 3D", label: "two photographs to a point cloud" },
      { value: "4", label: "candidate poses disambiguated" },
      { value: "SIFT", label: "matching filtered by Lowe's ratio test" },
    ],
    highlights: [
      "Camera calibration from a checkerboard",
      "SIFT + ratio-test matching between the two views",
      "Essential matrix, pose recovery and linear triangulation",
    ],
    stack: ["Python", "OpenCV", "NumPy", "Matplotlib"],
    team: "Individual project",
    links: [{ label: "Code on GitHub", href: "https://github.com/MounZ17/3D-reconstruction" }],
    media: [
      {
        src: "/media/3d-comparaison.jpeg",
        alt: "Two photos of a dragon figurine joined by hundreds of coloured lines between matching SIFT keypoints",
        caption: "SIFT correspondences between the two views — the raw material for triangulation.",
        wide: true,
      },
    ],
    theme: {
      kind: "blueprint",
      label: "Stereo vision",
      bg: "#0c2a5b",
      ink: "#eaf2ff",
      muted: "#9db8e6",
      accent: "#ffd166",
      line: "#9cc7ff",
      tone: "#1f4fd1",
      toneDark: "#8fb0ff",
      dark: true,
    },
  },
  {
    slug: "air-traffic-controller",
    title: "Air Traffic Controller",
    context: "USTHB · Distributed systems",
    year: "",
    role: "Software engineering",
    domain: "Distributed systems",
    summary:
      "A distributed flight-management system in Java RMI: one server owns the airspace, many controller clients manage flights remotely.",
    challenge:
      "Let several air-traffic controllers work on the same airspace at once, each from their own machine, while a single authority keeps the shared state consistent.",
    approach: [
      "Controllers connect as clients to a central server that owns the state of the airspace.",
      "Flights are managed through remote method calls with Java RMI, against a shared module of remote interfaces.",
      "The code is split into client, server and shared-interface modules, each packaged as a runnable JAR.",
    ],
    outcome: "A clean client / server / contract architecture, deployable as three independent artefacts.",
    metrics: [
      { value: "3", label: "modules: client, server, shared contracts" },
      { value: "RMI", label: "remote method invocation" },
      { value: "N : 1", label: "controller clients per airspace server" },
    ],
    highlights: [
      "Client / server / shared-interface architecture",
      "Remote method invocation over Java RMI",
      "Packaged as runnable JARs",
    ],
    stack: ["Java", "Java RMI", "Eclipse"],
    team: "Individual project",
    links: [{ label: "Code on GitHub", href: "https://github.com/MounZ17/Air-traffic-controller" }],
    media: [],
    theme: {
      kind: "radar",
      label: "Air traffic control",
      bg: "#03140c",
      ink: "#d9ffe9",
      muted: "#6fae8a",
      accent: "#c6ff8a",
      line: "#3ddc84",
      tone: "#13804a",
      toneDark: "#5be39a",
      dark: true,
    },
  },
  {
    slug: "usthb-vis",
    title: "USTHB Campus Vis",
    context: "USTHB · Data visualisation",
    year: "",
    role: "Front-end & data visualisation",
    domain: "Data visualisation · GIS",
    summary: "An interactive campus map showing which rooms are busy, when, and for what.",
    challenge:
      "Room occupancy on a large campus lives in timetables that are hard to read at a glance. The aim: make campus logistics visible on the map itself.",
    approach: [
      "The USTHB campus geometry is encoded in GeoJSON and rendered in the browser with D3.js.",
      "Pick an academic year and click any room to see its time slots for the day and the activities scheduled there.",
    ],
    outcome: "Campus logistics that can be read at a glance, directly on the map.",
    metrics: [
      { value: "GeoJSON", label: "campus geometry, drawn with D3.js" },
      { value: "Per room", label: "daily schedule on click" },
      { value: "Per year", label: "academic-year filters" },
    ],
    highlights: ["Campus geometry encoded in GeoJSON", "Room-level schedules on click", "Filters by academic year"],
    stack: ["JavaScript", "D3.js", "GeoJSON", "HTML / CSS"],
    team: "Individual project",
    links: [{ label: "Code on GitHub", href: "https://github.com/MounZ17/Data_Viz_Project" }],
    media: [
      {
        src: "/media/usthb-vis.png",
        alt: "Dashboard with a green campus map and orange buildings, a sidebar and a time-slot panel",
        caption: "The campus dashboard.",
      },
    ],
    theme: {
      kind: "cartography",
      label: "Cartography",
      bg: "#f2ede0",
      ink: "#1f3a32",
      muted: "#6b7a66",
      accent: "#e4572e",
      line: "#c7bc9f",
      tone: "#c2410c",
      toneDark: "#ff8f62",
      dark: false,
    },
  },
  {
    slug: "usthbook",
    title: "USTHBook",
    context: "USTHB · B.Sc. thesis",
    year: "2020 – 2021",
    role: "Full-stack web development",
    domain: "Education · Web",
    summary:
      "An education-focused social network shaped like the university itself, for students, teachers and administrators.",
    challenge:
      "Communication between teachers and students was scattered across channels. The idea: a social network whose structure mirrors the university — every faculty, section and group gets its own feed.",
    approach: [
      "Modelled the system in UML: use cases for students, teachers and administrators, sequence diagrams and the relational schema.",
      "Built with Django and MySQL behind a Semantic UI front end: profiles, section and group feeds, posts and private messaging.",
    ],
    outcome: "A working platform where teachers reach their students directly, through feeds that follow the university's own structure.",
    metrics: [
      { value: "3", label: "roles with distinct views" },
      { value: "3", label: "feed levels: faculty, section, group" },
      { value: "UML", label: "fully modelled before build" },
    ],
    highlights: ["Student, teacher and admin roles", "Feeds per faculty, section and group", "Private messaging between members"],
    stack: ["Python", "Django", "MySQL", "Semantic UI", "UML"],
    team: "Team project · B.Sc. thesis",
    links: [{ label: "Read the report (PDF, French)", href: "https://github.com/MounZ17/USTHBOOK/blob/main/USTHBook.pdf" }],
    media: [
      {
        src: "/media/usthbook.png",
        alt: "USTHBook landing page reading 'Bienvenue sur USTHBook — Le réseau social de l'USTHB'",
        caption: "The landing page.",
      },
    ],
    theme: {
      kind: "network",
      label: "Social platform",
      bg: "#efedff",
      ink: "#1c1760",
      muted: "#6a65a8",
      accent: "#5b4cf0",
      line: "#c3bdff",
      tone: "#5b4cf0",
      toneDark: "#a99eff",
      dark: false,
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export interface Role {
  org: string;
  title: string;
  period: string;
  location: string;
  points: string[];
  project?: string;
}

export const experience: Role[] = [
  {
    org: "Algérie Poste — Headquarters",
    title: "AI & Software Engineer",
    period: "Nov 2023 — Present",
    location: "Algiers",
    points: [
      "AI-powered anti-money-laundering prototype improving detection of suspicious transactions",
      "Queue-management prototype using YOLO to optimise customer flow and reduce waiting times",
      "Computer-vision access control for personnel and vehicles (proof of concept)",
      "Mobile app for ATM client-return management with geolocation",
      "Mentored interns' final-year projects: video anomaly detection, cash-flow prediction, registration platforms",
      "Organised and mentored at the InnovPost Hackathon",
    ],
  },
  {
    org: "Algerian Space Agency (ASAL)",
    title: "Deep Learning Intern",
    period: "Sep 2022 — Jul 2023",
    location: "Algiers",
    points: ["Urban change detection from Earth-observation imagery with deep learning"],
    project: "urban-change-detection",
  },
];

export const education = [
  { degree: "M.Sc. Computer Science — Visual Computing", school: "USTHB", period: "2021 — 2023" },
  { degree: "B.Sc. Computer Science", school: "USTHB", period: "2017 — 2021" },
];

export const expertise: { area: string; items: string[] }[] = [
  { area: "Computer vision", items: ["OpenCV", "YOLO", "CNNs & attention", "Segmentation", "Multi-view geometry"] },
  { area: "Machine learning", items: ["PyTorch", "TensorFlow", "Hugging Face", "scikit-learn", "LangChain"] },
  { area: "Front end", items: ["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS"] },
  { area: "Back end", items: ["Django", "Django REST Framework", "PostgreSQL", "MySQL", "Java RMI"] },
  { area: "Infrastructure", items: ["Docker", "nginx", "Git"] },
  { area: "Data", items: ["Python", "NumPy", "Pandas", "Matplotlib", "D3.js"] },
];
