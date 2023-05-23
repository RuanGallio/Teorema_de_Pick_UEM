<script setup lang="ts"></script>
<template>
  <footer
    class="mt-auto footer footer-center p-10 bg-neutral text-neutral-content"
  >
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
          O Projeto Permanente de Extensão processo nº 1183/1999 - Cálculo
          diferencial e integral - um kit de sobrevivência é um projeto onde,
          entre outras atividades, se compila, organiza e produz materiais
          voltados a matemática com o objetivo de divulgar, propiciar material
          didático auxiliar, textos autorais e tutoriais de uso de software
          matemático.
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
          projeto
          <a class="link" target="_blank" href="http://www.dma.uem.br/kit"
            >Kit de Sobrevivência em Cálculo</a
          >
          da UEM.
        </p>
      </div>
    </div>
  </footer>
</template>
