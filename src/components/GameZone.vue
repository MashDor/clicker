<template>
  <div id="game-zone" :class="['game-zone', misclick ? 'game-zone_misclick' : '']"></div>
</template>
<script>
import * as PIXI from "pixi.js";
import { rotationAngle } from "../lib/custom_functions";

export default {
  data() {
    return {
      app: null,
      circles: [],
      speed: 10,
      overCircle: null,
      lastId: 1,
      misclick: false,
      createCircleInterval: null
    };
  },
  props: {
    gameState: String
  },
  methods: {
    createPixiApp() {
      this.app = new PIXI.Application({
        resizeTo: document.documentElement,
        antialias: true
      });
      document.getElementById("game-zone").appendChild(this.app.view);
      PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    },
    createCircle() {
      const graphics = new PIXI.Graphics();
      this.app.stage.addChild(graphics);
      let center = this.randomCoord();
      // let center = {x: 252, y: 133};
      graphics.lineStyle(3, 0x00b25c, 1, 0);
      graphics.beginFill();
      graphics.drawCircle(center.x, center.y, 50);
      graphics.endFill();
      let circle = {
        id: this.lastId++,
        center: center,
        graphics: graphics
      };
      this.circles.push(circle);
      circle.graphics.interactive = true;
      circle.graphics.on("mouseover", () => (this.overCircle = circle.id));
      circle.graphics.on("mouseout", () => (this.overCircle = null));
      this.$emit("addCircle");
      this.moveCircle(circle.id);
    },
    moveCircle(id) {
      let circle = this.circles.find(el => {
        return el.id === id;
      });
      let oldCenter = circle.center;
      let newCenter = this.randomCoord();
      let pathLength = Math.sqrt(
        Math.pow(newCenter.x - oldCenter.x, 2) +
          Math.pow(newCenter.y - oldCenter.y, 2)
      );
      let step = {
        x: ((newCenter.x - oldCenter.x) / pathLength) * this.speed,
        y: ((newCenter.y - oldCenter.y) / pathLength) * this.speed
      };
      let turning = 0;
      this.app.ticker.add(() => {
        if (
          this.circles.find(el => {
            return el.id === id;
          })
        ) {
          if (
            ((newCenter.x >= oldCenter.x && circle.center.x >= newCenter.x) ||
              (newCenter.x <= oldCenter.x && circle.center.x <= newCenter.x)) &&
            ((newCenter.y >= oldCenter.y && circle.center.y >= newCenter.y) ||
              (newCenter.y <= oldCenter.y && circle.center.y <= newCenter.y)) &&
            turning == 0
          ) {
            newCenter = this.randomCoord();
            turning = Math.round(
              rotationAngle(oldCenter, circle.center, newCenter) / this.speed
            );
            oldCenter = circle.center;
            pathLength = Math.sqrt(
              Math.pow(newCenter.x - oldCenter.x, 2) +
                Math.pow(newCenter.y - oldCenter.y, 2)
            );
            step = {
              x: ((newCenter.x - oldCenter.x) / pathLength) * this.speed,
              y: ((newCenter.y - oldCenter.y) / pathLength) * this.speed
            };
          }
          if (turning == 0) {
            circle.graphics.clear();
            circle.graphics.lineStyle(3, 0x00b25c, 1, 0);
            circle.graphics.beginFill(0, 0.1);
            circle.graphics.drawCircle(
              circle.center.x + step.x,
              circle.center.y + step.y,
              50
            );
            circle.graphics.endFill();
            circle.center = {
              x: circle.center.x + step.x,
              y: circle.center.y + step.y
            };
          } else turning--;
        }
      });
    },
    destroyCircle(key) {
      const id = this.overCircle;
      if (key == "q" || key == "й") {
        if (id) {
          let circle = this.circles.find(el => {
            return el.id === id;
          });
          circle.graphics.clear();
          circle.graphics.destroy();
          this.circles.splice(this.circles.indexOf(circle), 1);
          this.overCircle = null;
          this.$emit("successClick");
          return true;
        }
      }
      this.misclick = true;
      this.$emit("failClick");
    },
    randomCoord() {
      const x =
        50 +
        Math.floor(
          (document.documentElement.clientWidth - 50 - 50) * Math.random()
        );
      const y =
        50 +
        Math.floor(
          (document.documentElement.clientHeight - 50 - 50) * Math.random()
        );
      return { x: x, y: y };
    },
    init() {
      this.createPixiApp();
      // this.createCircle()
      document.documentElement.addEventListener("keydown", e =>
        this.destroyCircle(e.key)
      );
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    misclick() {
      setTimeout(() => {
        this.misclick = false;
      }, 500);
    },
    gameState(state) {
      switch (state) {
        case "play": {
          this.createCircleInterval = setInterval(this.createCircle, 5000)
          break
        }
        case "game-over": {
          clearInterval(this.createCircleInterval);
          this.circles.forEach(circle => {
            circle.graphics.clear()
            circle.graphics.destroy()
          })
          this.circles = []
          break
        }
      }
    }
  }
};
</script> 
<style scoped>
.game-zone {
  cursor: url("../assets/cursor.png"), auto !important;
}
.game-zone_misclick {
  cursor: url("../assets/misclick_cursor.png"), auto !important;
}
</style>