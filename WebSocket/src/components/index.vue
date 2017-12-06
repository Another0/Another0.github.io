<template>
    <div class="index">
        <div>当前登录的用户为:{{ userAcc }}</div>
        <el-button type="primary" @click='inRoom'>点击进入</el-button>
        <el-button type="primary" @click='roboot'>机器人</el-button>
        <el-button type="primary" @click='homepage'>我的主页</el-button>
        <router-view></router-view>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'index',
        data () {
            return {
                a: ''
            }
        },
        computed: {
            ...mapGetters({
                userAcc: 'userAcc'
            })
        },
        mounted () {
            if (!this.userAcc) {
                this.$message({
                    message: '请登录',
                    type: 'warning'
                })
            }
        },
        methods: {
            inRoom () {
                this.$router.push({ 
                    path: 'room',
                    name: 'room'
                })
            },
            roboot () {
                this.$router.push({ 
                    path: 'roboot',
                    name: 'roboot'
                })
            },
            homepage () {
                this.$router.push({
                    path: 'homepage',
                    name: 'homepage'
                })
            }
        }
    }
</script>
<style scoped></style>