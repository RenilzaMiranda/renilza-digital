# renilza-digital

Monorepo de todas as páginas web da Renilza Miranda. Vive na organização **RenilzaMiranda** no GitHub.

Contexto da organização: a org também contém `brand-kit` (identidade visual — usar como fonte de verdade da marca, em vez da pasta `shared/` daqui), `metodo-prisma` (página de vendas, no ar via GitHub Pages em renilzamiranda.github.io/metodo-prisma), e os repos de conhecimento `image-positioning`, `creator` e `journeys`. Os repos `renilza-bio` (org e pessoal) e `metodo-prisma` (pessoal) tornam-se legados conforme este monorepo assume.

## Estrutura

```
apps/
  site/   → renilzamiranda.com          (site institucional — consultoria de imagem & comportamento)
  bio/    → link.renilzamiranda.com     (página de link na bio, tráfego do Instagram)
shared/   → assets de marca (logo, paleta, fotos originais em alta)
```

Cada app é um site estático puro (HTML/CSS/JS), **sem build step** — decisão intencional.
Só adicionar framework/CMS quando houver necessidade real (ex.: blog editável pela Renilza).

## Como publicar

Os dois projetos no Netlify (time **Incrafter**) estão conectados a este repo:

| Projeto Netlify   | Base directory | Domínio                  |
|-------------------|----------------|--------------------------|
| renilza-miranda   | `apps/site`    | renilzamiranda.com + www |
| (projeto do bio)  | `apps/bio`     | link.renilzamiranda.com  |

**Todo push na branch `main` publica automaticamente.**
Branches abrem Deploy Previews (link de teste) sem tocar produção — use para a Renilza aprovar mudanças.

## Trabalhar localmente

O conteúdo inicial foi carregado direto pelo GitHub. Para trabalhar na sua máquina:

```powershell
cd C:\Users\willi\source
git clone https://github.com/RenilzaMiranda/renilza-digital.git renilza-digital-git
```

(A pasta `C:\Users\willi\source\renilza-digital` sem git é a cópia pré-carga e pode ser apagada após o clone.)

## Formulário de aplicação (apps/site)

Usa **Netlify Forms** (atributo `data-netlify` no form) — sem backend próprio.
Limite do plano grátis: 100 submissões/mês. Se estourar: plano pago ou trocar por Web3Forms (~15 min de mudança).
Submissões chegam em: Netlify → projeto renilza-miranda → Forms.

## Pendências conhecidas

- [ ] Foto do hero em `apps/site/assets/hero-portrait.jpg` está em resolução de tela — substituir pelo arquivo original em alta quando disponível.
- [ ] Números do site ("11k+" no topo vs "11.400+" na seção presença) — Renilza confirmar o valor real e unificar.
- [ ] Depoimentos (Carolina M., Patrícia R., Fernanda L.) — confirmar autorização de uso.
- [ ] Handles sociais (@renilzamirandaa IG/YT, @renilzalifestyle TikTok) — confirmar.
- [x] `apps/bio` — código importado do repo WillParente/renilza-bio (commit 37ecf71), com o link do Método Prisma já corrigido para renilzamiranda.github.io.
- [ ] Limpeza pós-migração (fazer **depois** que o Netlify estiver conectado a este repo e os deploys validados): deletar os repos pessoais redundantes `WillParente/renilza-bio`, `WillParente/metodo-prisma` (duplicata exata do da org — mesmo commit 0a43c44) e `WillParente/RenilzaMiranda` (stub vazio); arquivar `RenilzaMiranda/renilza-bio` (conteúdo absorvido aqui).
- [ ] Futuro: avaliar mover a página do Método Prisma para dentro deste monorepo (ex.: renilzamiranda.com/prisma) em vez do GitHub Pages.
