<template>
    <div class="room">
        <el-row>
            <el-col :span="24">
                <el-button type="primary" @click="outRoom">退出房间</el-button>
                <div class="room-content" ref="roomContent">
                    <div :class="{ 'room-content__left': item.flag, 'room-content__right': !item.flag }"
                         v-for="item in textarea">
                        <span class="room-content__title">{{`${item.time} ${item.name}`}}</span>
                        <div class="room-content__detail" :class='getStyle(item)'>
                            <template v-if="item.flag">
                                <img :src="item.imgsrc" alt="">
                                <span>{{`${item.content}`}}</span>
                            </template>
                            <template v-else>
                                <span>{{`${item.content}`}}</span>
                                <img :src="item.imgsrc" alt="">
                            </template>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
<!--         <el-row>
            <el-col>
                <div class="room-icon">
                    <span class="room-icon__first"></span>
                    <span class="room-icon__second"></span>
                    <span class="room-icon__three"></span>
                </div>
            </el-col>
        </el-row> -->
        <el-row>
            <el-col :span="22">
                <el-input v-model="text" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="speack">发言</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import io from 'socket.io-client/dist/socket.io.js'
    import { mapGetters } from 'vuex'
    export default {
        name: 'room',
        data () {
            return {
                text: '',
                textarea: [],
                socket: null,
                newTime: null
            }
        },
        beforeRouteEnter (to, from, next) {
            next()
        },
        computed: {
            ...mapGetters({
                'imgSrc': 'imgSrc',
                'nickName': 'nickName'
            })
        },
        mounted () {
            this.initial()   // 初始化
            // 进入房间的socket
            this.socket.on('inRoom', (data) => {
                if (typeof data === 'string') {
                } else {
                    data.forEach(item => {
                        if (item.name === this.nickName) {
                            item.flag = false
                        } else {
                            item.flag = true
                        }
                    })
                    this.textarea = data
                }
            })
            this.socket.emit('inRoom', {
                name: this.nickName
            })
            // 发言的socket
            this.socket.on('speack', (data) => {
                data.forEach(item => {
                    if (item.name === this.nickName) {
                        item.flag = false
                    } else {
                        item.flag = true
                    }
                })
                this.textarea = data
            })
        },
        watch: {
            'textarea'() {
                this.$nextTick(() => {
                    this.$refs.roomContent.scrollTop = this.$refs.roomContent.scrollHeight
                })
            }
        },
        methods: {
            initial () {
                // this.$refs.roomContent.scrollTop = 200
                if (!this.nickName) {
                    this.$message({
                        message: '请登录',
                        type: 'warning'
                    })
                    this.$router.push({
                        path: 'Login',
                        name: 'Login'
                    })
                } else {
                    this.socket = io('http://localhost:3000')
                }
                document.addEventListener('keydown', (event) => {
                    if (event.keyCode === 13) {
                        this.speack()
                    }
                })
            },
            getTime () {
                let time = new Date()
                let year = time.getFullYear()
                let month = time.getMonth()
                let date = time.getDate()
                let hours = time.getHours()
                let minutes = time.getMinutes()
                let seconds = time.getSeconds()
                this.newTime = `${year}-${month+1}-${date}  ${hours}:${minutes}:${seconds}`
            },
            speack () {
                // this.$refs.roomContent.scrollTop = 200
                if (this.text === '') {
                    this.$message({
                        message: '请输入内容',
                        type: 'warning'
                    })
                    return
                } else {
                    this.getTime()
                    this.socket.emit('speack', { 
                        name: this.nickName,
                        content: this.text,
                        time: this.newTime,
                        imgsrc: this.imgSrc
                    })
                    this.text = ''
                }
            },
            outRoom () {
                this.socket.on('disconnect', function() {
                    console.log("您已退出房间")
                })
                this.$router.push({
                    path: 'index',
                    name: 'index'
                })
            },
            getStyle (item) {
                return {
                    'room-content__detailLeft': item.flag,
                    'room-content__detailRight': !item.flag
                }
            }
        }
        // beforeDestroy () {
        //     this.socket.on('disconnect', function () {
        //         console.log("您已退出房间")
        //     })
        // }
    }
</script>
<style scoped>
    @component-namespace room {
        @b content {
            width: 100%;
            height: 400px;
            border: 1px solid black;
            overflow: auto;
            @e left {
                text-align: left;
                padding: 10px 0;
            }
            @e right {
                text-align: right;
                padding: 10px 0;
            }
            @e title {
                font-size: 14px;
            }
            @e detail {
                font-size: 14px;
                img {
                    width: 40px;
                    height: 40px;
                    vertical-align: middle;
                }
                span {
                    position: relative;
                    display: inline-block;
                    font-size: 14px;
                    height: 40px;
                    text-align: 40px;
                    padding: 0px 12px;
                    background-color: #f3f;
                    border-radius: 4px;
                    vertical-align: middle;
                    line-height: 40px;
                    margin-left: 20px;
                }
                span::after {
                    content: '';
                    position: absolute;
                    top: 8px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-top: 10px solid #f3f;
                    border-bottom: 10px solid transparent;
                }
            }
            @e detailLeft {
                span {
                   margin-left: 20px; 
                }
                span::after {
                    left: -15px;
                    border-left: 15px solid transparent;
                    border-right: 0;
                }
            }
            @e detailRight {
                span {
                   margin-right: 20px; 
                }
                span::after {
                    right: -15px;
                    border-right: 15px solid transparent;
                    border-left: 0;
                }
            }
        }
        @b icon {
            span {
                display: block;
            }
        }
        @b content::-webkit-scrollbar {
            width: 6px;
            background-color: #ccc;
        }
        @b content::-webkit-scrollbar-thumb {
            background-color: #555;
            border-radius: 3px;
        }
    }
</style>