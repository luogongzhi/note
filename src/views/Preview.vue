<template>
    <n-card>
        <div id="title" v-if="title" />
        <div v-else class="empty_title">暂无标题</div>
    </n-card>
    <n-divider />
    <n-card>
        <div id="content" v-if="content" />
        <div v-else class="empty_content">暂无内容</div>
    </n-card>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import marked from "marked";
import { NCard } from "naive-ui";

const store = useStore();
const title = computed(() => store.state.title);
const content = computed(() => store.state.content);

onMounted(() => {
    if (content.value) {
        document.getElementById("content").innerHTML = marked(content.value);
    }
    if (title.value) {
        document.getElementById("title").innerHTML = "标题："+title.value;
    }
});
</script>

<style lang="postcss" scoped>
    .empty_title{
        text-align: center;
    }

    .empty_content {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
    }
</style>