<template>
    <div class="app-playSongList">
        <el-row class="app-playSongList__head" type="flex" justify="center">
            <el-col :span="2">
                <img class="app-playSongList__headIcon" src="../assets/icon/arrow.png" @click="retur()">
            </el-col>
            <el-col :span="16">
                <span>歌单</span>
            </el-col>
            <el-col :span="3">
                <img class="app-playSongList__headIcon" src="../assets/icon/search.png">
            </el-col>
            <el-col :span="3">
                <img class="app-playSongList__headIcon" src="../assets/icon/menu.png">
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import songlist from '../../static/songList.json'
    import list from './small/list'
    export default {
        mounted() {
            this.getSongList()
        },
        methods: {
            retur () {
                this.$router.push({path: '/recommed'})
            },
            async getSongList () {
                let url = 'https://api.imjad.cn/cloudmusic/?type=playlist&&id='+this.$route.query.ids
                let resp = await axios.get(url)
                console.log(resp)
            }
        },
        compo
    }
</script>
<style>
    .app-playSongList__head {
        width: 100%;
        height: 40px;
        background: red;
        color: #fff;
        line-height: 40px;
    }
    .app-playSongList__headIcon {
        width: 25px;
        height: 25px;
        padding-top: 7px;
    }
</style>