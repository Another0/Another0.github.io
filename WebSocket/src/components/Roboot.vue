<template>
    <div class="roboot">
        <el-row>
            <el-col :span="24">
                <div class="room-content" ref="roomContent">
                    <div :class="{ 'room-content__left': item.flag, 'room-content__right': !item.flag }"
                         v-for="item in textarea">
                        <div class="room-content__detail" :class='getStyle(item)'>
                            <template v-if="item.flag">
                                <img src="/static/icon/roboot.jpg" alt="">
                                <span>{{`${item.content}`}}</span>
                            </template>
                            <template v-else>
                                <span>{{`${item.content}`}}</span>
                                <img :src="imgSrc" alt="">
                            </template>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
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
    import { mapGetters } from 'vuex'
    export default {
        name: 'roboot',
        data () {
            return {
                text: '',
                textarea: [],
            }
        },
        computed: {
            ...mapGetters({
                'imgSrc': 'imgSrc',
                'userAcc': 'userAcc'
            })
        },
        mounted () {
            this.initial()
        },
        methods: {
            initial () {
                document.addEventListener('keydown', (event) => {
                    if (event.keyCode === 13) {
                        this.speack()
                    }
                })
                this.textarea.push({
                    content: '你好，我是机器人小白，请问有什么吩咐吗?',
                    flag: true
                })
            },
            speack () {
                this.textarea.push({
                    content: this.text,
                    flag: false
                })
                axios.post('/roboot',{
                    // 'userInfo': {
                    //     'apiKey': '5d7cc52db50d469b968b2c9169ad9db1',
                    //     'userId': this.userAcc
                    // },
                    // 'perception': {
                    //     'inputText': {
                    //         'text': this.text
                    //     }
                    // }
                    'key': '5d7cc52db50d469b968b2c9169ad9db1',
                    'info': this.text,
                    'userid': this.userAcc
                }).then((arr) => {
                    this.textarea.push({
                        content: arr.data.text,
                        flag: true
                    })
                    this.text = ''
                })
            },
            getStyle (item) {
                return {
                    'room-content__detailLeft': item.flag,
                    'room-content__detailRight': !item.flag
                }
            }
        },
        watch: {
            'textarea'() {
                this.$nextTick(() => {
                    this.$refs.roomContent.scrollTop = this.$refs.roomContent.scrollHeight
                })
            }
        }
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
                    border-radius: 50%;
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