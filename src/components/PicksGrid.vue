<script lang="ts">
import { defineComponent } from "vue";
import { pointInPolygon, pointOnPolygon, lineIntersectsLine } from "geometric";

const formulaHtml = `
<math xmlns="http://www.w3.org/1998/Math/MathML"  >
  <mrow
    class="text-[20px] text-center "
  >
    <mi>A</mi><mo>=</mo>
    <mi>i</mi><mo>+</mo>
    <mfrac>
    <mn>1</mn><mn>2</mn>
    </mfrac><mi>b</mi> <mo> - </mo>
    <mn>1</mn>
  </mrow>
</math>
`;

type Point = [number, number];
type Polygon = Point[];
type Line = [Point, Point];

export default defineComponent({
  name: "PickGrid",
  setup() {
    return {};
  },
  data() {
    return {
      pickFormula: formulaHtml,
      canvas: null as HTMLCanvasElement | null,
      image: null as HTMLImageElement | null,
      ctx: null as CanvasRenderingContext2D | null,
      polygon: [] as Polygon,
      numPointsOnPolygon: 0,
      numPointsInPolygon: 0,
      grid: [] as Polygon,
      gridNumPointsX: 10,
      gridNumPointsY: 10,
      gapBetweenPoints: 50,
    };
  },
  mounted() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.canvas = canvas;
    this.ctx = ctx;
    this.drawGrid();
  },
  computed: {
    canvasWidth() {
      return this.gapBetweenPoints * (this.gridNumPointsX + 1);
    },
    canvasHeight() {
      return this.gapBetweenPoints * (this.gridNumPointsY + 1);
    },
  },

  methods: {
    fillPoint(fillStyle: string, point: Point, pointRadius: number) {
      const { ctx } = this;
      if (!ctx) return;

      const x = point[0];
      const y = point[1];

      ctx.fillStyle = fillStyle;
      ctx.beginPath();
      ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    },

    lineWillIntersect(line: Line, polygon: Polygon) {
      let numIntersections = 0;
      for (let i = 0; i < polygon.length - 1; i++) {
        const line2 = [polygon[i], polygon[i + 1]] as Line;
        if (lineIntersectsLine(line, line2)) {
          numIntersections++;
          if (numIntersections > 1) return numIntersections;
        }
      }

      return numIntersections;
    },

    handleClick(event: MouseEvent) {
      const { canvas, ctx, polygon, gapBetweenPoints } = this;

      if (!canvas || !ctx) return;

      const rect = canvas.getBoundingClientRect();

      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const x = Math.round(mouseX / gapBetweenPoints) * gapBetweenPoints;
      const y = Math.round(mouseY / gapBetweenPoints) * gapBetweenPoints;

      if (
        x === 0 ||
        y === 0 ||
        x === this.canvasWidth ||
        y === this.canvasHeight
      )
        return;

      const point = [x, y] as Point;
      const pointRadius = 5;

      const pointIndex = polygon.findIndex(
        (p) => p[0] === point[0] && p[1] === point[1]
      );

      const line = [polygon[polygon.length - 1], point] as Line;

      const lineIntersect = this.lineWillIntersect(line, polygon.slice(0, -1));

      if (lineIntersect > 1) return;

      const pointIsFirst = pointIndex === 0;

      if (lineIntersect && !pointIsFirst) return;

      const allPointsConsecutive = polygon.every(
        (p) => p[0] === x && p[1] === y
      );

      if (pointIndex === -1) {
        this.fillPoint("red", point, pointRadius);
        polygon.push(point);
        return;
      }

      if (pointIsFirst && polygon.length >= 3 && !allPointsConsecutive) {
        this.drawPolygon(polygon);
        return;
      }
    },

    handleFileInput(event: Event) {
      /* 
        TODO!
        Por algum motivo, só desenha a imagem na segunda vez que o arquivo é selecionado.
        Se atualizo as dimensoões do canvas manualmente com
        ```
        canvas.setAttribute("width", valor);
        canvas.setAttribute("height", valor);
        ```
        a imagem é desenhada corretamente, mas o grid não é desenhado (a não ser com gambiarra)

        Por que isso está acontecendo?
      */
      for (let i = 0; i < 2; i++) {
        this.clearGrid();
        const file = (event.target as HTMLInputElement).files?.[0];

        if (!file) return;

        const { ctx, canvas, gapBetweenPoints } = this;

        if (!ctx || !canvas) return;

        const reader = new FileReader();

        reader.onload = () => {
          this.image = new Image();
          let img = this.image as HTMLImageElement;

          img.onload = () => {
            this.gridNumPointsX = Math.round(img.width / gapBetweenPoints);
            this.gridNumPointsY = Math.round(img.height / gapBetweenPoints);
            ctx.drawImage(img, 0, 0);
            this.drawGrid();
          };
          this.image.src = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    },

    clearGrid() {
      const { ctx, canvas } = this;
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.grid = [];
      this.polygon = [];
      this.numPointsOnPolygon = 0;
      this.numPointsInPolygon = 0;
      this.drawGrid();
    },
    drawGrid() {
      const { ctx, canvas, gapBetweenPoints, grid } = this;
      if (!ctx || !canvas) return;

      const pointRadius = 3;

      for (
        let x = gapBetweenPoints;
        x < this.canvasWidth;
        x += gapBetweenPoints
      ) {
        for (
          let y = gapBetweenPoints;
          y < this.canvasHeight;
          y += gapBetweenPoints
        ) {
          grid.push([x, y]);

          this.fillPoint("#000", [x, y] as Point, pointRadius);
        }
      }
    },

    drawPolygon(polygon: Polygon) {
      const { ctx } = this;
      if (!ctx) return;
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(polygon[0][0], polygon[0][1]);
      for (let i = 1; i < polygon.length; i++) {
        ctx.lineTo(polygon[i][0], polygon[i][1]);
      }
      ctx.closePath();
      ctx.stroke();
      this.drawPointsInPolygon(polygon);
    },

    pointStrictlyInPolygon(point: Point, polygon: Polygon) {
      return pointInPolygon(point, polygon) && !pointOnPolygon(point, polygon);
    },

    drawPointsInPolygon(polygon: Polygon) {
      const { ctx, grid } = this;
      if (!ctx) return;

      const pointsNotSelected = grid.filter(
        (point) => !polygon.includes(point)
      );

      const max_x = Math.max(...polygon.map((p) => p[0]));
      const min_x = Math.min(...polygon.map((p) => p[0]));
      const max_y = Math.max(...polygon.map((p) => p[1]));
      const min_y = Math.min(...polygon.map((p) => p[1]));

      // for loop for each point in pointsNotSelected

      for (let i = 0; i < pointsNotSelected.length; i++) {
        const point = pointsNotSelected[i];
        const x = point[0];
        const y = point[1];

        if (!(min_x <= x && x <= max_x) || !(min_y <= y && y <= max_y)) {
          continue;
        }

        const pointIsInPolygon = this.pointStrictlyInPolygon(point, polygon);
        const pointIsOnPolygon = pointOnPolygon(point, polygon);

        if (pointIsInPolygon) {
          this.numPointsInPolygon++;
          this.fillPoint("#0f0", point, 4);
        }
        if (pointIsOnPolygon) {
          this.numPointsOnPolygon++;
          this.fillPoint("#f00", point, 4);
        }
      }
    },

    polygonAreaPick(numPointsInPolygon: number, numPointsOnPolygon: number) {
      return numPointsInPolygon + 0.5 * numPointsOnPolygon - 1;
    },
  },
});
</script>
<template>
  <div
    class="bg-white flex flex-col items-center justify-center w-full min-h-full"
  >
    <div class="flex flex-col items-center justify-center w-full">
      <div class="flex gap-2 items-center justify-center max-w-2xl">
        <p class="text-black">
          <b class="text-lg italic">Teorema de Pick: </b> Seja P um polígono
          simples. Se <b class="italic">b</b> é o número de pontos de fronteira
          e <b class="italic">i</b> o número de pontos interiores, então a área
          de P é dada por
          <b class="mathml-formula text-black" v-html="pickFormula"></b>.
        </p>
      </div>
    </div>

    <div
      class="grid grid-cols-2 gap-4 items-center justify-between w-full max-w-7xl"
    >
      <div class="flex flex-col items-start">
        <div
          class="flex my-[2%] text-black flex-row items-center justify-center h-16 gap-3"
        >
          <h1>Qual o tamanho do seu plano?</h1>
          <div>
            <input
              type="number"
              class="h-10 w-10 text-center text-black bg-white border-2 border-black"
              v-model.number="gridNumPointsX"
              @change="drawGrid"
            />
            x
            <input
              type="number"
              class="h-10 w-10 text-center text-black bg-white border-2 border-black"
              v-model.number="gridNumPointsY"
              @change="drawGrid"
            />
            <button class="btn btn-primary ml-8" @click="drawGrid">
              Desenhar
            </button>
          </div>
        </div>
        <div class="flex flex-row gap-6">
          <h1
            class="text-black text-lg flex flex-row justify-center h-16 gap-3"
          >
            Selecionar imagem de fundo:
          </h1>
          <input type="file" class="max-w-[20%]" @change="handleFileInput" />
        </div>
        <button class="btn btn-primary" @click="clearGrid">Limpar</button>
      </div>
      <div
        v-show="polygon.length && numPointsOnPolygon"
        class="flex flex-col items-end gap-4"
      >
        <h1 class="text-black">
          Quantidade de pontos dentro do polígono:
          <b>{{ numPointsInPolygon }}</b>
        </h1>
        <h1 class="text-black">
          Quantidade de pontos na borda do polígono:
          <b> {{ numPointsOnPolygon }}</b>
        </h1>
        <h1 class="text-black">
          Área do polígono por Pick:
          <b> {{ polygonAreaPick(numPointsInPolygon, numPointsOnPolygon) }}</b>
          unidades de área
        </h1>
      </div>
    </div>
    <div
      class="flex relative flex-row gap-10 justify-between items-center h-full overflow-scroll"
    >
      <div class="flex items-center justify-center py-4">
        <canvas
          id="canvas"
          class="max-w-full object-contain"
          :width="canvasWidth"
          :height="canvasHeight"
          @click="handleClick"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
