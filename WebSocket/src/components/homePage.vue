<template>
    <div class="homePage">
        <div class="homePage-avatar">
            <img src="/static/icon/003.png" @click="modifyAvatar">
            <input type="file" placeholder="" accept=".jpg, .jpeg, .png" ref="input">
        </div>
    </div>
</template>
<script>
    export default {
        name: 'homePage',
        mounted () {
            this.$refs.input.addEventListener('change',() => {
                // axios.post('/fileUpload', this.$refs.input.files)
            })
        },
        methods: {
            modifyAvatar () {
                this.$refs.input.click()
            }
        }
    }
</script>
<style scoped>
    @component-namespace homePage {
        display: flex;
        flex-direction: row-reverse;
        @b avatar {
            border: 1px solid black;
            img {
                width: 50px;
                height: 50px;
                border-radius: 25px;
                cursor: pointer;
            }
            input {
                display: none;
            }
        }
    }
</style>