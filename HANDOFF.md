# HANDOFF — Projeto HidroIA / DAC 5º Semestre

Este documento consolida o estado técnico e didático atual da plataforma **HidroIA**, servindo como guia definitivo de transição e referência rápida para qualquer desenvolvedor, avaliador ou modelo de IA em interações futuras.

---

## 1. Resumo executivo

O **HidroIA** é um protótipo acadêmico frontend-only de análise hidrometeorológica e IA conceitual, desenvolvido especificamente para o Desafio de Articulação de Competências (DAC) do 5º semestre de Ciência da Computação.

- **Status do Projeto**: 100% funcional no ambiente local, versionado no GitHub e publicado na **Vercel** com integração e deploy contínuos a partir do push na branch `main`.
- **Arquitetura Simplificada**: Não possui backend, APIs externas ou banco de dados físico. Todo o processamento lógica-visual ocorre localmente no navegador (frontend-only).
- **Abordagem de Dados**: Baseada em dados mockados/simulados em arquivos TypeScript, sem medições oficiais ou em tempo real.
- **Inteligência Artificial**: Apresentada sob uma perspectiva puramente **conceitual e didática** (K-Means, PCA, Isolation Forest), servindo como simulador e apoio didático ao aprendizado de Ciência de Dados e à análise socioambiental.
- **Estética Visual**: Dark mode premium com realce em ciano e aqua neon, uso de cards translúcidos com blur (glassmorphism) e transições suaves, proporcionando um visual sofisticado e coerente com a temática tecnológica.

---

## 2. Stack e arquitetura

O codebase do projeto está estruturado de forma limpa, isolada e com carregamento instantâneo no navegador:

- **Core**: React 19 + TypeScript + Vite.
- **Bibliotecas Principais**:
  - `lucide-react`: Ícones vetoriais dinâmicos para a interface e menus.
  - `recharts`: Renderização de gráficos analíticos e temporais reativos.
  - `framer-motion`: Gerenciamento e execução de transições suaves entre páginas e navegação SPA.
- **Roteamento SPA**: O fluxo de rotas é controlado por estado React local no arquivo `src/App.tsx`, garantindo que todas as telas carreguem instantaneamente sem recarregamento de página.
- **Transições de Tela**: Envolvidas em elementos do `framer-motion` (`AnimatePresence` com efeito coordenado de `opacity`, `y` e `blur(4px)`), eliminando cortes secos e refinando a sensação de uso da aplicação.

---

## 3. Identidade visual atual

- **Nomenclatura oficial**: **Hidro<span>IA</span>** (antigas variações como *"HidroIA Brasil"* foram removidas para consistência acadêmica).
- **Marca Visual**: Gotinha d'água estilizada representada via componente SVG próprio.
- **Identidade UI**: Estilo SaaS contemporâneo em tons escuros:
  - Fundo principal: deep dark (`oklch(0.12 0.015 240)`).
  - Destaques visuais: ciano (`var(--cyan)`) e aqua neon.
  - Cartões e painéis: Bordas suaves com transparência (`backdrop-filter: blur(12px)`).
- **Arquivos Fundamentais**:
  - `src/components/ui/WaterDropLogo.tsx`: Elemento vetorial da gotinha d'água.
  - `public/favicon.svg`: Favicon personalizado com a gotinha.
  - `index.html`: Configuração do título, fontes do Google (Inter, Outfit, Fira Code) e meta-tags SEO.
  - `src/index.css`: Definições globais de estilos, paletas de cores oklch/HSL e componentes visuais genéricos.

---

## 4. Estrutura principal de pastas

A árvore simplificada do projeto descreve onde residem os componentes cruciais de desenvolvimento:

```text
src/
  assets/              # Recursos estáticos (ex: brasil-map.svg)
  components/
    charts/            # Gráficos auxiliares (ex: ClusterScatterChart.tsx)
    layout/            # Componentes de layout (AppShell, Sidebar, Topbar)
    map/               # Componente interativo do mapa vetorial (BrazilSensorMap.tsx)
    ui/                # Elementos genéricos da interface (WaterDropLogo, PageHeader, Spark)
  data/                # Bases simuladas em formato TypeScript (stations, databaseRows, anomalies, clusters)
  pages/               # Telas principais que compõem o sistema SPA
  types/               # Tipagens TypeScript estáticas (hydro.ts)
  App.tsx              # Roteador interno principal e transição global AnimatePresence
  main.tsx             # Ponto de entrada React do Vite
  index.css            # Estilização global e design system
```

---

## 5. Dataset atual

O dataset do protótipo é estruturado em formato estático TypeScript. Ele é constituído por **8 estações hidrometeorológicas brasileiras simuladas** com regimes hídricos de referência calibrados:

1. **Porto Velho / RO** (Rio Madeira) — Fluviométrica — *Outlier / Falha de Sensor* (leitura zero sob forte chuva).
2. **Humaitá / AM** (Rio Madeira) — Fluviométrica — *Normal* (vazões e níveis ideais).
3. **Taquari / RS** (Rio Taquari-Antas) — Fluviométrica — *Anomalia Crítica / Cheia e Inundação*.
4. **São Francisco / BA** (Rio São Francisco) — Fluviométrica — *Atenção / Estiagem e Escassez*.
5. **Parnaíba / PI** (Rio Parnaíba) — Pluviométrica — *Normal* (índices médios de precipitação).
6. **Alto Paraguai / MT** (Rio Paraguai) — Fluviométrica — *Atípico / Seca Severa* (nível de bacia crítico).
7. **Rio Doce / MG** (Rio Doce) — Fluviométrica — *Atenção / Transição* (turbidez sazonal).
8. **Recife / PE** (Capibaribe) — Pluviométrica — *Atípico / Chuva Acumulada Extrema*.

### Estrutura do Vetor de Características (`Station`):
Tipado no arquivo [hydro.ts](file:///Users/miranda/Códigos/hidroia-brasil-ts/src/types/hydro.ts), contendo:
- `id` (ex: `"TAQ-01"`) e `code` (código simulado ANA de 8 dígitos).
- `name`, `city`, `uf`, `state`, `region`, `basin` e `river`.
- `type` (`"Fluviométrica"` ou `"Pluviométrica"`).
- `levelCm` e `flowM3s` (opcionais, medidos estritamente em estações Fluviométricas).
- `rainfall24hMm` e `rainfall7dMm` (precipitação acumulada).
- `anomalyScore` (score simulado emitido pelo algoritmo Isolation Forest, de `0.0` a `1.0`).
- `dataQuality` (`"bruto"` ou `"consistido"`).
- `risk` (`"low"`, `"med"`, `"high"`, `"crit"`, `"fail"`) - Controla a cor e visual do status do sensor na plataforma.
- `status` (`"Normal"`, `"Atenção"`, `"Atípico"`, `"Anomalia"`, `"Falha"`).
- `x` e `y` (coordenadas para posicionamento geográfico simulado no mapa).

---

## 6. Telas atuais do sistema

O protótipo SPA conta com **9 rotas visuais**, acessadas dinamicamente:

1. **Landing Page**: Apresentação inicial do protótipo com linguagem acadêmica explícita e botão de CTA.
2. **Página inicial interna**: Ponto de partida dentro da plataforma que dá as boas-vindas e resume as premissas didáticas do DAC.
3. **Dashboard nacional**: Painel geral contendo métricas rápidas, alertas correntes, mapa vetorial do Brasil com os sensores simulados e aba lateral para leitura detalhada do sensor selecionado.
4. **Base de dados**: Tabela estruturada contendo o histórico de auditoria hidrológica de dados simulados, com caixa de pesquisa e filtros por bacia e tipo de estação.
5. **Clusters K-Means**: Projeção bidimensional matemática (PCA) de 128 estações com agrupamento sob K-Means, legendas interativas e interpretação.
6. **Anomalias Iso Forest**: Painel didático de detecção de eventos fora da curva gerado pelo Isolation Forest conceitual, ordenado pelo score de anomalia.
7. **Metodologia de IA**: Fluxograma didático demonstrando a pipeline de Ciência de Dados (pré-processamento, padronização, redução de dimensionalidade PCA e modelos de detecção/agrupamento).
8. **Recomendações**: Cartilha informativa gerando planos e ações didáticas de mitigação contra cheias, secas e falhas telemétricas.
9. **Articulação acadêmica / DAC**: Painel que conecta o projeto HidroIA às disciplinas cursadas no 5º semestre de Ciência da Computação.

---

## 7. Landing Page — estado atual

A **Landing Page** ([Landing.tsx](file:///Users/miranda/Códigos/hidroia-brasil-ts/src/pages/Landing.tsx)) foi simplificada e refinada para atuar como uma vitrine direta, objetiva e transparente do projeto.

- **Topbar Simplificada**: Contém exclusivamente a gotinha, o logotipo "HidroIA" e um link de rolagem suave para a seção "Sobre". Foram expurgados botões soltos de login ou links vazios como "Limitações" e "Acadêmico".
- **Hero Clean**:
  - Badge informativa em destaque: *"PROTÓTIPO ACADÊMICO • 8 ESTAÇÕES SIMULADAS • 4 PERFIS HIDROLÓGICOS • IA CONCEITUAL"*.
  - Título principal: *"Análise hidrometeorológica com dados simulados e IA conceitual."* (com realce em ciano gradiente).
  - Subtítulo focado em esclarecer o caráter de protótipo acadêmico frontend-only.
  - CTA Único: Botão iluminado neon *"Entrar na plataforma"* com transição de hover que direciona o usuário para o dashboard interno.
- **Gráfico de Fundo**: Exibe de forma discreta o mapa interativo de sensores do Brasil ao lado esquerdo, cercado por cartões conceituais flutuantes explicando o K-Means, Isolation Forest e PCA de similaridade.
- **Seção "Sobre" no Rodapé (`id="sobre"`)**: Rola de forma suave a partir da topbar, contendo um texto sintético explicando o HidroIA e sua conexão com o DAC do 5º Semestre.

---

## 8. Sidebar e AppShell — estado atual

A navegação da plataforma utiliza uma **Sidebar Hover-Collapsible** premium de padrão SaaS, projetada de forma a não perturbar a visualização principal:

- **Largura e Layout Físico**:
  - Fechada (Padrão): `84px`. Ocupa espaço físico real. O conteúdo principal começa estritamente a partir dos `84px` (`margin-left: 84px`), com largura `width: calc(100% - 84px)`.
  - Aberta (Expandida no Hover): `280px`. Fica em modo **overlay absoluto** (`position: fixed`, `z-index: 50`), sobrepondo-se suavemente à tela sem empurrar o conteúdo principal (eliminando "layout shift" ou saltos visuais).
- **Alinhamento Matemático nos Estados**:
  - **Centragem do Logo**: O componente `.brand` foi configurado com padding lateral de `14px` e largura estática de `252px`. O logotipo `WaterDropLogo` (`28px`) fica exatamente centralizado no meio da sidebar em repouso: `(56px inner width - 28px logo width) / 2 = 14px`.
  - **Centragem de Ícones**: Os botões `.nav-item` possuem padding `8px 20px` e largura `252px`. O ícone vector `16px` fica matematicamente centralizado: `(56px inner width - 16px icon width) / 2 = 20px`.
  - **Barra de Ativo**: O marcador ciano vertical lateral `.nav-item.active::before` é posicionado precisamente em `left: 6px`.
- **Controle Dinâmico de Visibilidade**:
  - Os textos do menu, cabeçalhos de categoria e o card do rodapé têm suas opacidades e visibilidades ajustadas imediatamente a `0` (`transition-delay: 0s`) na compressão, para evitar que letras cortadas vazem na lateral.
  - No hover-expand, eles ganham visibilidade total com um leve delay (`transition-delay: 0.08s`), surgindo suavemente apenas quando a sidebar atinge largura suficiente.
  - O card inferior `.nav-foot` é totalmente ocultado no estado colapsado, desaparecendo a borda e o fundo para um visual minimalista.

---

## 9. Transições de tela

- **Navegação Fluida**: No arquivo [App.tsx](file:///Users/miranda/Códigos/hidroia-brasil-ts/src/App.tsx), a troca de rotas é envolvida com o `AnimatePresence` do `framer-motion`.
- **Efeito de Fade Visual**: A área principal `.main` possui uma transição coordenada de transição de rota que executa uma animação de `opacity: 0` a `1`, deslocamento vertical suave (`y: 12` a `0`) e filtro de blur (`blur(4px)` a `0`) em `0.22s`.
- **Navegação Persistente**: A sidebar e a topbar permanecem fixas e estáveis no layout, enquanto apenas a área interna do painel transiciona, simulando um comportamento ultra-moderno de aplicação SaaS de alto padrão.

---

## 10. Tela K-Means / Clustering — estado atual

A tela de **Clusters K-Means** ([Clustering.tsx](file:///Users/miranda/Códigos/hidroia-brasil-ts/src/pages/Clustering.tsx)) é a tela de maior riqueza analítica do protótipo:

- **Métricas de Validação**: 5 cards KPI destacam o pipeline de machine learning conceitual (Algoritmo K-Means, 4 Clusters + ruído, Silhouette de 0.71, Base de 8 estações simuladas expandida para 128 pontos no dispersor e PCA de 92%).
- **Mapa de Similaridade PCA**:
  - Exibe a dispersão de 128 estações simuladas projetadas em duas dimensões principais de PCA.
  - Bolhas translúcidas e tracejadas abraçam geograficamente cada agrupamento, com rótulos em SVG explícitos (**ESTIAGEM**, **NORMAL**, **TRANSIÇÃO**, **INUNDAÇÃO**, **FALHA/RUÍDO**).
  - Eixos simplificados com descritivos didáticos nas margens do gráfico.
  - Rodapé esclarecedor explicando que o gráfico representa uma correlação matemática abstrata e não o mapa geográfico físico das estações.
- **Tooltip Compacto Anti-Bloqueio**:
  - Largura controlada a **`230px`**, cantos arredondados, fundo semi-transparente de alto contraste com blur e borda colorida dinâmica combinando com o cluster selecionado.
  - Exibe o nome simplificado da estação, bacia e tipo.
  - Omite nível/vazão caso a estação seja Pluviométrica, concentrando-se em apresentar índices corretos e interpretações diagnósticas textuais customizadas para o regime daquela estação.
  - Calcula a coordenada do cursor no SVG para abrir o tooltip sempre no quadrante oposto (se o mouse está à direita, o tooltip renderiza à esquerda; se está abaixo, renderiza acima), impedindo que o cartão encubra o ponto.
- **Caixa de Orientação "Como ler o gráfico"**: Contém regras rápidas e uma caixa em destaque com a regra de ouro: *"Quanto mais perto os pontos estiverem, mais parecido é o comportamento das estações"*.
- **Distribuição Numérica das 8 Estações**: Mapeada de forma congruente com o dataset em [clusters.ts](file:///Users/miranda/Códigos/hidroia-brasil-ts/src/data/clusters.ts): Estiagem (2), Normal (2), Transição (1), Extremos (2), Falhas (1).

---

## 11. Anomalias / Iso Forest

A tela **Anomalias Iso Forest** ([Anomalies.tsx](file:///Users/miranda/Códigos/hidroia-brasil-ts/src/pages/Anomalies.tsx)) simula uma triagem de eventos extremos com o algoritmo Isolation Forest:

- O algoritmo classifica os sensores por meio de um score de anomalia simulado (de `0.0` a `1.0`).
- Estações como Taquari (RS) com cheia severa (`0.91`) e Porto Velho (RO) com falha física de sensor (`0.88`) encabeçam o topo do ranking de intervenção.
- A tela fornece explicações didáticas simplificadas ensinando como o algoritmo isola amostras discrepantes no espaço de atributos.

---

## 12. Dashboard e mapa

- **Mapa Dinâmico do Brasil** ([BrazilSensorMap.tsx](file:///Users/miranda/Códigos/hidroia-brasil-ts/src/components/map/BrazilSensorMap.tsx)): Renderiza de forma elegante um SVG com o mapa das regiões e os marcadores vetoriais das 8 estações simuladas.
- **Identificação Visual**: Os pinos do mapa brilham com as cores indicativas de risco (crit, high, med, fail, low) com micro-animações de pulsação nos casos mais críticos.
- **Painel de Detalhes Lateral**: Ao clicar em uma estação, uma gaveta lateral exibe a telemetria, bacia hidrográfica, rio associado, qualidade do dado simulado, score conceitual e um aviso indicativo customizado (ex: ocultando campos de vazão/nível para estações exclusivamente de coleta pluviométrica).

---

## 13. Base de dados

A tela **Base de Dados** ([Database.tsx](file:///Users/miranda/Códigos/hidroia-brasil-ts/src/pages/Database.tsx)) apresenta a tabela consolidada de telemetria baseada em [databaseRows.ts](file:///Users/miranda/Códigos/hidroia-brasil-ts/src/data/databaseRows.ts).
- Reúne informações completas em uma grade de dados rápida e responsiva.
- Equipado com campo de busca de texto rápido e seleção dinâmica por tipo de estação e bacia hidrográfica.

---

## 14. Metodologia, Recomendações e DAC

- **Metodologia de IA**: Explica conceitualmente o pipeline do simulador: coleta de telemetria, normalização z-score, pré-processamento de ruídos, cálculo dos componentes PCA, clusterização K-Means e triagem de anomalias por Isolation Forest.
- **Recomendações**: Dispõe planos práticos de mitigação didáticos para tomadores de decisão contra inundações rápidas, secas extremas ou alarmes falsos gerados por sensores descalibrados.
- **Articulação Acadêmica**: Liga de forma inovadora o protótipo HidroIA com as disciplinas teóricas da graduação (Ciência de Dados, Análise de Algoritmos, Programação Paralela, Eletrônica Digital, etc.), atestando a aplicabilidade prática e multidisciplinar do projeto de computação.

---

## 15. Texto oficial do dataset

Este texto curto e formal deve ser exposto na documentação do projeto e em relatórios acadêmicos:

> "O dataset do HidroIA é composto por dados simulados de 8 estações hidrometeorológicas distribuídas pelo Brasil, com estrutura inspirada nos padrões de organização da ANA/HIDRO. A base inclui estações fluviométricas e pluviométricas, contendo informações como código simulado, bacia hidrográfica, tipo de estação, nível do rio, vazão estimada, chuva acumulada, qualidade do dado, status operacional e score de anomalia.
>
> Esses dados alimentam o dashboard, o mapa interativo, a base consolidada, a análise de clusters, a detecção de anomalias e as recomendações do protótipo. A proposta é demonstrar, em contexto acadêmico, como dados hidrometeorológicos poderiam ser organizados e analisados com apoio de técnicas conceituais de Aprendizado Não Supervisionado, como K-Means, PCA e Isolation Forest.
>
> Todos os dados são mockados/simulados, não representam medições oficiais ou em tempo real e não substituem sistemas de monitoramento de órgãos especializados."

---

## 16. Slides / apresentação

Para guiar a banca acadêmica do DAC do 5º Semestre, a apresentação visual deve enfocar os seguintes tópicos baseados na plataforma:

### Estrutura Sugerida para o Slide: "Dataset Hidrometeorológico"
- **Título**: *Dataset Hidrometeorológico*
- **Tópicos Principais**:
  - *Dados simulados de referência baseados nas bacias nacionais brasileiras.*
  - *O HidroIA utiliza uma base mockada de 8 estações, capturando regimes extremos (inundações severas e secas acentuadas) e padrões operacionais.*
  - *Armazena informações cruciais de telemetria: nível, vazão estimada, acumulados de precipitação, qualidade do dado (bruto vs consistido) e scores de anomalia.*
- **Cards e Destaques Visuais**:
  - **8 ESTAÇÕES**: Amostragem distribuída pelas bacias do Madeira, Paraguai, Capibaribe, São Francisco, Rio Doce, Parnaíba e Taquari.
  - **2 MODELOS DE COLETA**: Representação autônoma de telemetria Fluviométrica e Pluviométrica.
  - **DADOS AMBIENTAIS**: Vazão simulada, nível em centímetros, chuvas de 24h e 7 dias.
  - **IA CONCEITUAL**: Atributos padronizados servindo de entrada para modelos de similaridade e agrupamento.
- **Rodapé Legal**: *"Dados simulados para fins didáticos. Sem integração em tempo real ou medições oficiais."*

---

## 17. Dívidas técnicas e inconsistências mapeadas

Para garantir a estabilidade e o foco absoluto na apresentação da banca, registramos as inconsistências e decisões de engenharia mapeadas:

### Gráfico PCA Reutilizável duplicado
- **Cenário**: O arquivo [ClusterScatterChart.tsx](file:///Users/miranda/Códigos/hidroia-brasil-ts/src/components/charts/ClusterScatterChart.tsx) replica parcialmente os estilos e a lógica SVG do dispersor PCA/K-Means. Atualmente, a página [Clustering.tsx](file:///Users/miranda/Códigos/hidroia-brasil-ts/src/pages/Clustering.tsx) renderiza o gráfico de forma inline direta para garantir a flexibilidade de tooltips anti-bloqueio.
- **Diretriz**: Como a tela está operando de forma perfeita nos testes de lint e build, **não tente refatorar isso antes da apresentação da banca** para blindar o sistema contra regressões técnicas inesperadas.
- **Ação Futura**: Unificar a plotagem em um componente único genérico parametrizado consumido por `Clustering.tsx`.

### Teste de Projetores e Telas de Projeção (Sidebar)
- **Cenário**: O comportamento hover-collapsible da sidebar é fluido, mas pode exigir atenção sob resoluções baixas ou aspect-ratios incomuns de projetores de laboratório de faculdade.
- **Diretriz**: Testar preventivamente a interface com zoom do navegador em 125% e 150%. Se houver qualquer comportamento instável ou corte em telas antigas de laboratório, há uma alternativa rápida e estável: reverter no arquivo `index.css` a largura padrão da `.sidebar` para `280px` fixa com `position: fixed` e manter o layout em margem estática.

---

## 18. Comandos úteis

Guia rápido de execução de terminal a partir do diretório `/Users/miranda/Códigos/hidroia-brasil-ts`:

- **Servidor de Desenvolvimento Local**:
  ```bash
  npm run dev
  ```
- **Auditoria Estática de Erros e Linter**:
  ```bash
  npm run lint
  ```
- **Geração de Compilação para Produção (Vite/TypeScript)**:
  ```bash
  npm run build
  ```
- **Ciclo Git Recomendado**:
  ```bash
  git status
  git add .
  git commit -m "style: optimize collapsible sidebar visual centering and layout overlay"
  git push
  ```
- **Hospedagem / Deploy**: O ecossistema Vercel escuta automaticamente a branch `main` e inicia o build remoto a cada commit consolidado no GitHub.

---

## 19. Últimos testes conhecidos

Os testes automáticos recentes foram conduzidos localmente com **sucesso absoluto**:

- **Verificação ESLint (`npm run lint`)**: Executada sem qualquer apontamento de erro de tipo ou sintaxe no codebase.
- **Geração de Build (`npm run build`)**: Vite build concluído em 129ms gerando arquivos estáticos limpos e leves:
  - `dist/index.html` (0.98 kB)
  - `dist/assets/index-jcYg0psW.css` (11.85 kB)
  - `dist/assets/index-D6EtRS58.js` (464.73 kB)

---

## 20. Próximos passos recomendados

1. **Revisar Responsividade**: Abrir o site nos modos responsivos do Chrome DevTools para avaliar o comportamento da Sidebar e do Topbar em resoluções comuns de projetores (ex: 1024x768 e 1280x800).
2. **Homologar Tooltips PCA**: Testar passar o mouse em pontos de dispersão nas quinas do SVG do Clustering, garantindo que o tooltip anti-bloqueio continue flutuando de forma legível sem sair dos limites visuais.
3. **Simular Apresentação**: Efetuar passagens orais com o cronômetro do grupo, focando na explicação do PCA (redução matemática para visualização de similaridade) e Isolation Forest (triagem didática de anomalias).
4. **Validar Deploy Remoto**: Acessar o link gerado na Vercel e garantir que o comportamento da interface online esteja idêntico ao local.
5. **Proteger Codebase**: Evitar edições complexas ou refatorações em componentes consolidados na véspera da banca.

---

## 21. Cuidados finais de linguagem

> [!CAUTION]
> **COMPROMISSO ÉTICO E CIENTÍFICO ACADÊMICO**:
> 
> - **NÃO UTILIZE termos operacionais reais** como: *dados oficiais*, *em tempo real*, *medição direta do SNIRH/ANA*, *IA ativa em produção*, *monitoramento operacional contínuo* ou *substituição de órgãos federais de meteorologia*.
> - **UTILIZE termos acadêmicos e conceituais** como: *protótipo acadêmico frontend-only*, *dados simulados baseados no padrão ANA/HIDRO*, *IA conceitual didática*, *projeção matemática bidimensional (PCA)* e *sistema didático de apoio socioambiental*.
