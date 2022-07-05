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
    <v-card :key="userImagesCount">
      <canvas
        v-for="(img, idx) in imagesStore.userCanvas"
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

  import { ILinePoints } from '@/interfaces';
  import useImagesStore from '@/store/imagesStore';
  import useUserStore from '@/store/userStore';


  export default defineComponent({
    name: 'TheDrawMain',

    setup() {
      const imagesStore = useImagesStore();
      const userStore = useUserStore();
      return { imagesStore, userStore };
    },

    data() {
      return {
        currentLinePoints: [] as ILinePoints[],
        allLines: [] as ILinePoints[][],

        userImagesCount: -1,

        canvas: undefined as (HTMLCanvasElement | undefined),
        context: undefined as (CanvasRenderingContext2D | undefined),
        isDrawing: false,
      };
    },

    mounted() {
      this.canvas = this.$refs.imageCanvas as HTMLCanvasElement;
      this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
      
      if (this.canvas) {
        this.canvas.addEventListener('touchstart', this.startDrawing, false);
        this.canvas.addEventListener('touchmove', this.userIsDrawing, false);
        this.canvas.addEventListener('touchend', this.stopDrawing, false);
      }
    },

    updated() {
      if (!this.isImagesLoading) this.setImageSrc();
    },

    computed: {
      isImagesLoading: {
        get(): boolean { return this.imagesStore.loadingImages; },
        set(toogler: boolean) { this.imagesStore.$patch({ loadingImages: toogler }); }
      }
    },

    methods: {
      setImageSrc(): void {
        for (let idx = 0; idx <= this.userImagesCount; idx++) {
          const canvas = document.getElementById("userCanva" + idx) as HTMLCanvasElement;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
              const image = new Image();
              image.onload = function() {
                ctx.drawImage(image, 0, 0);
              };
              const base64 = this.imagesStore.userCanvas[idx];
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

      getMousePos(e: MouseEvent | TouchEvent): ILinePoints | undefined {
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
          this.imagesStore.actionUploadImage(canvasData);
        }
      },

      async loadAllPng() {
        this.imagesStore.$patch({ loadingImages: true });
        const images = await this.imagesStore.actionFetchAllImages();
        if (images) {
          this.imagesStore.$patch({ userCanvas: images.images });
          this.userImagesCount = images.count;
        }
        this.imagesStore.$patch({ loadingImages: false });
      },
    },
  });
</script>
