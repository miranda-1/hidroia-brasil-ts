import type { Discipline } from "../types/dac";

export const DISCIPLINES: Discipline[] = [
  {
    id: "ds",
    name: "Ciência de Dados",
    badge: "Dados",
    badgeColor: "var(--cyan)",
    iconName: "Database",
    summary: "A disciplina entra na coleta, tratamento, análise e interpretação dos dados da ANA e do INMET. Como os dados vêm em formato bruto, é necessário limpar, organizar e transformar essas informações em algo útil.",
    topics: [
      "Coleta de dados de chuva, nível dos rios e vazão",
      "Tratamento de dados ausentes ou inconsistentes",
      "Normalização dos valores (Z-Score)",
      "Criação de indicadores como chuva acumulada e média móvel",
      "Análise exploratória para entender padrões",
      "Criação de gráficos e visualizações ricas"
    ],
    targetRoute: "data",
    visualIndication: "Ir para Base de Dados",
    applicationText: "No HidroIA, Ciência de Dados aparece na organização dos dados simulados de chuva, vazão, nível dos rios, criticidade e região. Esses dados alimentam indicadores, gráficos, filtros e a base consolidada."
  },
  {
    id: "aa",
    name: "Análise de Algoritmos",
    badge: "Algoritmos",
    badgeColor: "var(--risk-high)",
    iconName: "TrendingUp",
    summary: "Como o projeto pode lidar com milhares de registros, conceitos de complexidade de tempo e crescimento de funções ajudam a avaliar se a solução será viável conforme o volume de dados aumenta.",
    topics: [
      "Buscar uma estação em uma lista: O(n)",
      "Buscar uma estação em uma tabela hash: O(1) em média",
      "Ordenar registros por data ou criticidade: O(n log n)",
      "Percorrer todas as leituras de uma estação: O(n)",
      "Criação de rankings de anomalias críticas de forma eficiente",
      "Busca por estação, data ou evento fora do padrão"
    ],
    targetRoute: "anomalies",
    visualIndication: "Ir para Anomalias",
    applicationText: "No HidroIA, Análise de Algoritmos aparece na ordenação de anomalias por criticidade, na busca por estações, no ranqueamento de eventos e na avaliação conceitual de complexidade para grandes volumes de dados."
  },
  {
    id: "ed",
    name: "Estruturas de Dados",
    badge: "Estruturas",
    badgeColor: "var(--risk-med)",
    iconName: "Layers",
    summary: "O projeto trabalha com dados organizados por estação, data, variável, região e resultado da IA. Estruturas de Dados mostra como essas informações podem ser armazenadas, acessadas, percorridas e organizadas.",
    topics: [
      "Listas sequenciais para séries temporais",
      "Pilhas para histórico de filtros e ações de drawer",
      "Filas para processamento das leituras dos sensores telemétricos",
      "Listas encadeadas para inserir ou remover leituras inválidas",
      "Árvores para organizar país, região, bacia, estação e leituras",
      "Árvores AVL para consultas eficientes por data e estação"
    ],
    targetRoute: "data",
    visualIndication: "Ir para Base de Dados",
    applicationText: "No HidroIA, Estruturas de Dados aparece na organização dos registros em listas, tabelas, agrupamentos por estação/região e estruturas que permitem percorrer, filtrar e consultar leituras simuladas."
  },
  {
    id: "dig",
    name: "Eletrônica Digital",
    badge: "Hardware",
    badgeColor: "var(--risk-fail)",
    iconName: "Cpu",
    summary: "A disciplina se relaciona à origem dos dados, pois chuva, nível do rio e vazão são medições físicas capturadas por sensores. Esses sinais precisam ser convertidos, armazenados e processados digitalmente.",
    topics: [
      "Representação digital em binário e hexadecimal",
      "Sensores de medição ambiental e registradores de buffer",
      "Conversores Analógico-Digital (ADC)",
      "Armazenamento e transmissão digital de dados",
      "Álgebra de Boole para regras simples de validação de hardware",
      "Portas lógicas para combinar condições de alerta e ruídos"
    ],
    targetRoute: "dashboard",
    visualIndication: "Ir para Dashboard",
    applicationText: "No HidroIA, Eletrônica Digital aparece na origem conceitual dos dados: sensores, sinais, conversão analógico-digital, telemetria, ruídos e falhas de leitura."
  },
  {
    id: "ppd",
    name: "Programação Paralela e Distribuída",
    badge: "Escalabilidade",
    badgeColor: "var(--risk-crit)",
    iconName: "Zap",
    summary: "O projeto pode processar dados de várias estações, regiões, variáveis e períodos ao mesmo tempo. Em vez de analisar tudo de forma sequencial, o processamento pode ser distribuído para ganho de performance.",
    topics: [
      "Processos e threads para analisar estações simultaneamente",
      "Paralelismo de dados por região, estação ou período histórico",
      "CUDA, GPU e PyCUDA para operações matemáticas e PCA",
      "Soma de prefixos paralela para chuva acumulada rápida",
      "Métricas como tempo de execução, speedup, eficiência e escalabilidade",
      "Programação distribuída para consolidar resultados de bacias federais"
    ],
    targetRoute: "ai",
    visualIndication: "Ir para Metodologia",
    applicationText: "No HidroIA, Programação Paralela e Distribuída aparece como possibilidade de processar múltiplas estações, regiões e janelas temporais simultaneamente, melhorando escalabilidade em uma versão futura."
  },
  {
    id: "gp",
    name: "Gerência de Projetos em TI",
    badge: "Gestão",
    badgeColor: "oklch(0.70 0.12 280)",
    iconName: "Calendar",
    summary: "A disciplina entra no planejamento, execução e controle da solução tecnológica. O projeto precisa de escopo, prazos, riscos, custos, qualidade, comunicação e acompanhamento das entregas.",
    topics: [
      "PMBOK para estruturar escopo, tempo, custos, riscos e qualidade",
      "Gerenciamento de projeto de software e ciclo de vida",
      "Definição de funcionalidades, requisitos e marcos",
      "Gerenciamento de riscos como instabilidade na coleta de dados",
      "Scrum para organizar o desenvolvimento do protótipo em sprints",
      "Planejamento de apresentações, documentação e handoff"
    ],
    targetRoute: undefined,
    visualIndication: "Aplicação transversal",
    applicationText: "No HidroIA, Gerência de Projetos em TI aparece no planejamento do escopo, organização das entregas, controle de riscos, qualidade, comunicação e preparação da apresentação acadêmica."
  },
  {
    id: "aut",
    name: "Autonomia Intelectual do Estudante",
    badge: "Autonomia",
    badgeColor: "var(--risk-low)",
    iconName: "Shield",
    summary: "A disciplina entra porque o grupo precisou pesquisar, compreender e selecionar conhecimentos técnicos e socioambientais para construir uma proposta própria, sem depender apenas de conteúdos prontos.",
    topics: [
      "Controle ativo do próprio aprendizado e tomada de decisões",
      "Pesquisa profunda sobre dados telemétricos e IA não supervisionada",
      "Gestão do tempo para cumprir as metas acadêmicas",
      "Pensamento crítico sobre limitações e premissas do sistema",
      "Responsabilidade ética ao tratar o sistema como apoio, não substituto"
    ],
    targetRoute: undefined,
    visualIndication: "Base conceitual do projeto",
    applicationText: "No HidroIA, Autonomia Intelectual aparece na pesquisa ativa, tomada de decisão, estudo das tecnologias, entendimento das limitações do protótipo e responsabilidade ética no uso de dados e IA."
  }
];
