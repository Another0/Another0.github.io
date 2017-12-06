<template>
  <div class="app-footer">
    <audio id="audio" src=""></audio>
    <div class="app-footer__detail">
        <img src="https://p1.music.126.net/pz0_SbPzi7mj4H3K-FfrFA==/4455221115762712.jpg">
    </div>
    <div class="app-footer__songName">
        <span v-text="this.songName"></span>
        <span v-text="this.artist"></span>
    </div>
    <div class="app-footer__playPause">
        <img class="app-footer__play" src="../assets/icon/play.png" @click="playPause" v-if="playFlag">
        <img class="app-footer__pause" src="../assets/icon/pause.png" @click="playPause" v-if="!playFlag">
    </div>
    <div class="app-footer__next">
        <img src="../assets/icon/next.png" @click="vget">
    </div>
  </div>
</template>
<script>
export default {
  name: 'footer',
  data () {
    return {
        playFlag: true,
        songName: "弱水三千",
        artist: "W.K."
    }
  },
  methods: {
    playPause() {
        this.playFlag = !this.playFlag
        let audio = document.querySelector('audio');
        if(audio.paused) {
            audio.play()
        }else {
            audio.pause()
        }
    },
    vget() {
        axios.get('http://music.163.com/api/playlist/detail?id=387699584')
            .then(json=>console.log(json))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .app-footer {
        width: 100%;
        height: 50px;
        position: fixed;
        left: 0;
        bottom: 0;
        background-color: #fff;
    }

    .app-footer audio {
        width: 30px;
        height: 30px;
        background-color: red;
    }
    
    .app-footer__next,
    .app-footer__playPause,
    .app-footer__detail,
    .app-footer__songName {
        position: absolute;
    }

    .app-footer__playPause {
        top: 10px;
        right: 50px;
    }

    .app-footer__next {
        top: 12.5px;
        right: 10px;
    }

    .app-footer__playPause img {
        width: 30px;
        height: 30px;
    }

    .app-footer__next img {
        width: 25px;
        height: 25px;
    }

    .app-footer__detail img {
        width: 40px;
        height: 40px;
        margin: 5px;
        float: left;
    }

    .app-footer__songName {
        top: 3px;
        left: 54px;
    }

    .app-footer__songName span {
        display: block;
        font-size: 12px;
        margin-top: 5px;
        text-align: left
    }

</style>
