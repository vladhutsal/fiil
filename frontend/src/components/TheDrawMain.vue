<template>
  <v-flex>
    <canvas
      ref="imageCanva"
      class="ma-3"
      width="400"
      height="400"
      style="background-color: #eee; border: 1px solid #ccc;"

      @mousedown="startDrawing"
      @mousemove="userIsDrawing"
      @mouseup="stopDrawing"
    />
    <v-btn
      @click="savePng"
    >
      Save
    </v-btn>

    <v-btn
      @click="loadAllPng"
    >
      Load
    </v-btn>
    <v-card v-for="(img, idx) in store.userCanvas" :key="idx">
      <img
        :src="getSrc(idx)"
        class="ma-3"
        width="400"
        height="400"
        style="border: 1px solid #ccc;"
      >
    </v-card>
  </v-flex>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api';

  import { IUserLine } from '@/interfaces';
  import { useStore } from '@/store';
  // import { PropType } from "vue"
  // import { Post } from '@/interfaces';

  export default defineComponent({
    name: 'TheDrawMain',

    setup() {
      const store = useStore();
      return { store };
    },

    data() {
      return {
        currentLinePoints: [] as IUserLine[],
        allLines: [] as IUserLine[][],

        userImagesLen: -1,

        canvas: undefined as (HTMLCanvasElement | undefined),
        context: undefined as (CanvasRenderingContext2D | undefined),
        isDrawing: false,
      };
    },

    mounted() {
      this.canvas = this.$refs.imageCanva as HTMLCanvasElement;
      this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
      
      // drawing undo redo preparation
      // const listener = (e: KeyboardEvent) => this.restoreEvent(e);
      // window.addEventListener('keydown', listener);

    },

    methods: {
      getSrc(idx: number): string {
        const base64 = this.store.userCanvas[idx];
        return 'data:image/png;base64,' + base64;
      },

      startDrawing(e: MouseEvent) {
        if (this.context) {
          const mousePos = this.getMousePos(e);
          if (mousePos) {
            // reset current points when start drawing new line
            // this.currentLinePoints = [];
            // this.currentLinePoints.push(mousePos);
            this.isDrawing = true;
            this.context.beginPath();
            this.context.moveTo(mousePos.x, mousePos.y);
          }
        }
      },

      userIsDrawing(e: MouseEvent) {
        if (this.isDrawing && this.context) {
          const mousePos = this.getMousePos(e);
          if (mousePos) {
            // update current line with new mouse pos
            // this.currentLinePoints.push(mousePos);
            this.context.lineTo(mousePos.x, mousePos.y);
            this.context.stroke();
          }
        }
      },

      stopDrawing(e: MouseEvent) {
        if (this.isDrawing && this.context) {
          const mousePos = this.getMousePos(e);
          if (mousePos) {
            this.context.lineTo(mousePos.x, mousePos.y);
            this.context.stroke();
            this.context.closePath();
            this.isDrawing = false;
          }
        }
      },

      // restoreEvent(e: KeyboardEvent) {
      //   console.log('restore event')
      //   if (e.metaKey && e.code === 'KeyZ' && this.context) {
      //     console.log('restoring')
      //     this.context.restore();
      //   }
      // },

      getMousePos(e: MouseEvent): IUserLine | undefined {
        if (this.canvas) {
          const rect = this.canvas.getBoundingClientRect();
          return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          };
        }
      },

      async savePng() {
        if (this.canvas) {
          const canvasData = this.canvas.toDataURL();
          this.store.uploadPng(canvasData);
        }
      },

      async loadAllPng() {
        const imagesArray = await this.store.loadAllPng();
        if (imagesArray) {
          this.store.$patch({ userCanvas: imagesArray });
          this.userImagesLen = imagesArray.length;
        }
      },
    },
  });
</script>
