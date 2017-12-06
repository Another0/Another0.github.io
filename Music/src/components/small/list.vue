<template>
    <div class="list">
        <div v-if="option.title">
            <img src="">
        </div>
        <div>
            <div>播放列表</div>
            <div v-for="(item, index) in option.data">
                <span class="list-index">{{index}}</span>
                <span class="list-name">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['option']
    }
</script>
<style></style>