<script setup lang="ts"></script>
<template>
  <footer class="footer footer-center p-10 bg-neutral text-neutral-content">
    <p class="text-sm flex flex-row text-center text-neutral-content">
      Desenvolvido por
      <a
        href="https://github.com/RuanGallio"
        target="_blank"
        class="link text-purple-500 hover:underline"
        >Ruan Gallio</a
      >
    </p>
    <!-- make 2x1 grid -->
    <div class="grid grid-cols-2 gap-4 place-items-center place-content-center">
      <div class="flex flex-col gap-2 w-2/3">
        <h2>
          Sobre o
          <a class="link" target="_blank" href="http://www.dma.uem.br/kit">
            Kit de sobrevivência em Cálculo</a
          >
        </h2>
        <p class="text-justify">
          Da própria página do Kit: O Kit de sobrevivência em Cálculo é uma
          coleção de textos, apostílas e diversos materiais usando softwares de
          Matemática contendo conteúdo diverso de matemática basica e
          universitária. Neste Kit você também vai encontrar procedimentos e
          exemplos em Cálculo que vão do basico ao avançado para atender os mais
          diversos propósitos.
        </p>
      </div>
      <div class="flex flex-col gap-2 w-2/3">
        <h2>Sobre o Site</h2>
        <p class="text-justify">
          Este site busca ser uma ferramenta para que alunos possam experimentar
          com o
          <a
            href="http://www.dma.uem.br/kit/formulla-de-pick/formula-de-pick.pdf"
            class="linnk"
            target="_blank"
            >Teorema de Pick</a
          >
          de forma prática e visual.
        </p>
        <p class="text-justify">
          Desenvolvido por Ruan Gallio, aluno de Matemática na UNIOESTE para o
          projeto Kit de Sobrevivência em Cálculo da UEM, coordenado pelo
          professor Rodrigo Martins.
        </p>
      </div>
    </div>
  </footer>
</template>
