<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { pointOnPolygon, pointInPolygon } from "geometric";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const canvasWidth = 400;
const canvasHeight = 400;

const numberOfGridPoints = ref(0);
const pointsInsidePolygon = ref(0);
const pointsOnPolygon = ref(0);
type Point = [number, number];
let polygon: Point[] = [];
let gridPoints: Point[] = [];

onMounted(() => {
  canvasRef.value = document.getElementById("canvas") as HTMLCanvasElement;
  ctx.value = canvasRef.value.getContext("2d");
});

watch(numberOfGridPoints, (newValue) => {
  // Draw the grid points
  drawGridPoints(newValue + 1);
});

const drawPolygon = () => {
  if (ctx.value) {
    const context = ctx.value;
    context.strokeStyle = "#000";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(polygon[0][0], polygon[0][1]);
    for (let i = 1; i < polygon.length; i++) {
      context.lineTo(polygon[i][0], polygon[i][1]);
    }
    context.closePath();
    context.stroke();
  }
  drawPointsInsidePolygon(polygon);
};

const drawPointsInsidePolygon = (polygon: Point[]) => {
  const pointsNotSelected = gridPoints.filter(
    (point) =>
      polygon.findIndex((p) => p[0] === point[0] && p[1] === point[1]) === -1
  );

  let numberOfPointsInsidePolygon = 0;
  let numberOfPointsOnPolygon = 0;

  const max_x = Math.max(...polygon.map((p) => p[0]));
  const min_x = Math.min(...polygon.map((p) => p[0]));
  const max_y = Math.max(...polygon.map((p) => p[1]));
  const min_y = Math.min(...polygon.map((p) => p[1]));

  // for loop for each point in pointsNotSelected

  for (let i = 0; i < pointsNotSelected.length; i++) {
    const point = pointsNotSelected[i];
    if (
      !(min_x <= point[0] && point[0] <= max_x) ||
      !(min_y <= point[1] && point[1] <= max_y)
    ) {
      continue;
    }
    console.log("===  PicksGrid.vue [68] ===");
    if (pointIsInsidePolygon(point, polygon)) {
      numberOfPointsInsidePolygon++;
      if (ctx.value) {
        const context = ctx.value;
        context.fillStyle = "#0f0";
        context.beginPath();
        context.arc(point[0], point[1], 3, 0, 2 * Math.PI);
        context.fill();
      }
    }
    if (poinIsOnPolygon(point, polygon)) {
      numberOfPointsOnPolygon++;
      if (ctx.value) {
        const context = ctx.value;
        context.fillStyle = "#f00";
        context.beginPath();
        context.arc(point[0], point[1], 3, 0, 2 * Math.PI);
        context.fill();
      }
    }
  }
  pointsOnPolygon.value = numberOfPointsOnPolygon + polygon.length;
  pointsInsidePolygon.value = numberOfPointsInsidePolygon;
};

const poinIsOnPolygon = (point: Point, polygon: Point[]): boolean => {
  return pointOnPolygon(point, polygon);
};

const pointIsInsidePolygon = (point: Point, polygon: Point[]): boolean => {
  return pointInPolygon(point, polygon) && !pointOnPolygon(point, polygon);
};

const polygonAreaPick = (
  pointsInPolygon: number,
  pointsOnPolygon: number
): number => {
  return pointsInPolygon + pointsOnPolygon / 2 - 1;
};

const handleClick = (event: MouseEvent) => {
  // Get a reference to the canvas element
  if (numberOfGridPoints.value <= 0) {
    return;
  }

  if (canvasRef.value) {
    const canvas = canvasRef.value;

    // Get the position of the canvas relative to the viewport
    const rect = canvas.getBoundingClientRect();

    // Calculate the mouse coordinates relative to the canvas by subtracting the canvas position
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculate the size of the grid squares
    const gridSize = 50;

    // Calculate the nearest grid point to the mouse click by rounding down the mouse coordinates to the nearest grid multiple
    const x = Math.round(mouseX / gridSize) * gridSize;
    const y = Math.round(mouseY / gridSize) * gridSize;
    // console.log("=== x PicksGrid.vue [78] ===", x);
    // console.log("=== y PicksGrid.vue [79] ===", y);
    const point: Point = [x, y];

    // Get the canvas context
    const context = canvas.getContext("2d");

    if (context) {
      // Set the fill color to green
      context.fillStyle = "#0f0";

      // Draw a larger circle at the center of the grid point using twice the point radius
      context.beginPath();
      const pointRadius = 3;
      context.arc(x, y, 2 * pointRadius, 0, 2 * Math.PI);
      context.fill();
    }

    //  check if point is in points
    const pointIndex = polygon.findIndex(
      (point) => point[0] === x && point[1] === y
    );
    console.log("=== pointsIndex PicksGrid.vue [86] ===", pointIndex);
    const areAllPointsConsecutive = polygon.length
      ? polygon.every((point) => point[0] === x && point[1] === y)
      : false;
    if (pointIndex === 0 && polygon.length >= 3 && !areAllPointsConsecutive) {
      drawPolygon();
    } else {
      console.log("===  PicksGrid.vue [97] ===");
      polygon.push(point);
    }
  }
};

const clearGrid = () => {
  // Clear the canvas
  if (ctx.value && canvasRef.value) {
    const context = ctx.value;
    const canvas = canvasRef.value;
    context.clearRect(0, 0, canvas.width, canvas.height);
    polygon = [];
    gridPoints = [];
    pointsOnPolygon.value = 0;
    pointsInsidePolygon.value = 0;
    drawGridPoints(numberOfGridPoints.value);
  }
};

const drawGridPoints = (numberOfPoints: number) => {
  if (ctx.value && canvasRef.value) {
    const context = ctx.value;
    const canvas = canvasRef.value;
    const gridSize = 50;
    const pointRadius = 3;
    context.fillStyle = "#000";
    const canvasWidth = numberOfPoints * gridSize;
    const canvasHeight = numberOfPoints * gridSize;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    for (let x = gridSize; x < canvasWidth; x += gridSize) {
      for (let y = gridSize; y < canvasHeight; y += gridSize) {
        gridPoints.push([x, y]);

        context.beginPath();
        context.arc(x, y, pointRadius, 0, 2 * Math.PI);
        context.fill();
      }
    }
  }
};
</script>
<template>
  <div
    class="relative bg-white flex flex-col items-center justify-center h-full w-full max-h-full max-w-full"
  >
    <div
      class="flex top-2 text-black flex-row items-center justify-center h-16 w-full gap-3"
    >
      <h1>Qual o tamanho do seu plano?</h1>
      <!-- Set Input that changes numberOfGridPoints and set max number of grid points to 20 -->
      <input
        type="number"
        class="h-10 w-10 text-center text-black bg-white border-2 border-black"
        v-model.number="numberOfGridPoints"
        @change="numberOfGridPoints = Math.min(numberOfGridPoints, 15)"
      />
      <button class="btn btn-primary" @click="clearGrid">Limpar</button>
    </div>
    <div
      class="flex relative flex-row gap-10 justify-between items-center h-full max-h-full max-w-full"
    >
      <canvas
        id="canvas"
        class="flex relative max-h-full max-w-full"
        :width="canvasWidth"
        :height="canvasHeight"
        @click="handleClick"
      />
      <div v-show="polygon.length" class="flex flex-col">
        <h1 class="text-black">
          Quantidade de pontos dentro do polígono: {{ pointsInsidePolygon }}
        </h1>
        <h1 class="text-black">
          Quantidade de pontos na borda do polígono: {{ pointsOnPolygon }}
        </h1>
        <h1 class="text-black">
          Área do polígono por Pick:
          {{ polygonAreaPick(pointsInsidePolygon, pointsOnPolygon) }} unidades
          de área
        </h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Removing arrows from input type=number */
/* Chrome, Safari, Edge, Opera */
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