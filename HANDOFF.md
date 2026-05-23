# HANDOFF — HidroIA Brasil / DAC 5º Semestre

## 1. Resumo executivo
O **HidroIA Brasil** é um protótipo acadêmico frontend-only desenvolvido para o **DAC — Desafio de Articulação de Competências** do 5º semestre do curso de Ciência da Computação. O sistema serve como um painel dinâmico inteligente (SaaS ambiental/IA) projetado para o monitoramento hídrico, com ênfase na identificação de perfis hidrológicos, telemetria de sensores e detecção de anomalias por meio de Inteligência Artificial Não Supervisionada. 

Seu principal objetivo acadêmico é materializar e integrar as competências e saberes adquiridos ao longo do semestre (Ciência de Dados, Análise de Algoritmos, Estruturas de Dados, Eletrônica Digital, Programação Paralela e Distribuída, e Gerência de Projetos de TI) sob a ótica de autonomia intelectual do estudante, respondendo a uma demanda real de gestão ambiental, saneamento básico e prevenção de desastres naturais no território nacional.

---

## 2. Stack e natureza do projeto
A aplicação possui natureza estritamente de **protótipo frontend-only**, desenvolvida para fins de apresentação e avaliação acadêmica. Seus principais pilares de infraestrutura e limitações técnicas são:
- **Core e Framework**: React 19 + TypeScript + Vite para um ambiente rápido, robusto e fortemente tipado.
- **Estilização e Visual**: Vanilla CSS com variáveis modernas em formato **OKLCH**, garantindo uma estética de alto nível, escura, tecnológica e responsiva.
- **Bibliotecas Auxiliares**:
  - `framer-motion`: Utilizada para animações fluidas e micro-interações na interface.
  - `lucide-react`: Fornece a biblioteca de ícones vetoriais modernos.
  - `recharts`: Responsável por renderizar os gráficos interativos de forma rica e responsiva.
- **Ausência de Infraestrutura de Servidor**: A aplicação **não possui backend ativo**, **não possui banco de dados persistente**, **não consome APIs reais** em tempo real e **não exige login ou controle de sessão**.
- **Simulação Estrita**: Todas as informações apresentadas, incluindo logs, telemetrias de sensores e inferências de Inteligência Artificial, são **mockadas/simuladas** de forma estática, inspiradas em conceitos e formatos públicos de órgãos federais, mas sem conexão operacional física real.

---

## 3. Como rodar o projeto
Para rodar a aplicação localmente no seu computador, certifique-se de estar com o Node.js instalado na versão LTS recente e execute os seguintes comandos:

1. **Instalar as dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   *O Vite disponibilizará um endereço local (geralmente `http://localhost:5173`) para acesso no navegador.*

3. **Compilar a aplicação para produção (Build)**:
   ```bash
   npm run build
   ```
   *Este comando executará a verificação estática do compilador TypeScript (`tsc -b`) e, em seguida, empacotará o código para a pasta `/dist`.*

4. **Visualizar o build de produção localmente**:
   ```bash
   npm run preview
   ```

### Pasta Esperada do Projeto
A estrutura e os scripts foram configurados assumindo o seguinte caminho de diretório absoluto de desenvolvimento local:
- `/Users/miranda/Códigos/hidroia-brasil-ts`

---

## 4. Estrutura de pastas
O código-fonte do projeto está estruturado de forma modularizada sob a pasta `src/`:

```
src/
├── assets/          # Recursos visuais estáticos (logos, imagens, favicons).
├── components/      # Componentes reutilizáveis da interface, subdivididos em:
│   ├── charts/      # Gráficos analíticos interativos (AnomalyScoreChart, ClusterScatterChart).
│   ├── layout/      # Estrutura de navegação e envoltório principal (AppShell, Sidebar, Topbar).
│   └── map/         # Mapa esquemático do Brasil e sensores interativos (BrazilSensorMap).
│   └── ui/          # Elementos fundamentais e cartões visuais (PageHeader, MetricCard, SectionCard, StatusBadge, WarningBox, Spark).
├── data/            # Dados mockados e estruturados em TypeScript (anomalies, clusters, stations, etc.).
├── pages/           # Telas completas que compõem os fluxos da aplicação (Landing, Dashboard, Clustering, etc.).
├── types/           # Declaração de interfaces e contratos de tipo do TypeScript (dac, hydro).
├── utils/           # Funções utilitárias e formatadores de dados (formatters, status).
├── App.css          # Estilos locais e específicos do App.
├── App.tsx          # Ponto de entrada lógico e controlador de roteamento do frontend.
├── index.css        # Folha de estilo global contendo o Design System e variáveis OKLCH.
└── main.tsx         # Ponto de inicialização do React no arquivo index.html.
```

---

## 5. Arquitetura geral da aplicação
O HidroIA Brasil adota uma arquitetura simplificada de página única (**Single Page Application — SPA**) controlada por estado no React, eliminando a necessidade de roteadores pesados como `react-router-dom`:

1. **Controle de Rotas (`App.tsx`)**: O estado `route` gerencia a tela ativa na viewport como uma string (`landing`, `dashboard`, `clustering`, `anomalies`, `ai`, `rec`, `dac`, `data`). Uma função auxiliar `renderActiveScreen` intercepta esse estado e injeta a página React correspondente.
2. **Envelopamento Estrutural (`AppShell.tsx`)**: Com exceção da Landing Page, todas as páginas internas da plataforma são renderizadas como filhas do componente `AppShell`. Isso garante uma interface unificada, onde a **Sidebar** lateral e a **Topbar** superior cercam o conteúdo dinâmico principal.
3. **Sidebar de Navegação**: Apresenta os botões para troca de tela organizados em categorias lógicas (`PLATAFORMA`, `INTELIGÊNCIA`, `DADOS`, `DAC`). Ao clicar em um item, ela invoca a função callback `go` (equivalente ao `setRoute` do `App.tsx`), alterando a tela sem recarregar o navegador.
4. **Topbar Informativa**: Monitora a rota ativa para atualizar a trilha de navegação (Breadcrumbs), exibe um indicador "LIVE" pulsante e simula atualizações de dados na tela via animações do botão "Atualizar" (que ativa um estado de carregamento de 800ms).
5. **Fluxo de Dados Mockados**: Os arquivos contidos na pasta `src/data/` funcionam como uma representação estática de um banco de dados relacional e de resultados de um pipeline de Machine Learning. Ao interagir com filtros de severidade ou de região na interface, o React recalcula as linhas e atualizações via hooks como `useMemo`, simulando o comportamento de um sistema dinâmico de produção.

---

## 6. Telas existentes
A aplicação possui 8 páginas principais projetadas para cobrir a experiência acadêmica e técnica do projeto:

### A. Página Inicial (`src/pages/Landing.tsx`)
- **Objetivo**: Apresentação inicial do projeto, marketing tecnológico e justificativa da plataforma.
- **Principais componentes**: `BrazilSensorMap` (versão estática compacta), cartões flutuantes ilustrando K-Means, Isolation Forest e PCA, `WarningBox` de limitações do protótipo.
- **Dados utilizados**: `STATIONS` para plotar os pins no mapa esquemático.
- **Papel acadêmico**: Atuar como "cartão de visitas" da apresentação, contextualizando o avaliador sobre o escopo do projeto, suas principais entregas de IA e as restrições éticas de uso dos dados.

### B. Dashboard Nacional (`src/pages/Dashboard.tsx`)
- **Objetivo**: Centralizar as métricas de saúde hídrica nacional e permitir a seleção individual de estações.
- **Principais componentes**: `MetricCard`, `BrazilSensorMap`, `StatusBadge`, `SlidersHorizontal` (filtros) e uma tabela com o detalhamento das subestações da bacia ativa.
- **Dados utilizados**: `KPIS`, `STATIONS`, `REGIONS`, `SUB_STATIONS` e `ANOMALY_STATS`.
- **Papel acadêmico**: Demonstrar a capacidade de consolidação, filtragem e mineração de dados em tempo real. A interface simula uma central de monitoramento de bacias hidrográficas, onde o usuário clica nos sensores do mapa e o painel lateral atualiza instantaneamente com o score de anomalia e os fatores que contribuíram para a classificação da IA.

### C. Análise de Clusters (`src/pages/Clustering.tsx`)
- **Objetivo**: Apresentar os resultados do agrupamento K-Means e a redução de dimensionalidade por PCA.
- **Principais componentes**: `ClusterScatterChart` (gráfico de dispersão interativo desenhado em SVG), `Spark` (sparklines nos cartões KPI) e painéis interpretativos na lateral.
- **Dados utilizados**: `CLUSTER_PROFILES` e o array gerado em tempo real `pcaPoints` (que reproduz deterministicamente 128 estações dispersas em 4 clusters bem definidos mais outliers).
- **Papel acadêmico**: Defender visualmente o modelo de Aprendizado Não Supervisionado. Demonstra como 10 atributos de telemetria foram reduzidos a 2 componentes principais (PC1 e PC2) por PCA e agrupados por K-Means, facilitando a identificação de padrões de secas, cheias ou falhas físicas nos dados.

### D. Detecção de Anomalias (`src/pages/Anomalies.tsx`)
- **Objetivo**: Listar e rankear os desvios críticos detectados por inteligência artificial e explicar a robustez do pipeline.
- **Principais componentes**: Tabela de incidentes rankeada, `StatusBadge`, botões de filtro por score/severidade e cards explicativos.
- **Dados utilizados**: `ANOMALY_KPIS`, `ANOMALY_ROWS`.
- **Papel acadêmico**: Expor o funcionamento do algoritmo Isolation Forest e a metodologia de **Validação Cruzada Espacial** (cruzamento do sensor suspeito com vizinhos via DBSCAN), justificando como o sistema distingue uma seca real de um sensor quebrado (como a falha simulada na estação MAD-02 de Porto Velho).

### E. Metodologia de IA (`src/pages/Methodology.tsx`)
- **Objetivo**: Documentar a engenharia de atributos e a arquitetura matemática que apoiam a plataforma.
- **Principais componentes**: Diagrama de fluxo do pipeline (7 etapas consecutivas), tabelas explicativas do vetor de características (10 atributos).
- **Dados utilizados**: Estrutura estática de steps e features.
- **Papel acadêmico**: Atuar como a "lousa técnica" do projeto. Explica didaticamente as equações e motivações por trás do PCA, K-Means, Isolation Forest e DBSCAN, fundamentando a modelagem e servindo como material de apoio direto para as perguntas dos professores na banca.

### F. Recomendações de Mitigação (`src/pages/Recommendations.tsx`)
- **Objetivo**: Propor planos de ação de contingência para tomada de decisão com base nos níveis de risco.
- **Principais componentes**: Seletor de bacia crítica, bloco com plano de ação dinâmico sugerido pela IA e cards de mitigação agrupados por severidade.
- **Dados utilizados**: Dicionário estruturado `RECOMMENDATIONS`, dados detalhados da estação crítica `TAQ-01`.
- **Papel acadêmico**: Traduzir a inteligência puramente matemática dos algoritmos de ML em valor prático socioambiental. Mostra como o sistema apoia os gestores públicos e a Defesa Civil no acionamento de alertas sonoros, evacuações de encostas e interdição de pontes.

### G. Base de Dados Consolidada (`src/pages/Database.tsx`)
- **Objetivo**: Exibir o histórico de leituras brutas das fontes públicas processadas no pipeline.
- **Principais componentes**: Campo de busca textual reativo, filtros rápidos de severidade e exportador de arquivo CSV em tempo real.
- **Dados utilizados**: `DB_ROWS` (série histórica simulada das fontes ANA e INMET).
- **Papel acadêmico**: Representar o repositório de dados consolidado e o processamento de tabelas. A funcionalidade de download de CSV demonstra que o protótipo gera arquivos físicos válidos em formato aberto para uso por outros pesquisadores ou ferramentas externas.

### H. Articulação com o DAC (`src/pages/DacArticulation.tsx`)
- **Objetivo**: Explicar explicitamente a conexão técnica e científica de cada disciplina do 5º semestre de Ciência da Computação com as decisões de arquitetura e lógica da plataforma.
- **Principais componentes**: Lista interativa de disciplinas com tópicos de desenvolvimento e competências adquiridas.
- **Dados utilizados**: `DISCIPLINES`.
- **Papel acadêmico**: Atender à exigência regulamentar do DAC de demonstrar a transversalidade dos saberes no semestre, garantindo que o protótipo seja avaliado como um ecossistema integrador de Ciência da Computação.

---

## 7. Componentes principais

### Layout
- **`AppShell`**: Define o esqueleto visual do painel SaaS. Envolve o fluxo principal do site em um layout CSS Grid composto por uma coluna de navegação de largura fixa (248px) à esquerda e uma coluna flexível de conteúdo à direita.
- **`Sidebar`**: Barra de navegação lateral. Renderiza a marca, o agrupamento de botões associados a ícones do Lucide e o rodapé institucional reforçando o caráter acadêmico. Possui efeito hover sutil e destaca a rota ativa mudando o background para um ciano suave e aplicando uma borda colorida.
- **`Topbar`**: Barra de controle superior. Exibe os breadcrumbs, o título descritivo da tela, um ponto verde pulsante indicando estado de escuta telemétrica simulada, e o botão de atualização com feedback visual giratório.

### UI
- **`PageHeader`**: Padroniza o cabeçalho das páginas, injetando opcionalmente uma categoria superior em caixa alta e na cor ciano, o título principal da tela, um texto descritivo secundário e botões ou seletores alinhados à direita.
- **`MetricCard`**: Cartão de indicador-chave de desempenho (KPI). Exibe de forma limpa o rótulo da métrica, o valor destacado em fonte mono de tamanho grande, a unidade de medida e o indicador de tendência de alta ou baixa colorido conforme o nível de risco.
- **`SectionCard`**: Cartão genérico para envelopamento de tabelas e fluxos. Suporta a injeção de ícone e título na barra superior, botões secundários à direita e estilização CSS flexível por props.
- **`StatusBadge`**: Pílula de sinalização de risco. Traduz as severidades (`low`, `med`, `high`, `crit`, `fail`) em rótulos legíveis em português e aplica cores específicas utilizando as classes utilitárias definidas no CSS global.
- **`WarningBox`**: Caixa de aviso permanente destacada. Exibe em destaque e de forma muito clara as limitações do projeto, servindo como resguardo técnico da natureza frontend e simulada do protótipo.
- **`Spark`**: Gera sparklines (gráficos de linha miniatura) em formato de vetor SVG autônomo a partir de um array numérico, aplicando uma curva contínua e estilizada com opacidade sutil em tempo recorde de renderização.

### Visual / Especializados
- **`BrazilSensorMap`**: Componente de cartografia esquemática do território nacional. Desenha os contornos do Brasil e as principais bacias fluviais a partir de caminhos vetoriais (`SVG Paths`) predefinidos. Recebe a lista de estações e plota dinamicamente os pinos dos sensores com base nas coordenadas calculadas, aplicando uma animação pulsante em gradiente vermelho se a estação exibir risco crítico, ou um anel giratório tracejado se o sensor estiver selecionado pelo usuário.
- **`AnomalyScoreChart`**: Gráfico analítico de linha e área da série temporal observada contra o envelope climatológico normal. Utiliza a biblioteca `recharts` configurando degradês de cores e posicionando manualmente bolinhas vermelhas (`ReferenceDot`) nos dias em que a leitura ultrapassou o limiar da Isolation Forest.
- **`ClusterScatterChart`**: Componente interativo de dispersão em SVG que projeta a redução de dimensionalidade PCA das 128 estações geradas deterministicamente por semente matemática. Desenha círculos sombreados para ilustrar os centros abstratos dos clusters e renderiza um cartão de detalhes flutuante com informações de score e bacia conforme o usuário passa o mouse sobre os pontos.

---

## 8. Dados mockados
O ecossistema de dados da aplicação está concentrado na pasta `/src/data`:
- **`anomalies.ts`**: Contém KPIs e as linhas do ranking principal de incidentes da Isolation Forest (detalhando score, rank, estação, tipo de variável e descrição qualitativa da anomalia).
- **`clusters.ts`**: Define as propriedades dos 5 perfis hidrológicos identificados (Cluster 0: Estiagem, Cluster 1: Normal, Cluster 2: Transição, Cluster 3: Extremo, Cluster -1: Outliers/Falhas), consolidando descrições, contagem de estações e estações reais representativas.
- **`dashboardData.ts`**: Reúne os dados estáticos dos 5 indicadores superiores do painel nacional e o dicionário de justificativas de score contribuinte para cada estação de referência da ANA/INMET.
- **`databaseRows.ts`**: Massa de dados representando 6 registros históricos estruturados contendo dados de município, bacia, rio, chuva em 24h, chuva em 7 dias, desvio percentual de média e classificação final.
- **`disciplines.ts`**: O coração da documentação acadêmica. Lista de forma detalhada o resumo e os tópicos técnicos de cada disciplina do DAC.
- **`stations.ts`**: Coordenadas e estados das 8 estações telemétricas federais de referência exibidas no mapa e o detalhamento das subestações locais de cada bacia hidrográfica associada.

*Nota técnica: Os dados contidos nesses arquivos foram desenhados com base nas reais características e regimes hidrológicos brasileiros (como a bacia Taquari-Antas no RS sob eventos de cheia severa e o Rio São Francisco em Juazeiro em seca crônica), simulando com precisão os valores que as agências federais ANA e INMET geram operacionalmente.*

---

## 9. Conceitos de IA representados
Embora a aplicação execute em modo frontend-only sem um interpretador de modelos Python ativo no navegador, ela **representa com alto rigor conceitual** as metodologias de Inteligência Artificial:
1. **Aprendizado Não Supervisionado**: Justificado pela ausência de rótulos (labels) pré-existentes na telemetria de sensores no meio ambiente, permitindo ao sistema descobrir padrões intrínsecos de forma autônoma.
2. **K-Means**: Utilizado para segmentar as estações hidrológicas em $K=4$ perfis distintos com base em similaridades de vazão, nível e precipitação acumulada.
3. **PCA (Análise de Componentes Principais)**: Representado na tela de clustering como a técnica que reduz as 10 dimensões de variáveis climáticas (vetor de atributos) em 2 eixos bidimensionais (PC1 e PC2), retendo $92\%$ da variabilidade total explicada dos dados para visualização humana.
4. **Isolation Forest**: Algoritmo responsável pela detecção de anomalias, isolando as medições atípicas em florestas de árvores de decisão. É representado através do score de anomalia $s$ ($0.0$ a $1.0$). Leituras com score superior a $0.85$ são isoladas imediatamente como anomalias críticas.
5. **Clusters Hidrometeorológicos**: A tipologia que classifica os regimes de águas do país em Estiagem Crítica, Comportamento Normal, Transição Sazonal e Extremos de Inundação.
6. **Falhas de Sensores por DBSCAN**: Demonstração conceitual do uso de algoritmos baseados em densidade para separar medições isoladas atípicas (outliers de densidade classificados no Cluster -1) indicando falhas mecânicas ou eletroeletrônicas do transdutor (ex.: registrar nível nulo sob tempestade severa).
7. **Apoio à Decisão Socioambiental**: Integração de métricas quantitativas de IA com planos de mitigação qualitativos sugeridos para a Defesa Civil.

---

## 10. Articulação com o DAC
O HidroIA Brasil estabelece conexão explícita e direta com as disciplinas curriculares do 5º Semestre:

- **Ciência de Dados**: O protótipo demonstra o ciclo de vida dos dados, desde a captação, tratamento de gaps e normalização por Z-Score até a visualização rica e interpretativa de séries históricas de chuva e vazão.
- **Análise de Algoritmos**: Conexão com a eficiência computacional das buscas, ordenação de rankings por criticidade de score e avaliação de complexidade de tempo ($O(n \log n)$ para rankings, $O(1)$ para tabelas hash de subestações), garantindo escalabilidade em bacias com milhares de sensores.
- **Estruturas de Dados**: Organização interna das informações por meio de coleções sequenciais para séries temporais e estruturas de dados arborescentes para representar o aninhamento geográfico (País $\rightarrow$ Região Hidrográfica $\rightarrow$ Estação $\rightarrow$ Leituras).
- **Eletrônica Digital**: Justifica a conversão do sinal físico (pressão do rio ou precipitação física) capturado por sensores de campo em sinais analógico-digitais (ADC) representados em barramentos digitais e transmitidos por buffers de telemetria, além de associar álgebra booleana e portas lógicas a validações básicas de hardware.
- **Programação Paralela e Distribuída**: Debate sobre a arquitetura de processamento em larga escala necessária para avaliar simultaneamente as centenas de bacias federais, abordando conceitos teóricos de speedup, eficiência, paralelismo de dados regionais e aceleração matemática em GPU com CUDA.
- **Gerência de Projetos em TI**: Estruturação do desenvolvimento seguindo boas práticas do PMBOK (gerenciamento de escopo, tempo, riscos de integridade de dados e garantia de qualidade) e adoção de metodologias ágeis (Scrum) para a condução do protótipo em ciclos rápidos.
- **Autonomia Intelectual do Estudante**: Materializada no esforço ativo de pesquisa interdisciplinar e pensamento crítico da equipe ao projetar um sistema ético de apoio à decisão sem dependências operacionais externas cegas.

---

## 11. Limitações obrigatórias do protótipo
> [!IMPORTANT]  
> A aplicação possui restrições severas de operação que devem ser expostas obrigatoriamente em qualquer apresentação pública:
> 1. **Dados Simulados**: Todos os registros fluviométricos e pluviométricos apresentados nas tabelas, painéis e mapas são puramente simulados e gerados estaticamente.
> 2. **Sem Backend e Banco**: Não há servidor rodando código estruturado, rotinas de scraping ativas ou banco de dados persistente. O estado do sistema reside na memória RAM do navegador durante a sessão.
> 3. **Sem Integração Operacional**: O sistema não se conecta, via API ou requisição física, aos servidores da Agência Nacional de Águas (ANA) ou do Instituto Nacional de Meteorologia (INMET). As referências a esses órgãos no layout servem como indicação de fontes conceituais originais de inspiração.
> 4. **Inteligência Artificial Conceitual**: Os scores, variâncias e clusters exibidos nos gráficos e painéis da interface gráfica são inferências mockadas de forma coerente e representações conceituais do pipeline matemático, sem a execução de modelos matemáticos ativos (como bibliotecas TensorFlow ou Scikit-Learn compiladas) rodando em tempo de execução no cliente.
> 5. **Sem Caráter de Previsão de Desastres**: O HidroIA Brasil **não substitui** os boletins, alertas operacionais e previsões oficiais emitidos pela Defesa Civil, CEMADEN, ANA, INMET ou especialistas em hidrologia de campo. Ele é classificado unicamente como um **protótipo educacional de apoio à decisão**.

---

## 12. Identidade visual
A interface gráfica foi concebida sob os mais altos padrões estéticos das plataformas modernas de monitoramento SaaS e IA:
- **Design System Premium em Dark Mode**: Fundo em azul escuro profundo (`oklch(0.155 0.025 240)`) combinado com painéis elevados e translúcidos contendo efeitos de desfoque de fundo (`backdrop-filter: blur(8px)`) e bordas suaves.
- **Gradients e Paleta Harmoniosa**: Uso do ciano tecnológico e aqua neon para destacar elementos ativos de inteligência artificial, criando um forte apelo visual futurista.
- **Micro-interações e Animações**: Efeitos hover reativos nos botões e itens de navegação, animações spin no botão de recarregar e círculos vetoriais pulsantes no mapa esquemático para demarcar anomalias de altíssima severidade.
- **Tipografia Moderna**: Ingestão das fontes **Space Grotesk** para cabeçalhos estruturais e títulos em proporção geométrica premium, combinada com a fonte monoespaçada **JetBrains Mono** para exibir dados de telemetria, códigos de sensores, scores e métricas exatas.
- **Cantos Arredondados**: Adoção de curvas harmoniosas nas bordas dos painéis e cards (`border-radius: 14px`) que transmitem elegância e robustez visual de interface premium.

---

## 13. Pontos de atenção para próximas alterações
Se você for continuar o desenvolvimento do HidroIA Brasil ou implementar novas funcionalidades, atente-se a estas diretrizes:
- **Preservar a Natureza Frontend-Only**: Não tente adicionar conexões pesadas de backend com NodeJS ou Python a menos que seja uma diretriz direta da disciplina do DAC. A leveza e o carregamento instantâneo do protótipo estático são grandes trunfos no momento da apresentação física.
- **Não Vender como Sistema de Produção**: Preserve visíveis os avisos, disclaimers de rodapé e o componente `WarningBox` que protegem legal e tecnicamente a natureza de simulação da plataforma.
- **Coerência Científica do DAC**: Qualquer alteração de funcionalidade ou adição de telas deve obrigatoriamente conversar com os conceitos de Ciência de Computação detalhados na tela de articulação. Evite remover a tela de metodologia ou a tela do DAC, pois são as de maior peso na nota final das bancas.
- **Validação de Build**: Sempre execute `npm run build` após modificar qualquer tipagem ou componente, garantindo que o compilador rigoroso do TypeScript (`tsconfig.json`) não aponte erros de compilação estática antes do deploy.

---

## 14. Próximos passos sugeridos
Caso o projeto precise evoluir para o fechamento ou receber incrementos visuais, aqui estão as sugestões prioritárias:
1. **Refinamento do Mapa do Brasil**: O mapa dinâmico em SVG (`BrazilSensorMap`) pode ser enriquecido com a plotagem de estados reais mais definidos ou com o traçado das fronteiras geográficas brasileiras mais detalhadas, sem quebrar o layout esquemático leve.
2. **Revisão e Enriquecimento de Textos Acadêmicos**: Validar e expandir os tópicos das disciplinas da tela de articulação com o DAC para alinhar com o exato vocabulário exigido pelos professores avaliadores de cada área.
3. **Melhorias de Responsividade**: Embora o viewport do projeto esteja forçado em `1440px` no arquivo `index.html` para garantir a exibição idêntica nos computadores e projetores dos laboratórios da faculdade, uma adaptação fluida para dispositivos móveis ou outras resoluções horizontais pode ser adicionada no CSS.
4. **Preparação de Roteiro e Slides**: Elaborar a linha de raciocínio da apresentação em grupo, programando quem demonstrará cada tela e sincronizando a troca de rotas com a explicação teórica dos algoritmos.
5. **Deploy e Hospedagem**: Subir o código-fonte para um repositório Git público no GitHub e realizar o deploy estático em plataformas gratuitas de hospedagem como **Vercel**, **Netlify** ou **GitHub Pages**, garantindo que qualquer avaliador consiga acessar a plataforma ativa a partir de um link curto em dispositivos móveis ou notebooks pessoais.

---

## 15. Estado final esperado
Ao finalizar esta leitura e com este arquivo `HANDOFF.md` consolidado na raiz do projeto, **qualquer desenvolvedor de software ou agente de Inteligência Artificial** será perfeitamente capaz de:
- Compreender a arquitetura de páginas e fluxo do React.
- Rodar a aplicação instantaneamente via scripts do Node/NPM.
- Entender as restrições éticas de dados e IA simulada.
- Adicionar ou otimizar componentes de visualização ou telas acadêmicas.
- Manter e respeitar rigorosamente a identidade visual premium e o Design System OKLCH configurado.
