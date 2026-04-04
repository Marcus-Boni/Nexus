const enMessages = {
  Metadata: {
    title: "Nexus | Where your agents think together",
    description:
      "Connect Claude Code, Gemini CLI, Codex and more with shared context, localized flows and a local-first workspace.",
  },
  Brand: {
    subtitle: "Where your agents think together",
  },
  LocaleSwitcher: {
    label: "Change language",
    localeNames: {
      en: "English",
      "pt-BR": "Portuguese (Brazil)",
    },
  },
  ThemeToggle: {
    label: "Toggle theme",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  Landing: {
    Navbar: {
      links: {
        features: "Features",
        howItWorks: "How it works",
        graph: "Graph",
      },
      promo: "Local-first orchestration",
      signIn: "Sign in",
      getStarted: "Get started",
      openMenu: "Open menu",
      mobileSubtitle: "Local-first agent workspace",
    },
    Hero: {
      badge: "Local-first multi-agent workspace",
      title: "Make agent handoffs feel structured, fast, and easy to trust.",
      description:
        "Nexus keeps terminals native, captures the context that matters, and turns scattered agent work into one coherent operating layer for your project.",
      primaryCta: "Get started free",
      secondaryCta: "See how it works",
      proofPoint1: "Shared context between agents",
      proofPoint2: "Native terminal orchestration",
      proofPoint3: "Readable project memory",
      stats: {
        agentsOnline: {
          label: "Agents online",
          value: "05",
        },
        contextLinks: {
          label: "Context links",
          value: "128",
        },
        handoffDelay: {
          label: "Handoff delay",
          value: "0s",
        },
      },
      preview: {
        eyebrow: "Live session preview",
        title: "Claude, Gemini and Codex aligned on the same context layer.",
      },
      terminal: {
        header: "NEXUS / shared session",
        line1: "$ nexus session spawn --agent claude-code",
        line2: "context.sync(graph): linked 12 related nodes",
        line3: "handoff(gemini-cli): seeded with schema + notes",
        line4: "codex-cli: applying patch to workspace layout",
        line5: "status: all agents aligned on current objective",
      },
    },
    LogoBar: {
      eyebrow: "Works with",
    },
    FeaturesScroll: {
      eyebrow: "System personality",
      title: "A workspace that feels intentional, readable, and deeply alive.",
      description:
        "Rich visuals only matter when they improve clarity. Each surface below is designed to make agent orchestration easier to scan and easier to trust.",
      feature1: {
        title: "Shared knowledge graph",
        description:
          "Every decision, artifact, and insight is captured as reusable project memory, so the next agent starts informed instead of blind.",
      },
      feature2: {
        title: "Native terminal sessions",
        description:
          "Full PTY sessions keep commands, output, and intent in the same place. No iframe toy terminals or fake command previews.",
      },
      feature3: {
        title: "Automatic context injection",
        description:
          "Relevant session history, extracted decisions, and linked artifacts flow into each new run automatically and at the right time.",
      },
      feature4: {
        title: "Multi-project continuity",
        description:
          "Patterns discovered in one codebase can inform another. Nexus keeps agent work connected at the level teams actually think.",
      },
    },
    HowItWorks: {
      eyebrow: "Workflow",
      title: "The handoff loop is built into the product.",
      description:
        "Nexus gives each agent a focused place to work while keeping the shared thread of reasoning visible and reusable.",
      step1: {
        number: "01",
        tag: "PTY sessions",
        title: "Launch the right agent for the job",
        description:
          "Open Claude Code, Gemini CLI, Codex, or another adapter directly inside Nexus. The terminal stays native, so your workflow does too.",
      },
      step2: {
        number: "02",
        tag: "Knowledge graph",
        title: "Extract decisions while work is happening",
        description:
          "Important outputs become connected context nodes automatically. You keep the flow of the terminal while Nexus keeps the project memory.",
      },
      step3: {
        number: "03",
        tag: "Context injection",
        title: "Start the next handoff with context already attached",
        description:
          "New sessions inherit the decisions, files, and reasoning that matter. Less copy-paste, less restating, more momentum.",
      },
    },
    GraphDemo: {
      eyebrow: "Shared memory",
      title: "Decisions stop disappearing inside terminal scrollback.",
      description:
        "The graph view gives structure to what your agents already know, so context can compound instead of resetting every time you swap tools.",
      chip1: "linked artifacts",
      chip2: "decisions extracted",
      chip3: "handoff context ready",
      svgTitle: "Knowledge graph relationships demo",
      nodes: {
        decisionOne: "Use Drizzle ORM",
        artifactOne: "schema.ts",
        insightOne: "libSQL faster locally",
        decisionTwo: "SQLite in dev",
        errorOne: "Migration failed",
        artifactTwo: "db/index.ts",
      },
      legend: {
        decision: "Decision",
        artifact: "Artifact",
        insight: "Insight",
        error: "Error",
      },
    },
    Testimonials: {
      eyebrow: "Team signal",
      title:
        "Small teams feel faster when the interface keeps everyone in context.",
      testimonial1: {
        quote:
          "We cut our AI handoff time from twenty minutes to zero. Nexus made the workspace feel coordinated instead of chaotic.",
        role: "Staff Engineer, Vercel",
      },
      testimonial2: {
        quote:
          "For the first time, my Claude and Gemini sessions actually feel like they are participating in the same project instead of competing for context.",
        role: "Lead Developer, Linear",
      },
      testimonial3: {
        quote:
          "The graph gives us memory without adding process overhead. That is the rare kind of UX improvement teams notice immediately.",
        role: "CTO, Fathom",
      },
    },
    Footer: {
      features: "Features",
      graph: "Graph",
      getStarted: "Get started",
      copyright: "© 2026 Nexus",
    },
  },
  Auth: {
    Layout: {
      badge: "Secure access",
      quote1: "Where your agents think together.",
      author1: "Nexus tagline",
      quote2: "Context is the new code.",
      author2: "Team Nexus",
      quote3: "One platform. Every agent.",
      author3: "Nexus",
      highlight1: {
        label: "Shared context",
        description:
          "Every session starts with the reasoning that already exists.",
      },
      highlight2: {
        label: "Structured handoffs",
        description:
          "Work moves between agents without losing intent or artifacts.",
      },
      highlight3: {
        label: "Local-first control",
        description:
          "Your workspace stays on your machine while the interface stays polished.",
      },
      copyright: "© 2026 Nexus",
    },
    Login: {
      badge: "Secure sign in",
      title: "Welcome back",
      description: "Sign in to continue your shared agent workspace.",
      email: "Email",
      emailPlaceholder: "you@example.com",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      showPassword: "Show password",
      hidePassword: "Hide password",
      forgotPassword: "Forgot password?",
      submit: "Sign in",
      invalidCredentials: "Invalid email or password",
      registerPrompt: "Don't have an account?",
      registerCta: "Register",
      validation: {
        email: "Enter a valid email",
        password: "Password must be at least 8 characters",
      },
    },
    Register: {
      badge: "Create your workspace",
      title: "Create your account",
      description:
        "Start orchestrating your agents with a workspace that already speaks the same language as the rest of the system.",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@example.com",
      password: "Password",
      passwordPlaceholder: "Min 8 chars",
      confirmPassword: "Confirm password",
      confirmPasswordPlaceholder: "Repeat password",
      showPassword: "Show password",
      hidePassword: "Hide password",
      submit: "Create account",
      loginPrompt: "Already have an account?",
      loginCta: "Sign in",
      serverErrors: {
        invalidInput: "Please review the information and try again.",
        emailAlreadyRegistered: "This email is already registered.",
        userCreationFailed: "We could not create your account right now.",
        generic: "Registration failed",
      },
      validation: {
        name: "Name must be at least 2 characters",
        email: "Enter a valid email",
        passwordLength: "Password must be at least 8 characters",
        passwordNumber: "Password must contain at least one number",
        passwordMismatch: "Passwords do not match",
      },
    },
  },
  App: {
    Layout: {
      nav: {
        dashboard: "Dashboard",
        projects: "Projects",
        workspace: "Workspace",
        graph: "Graph",
      },
      headerTitle: "Workspace",
    },
    Dashboard: {
      title: "Welcome back, {name}",
      subtitle: "Here's your Nexus overview",
      stats: {
        projects: "Your Projects",
        sessions: "Active Sessions",
        nodes: "Context Nodes",
      },
      cta: {
        title: "Create your first project",
        description:
          "Projects group your agent sessions and knowledge graph. Start here.",
        button: "New project - coming in Phase 1",
      },
      roadmap: {
        title: "What's coming",
        item1: "Phase 1 - PTY terminal sessions via WebSocket server",
        item2: "Phase 2 - Knowledge graph builder and context extraction",
        item3: "Phase 3 - Automatic context injection with Anthropic API",
        item4: "Phase 4 - Multi-agent orchestration and conflict resolution",
      },
      fallbackName: "there",
    },
  },
} as const;

export default enMessages;
