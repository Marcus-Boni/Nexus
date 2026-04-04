const ptBRMessages = {
  Metadata: {
    title: "Nexus | Onde seus agentes pensam juntos",
    description:
      "Conecte Claude Code, Gemini CLI, Codex e outros com contexto compartilhado, fluxos localizados e um workspace local-first.",
  },
  Brand: {
    subtitle: "Onde seus agentes pensam juntos",
  },
  LocaleSwitcher: {
    label: "Trocar idioma",
    localeNames: {
      en: "English",
      "pt-BR": "Português (Brasil)",
    },
  },
  ThemeToggle: {
    label: "Alternar tema",
    light: "Claro",
    dark: "Escuro",
    system: "Sistema",
  },
  Landing: {
    Navbar: {
      links: {
        features: "Recursos",
        howItWorks: "Como funciona",
        graph: "Grafo",
      },
      promo: "Orquestração local-first",
      signIn: "Entrar",
      getStarted: "Começar",
      openMenu: "Abrir menu",
      mobileSubtitle: "Workspace local-first para agentes",
    },
    Hero: {
      badge: "Workspace local-first para múltiplos agentes",
      title:
        "Faça handoffs entre agentes parecerem estruturados, rápidos e fáceis de confiar.",
      description:
        "O Nexus mantém os terminais nativos, captura o contexto que importa e transforma trabalho disperso entre agentes em uma camada operacional coesa para o seu projeto.",
      primaryCta: "Começar grátis",
      secondaryCta: "Ver como funciona",
      proofPoint1: "Contexto compartilhado entre agentes",
      proofPoint2: "Orquestração nativa de terminais",
      proofPoint3: "Memória de projeto legível",
      stats: {
        agentsOnline: {
          label: "Agentes online",
          value: "05",
        },
        contextLinks: {
          label: "Links de contexto",
          value: "128",
        },
        handoffDelay: {
          label: "Atraso no handoff",
          value: "0s",
        },
      },
      preview: {
        eyebrow: "Prévia da sessão ao vivo",
        title:
          "Claude, Gemini e Codex alinhados sobre a mesma camada de contexto.",
      },
      terminal: {
        header: "NEXUS / sessão compartilhada",
        line1: "$ nexus session spawn --agent claude-code",
        line2: "context.sync(graph): 12 nós relacionados conectados",
        line3: "handoff(gemini-cli): schema + notas injetados",
        line4: "codex-cli: aplicando patch no layout do workspace",
        line5: "status: todos os agentes alinhados ao objetivo atual",
      },
    },
    LogoBar: {
      eyebrow: "Compatível com",
    },
    FeaturesScroll: {
      eyebrow: "Personalidade do sistema",
      title:
        "Um workspace que parece intencional, legível e profundamente vivo.",
      description:
        "Visual rico só importa quando melhora a clareza. Cada superfície abaixo foi desenhada para tornar a orquestração de agentes mais fácil de escanear e mais fácil de confiar.",
      feature1: {
        title: "Grafo de conhecimento compartilhado",
        description:
          "Cada decisão, artefato e insight vira memória reutilizável do projeto, então o próximo agente começa informado em vez de começar no escuro.",
      },
      feature2: {
        title: "Sessões nativas de terminal",
        description:
          "Sessões PTY completas mantêm comandos, saída e intenção no mesmo lugar. Sem terminais fake em iframe e sem prévias artificiais de comando.",
      },
      feature3: {
        title: "Injeção automática de contexto",
        description:
          "Histórico relevante, decisões extraídas e artefatos relacionados entram em cada nova execução automaticamente e no momento certo.",
      },
      feature4: {
        title: "Continuidade entre projetos",
        description:
          "Padrões descobertos em um codebase podem informar outro. O Nexus mantém o trabalho dos agentes conectado no nível em que times realmente pensam.",
      },
    },
    HowItWorks: {
      eyebrow: "Fluxo de trabalho",
      title: "O loop de handoff já vem embutido no produto.",
      description:
        "O Nexus dá a cada agente um espaço focado para trabalhar enquanto mantém o fio compartilhado de raciocínio visível e reutilizável.",
      step1: {
        number: "01",
        tag: "Sessões PTY",
        title: "Abra o agente certo para o trabalho",
        description:
          "Abra Claude Code, Gemini CLI, Codex ou outro adapter diretamente dentro do Nexus. O terminal continua nativo, então seu fluxo também.",
      },
      step2: {
        number: "02",
        tag: "Grafo de conhecimento",
        title: "Extraia decisões enquanto o trabalho acontece",
        description:
          "Saídas importantes viram nós de contexto conectados automaticamente. Você mantém o fluxo do terminal enquanto o Nexus mantém a memória do projeto.",
      },
      step3: {
        number: "03",
        tag: "Injeção de contexto",
        title: "Comece o próximo handoff com o contexto já anexado",
        description:
          "Novas sessões herdam as decisões, arquivos e raciocínios que importam. Menos copy-paste, menos repetição, mais ritmo.",
      },
    },
    GraphDemo: {
      eyebrow: "Memória compartilhada",
      title: "Decisões deixam de desaparecer no scroll infinito do terminal.",
      description:
        "A visão de grafo dá estrutura ao que seus agentes já sabem, para que o contexto se acumule em vez de reiniciar toda vez que você troca de ferramenta.",
      chip1: "artefatos conectados",
      chip2: "decisões extraídas",
      chip3: "contexto pronto para handoff",
      svgTitle: "Demonstração das relações do grafo de conhecimento",
      nodes: {
        decisionOne: "Usar Drizzle ORM",
        artifactOne: "schema.ts",
        insightOne: "libSQL mais rápido localmente",
        decisionTwo: "SQLite em dev",
        errorOne: "Migration falhou",
        artifactTwo: "db/index.ts",
      },
      legend: {
        decision: "Decisão",
        artifact: "Artefato",
        insight: "Insight",
        error: "Erro",
      },
    },
    Testimonials: {
      eyebrow: "Sinal do time",
      title:
        "Times pequenos ficam mais rápidos quando a interface mantém todo mundo em contexto.",
      testimonial1: {
        quote:
          "Reduzimos nosso tempo de handoff com IA de vinte minutos para zero. O Nexus fez o workspace parecer coordenado em vez de caótico.",
        role: "Staff Engineer, Vercel",
      },
      testimonial2: {
        quote:
          "Pela primeira vez, minhas sessões de Claude e Gemini realmente parecem participar do mesmo projeto em vez de disputar contexto.",
        role: "Lead Developer, Linear",
      },
      testimonial3: {
        quote:
          "O grafo nos dá memória sem adicionar peso de processo. Esse é o tipo raro de melhoria de UX que times percebem imediatamente.",
        role: "CTO, Fathom",
      },
    },
    Footer: {
      features: "Recursos",
      graph: "Grafo",
      getStarted: "Começar",
      copyright: "© 2026 Nexus",
    },
  },
  Auth: {
    Layout: {
      badge: "Acesso seguro",
      quote1: "Onde seus agentes pensam juntos.",
      author1: "Tagline do Nexus",
      quote2: "Contexto é o novo código.",
      author2: "Time Nexus",
      quote3: "Uma plataforma. Todo agente.",
      author3: "Nexus",
      highlight1: {
        label: "Contexto compartilhado",
        description: "Cada sessão começa com o raciocínio que já existe.",
      },
      highlight2: {
        label: "Handoffs estruturados",
        description:
          "O trabalho muda de agente sem perder intenção nem artefatos.",
      },
      highlight3: {
        label: "Controle local-first",
        description:
          "Seu workspace permanece na sua máquina enquanto a interface continua refinada.",
      },
      copyright: "© 2026 Nexus",
    },
    Login: {
      badge: "Login seguro",
      title: "Bem-vindo de volta",
      description:
        "Entre para continuar no seu workspace compartilhado de agentes.",
      email: "Email",
      emailPlaceholder: "voce@exemplo.com",
      password: "Senha",
      passwordPlaceholder: "Digite sua senha",
      showPassword: "Mostrar senha",
      hidePassword: "Ocultar senha",
      forgotPassword: "Esqueceu a senha?",
      submit: "Entrar",
      invalidCredentials: "Email ou senha inválidos",
      registerPrompt: "Ainda não tem conta?",
      registerCta: "Criar conta",
      validation: {
        email: "Digite um email válido",
        password: "A senha deve ter pelo menos 8 caracteres",
      },
    },
    Register: {
      badge: "Crie seu workspace",
      title: "Crie sua conta",
      description:
        "Comece a orquestrar seus agentes com um workspace que já fala a mesma língua do restante do sistema.",
      name: "Nome",
      namePlaceholder: "Seu nome",
      email: "Email",
      emailPlaceholder: "voce@exemplo.com",
      password: "Senha",
      passwordPlaceholder: "Mín. 8 caracteres",
      confirmPassword: "Confirmar senha",
      confirmPasswordPlaceholder: "Repita a senha",
      showPassword: "Mostrar senha",
      hidePassword: "Ocultar senha",
      submit: "Criar conta",
      loginPrompt: "Já tem uma conta?",
      loginCta: "Entrar",
      serverErrors: {
        invalidInput: "Revise as informações e tente novamente.",
        emailAlreadyRegistered: "Este email já está cadastrado.",
        userCreationFailed: "Não foi possível criar sua conta agora.",
        generic: "Falha no cadastro",
      },
      validation: {
        name: "O nome deve ter pelo menos 2 caracteres",
        email: "Digite um email válido",
        passwordLength: "A senha deve ter pelo menos 8 caracteres",
        passwordNumber: "A senha deve conter pelo menos um número",
        passwordMismatch: "As senhas não coincidem",
      },
    },
  },
  App: {
    Layout: {
      nav: {
        dashboard: "Dashboard",
        projects: "Projetos",
        workspace: "Workspace",
        graph: "Grafo",
      },
      headerTitle: "Workspace",
    },
    Dashboard: {
      title: "Bem-vindo de volta, {name}",
      subtitle: "Aqui está a visão geral do seu Nexus",
      stats: {
        projects: "Seus projetos",
        sessions: "Sessões ativas",
        nodes: "Nós de contexto",
      },
      cta: {
        title: "Crie seu primeiro projeto",
        description:
          "Projetos agrupam suas sessões de agentes e o grafo de conhecimento. Comece por aqui.",
        button: "Novo projeto - chegando na Fase 1",
      },
      roadmap: {
        title: "O que vem por aí",
        item1: "Fase 1 - Sessões PTY via servidor WebSocket",
        item2: "Fase 2 - Grafo de conhecimento e extração de contexto",
        item3: "Fase 3 - Injeção automática de contexto com API da Anthropic",
        item4: "Fase 4 - Orquestração multiagente e resolução de conflitos",
      },
      fallbackName: "por aqui",
    },
  },
} as const;

export default ptBRMessages;
