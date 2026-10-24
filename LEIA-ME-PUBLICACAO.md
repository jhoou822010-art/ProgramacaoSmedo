# Programação Sem Medo — arquivos para publicação

Foram preparados dois pacotes:

- `Programacao-Sem-Medo-site-estatico.zip`: pronto para subir em uma hospedagem estática, GitHub Pages ou painel de hospedagem. Basta extrair o conteúdo e publicar os arquivos.
- `Programacao-Sem-Medo-projeto-completo.zip`: código-fonte completo para guardar no GitHub, editar e gerar novos builds.

## Opção mais simples: publicar o pacote estático

1. Baixe `Programacao-Sem-Medo-site-estatico.zip`.
2. Extraia os arquivos.
3. Envie o conteúdo extraído para a pasta pública da hospedagem, normalmente `public_html`, `www` ou `htdocs`.
4. Abra o domínio e confira a página.

O pacote estático já contém `index.html`, CSS, JavaScript, a capa original otimizada (`ebook-cover.webp`) e o manifesto de rotas.

## GitHub Pages

1. Crie um repositório público no GitHub.
2. Envie para a raiz do repositório os arquivos que estão dentro do ZIP estático.
3. Em **Settings → Pages**, selecione **Deploy from a branch**, escolha a branch `main` e a pasta `/root`.
4. Salve e aguarde o GitHub gerar o endereço temporário.
5. Para usar seu domínio, em **Settings → Pages → Custom domain**, informe o domínio.
6. No provedor do domínio, crie o registro DNS indicado pelo GitHub. Para um domínio raiz, normalmente são registros `A`; para `www`, normalmente um `CNAME` para o endereço informado pelo GitHub.

Se o site for publicado dentro de uma subpasta do GitHub Pages, como `usuario.github.io/nome-do-repositorio`, os caminhos absolutos dos assets podem exigir configuração adicional. Para domínio próprio apontado na raiz do GitHub Pages, o pacote funciona diretamente.

## Usar o projeto completo

O ZIP completo é indicado para edição futura. No terminal, dentro da pasta do projeto:

```bash
pnpm install
pnpm build:static
```

Depois, publique o conteúdo de `dist/public` na hospedagem estática. É necessário usar Node.js e pnpm para gerar o build.

## Fluxo de venda configurado

A página coleta nome, WhatsApp e e-mail. Ao clicar no botão, abre uma conversa com o número `+55 43 99648-2559` e uma mensagem preenchida com o pedido do e-book por **R$ 25,90**, pagamento único via Pix e produto em PDF.

O fluxo configurado é: comprador preenche os dados, recebe a chave Pix pelo WhatsApp, realiza o pagamento e recebe o PDF após a confirmação. O site não processa o Pix automaticamente nem envia o arquivo sozinho; essa confirmação e entrega são feitas pelo vendedor no WhatsApp.

O e-mail de contato exibido na página é `jhoou822010@gmail.com`.
