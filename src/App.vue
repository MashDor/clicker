<template>
  <div id="app">
    <game-zone @successClick="successClick" @failClick="failClick" @addCircle="addCircle" :gameState="gameState"/>
    <score :points="points" class="position-absolute" style="top: 10px; right: 10px"></score>
  </div>
</template>

<script>
import GameZone from "./components/GameZone.vue";
import Score from "./components/Score.vue";

export default {
  name: "App",

  data() {
    return {
      points: {
        success: 0,
        unclicked: 0,
        fail: 0
      },
      gameState: ""
    };
  },

  components: {
    GameZone,
    Score
  },

  methods: {
    init() {
      this.gameState = "play";
    },
    successClick() {
      this.points.success++;
      this.points.unclicked--;
    },
    failClick() {
      this.points.fail++;
      if (this.points.fail >= 10) {

        this.gameState = "game-over";
      }
    },
    addCircle() {
      this.points.unclicked++;
      if (this.points.unclicked >= 10) {
        this.gameState = "game-over";
      }
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    gameState(state) {
      if (state === 'game-over') {
        this.$root.$bvToast.toast('Game Over', {
          title: 'Message from clicker',
          variant: 'danger',
          noAutoHide: false,
          autoHideDelay: 3000,
          append: true,
          toaster: 'b-toaster-top-center'
        });

      }
    }
  }
};
</script>

