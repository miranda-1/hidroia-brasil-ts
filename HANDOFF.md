# HANDOFF — Projeto HidroIA / DAC 5º Semestre

Este documento consolida o estado técnico e didático atual da plataforma **HidroIA**, servindo como guia definitivo de transição e referência rápida para qualquer desenvolvedor, avaliador ou modelo de IA em interações futuras.

---

## 1. Resumo Executivo

O **HidroIA** é um protótipo acadêmico frontend-only de análise hidrometeorológica e IA conceitual, desenvolvido especificamente para o Desafio de Articulação de Competências (DAC) do 5º semestre de Ciência da Computação.

- **Status do Projeto**: 100% funcional no ambiente local, compilando perfeitamente (`npm run build`) e em conformidade estrita com o linter (`npm run lint`).
- **Arquitetura Simplificada**: Não possui backend, APIs externas ou banco de dados físico. Todo o processamento e a lógica visual ocorrem localmente no navegador (frontend-only).
- **Abordagem de Dados**: Baseada exclusivamente em dados simulados/mockados em arquivos TypeScript, sem medições oficiais ou dados em tempo real.
- **Inteligência Artificial**: Apresentada sob uma perspectiva puramente **conceitual e didática** (K-Means, PCA, Isolation Forest), servindo como simulador e apoio didático ao aprendizado de Ciência de Dados e à análise socioambiental.
- **Estética Visual**: Dark mode premium com realce em ciano e aqua neon, uso de cards translúcidos com blur (glassmorphism), microinterações reativas em todos os botões e transições de página ultra-suaves.

---

## 2. Stack e Arquitetura

O codebase do projeto está estruturado de forma limpa, isolada e com carregamento instantâneo no navegador:

- **Core**: React 19 + TypeScript + Vite.
- **Bibliotecas Principais**:
  - `lucide-react`: Ícones vetoriais dinâmicos para a interface e menus.
  - `recharts`: Renderização de gráficos analíticos e temporais reativos.
  - `framer-motion`: Gerenciamento e execução de transições SPA.
- **Roteamento SPA**: O fluxo de rotas é controlado por estado React local no arquivo `src/App.tsx`, garantindo que todas as telas carreguem instantaneamente.
- **Transições de Tela**: Envolvidas em elementos do `framer-motion` (`AnimatePresence` com efeito coordenado de `opacity`, `y` e `blur(4px)`), eliminando cortes secos.

---

## 3. Identidade Visual e Microinterações Globais

- **Nomenclatura Oficial**: **Hidro<span>IA</span>** (gotinha d'água estilizada via componente SVG).
- **Estilo UI**: SaaS contemporâneo em tons escuros:
  - Fundo principal: deep dark (`oklch(0.12 0.015 240)`).
  - Destaques visuais: ciano (`var(--cyan)`) e aqua neon.
  - Cartões e painéis: Bordas suaves com transparência (`backdrop-filter: blur(12px)`).
- **Microinterações Globais (Implementado/Aprovado)**:
  - Desenvolvida a classe utilitária `.interactive-action` no `src/index.css`.
  - Todos os elementos clicáveis (botões, chips, filtros, links e itens de navegação) possuem feedback físico visual imediato:
    - **Hover**: Elevação sutil tridimensional (`translateY(-1.5px)` e brilho de borda).
    - **Active (Clique)**: Pequena compressão (`scale(0.985)`).
    - **Foco**: Anel ciano de acessibilidade em foco de teclado.
    - **Acessibilidade**: Respeito estrito a `prefers-reduced-motion` para animações reduzidas sob diretriz de acessibilidade.

---

## 4. Estrutura Principal de Pastas

```text
src/
  assets/              # Recursos estáticos
  components/
    charts/            # Gráficos auxiliares (ex: ClusterScatterChart.tsx)
    layout/            # Layout global (AppShell, Sidebar, Topbar)
    map/               # Componente interativo do mapa (BrazilSensorMap.tsx)
    ui/                # Componentes genéricos (PageHeader, Spark, WaterDropLogo)
  data/                # Dados mockados (stations, databaseRows, anomalies, clusters)
  pages/               # Telas principais que compõem o sistema SPA
  types/               # Tipagens TypeScript (hydro.ts)
  App.tsx              # Roteador interno principal e transição framer-motion
  main.tsx             # Ponto de entrada React do Vite
  index.css            # Estilização global e design system
```

---

## 5. Dataset e Bacias Hidrográficas Simuladas

O dataset é constituído por **8 estações hidrometeorológicas simuladas** distribuídas por diferentes regiões, rios e bacias brasileiras. **Atenção conceitual**: não descrever o dataset como "8 rios únicos", pois rios e bacias podem se repetir:

1. **Porto Velho / RO** (Rio Madeira - Bacia do Amazonas) — Fluviométrica — *Outlier / Falha Simulada de Sensor* (vazão nula súbita após chuva acumulada na bacia).
2. **Humaitá / AM** (Rio Madeira - Bacia do Amazonas) — Fluviométrica — *Normal* (vazões e níveis ideais).
3. **Taquari / RS** (Rio Taquari-Antas - Bacia do Jacuí) — Fluviométrica — *Anomalia Crítica / Cheia e Inundação*.
4. **São Francisco / BA** (Rio São Francisco - Bacia do São Francisco) — Fluviométrica — *Atenção / Estiagem e Escassez*.
5. **Parnaíba / PI** (Rio Parnaíba - Bacia do Parnaíba) — Pluviométrica — *Normal* (índices médios de precipitação).
6. **Alto Paraguai / MT** (Rio Paraguai - Bacia do Paraguai) — Fluviométrica — *Atípico / Seca Severa*.
7. **Rio Doce / MG** (Rio Doce - Bacia do Rio Doce) — Fluviométrica — *Atenção / Transição* (elevação gradual de turbidez).
8. **Recife / PE** (Capibaribe - Bacia do Capibaribe) — Pluviométrica — *Atípico / Chuva Acumulada Extrema*.

---

## 6. Estado por Página (Detalhamento do Último Polimento)

### 6.1 Landing Page (Aprovado)
- **Hero & Badge**: Exibe a badge informativa de protótipo acadêmico. O título principal destaca *"dados simulados"* em ciano.
- **Mapa da Home**: Card interativo na direita com efeito de **chuva conceitual ao passar o mouse em qualquer área do card do mapa**.
- **Acessibilidade**: Card/mapa clicável direcionando para o Dashboard, contendo acessibilidade por teclado (`role="button"`, `tabIndex={0}`, `aria-label` e suporte a Enter/Space).
- **Seção Sobre**: Roda suavemente para o rodapé explicativo curto do DAC.

### 6.2 Topbar e Sidebar (Aprovado)
- **Linguagem Segura**: Exibe estritamente `SIMULADO` (e não "LIVE") e `Cenário-base: 02/05/2024 · 08:30`.
- **Sidebar Collapsible Refinada**:
  - Fechada em `84px` (com logo e ícones matematicamente centrados).
  - Expandida em `280px` sob hover, atuando em **overlay absoluto** (`fixed`) para não empurrar os cards do dashboard por baixo.
  - Efeito **glassmorphism translúcido sob expansão** (blur menor, opacidade de fundo reduzida) para manter a visibilidade do dashboard sob o menu.
  - Textos e categorias emergem com delay coordenado de `0.08s` e pequenos efeitos de blur/translate para evitar quebras abruptas na transição.

### 6.3 Dashboard Nacional (Aprovado)
- **Linguagem Segura**: Títulos revisados: "LIVE" virou "SIMULADO", "Última atualização" virou "Cenário-base", "Estações monitoradas" virou "Estações simuladas", e "Mapa de regiões críticas" virou "Mapa de estações simuladas".
- **Mapa do Brasil**: Otimizado para ocupar melhor o card, com legenda renderizada em overlay flutuante translúcido no canto inferior esquerdo.
- **Restrição Pluviométrica**: Estações pluviométricas (como Parnaíba e Recife) exibem apenas atributos de chuva, omitindo/ocultando leituras de vazão e nível de forma segura.

### 6.4 Base de Dados (Aprovado)
- **Linguagem Segura**: Termos ajustados ("Estações Simuladas", "Classificação Conceitual de Risco", "Código Sim.", "Score Anom.", "Risco", "Cenário-base").
- **Visual**: Aplicado `white-space: nowrap` em valores de telemetria cruciais na tabela (ex: `"12.500 m³/s"`) para evitar quebras feias de linha em telas estreitas.

### 6.5 Anomalias Iso Forest (Aprovado)
- **Linguagem Segura**: "Gerar Relatório IA" virou "Gerar relatório demo", "Alertas de Extremos" virou "Cenários extremos", e "Contaminação" virou "Score alto simulado". Removidas frases operacionais e substituídas por linguagem estritamente didática.
- **Layout de Duas Colunas**:
  - **Esquerda**: Tabela de ranking de anomalias simuladas com filtro dinâmico de criticidade.
  - **Direita**: Cards instrutivos explicativos ("Como ler o score" e as etapas conceituais de "Validação Cruzada Espacial").
- **Nota Didática Full-width (Inconsistência de Porto Velho)**:
  - Reposicionada como um card elegante de largura total logo abaixo da grid superior.
  - Possui design com gradiente sutil, dados explicativos à esquerda e badge/score (`0.88`) à direita, alinhados à grade de responsividade.

### 6.6 Metodologia de IA (Aprovado)
- **Linguagem Segura**: Pipeline renomeada ("Ingestão Simulada", "Filtro Conceitual de Ruído", "Apoio Didático à Análise"). Subtítulo atualizado para: *"Como o HidroIA organiza leituras hidrometeorológicas simuladas e demonstra conceitos de Aprendizado Não Supervisionado."*
- **Reorganização de Layout**:
  - A tabela de features (esquerda) recebeu `height: "fit-content"` para não deixar espaço vazio abaixo dela.
  - A coluna da direita recebeu o card **"Limitações do Modelo"** (eyebrow: `LIMITAÇÕES DO MODELO`, título: `Escopo acadêmico e simulado`, texto sobre o caráter conceitual com chips estruturais: `Base simulada`, `Sem integração oficial`, `Sem uso operacional`).
  - O painel **"Modelos e Funções Matemáticas"** virou um bloco horizontal de largura total na parte inferior, com as caixas de equações distribuídas em uma grid flexível reativa.
  - **Removido** o botão de PDF do cabeçalho da página para manter a simplicidade do protótipo.

---

## 7. Componentes Compartilhados e o Mapa Interativo

### BrazilSensorMap.tsx (Aprovado)
- **Simplificação Cartográfica**: Estados brasileiros atuam como base cartográfica passiva e discreta. O efeito de destaque individual nos estados sob hover foi desativado em ambos os mapas (Landing e Dashboard).
- **Remoção de Ruídos**: Removido o rótulo central "BR" e reduzidas as rasuras vetoriais.
- **Chuva Conceitual**:
  - A camada de chuva visual é controlada de forma limpa por props de animação CSS e posicionamento estocástico.
  - **No Dashboard**: A chuva é ativada no card de mapa *exclusivamente* quando o usuário passa o cursor sobre os sensores/pinos de estação.
  - **Na Landing**: A chuva ocorre de forma integrada ao passar o cursor sobre qualquer ponto da área geral do cartão do mapa.
  - A animação é contida com `overflow: hidden` e `pointer-events: none`.

---

## 8. Dívidas Técnicas e Diretrizes

### Gráfico PCA Reutilizável Duplicado
- **Situação**: O arquivo `ClusterScatterChart.tsx` replica parcialmente a estilização SVG da dispersão PCA. No entanto, para fins de robustez do tooltip anti-bloqueio de quinas, `Clustering.tsx` implementa a plotagem inline direta.
- **Diretriz**: **Não refatorar ou tentar unificar isso na véspera da banca**. O código atual está homologado nos testes de compilação estática.

### Teste de Projetores
- **Diretriz**: O menu hover-collapsible funciona de forma excelente, mas deve ser testado em projetores de baixa resolução (ex: `1024x768`). Caso a área útil de projeção oculte itens, pode-se reverter rapidamente a largura da sidebar para `280px` estáticos diretos no CSS.

---

## 9. Comandos Úteis

```bash
# Acessar diretório principal
cd /Users/miranda/Códigos/hidroia-brasil-ts

# Executar servidor de desenvolvimento local
npm run dev

# Auditar linter e erros de tipo
npm run lint

# Compilar build estático otimizado
npm run build

# Ciclo Git de entrega
git status
git add .
git commit -m "style: optimize methodology grid, add limitations card and remove pdf download button"
git push
```

---

## 10. Últimos Testes Conhecidos

- **TypeScript e Linter (`npm run lint`)**: 100% de sucesso (0 erros, 0 avisos).
- **Geração de Build Estático (`npm run build`)**: Vite build concluído em 127ms gerando o pacote de produção otimizado com sucesso total.

---

## 11. Próximos Passos Recomendados para a Apresentação

1. **Revisar K-Means / Clustering** (Aprovado/Completo): Conferir interações dos clusters e tooltips anti-bloqueio de quinas.
2. **Revisar Recomendações e DAC** (Pendente): Avaliar a fluidez de termos acadêmicos seguros nesses dois últimos arquivos.
3. **Simulação Oral**: Testar a apresentação das telas de PCA, Isolation Forest e K-Means dentro do tempo oficial do DAC.
4. **Deploy Final**: Certificar-se de efetuar o git push para consolidar o build na Vercel antes do início da banca.

---

## 12. Regras de Linguagem Segura (Aviso de Conformidade)

> [!CAUTION]
> **COMPROMISSO DIDÁTICO E CONCEITUAL ACADÊMICO**:
> - **NÃO UTILIZE termos operacionais reais** como: *dados oficiais*, *em tempo real*, *monitoramento ativo federal*, *IA em produção operacional*, *integração de API federal* ou *previsão oficial de calamidade*.
> - **UTILIZE termos seguros de prototipagem** como: *protótipo acadêmico frontend-only*, *dados simulados baseados no padrão ANA/HIDRO*, *IA conceitual didática*, *projeção abstrata e didática de similaridade* e *apoio didático à análise socioambiental*.
