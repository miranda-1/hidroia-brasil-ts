# HANDOFF — HidroIA / DAC 5º Semestre

Este documento consolida o estado técnico e didático atual da plataforma **HidroIA**, servindo como guia definitivo de transição e referência rápida para qualquer desenvolvedor, avaliador ou modelo de IA. 

---

## 🌊 1. Estado Geral Atual do Projeto

O **HidroIA** está plenamente funcional como um protótipo dinâmico premium de monitoramento hidrometeorológico e IA conceitual.
* **Status de Publicação**: Hospedado e em execução na plataforma **Vercel** com integração contínua ativa a partir do repositório Git no **GitHub**.
* **Identidade Visual e Nomenclatura**:
  * O nome do projeto foi formalizado como **"HidroIA"** (toda e qualquer menção antiga a *"HidroIA Brasil"* foi expurgada para garantir consistência de marca).
  * **Logo & Favicon**: Identidade visual unificada sob a marca de uma **gotinha d'água caindo** (elementos visuais em SVG no arquivo [favicon.svg](file:///Users/miranda/Códigos/hidroia-brasil-ts/public/favicon.svg) e componente `<WaterDropLogo />` na interface).
  * **Estética Ambiental/SaaS**: Fundo escuro premium, grids dinâmicos, cards translúcidos arredondados, efeitos de blur de fundo com micro-interações reativas e realces em ciano e aqua neon.

---

## 🛠️ 2. Stack e Arquitetura

O projeto foi estruturado com foco em leveza, escalabilidade e portabilidade para o ambiente de laboratório e projeção:

* **Core & Framework**: React 19 + TypeScript + Vite (garante inicialização ultrarrápida do servidor dev e verificação estática robusta de tipos).
* **Bibliotecas Principais**:
  * `lucide-react`: Biblioteca de ícones vetoriais modernos.
  * `recharts`: Gráficos interativos analíticos reativos.
  * `framer-motion`: Animações e transições fluidas de tela.
* **Arquitetura Lógica**:
  * **Frontend-Only**: Não possui backend ativo, servidores externos de processamento ou banco de dados físico.
  * **Coleção RAM**: O estado da aplicação e das seleções reside integralmente na memória RAM do navegador durante o tempo de execução.
  * **Ausência de API Real**: Todas as chamadas, cargas de telemetria e scores de IA são processados localmente através de arquivos de dados estáticos baseados em TypeScript dentro do diretório `/src/data`.

---

## 📊 3. Dataset Atual (8 Estações Simuladas)

O dataset do protótipo foi minuciosamente calibrado e consolidado para representar **8 estações hidrometeorológicas brasileiras simuladas** com regimes hídricos reais específicos.

### Lista de Estações Monitoradas:
1. **Porto Velho / RO** (Rio Madeira) — Fluviométrica — *Cluster -1 / Falha física de sensor telemetria*
2. **Humaitá / AM** (Rio Madeira) — Fluviométrica — *Cluster 1 / Comportamento Hidrológico Normal*
3. **Taquari / RS** (Rio Taquari-Antas) — Fluviométrica — *Cluster 3 / Anomalia Crítica de Cheia e Inundação*
4. **São Francisco / BA** (Rio São Francisco) — Fluviométrica — *Cluster 0 / Estiagem em Atenção (Escassez)*
5. **Parnaíba / PI** (Rio Parnaíba) — Pluviométrica — *Cluster 1 / Comportamento Climatológico Normal*
6. **Alto Paraguai / MT** (Rio Paraguai) — Fluviométrica — *Cluster 0 / Atípico (Seca Severa)*
7. **Rio Doce / MG** (Rio Doce) — Fluviométrica — *Cluster 2 / Atenção (Transição / Turbidez de Sedimento)*
8. **Recife / PE** (Capibaribe) — Pluviométrica — *Cluster 3 / Atípico (Chuva Acumulada Extrema)*

### Estrutura do Vetor de Características (`Station`):
As estações de referência em [`src/data/stations.ts`](file:///Users/miranda/Códigos/hidroia-brasil-ts/src/data/stations.ts) e o histórico consolidado de auditoria em [`src/data/databaseRows.ts`](file:///Users/miranda/Códigos/hidroia-brasil-ts/src/data/databaseRows.ts) adotam os seguintes campos de tipo:
* `id` (string): Identificador único do sensor (ex: `"TAQ-01"`).
* `code` (string): Código ANA/HIDRO simulado de 8 dígitos (ex: `"86800000"`).
* `name` (string): Nome da estação principal.
* `uf` / `state` (string): Sigla da Unidade Federativa.
* `basin` / `region` (string): Bacia hidrográfica principal (ex: *"Rio Taquari-Antas"*).
* `river` (string): Corpo hídrico associado.
* `type` ("Fluviométrica" | "Pluviométrica"): Tipo físico de estação.
* `levelCm` (number | undefined): Medição do nível d'água do rio em centímetros (apenas Fluviométrica).
* `flowM3s` (number | undefined): Vazão estimada do rio em m³/s (apenas Fluviométrica).
* `rainfall24hMm` (number): Precipitação observada nas últimas 24h em milímetros.
* `rainfall7dMm` (number): Acumulado de chuva de 7 dias.
* `anomalyScore` (number): Score de anomalia emitido pela Isolation Forest (entre `0.0` e `1.0`).
* `dataQuality` ("bruto" | "consistido"): Qualidade de dados simulada inspirada no SNIRH.
* `risk` ("low", "med", "high", "crit", "fail"): Controla internamente a **lógica de cores** e identidade visual.
* `status` ("Normal", "Atenção", "Atípico", "Anomalia", "Falha"): Rótulo em português exibido textualmente.
* `x` / `y` (number): Coordenadas vetoriais calibradas para plotagem dinâmica no mapa do Brasil.

---

## 📈 4. Tela de K-Means / Clustering (Estado Final Refinado)

A tela de **"Análise de clusters (K-Means)"** foi profundamente lapidada para ser o destaque da apresentação acadêmica do DAC. Ela exibe uma redução de dimensionalidade PCA e o agrupamento K-Means de forma totalmente didática, rápida e clara para a banca.

### A. Painel de KPIs Superiores
Cinco cartões métricos estruturados perfeitamente integrados com o dataset simulado:
* **Algoritmo**: `K-Means` — *Agrupamento não supervisionado*
* **Clusters**: `4 + ruído` — *Perfis hidrológicos simulados*
* **Silhouette**: `0.71` — *Boa separação entre grupos*
* **Base analisada**: `8 estações` — *Leituras hidrometeorológicas simuladas*
* **PCA**: `92%` — *Variabilidade explicada*

### B. Projeção PCA ("Mapa de Similaridade das Estações")
* **Áreas de Clusters e SVG**: O gráfico em SVG possui 4 bolhas geométricas tracejadas e translúcidas em torno de cada agrupamento para melhor delimitação espacial. Rótulos sutis e discretos foram injetados em SVG (**ESTIAGEM**, **NORMAL**, **TRANSIÇÃO**, **INUNDAÇÃO**, **FALHA/RUÍDO**) com `opacity: 0.65` e `fontSize: 10px` para uma leitura imediata.
* **Eixos do PCA Simplificados**: Para evitar sobreposição em telas de projeção, os eixos foram resumidos para:
  * **Eixo X**: `"Eixo X — intensidade hidrológica"` (detalhes no atributo hover `title`).
  * **Eixo Y**: `"Eixo Y — variação do comportamento"` (detalhes no atributo hover `title`).
* **Rodapé Deslocado**: A frase explicando que o PCA representa similaridade matemática e não localização geográfica foi movida para fora do SVG, fluindo de forma limpa abaixo da dispersão.

### C. Tooltip Inteligente Compacto e Anti-Bloqueio
* **Dimensão**: Compacto e leve (largura máxima de **`230px`**), com fundo semi-transparente `rgba(8, 25, 35, 0.82)`, `backdrop-filter: blur(8px)` e bordas dinâmicas iluminadas na cor do cluster ativo.
* **Remoção de Ruído no Título**: Identificadores longos como *"Leitura Simulada 118"* foram totalmente removidos. O tooltip agora apresenta de forma limpa, por exemplo: `"Estação São Francisco — BA"`.
* **Exibição Inteligente por Tipo**:
  * Para estações **Fluviométricas**, exibe Nível (cm) e Vazão (m³/s) como métricas separadas e limpas (sem junções confusas em percentual).
  * Para estações **Pluviométricas**, omite nível/vazão e exibe estritamente a chuva observada (24h/7d).
* **Posicionamento Dinâmico por Quadrante**: Calcula em tempo real o local em que o mouse está no SVG. Se o ponto está na direita, o tooltip abre na esquerda; se está abaixo, abre acima, impedindo que o cartão cubra os pontos selecionados ou o próprio cluster examinado.
* **Linha de Interpretação Curta**: Cada tooltip exibe uma frase didática resumindo o diagnóstico da IA (ex.: *"Interpretação: leitura dentro da normalidade."* ou *"Interpretação: baixa chuva ou baixa vazão."*).

### D. Distribuição Lateral das Estações por Perfil
Corrigido de forma absoluta para demonstrar coerência numérica com o dataset de 8 estações da plataforma, removendo discrepâncias antigas (como referências a 62 leituras):
* **Estiagem Crítica** — `2 estações` (Alto Paraguai (MT) [Seca Severa] e São Francisco (BA) [Escassez Hídrica])
* **Comportamento Normal** — `2 estações` (Humaitá (AM) [Fluviométrica Normal] e Parnaíba (PI) [Pluviométrica Normal])
* **Transição Sazonal** — `1 estação` (Rio Doce (MG) [Variação de Turbidez / Pressão Sazonal])
* **Extremos de Inundação** — `2 estações` (Taquari (RS) [Cheia Crítica] e Recife (PE) [Chuva Extrema])
* **Inconsistência Telemétrica/Falha** — `1 estação` (Porto Velho (RO) [Falha de Hardware/Sensor])

> [!TIP]
> **Diretrizes para revisões futuras de distribuição**:
> Caso altere os dados no futuro, lembre-se da coerência conceitual das bacias:
> * *Alto Paraguai* representa seca/estiagem;
> * *Humaitá* e *Parnaíba* representam normalidade hídrica;
> * *Taquari* e *Recife* representam extremos de cheia e chuva;
> * *Porto Velho* representa falha física;
> * *Rio Doce* e *São Francisco* representam transição hídrica ou escassez em atenção.

---

## 🤝 5. Coerência com Dataset e Telas

O projeto passou por uma auditoria completa de nomenclatura para erradicar nomes genéricos legados no tooltip final ou incompatibilidades nas telas.
* **Nomes Banidos**: Nenhuma tela ou arquivo possui mais referências a *"Costeira-08"*, *"Angra dos Reis"*, *"Estação Telemétrica-23"* ou *"Solimões antigo"*.
* **Sincronismo Global**: As tabelas de Base de Dados, rankings da Detecção de Anomalias, mapa dinâmico do Dashboard Nacional, painel de Recomendações e as Projeções de Clusters fazem referência única e exclusiva às 8 estações brasileiras reais simuladas do dataset.

---

## 📝 6. Texto Oficial para a Documentação/Site

O texto a seguir deve ser exposto na documentação do projeto ou seção de apresentação do site:

> "O dataset do HidroIA é composto por dados simulados de 8 estações hidrometeorológicas distribuídas pelo Brasil, com estrutura inspirada nos padrões de organização da ANA/HIDRO. A base inclui estações fluviométricas e pluviométricas, contendo informações como código simulado, bacia hidrográfica, tipo de estação, nível do rio, vazão estimada, chuva acumulada, qualidade do dado, status operacional e score de anomalia.
>
> Esses dados alimentam o dashboard, o mapa interativo, a base consolidada, a análise de clusters, a detecção de anomalias e as recomendações do protótipo. A proposta é demonstrar, em contexto acadêmico, como dados hidrometeorológicos poderiam ser organizados e analisados com apoio de técnicas conceituais de Aprendizado Não Supervisionado, como K-Means, PCA e Isolation Forest.
>
> Todos os dados são mockados/simulados, não representam medições oficiais ou em tempo real e não substituem sistemas de monitoramento de órgãos especializados."

---

## 🖥️ 7. Planejamento de Slides e Apresentação (DAC)

O roteiro de slides da banca acadêmica está totalmente desenhado e integrado às telas existentes do sistema:

### Slide Sugerido: "Dataset Hidrometeorológico"
* **Título**: `Dataset Hidrometeorológico`
* **Subtítulo/Texto Principal**: 
  * *"Dados simulados inspirados na estrutura ANA/HIDRO."*
  * *"O HidroIA utiliza uma base mockada com 8 estações hidrometeorológicas brasileiras, distribuídas por diferentes regiões e bacias hidrográficas."*
  * *"A base reúne informações como nível do rio, vazão estimada, chuva acumulada, qualidade do dado, status operacional e score de anomalia."*
  * *"Esses dados alimentam o dashboard, mapa, clusters, anomalias e recomendações do sistema."*
* **Cards Informativos Centrais**:
  * **8 ESTAÇÕES**: Distribuídas estrategicamente por regiões e bacias hidrográficas do Brasil.
  * **2 TIPOS DE COLETA**: Estações fluviométricas e pluviométricas simuladas de forma autônoma.
  * **DADOS AMBIENTAIS**: Nível do rio, vazão média, precipitação, bacia e qualidade do dado.
  * **IA CONCEITUAL**: Massa de testes rica servindo de entrada para K-Means, PCA e Isolation Forest.
* **Rodapé**: `"Dados simulados para fins acadêmicos. Não representam medições oficiais ou em tempo real."`

---

## ⌨️ 8. Comandos Úteis

* **Rodar em modo de desenvolvimento local**:
  ```bash
  cd /Users/miranda/Códigos/hidroia-brasil-ts
  npm run dev
  ```
* **Verificação de Linter (ESLint)**:
  ```bash
  npm run lint
  ```
* **Compilação de Produção (Vite/TypeScript Build)**:
  ```bash
  npm run build
  ```
* **Versionamento de Código (Git)**:
  ```bash
  git status
  git add .
  git commit -m "feat: implement didactical refinement and visual optimizations to PCA K-Means"
  git push
  ```
* **Deploy e Vercel**: A Vercel está acoplada à branch `main` do GitHub. Um commit executado com sucesso dispara automaticamente o pipeline de deploy na nuvem.

---

## 🧪 9. Validação de Testes Recentes

O projeto passou recentemente por rigorosos testes automáticos e validações manuais antes da consolidação do Handoff:
* **`npm run lint`**: **Sucesso absoluto**. Zero erros e zero avisos apontados na base de arquivos da aplicação.
* **`npm run build`**: **Sucesso de compilação**. A compilação TypeScript executou sem gaps e o Vite gerou o bundle de produção otimizado com sucesso em **110ms**:
  * `dist/index.html` (0.98 kB)
  * `dist/assets/index-CjBZ3e0x.css` (10.49 kB)
  * `dist/assets/index-C9ropc6u.js` (337.33 kB)

---

## ⚠️ 10. Cuidados Obrigatórios de Linguagem e Ética

> [!CAUTION]
> **ATENÇÃO MÁXIMA NA APRESENTAÇÃO E DESENVOLVIMENTO**:
> 
> * **NUNCA AFIRME** que os dados são oficiais, em tempo real, ou que existe uma integração física ou API ativa conectando o protótipo aos servidores federais da ANA, SNIRH ou INMET.
> * **NUNCA AFIRME** que o sistema opera como um preditor oficial de desastres habilitado para Defesa Civil ou que possui modelos de IA pesados em Python rodando em backend real.
> * **SEMPRE ENFATIZE** os termos: *dados simulados*, *base de dados mockada*, *estrutura conceitual inspirada na ANA/HIDRO*, *protótipo acadêmico frontend-only* e *apoio didático à decisão socioambiental*.

---

## 🚀 11. Próximos Passos Sugeridos

1. **Revisão de Exibição**: Testar a tela de Clustering em projetores do laboratório para avaliar o contraste dos rótulos suavizados sob luz ambiente.
2. **Auditoria de Tooltips**: Conferir a renderização do tooltip em posições críticas nas bordas extremas do SVG, atestando o funcionamento da lógica de coordenadas `calc`.
3. **Validação de Responsividade**: Analisar o fluxo horizontal do layout sob zoom ou ajustes de largura na tela de exibição.
4. **Alinhamento do DAC**: Concluir o design e os roteiros dos slides acadêmicos baseados nos cards estruturados.
5. **Simulação de Apresentação**: Efetuar uma rodada de testes do roteiro oral simulando as perguntas mais prováveis da banca de Ciência da Computação (foco em PCA e Isolation Forest).
6. **Sincronismo de Commit**: Realizar o Git push das últimas melhorias visuais.
7. **Homologação da Vercel**: Validar o deploy gerado na Vercel a partir do push recente e garantir que a interface online esteja idêntica e sem quebras.
8. **Articulação do DAC Interativa**: Refinar a responsividade da navegação SPA interna de atalhos a partir dos botões informativos da tela do DAC.

---

## 🔧 12. Dívidas Técnicas e Inconsistências Mapeadas

> [!NOTE]
> **Identificada Duplicação de Gráficos de Clustering**:
> * O arquivo [ClusterScatterChart.tsx](file:///Users/miranda/Códigos/hidroia-brasil-ts/src/components/charts/ClusterScatterChart.tsx) replica parte significativa da lógica de plotagem e exibição visual do gráfico PCA/K-Means.
> * Atualmente, a tela [Clustering.tsx](file:///Users/miranda/Códigos/hidroia-brasil-ts/src/pages/Clustering.tsx) renderiza a visualização SVG de forma inline no próprio arquivo.
> * **Diretriz de Curto Prazo**: Como a tela está totalmente funcional e validada nos processos de lint/build, **NÃO** realize nenhuma refatoração ou alteração estrutural antes da apresentação do DAC para evitar riscos de regressão técnica ou quebra de componentes em produção.
> * **Refatoração Recomendada (Pós-Apresentação)**: Transformar o `ClusterScatterChart.tsx` em um componente único e genérico reutilizável, fazendo com que a página `Clustering.tsx` consuma este componente de forma limpa e direta, eliminando de forma definitiva a duplicação no codebase.

