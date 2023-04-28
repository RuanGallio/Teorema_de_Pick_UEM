# Teorema de Pick na Prática!

Revitalização de Software educacionais pelo Projeto Cálculo diferencial e integral - um kit de sobrevivência, da Universidade Estadual de Maringá (UEM), coordenado pelo professor Rodrigo Martins.

Neste site existe uma malha pontilhada destinada a gerar polígonos com seus vértices nos pontos.
O objeto é calcular a área do polígono gerado, utilizando o Teorema de Pick.

Site hospedado em: [https://teorema-de-pick.web.app/](https://teorema-de-pick.web.app/)

## O que é o Teorema de Pick?

[wikipedia](https://en.wikipedia.org/wiki/Pick%27s_theorem)
[kit de sobrevivência](http://www.dma.uem.br/kit/formulla-de-pick/formula-de-pick.pdf)

De forma prática, ele afirma que a área de um polígono desenhado em uma malha com pontos em coordenadas discretas
está relacionada com a quantidade de pontos internos e pontos na borda do polígono da seguinte forma:
$$A = i + \frac{b}{2} - 1$$
onde $A$ é a área do polígono, $i$ é a quantidade de pontos internos e $b$ é a quantidade de pontos na borda do polígono.

## O presente projeto

Feito utilizando Vite + VueJS e hospedado no Firebase Hosting pelo aluno Ruan Gallio do curso de matemática da Universidade Estadual do Oeste do Paraná (UNIOESTE).

## Como contribuir?

Para contribuir com o projeto, basta fazer um fork do repositório, fazer as alterações desejadas e enviar um pull request que será analisado e, se aprovado, incorporado ao projeto.

## Como rodar o projeto localmente?

Para rodar o projeto localmente, basta clonar o repositório, instalar as dependências e rodar o servidor de desenvolvimento com

```bash
npx vite --port=4000
```

## Licença

GNU GPLv3
