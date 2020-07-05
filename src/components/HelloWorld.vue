<template>
  <div id="game-zone">
    <button class="btn btn-outline-primary position-absolute" style="top: 10px; right: 10px;" @click.prevent="fullscreen">Полноэкранный режим</button>
  </div>
</template>
<script>
import * as PIXI from 'pixi.js'

export default {
  data () {
    return {
      app: null,
      circles: [],
      speed: 10,
      overCircle: null,
      lastId: 1
    }
  },
  methods: {
    createPixiApp() {
      this.app = new PIXI.Application({ resizeTo: document.documentElement, antialias: true});
      document.getElementById("game-zone").appendChild(this.app.view);
      PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    },
    createCircle() {
      const graphics = new PIXI.Graphics();      
      this.app.stage.addChild(graphics);
      let center = this.randomCoord();
      // let center = {x: 252, y: 133};
      graphics.lineStyle(3, 0x00B25C, 1, 0);
      graphics.beginFill()
      graphics.drawCircle(center.x, center.y, 50);
      graphics.endFill()
      let circle = ({
        id: this.lastId++,
        center: center,
        graphics: graphics,
      })
      this.circles.push(circle)
      circle.graphics.interactive = true;
      circle.graphics.buttonMode = true;
      circle.graphics.on("mouseover", () => this.overCircle = circle.id)
      circle.graphics.on("mouseout", () => this.overCircle = null)
      this.moveCircle(circle.id);
    },
    moveCircle(id) {
      let circle = this.circles.find((el) => {return el.id === id})
      let oldCenter = circle.center;
      let newCenter = this.randomCoord();
      let step = {
        x: (newCenter.x - oldCenter.x) / (Math.sqrt(Math.pow((newCenter.x - oldCenter.x), 2) + Math.pow((newCenter.y - oldCenter.y), 2))) * this.speed,
        y: (newCenter.y - oldCenter.y) / (Math.sqrt(Math.pow((newCenter.x - oldCenter.x), 2) + Math.pow((newCenter.y - oldCenter.y), 2))) * this.speed,
      }
      this.app.ticker.add(() => {
        if(this.circles.find((el) => {return el.id === id})) {
          if ((newCenter.x >= oldCenter.x && circle.center.x >= newCenter.x || newCenter.x <= oldCenter.x && circle.center.x <= newCenter.x) &&
          (newCenter.y >= oldCenter.y && circle.center.y >= newCenter.y || newCenter.y <= oldCenter.y && circle.center.y <= newCenter.y))
          {
            oldCenter = circle.center;
            newCenter = this.randomCoord();
            step = {
              x: (newCenter.x - oldCenter.x) / (Math.sqrt(Math.pow((newCenter.x - oldCenter.x), 2) + Math.pow((newCenter.y - oldCenter.y), 2))) * this.speed,
              y: (newCenter.y - oldCenter.y) / (Math.sqrt(Math.pow((newCenter.x - oldCenter.x), 2) + Math.pow((newCenter.y - oldCenter.y), 2))) * this.speed,
            }
          }
          circle.graphics.clear();
          circle.graphics.lineStyle(3, 0x00B25C, 1, 0);
          circle.graphics.beginFill(0, 0.1)
          circle.graphics.drawCircle(circle.center.x + step.x, circle.center.y + step.y, 50);
          circle.graphics.endFill()
          circle.center = {
            x: circle.center.x + step.x,
            y: circle.center.y + step.y,
          }
        }
      })
    },
    destroyCircle(key) {
      const id = this.overCircle;
      if(key == "q" && id) {
        let circle = this.circles.find(el => {return el.id === id})
        circle.graphics.clear();
        circle.graphics.destroy();
        this.circles.splice(this.circles.indexOf(circle), 1);
        this.overCircle = null;
      }
    },
    randomCoord() {
      const x = 50 + Math.floor((document.documentElement.clientWidth - 50 - 50) * Math.random())
      const y = 50 + Math.floor((document.documentElement.clientHeight - 50 - 50) * Math.random())
      return {x: x, y: y};
    },
    init() {
      this.createPixiApp();
      setInterval(this.createCircle, 3000)
      document.documentElement.addEventListener("keydown", e => this.destroyCircle(e.key)  )
    },
    fullscreen() {
      document.documentElement.requestFullscreen().catch(() => alert("Error"))
    },
  },
  mounted() {
    this.init();
    
  }
}
</script> 
