<template>
    <div class="app-index">
      <div class="app-head">
        <img class="app-head__left" src="../assets/icon/menu.png">
        <img class="app-head__right" src="../assets/icon/search.png">
      </div>
      <div class="app-nav">
        <span @click="clickStyle" :class="{'bac-red': bacFlag[0]}" index="recommend" val="0">个性推荐</span>
        <span @click="clickStyle" :class="{'bac-red': bacFlag[1]}" index="songList" val="1">歌单</span>
        <span @click="clickStyle" :class="{'bac-red': bacFlag[2]}" index="2" val="2">主播电台</span>
        <span @click="clickStyle" :class="{'bac-red': bacFlag[3]}" index="3" val="3">排行榜</span>
      </div>
      <div class="app-view">
          <keep-alive>
             <router-view></router-view>
          </keep-alive>
      </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      bacFlag: [true, false, false, false]
    }
  },
  create() {
    let rout = this.$route.path.split("/")
    console.log(rout)
  },
  methods: {
    clickStyle() {
        let val = event.target.getAttribute("val")
        for(let i = 0; i < this.bacFlag.length; i++) {
            if(parseInt(val) == i) {
                this.bacFlag.splice(i, 1, true) 
            }else {
                this.bacFlag.splice(i, 1, false)
            }
        }

        this.$router.push({path: '/index/'+event.target.getAttribute("index")})
    },
    switchRouter() {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .app-index {
        width: 100%;
        /*height: 81px;*/
        position: relative;
        top: 0;
    }

    .app-head {
        width: 100%;
        height: 50px;
        position: fixed;
        top: 0;
        background-color: #ce3d3e;
        z-index: 10;
    }

    .app-head img {
        position: absolute;
        top: 10px;
    }

    .app-head__left {
        width: 30px;
        height: 30px;
        left: 10px;
    }

    .app-head__right {
        width: 25px;
        height: 25px;
        right: 12.5px;
    }

    .app-nav {
        position: fixed;
        top: 50px;
        z-index: 10;
        width: 100%;
        height: 25px;
        font-size: 14px;
        padding-top: 5px;
        background-color: #fff;
    }

    .app-nav span {
        display: inline-block;
        width: 25%;
        float: left;
        padding-bottom: 5px; 
    }

    .bac-red {
        color: #ce3d3e;
        /*border-bottom-width: 2px;*/
        border-bottom: 2px solid #ce3d3e;
    }

    .app-view {
        margin-top: 80px;
    }
</style>
