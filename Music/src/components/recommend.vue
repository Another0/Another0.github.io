<template>
  <div class="app-recommed">
    <div class="app-carousel">
      <img src="../assets/img/banner1.jpg">
      <img src="../assets/img/banner2.jpg">
      <img src="../assets/img/banner3.jpg">
      <img src="../assets/img/banner4.jpg">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="app-songList clearFloat">
      <span class="app-songList__title">推荐歌单</span>
      <div class="app-songList__content">
        <div v-for="(item, i) in playList" @click.stop="songListName" :index="i">
          <em v-text="Math.floor(item.playCount/10000)+'万'"></em>
          <img :src="item.imgUrl">
          <span v-text="item.name"></span>
        </div>
      </div>
    </div>
    <div class="app-mv">
      <span class="app-songList__title">推荐MV</span>
      <div class="app-mv__content">
        <div v-for="item in mvList">
          <img :src="item.imgUrl">
          <span v-text="item.name"></span>
          <span v-text="item.artistName"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import songlist from '../../static/songList.json'
import mvlist from '../../static/mvList.json'
export default {
  name: 'recommed',
  data () {
    return {
      playCount: [],
      playList: null,
      mvList: null
    }
  },
  mounted() {
    this.playList = songlist
    this.mvList = mvlist
  },
  methods: {
    songListName() {
      let index = event.currentTarget.getAttribute("index")
      this.$router.push({path: "/playSongList", query: {ids: this.playList[index].id}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .app-recommed {
    position: relative;
  }

  .app-carousel {
    width: 100%;
    height: 150px;
    position: relative;
  }

  .app-carousel img {
    width: 100%;
    height: 150px;
    position: absolute;
    left: 0;
  }

  .app-songList {
    position: relative;
  }

  .app-songList__title {
    display: block;
    text-align: left;
    font-size: 14px;
    padding: 5px;
    margin: 10px 0 10px 5px;
  }

  .app-songList__title:after {
    content: '';
    display: block;
    margin-top: -15px;
    margin-left: -10px;
    width: 2px;
    height: 12px;
    background-color: #ce3d3e;
  }

  .app-songList__content {
    padding-left: 2%;
    overflow: hidden;
  }

  .app-songList__content div{
    width: 32%;
    position: relative;
    float: left;
    margin-right: 1%;
    margin-bottom: 10px;
  }

  .app-songList__content img {
    width: 100%;
  }

  .app-songList__content span {
    /*display: inline-block;*/
    width: 100%;
    font-size: 10px;
    text-align: left;
    overflow: hidden;
    box-sizing: border-box;
    padding-left: 5px;
    /*text-overflow:ellipsis;*/
    /*white-space: nowrap;*/
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .app-songList__content em {
    font-size: 8px;
    color: #fff;
    position: absolute;
    right: 5px;
    top: 2px;
  }

  .app-mv {
    margin-bottom: 70px;
  }

  .app-mv__content {
    width: 100%;
    overflow: hidden;
  }

  .app-mv__content div {
    width: 50%;
    float: left;
    position: relative;
  }

  .app-mv__content img {
    width: 100%;
  }

  .app-mv__content span {
    display: block;
    font-size: 10px;
    text-align: left;
    padding-left: 8px;
  }

  .app-mv__content span:last-child {
    font-size: 8px;
    color: #ccc;
  }
</style>
