<template>
  <v-flex>
    <canvas
      ref="imageCanvas"
      class="ma-3"
      width="400"
      height="400"
      style="background-color: #eee; border: 1px solid #ccc;"

      @mousedown.prevent="startDrawing"
      @mousemove.prevent="userIsDrawing"
      @mouseup.prevent="stopDrawing"
    />
    <v-btn @click="savePng">Save</v-btn>
    <v-btn @click="loadAllPng">Load</v-btn>
    <v-card :key="userImagesLen">
      <canvas
        v-for="(img, idx) in store.userCanvas"
        :id="'userCanva' + idx"
        :key="idx"
        class="ma-3"
        width="400"
        height="400"
        style="background-color: #eee; border: 1px solid #ccc;"
      />
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

      // @mousedown="startDrawing"
      // @mousemove="userIsDrawing"
      // @mouseup="stopDrawing"

      // @touchstart="startDrawing"
      // @touchend="stopDrawing"
      // @touchmove="userIsDrawing"

      // window.addEventListener('mousedown', this.startDrawing);
      // window.addEventListener('mousemove', this.userIsDrawing);
      // window.addEventListener('mouseup', this.stopDrawing);
      


      this.canvas = this.$refs.imageCanvas as HTMLCanvasElement;
      this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
      
      if (this.canvas) {
        this.canvas.addEventListener('touchstart', this.startDrawing, false);
        this.canvas.addEventListener('touchmove', this.userIsDrawing, false);
        this.canvas.addEventListener('touchend', this.stopDrawing, false);
      }
      // drawing undo redo preparation
      // const listener = (e: KeyboardEvent) => this.restoreEvent(e);
      // window.addEventListener('keydown', listener);

    },

    computed: {
      isImagesLoading: {
        get(): boolean { return this.store.loadingImages; },
        set(toogler: boolean) { this.store.$patch({ loadingImages: toogler }); }
      }
    },

    updated() {
      if (!this.isImagesLoading) this.setImageSrc();
    },

    methods: {
      setImageSrc(): void {
        for (let idx = 0; idx <= this.userImagesLen; idx++) {
          const canvas = document.getElementById("userCanva" + idx) as HTMLCanvasElement;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
              const image = new Image();
              image.onload = function() {
                ctx.drawImage(image, 0, 0);
              };
              const base64 = this.store.userCanvas[idx];
              image.src = 'data:image/png;base64,' + base64;
            } else {
              console.log('no canvas found');
            }
          }
        }
      },

      startDrawing(e: MouseEvent | TouchEvent) {
        if (this.context) {
          e.preventDefault();
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

      userIsDrawing(e: MouseEvent | TouchEvent) {
        if (this.isDrawing && this.context) {
          e.preventDefault();
          const mousePos = this.getMousePos(e);
          if (mousePos) {
            // update current line with new mouse pos
            // this.currentLinePoints.push(mousePos);
            this.context.lineTo(mousePos.x, mousePos.y);
            this.context.stroke();
          }
        }
      },

      stopDrawing(e: MouseEvent | TouchEvent) {
        if (this.isDrawing && this.context) {
          e.preventDefault();
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

      getMousePos(e: MouseEvent | TouchEvent): IUserLine | undefined {
        if (this.canvas) {
          if (e instanceof(MouseEvent)) {
            const rect = this.canvas.getBoundingClientRect();
            return {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top
            };
          }
          if (e instanceof(TouchEvent)) {
            const rect = this.canvas.getBoundingClientRect();
            if (e.touches && e.touches.length === 1) {
              return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
              };
            }
          }
          
        }
      },

      async savePng() {
        if (this.canvas) {
          const canvasData = this.canvas.toDataURL();
          this.store.uploadPng(canvasData);
        }
      },

      async loadAllPng() {
        this.store.$patch({ loadingImages: true });
        const imagesArray = await this.store.loadAllPng();
        if (imagesArray) {
          this.store.$patch({ userCanvas: imagesArray });
          this.userImagesLen = imagesArray.length;
        }
        this.store.$patch({ loadingImages: false });
      },
    },
  });
</script>
