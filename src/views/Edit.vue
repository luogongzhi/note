<template>
    <div>
      <n-input
        v-model:value="title"
        type="input"
        placeholder="请填写标题"
        required="required"
        clearable 
      > 
           <template #prefix>标题：</template>
        </n-input>
    </div>
    <n-divider dashed="true"/>
    <textarea id="my-text-area" />
    <n-divider />
    <div class="extra">
        <n-button @click="handleSubmit(index)">提交</n-button>
    </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { NButton, NDivider, useMessage, NInput} from "naive-ui";
import { v4 as uuidv4 } from 'uuid';
import EasyMDE from "easymde";

const router = useRouter();
const store = useStore();
const message = useMessage();
const title = ref(store.state.title);
const content = computed(() => store.state.content);
const index = ref(store.state.editIndex);
let easyMDE;
let interval;

const handleSubmit = (index) => {
    if (index === null) {
        store.commit("addTask", {
            task : {
                id: uuidv4(),
                title: title.value,
                content : easyMDE.value()
            }
        });
        message.success('添加成功');
    }else {
        store.commit("edit", {
            index: index,
            title: title.value,
            content: easyMDE.value()
        });
        message.success('编辑成功');
    }
    store.commit("saveEdit", {title:title,content:easyMDE.value()});
};

onMounted(() => {
    const dom = document.getElementById("my-text-area");
    easyMDE = new EasyMDE({
        element: dom,
        toolbar: [
            "bold",
            "italic",
            "heading",
            "|",
            "quote",
            "unordered-list",
            "ordered-list",
            "|",
            "link",
            "image",
        ],
        spellChecker: false
    });
    if (content.value) easyMDE.value(content.value);

    // auto save in every 10s
    interval = setInterval(() => {
        store.commit("saveEdit", {title:title,content:easyMDE.value()});
        message.success('已自动保存')
    }, 30000);
});

onBeforeUnmount(() => {
    clearInterval(interval);
});

</script>

<style lang="postcss" scoped>
    .extra {
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .n-divider:not(.n-divider--vertical) {
        margin-top: 4px;
        margin-bottom: 4px;
    }
</style>