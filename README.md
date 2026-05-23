# 🌊 HidroIA Brasil

O **HidroIA Brasil** é uma plataforma acadêmica inovadora de monitoramento hídrico e análise hidrometeorológica por telemetria. Desenvolvido como um protótipo *frontend-only* para o **DAC — Desafio de Articulação de Competências** do 5º semestre do curso de Ciência da Computação, o projeto atua como um simulador inteligente SaaS de alta fidelidade visual. 

A plataforma simula a aplicação de algoritmos de Inteligência Artificial Não Supervisionada para segmentar perfis de comportamento das bacias hidrográficas brasileiras, detectar anomalias críticas de medição e apoiar decisões da Defesa Civil.

---

### 🛡️ Badges de Desenvolvimento
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Frontend Only](https://img.shields.io/badge/Natureza-Frontend%20Only-00C5FF?style=for-the-badge)
![Academic Project](https://img.shields.io/badge/Escopo-Projeto%20Acad%C3%AAmico-FF007F?style=for-the-badge)
![Dados Simulados](https://img.shields.io/badge/Dados-Simulados%20%2F%20Mockados-orange?style=for-the-badge)

---

## 📌 Visão Geral

O principal propósito do **HidroIA Brasil** é demonstrar como o ecossistema tecnológico e conceitual de Ciência da Computação pode responder a demandas reais de prevenção de desastres socioambientais, saneamento e gestão de águas no Brasil. Suas metas principais incluem:

*   **Visualização de Dados Hidrológicos**: Transformar séries temporais de chuva (pluviometria) e níveis de água (fluviometria) simulados em painéis interativos ricos.
*   **Representação Conceitual de IA**: Demonstrar visualmente a aplicação de algoritmos de Ciência de Dados (redução de dimensionalidade, agrupamento e detecção de *outliers*).
*   **Apoio a Decisões Socioambientais**: Traduzir dados numéricos complexos em planos de mitigação práticos baseados em criticidade de risco.
*   **Articulação Intelectual**: Integrar de maneira harmônica as competências adquiridas nas disciplinas do 5º semestre letivo.

---

## 🖼️ Preview / Interface

A plataforma é projetada com uma estética escura (*dark mode* premium), utilizando uma sofisticada paleta de cores baseada no espaço **OKLCH**, com acentos em ciano neon. Painéis elevados com transparência de vidro e desfoque (*backdrop blur*) criam um forte apelo SaaS tecnológico de alto nível.

> 📸 **Visualização do Painel Principal**  
> Adicione aqui um print da tela principal do Dashboard:  
> `docs/preview-dashboard.png`

---

## ⚙️ Funcionalidades

O sistema conta com um conjunto completo de painéis simulados operacionais:

1.  **Página Inicial (Landing Page)**: Apresentação comercial do projeto, destacando a justificativa acadêmica, limitações e pilares metodológicos de IA.
2.  **Dashboard Nacional**: Monitoramento em tempo real com mapa interativo do Brasil e cards KPI dinâmicos por estação.
3.  **Mapa do Brasil com Sensores**: Mapa vetorial preciso do Brasil com contorno detalhado dos 27 estados e pins de sensores animados com efeito *glow* neon em caso de risco crítico.
4.  **Análise de Clusters**: Dispersão interativa que demonstra a classificação hidrometeorológica e a redução de dimensionalidade PCA.
5.  **Detecção de Anomalias**: Tabela rankeada exibindo desvios detectados e explicando o score de anomalia do modelo.
6.  **Metodologia de IA**: Diagrama de fluxo e documentação matemática das equações e arquitetura lógica que inspiram a plataforma.
7.  **Recomendações de Mitigação**: Planos de ação de contingência gerados de forma preditiva para a Defesa Civil com base na estação selecionada.
8.  **Base de Dados Consolidada**: Repositório completo de logs históricos simulados com busca textual dinâmica e **Exportação de arquivos CSV** válidos.
9.  **Articulação com o DAC**: Tela contendo o mapeamento detalhado da transversalidade do projeto com o currículo do semestre.

---

## 🤖 Conceitos de IA Representados

A inteligência analítica demonstrada na interface do **HidroIA Brasil** é embasada em técnicas consolidadas de Ciência de Dados, simuladas no frontend de maneira logicamente consistente:

| Conceito Representado | Algoritmo Inspirador | Função no Protótipo |
| :--- | :--- | :--- |
| **Aprendizado Não Supervisionado** | N/A | Classificação e extração de padrões de dados de telemetria sem necessidade de rótulos prévios de treinamento. |
| **Redução de Dimensionalidade** | **PCA** *(Principal Component Analysis)* | Redução de um vetor de atributos de 10 parâmetros hidrometeorológicos em 2 componentes principais bidimensionais (**PC1** e **PC2**) para visualização. |
| **Agrupamento Hidrológico** | **K-Means** | Agrupamento dos padrões ambientais em $K=4$ perfis ou *clusters* bem delineados (Seca Crônica, Comportamento Normal, Transição e Cheia Sazonal). |
| **Detecção de Anomalias** | **Isolation Forest** | Isolamento de medições atípicas em florestas de decisão, computando um score de anomalia que varia de `0.0` a `1.0`. Scores acima de `0.85` geram alertas severos. |
| **Outliers de Densidade (Falha)** | **DBSCAN** | Isolamento de medições espaciais isoladas (Cluster -1) para identificar possíveis falhas de leitura mecânica ou eletrônica de hardware dos sensores telemétricos de campo. |

> [!NOTE]  
> Todas as inferências de ML, dispersões de clusters e detecção de incidentes exibidas nos gráficos são geradas deterministicamente via mockagem estática estruturada, refletindo cenários científicos realistas do território nacional.

---

## 📺 Telas do Sistema

### 1. Página Inicial (`src/pages/Landing.tsx`)
Apresenta o projeto, a justificativa e os pilares de IA. Conta com um mapa compacto do Brasil e uma caixa amarela permanente listando as limitações éticas do simulador.

### 2. Dashboard Nacional (`src/pages/Dashboard.tsx`)
A central de controle do protótipo. Permite clicar diretamente em qualquer um dos 8 sensores de referência no mapa do Brasil para atualizar instantaneamente o painel com as leituras de vazão, nível, histórico de chuvas e subestações da bacia ativa.

### 3. Análise de Clusters (`src/pages/Clustering.tsx`)
Visualização gráfica bidimensional do espalhamento PCA. Cartões informativos detalham o perfil de cada um dos clusters e exibem mini-gráficos (*sparklines*) da dinâmica interna dos dados.

### 4. Detecção de Anomalias (`src/pages/Anomalies.tsx`)
Lista e rankeia os incidentes mais severos por score de isolamento. Explica didaticamente como o pipeline de IA diferencia uma inundação real de um transdutor danificado em campo.

### 5. Metodologia de IA (`src/pages/Methodology.tsx`)
Documentação do pipeline de dados em 7 etapas e do vetor de características composto pelos 10 atributos de telemetria. Atua como o material técnico explicativo para a banca de avaliação.

### 6. Recomendações de Mitigação (`src/pages/Recommendations.tsx`)
Apresenta ações sugeridas de contingência e mitigação para a Defesa Civil e órgãos municipais, demonstrando a utilidade social direta do sistema analítico.

### 7. Base de Dados Consolidada (`src/pages/Database.tsx`)
Repositório histórico unificado de registros ANA/INMET simulados. Possui busca textual dinâmica, filtros por criticidade de risco e um botão de exportação que gera arquivos CSV de verdade no computador do usuário.

### 8. Articulação com o DAC (`src/pages/DacArticulation.tsx`)
Apresenta a listagem e conexão técnica das disciplinas ministradas no 5º semestre do curso com as escolhas práticas de engenharia do projeto.

---

## 🎓 Articulação com o DAC

O **HidroIA Brasil** integra os saberes do 5º semestre do curso de Ciência da Computação através de justificativas e conceitos de engenharia específicos:

*   **Ciência de Dados**: Ciclo completo dos dados. Tratamento de *gaps*, padronização por *Z-Score*, representação gráfica avançada e modelagem teórica com K-Means e Isolation Forest.
*   **Análise de Algoritmos**: Estrutura de busca reativa em tempo de $O(n)$ na base de dados, ordenação e classificação de incidentes em tempo de $O(n \log n)$ na exibição de logs e discussões sobre complexidade temporal e espacial.
*   **Estruturas de Dados**: Séries temporais representadas por arranjos lineares e mapeamento estrutural geográfico indexado de estações e subestações locais via tabelas de hashing ($O(1)$) para carregamento instantâneo.
*   **Eletrônica Digital**: Justificativa física da conversão do sinal analógico de campo (pressão física d'água capturada por transdutor piezoelétrico) em sinal elétrico, amostragem e barramento de dados digitais por microcontrolador receptor.
*   **Programação Paralela e Distribuída**: Estudo arquitetural teórico sobre a infraestrutura em nuvem necessária para receber leituras simultâneas de milhares de sensores federais em tempo real, discutindo eficiência de concorrência, computação em cluster e aceleração em GPU via CUDA.
*   **Gerência de Projetos em TI**: Estruturação metodológica do escopo do projeto, prazos e controle de riscos através do guia PMBOK e organização do time de desenvolvimento por meio do framework ágil Scrum.
*   **Autonomia Intelectual do Estudante**: Materializada no esforço ativo de pesquisa interdisciplinar aplicada e na criação de um ecossistema integrador focado na ética e na responsabilidade social.

---

## 🛠️ Tecnologias Utilizadas

A stack tecnológica do projeto, conforme definido no [`package.json`](file:///Users/miranda/Códigos/hidroia-brasil-ts/package.json), é composta por:

*   **React 19** (`^19.2.6`): Framework core para interface modular declarativa baseada em estados.
*   **TypeScript** (`~6.0.2`): Tipagem estática rigorosa para garantir robustez e segurança de dados.
*   **Vite** (`^8.0.12`): Bundler e ambiente de desenvolvimento ultrarrápido.
*   **Recharts** (`^3.8.1`): Renderização de gráficos analíticos e diagramas SVG interativos.
*   **Framer Motion** (`^12.40.0`): Biblioteca de animações físicas e micro-transições de UI.
*   **Lucide React** (`^1.16.0`): Conjunto rico de ícones vetoriais modernos.
*   **Modern Vanilla CSS**: Design System modularizado utilizando tokens e variáveis baseadas na tecnologia cromática avançada **OKLCH** *(oklch(lightness chroma hue / opacity))*.

---

## 📂 Estrutura de Pastas

```
src/
├── assets/          # Elementos de imagem e a malha do mapa vetorial (brasil-map.svg)
├── components/      # Componentes visuais organizados e reutilizáveis
│   ├── charts/      # Gráficos analíticos interativos (dispersão de clusters e área temporal)
│   ├── layout/      # Estruturas do AppShell (Sidebar lateral, Topbar de contexto)
│   ├── map/         # Silhueta geográfica do mapa do Brasil e lógica de pins de sensores
│   └── ui/          # Elementos fundamentais e cartões visuais repetíveis
├── data/            # Mockagem estática e arrays fortemente tipados
├── pages/           # As 8 telas que compõem os fluxos lógicos da aplicação
├── types/           # Interfaces de tipo e contratos de dados estruturais
├── utils/           # Funções e formatadores auxiliares de data, número e status
├── App.tsx          # Controlador de estado principal e roteamento do site
├── index.css        # Variáveis CSS globais, tokens de cores OKLCH e estilos globais
└── main.tsx         # Inicializador React no arquivo HTML index.html
```

---

## 🚀 Como Rodar Localmente

Para clonar e testar o projeto no seu computador pessoal, certifique-se de ter o **Node.js** instalado na versão LTS estável e execute os seguintes comandos:

1.  **Clonar o repositório:**
    ```bash
    git clone https://github.com/usuario/hidroia-brasil-ts.git
    cd hidroia-brasil-ts
    ```

2.  **Instalar as dependências do projeto:**
    ```bash
    npm install
    ```

3.  **Iniciar o servidor local de desenvolvimento:**
    ```bash
    npm run dev
    ```
    *O console indicará o endereço local ativo. Abra a URL (geralmente `http://localhost:5173`) no seu navegador.*

4.  **Compilar o projeto para produção (Build):**
    ```bash
    npm run build
    ```
    *Este comando rodará a compilação do compilador TypeScript (`tsc -b`) e empacotará o código final mimificado na pasta `/dist`.*

5.  **Testar o build de produção localmente (Preview):**
    ```bash
    npm run preview
    ```

---

## 📜 Scripts Disponíveis

*   `npm run dev` — Inicia o servidor local rápido do Vite.
*   `npm run build` — Compila estaticamente o TypeScript e faz o build do projeto para produção.
*   `npm run preview` — Levanta um servidor estático para visualizar localmente a pasta de produção `/dist`.
*   `npm run lint` — Executa a análise estática do ESLint em busca de problemas de conformidade de código.

---

## ⚠️ Limitações Importantes do Protótipo

> [!WARNING]  
> O **HidroIA Brasil** é exclusivamente um **protótipo educacional de apoio acadêmico** e possui restrições severas de infraestrutura e finalidade:
> *   **Simulação Estrita**: Todas as leituras e telemetrias de sensores hidrográficos exibidas no site são fictícias e geradas de forma simulada.
> *   **Sem Conexão Operacional**: O painel **não está integrado** operacionalmente com os servidores reais da Agência Nacional de Águas (ANA) ou do INMET. As marcas servem como referências conceituais de engenharia de dados.
> *   **Frontend-Only**: Não existe banco de dados persistente (PostgreSQL, MongoDB) ou backend ativo (Node, Python). O estado reside puramente na memória RAM do navegador durante o uso.
> *   **Sem ML em Tempo de Execução**: Os cálculos matemáticos complexos de Isolation Forest, K-Means e PCA foram rodados offline ou são representados de maneira coerente via lógica frontend. Não há modelos do scikit-learn ou tensorflow ativos rodando no cliente.
> *   **Não Substitui Órgãos Oficiais**: A plataforma **não deve ser utilizada** sob nenhuma hipótese para prever enchentes, secas ou tomar decisões de segurança civil. Ela não substitui os boletins técnicos do CEMADEN, Defesa Civil, ANA ou INMET.

---

## 📈 Status do Projeto e Melhorias Futuras

O projeto encontra-se **totalmente funcional como protótipo acadêmico de apresentação**, atendendo a todas as diretrizes de articulação de competências curriculares e exibindo compilação e qualidade estática limpa de código.

### 🔮 Possíveis Evoluções Futuras (Não Inclusas no Protótipo Atual)
*   **Integração com APIs Reais**: Substituir os mocks estáticos por consumo real em endpoints públicos da ANA e INMET.
*   **Backend Dedicado**: Criação de um servidor em Python (FastAPI/Flask) para executar dinamicamente algoritmos do Scikit-Learn.
*   **Banco de Dados Operacional**: Persistência de logs e telemetria histórica de sensores em um banco de dados relacional.
*   **Modelos de ML em Produção**: Treinamento online de Isolation Forest e K-Means rodando de verdade com dados de telemetria reais.
*   **Sistema de Alertas**: Disparo real de notificações via e-mail, SMS ou Web Push para as comunidades ribeirinhas cadastradas.
*   **Hospedagem em Nuvem**: Deploy estático ativo da interface em servidores de borda como Vercel ou Netlify.

---

## ✍️ Autoria

*   **Desenvolvimento Geral e Concepção**: João Victor Miranda.
*   **Contexto**: DAC — Desafio de Articulação de Competências do 5º semestre do curso de Ciência da Computação.

---

## 📄 Licença

Este projeto foi construído e disponibilizado sob o escopo exclusivo de **desenvolvimento acadêmico educacional**. A utilização ou publicação comercial dos dados simulados e marcas inspiradoras não é recomendada. Uma licença formal open-source poderá ser adicionada ao repositório futuramente.
