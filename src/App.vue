<template>
  <div id="app">
      <n-layout>
          <n-layout-header>
            <h1>极简笔记</h1>
            <div class="extra">
              <n-popover trigger="hover" v-if="route.name != 'main'">
                <template #trigger>
                  <n-button @click="JumpMain">主页</n-button>
                </template>
                <span>离开此页面为保存的内容将丢失</span>
              </n-popover>
              <n-button v-else><router-link to="/">主页</router-link></n-button>
              <n-button @click="handleJump"><span>{{ routeName }}</span></n-button>
            </div>
          </n-layout-header>
          <n-layout-content>
            <n-message-provider>
              <router-view />
            </n-message-provider>
          </n-layout-content>
      </n-layout>
  </div>
</template>


<script setup>
import {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NGridItem,
    NGrid,
    NH1,
    NButton,
    NMessageProvider,
    NPopover
} from "naive-ui";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

const routeName = computed(() => {
  if (route.name === "edit") return "预览";
  if (route.name === "preview" || route.name === "main") return "编辑";
});

onMounted(() => {
  let myData = localStorage.getItem("myData");
  if (myData) {
    myData = JSON.parse(myData);
    store.commit("updateEditIndex", myData[3]);
    store.commit("updateList", myData[2]);
    store.commit("updateContent", myData[1]);
    store.commit("updateTitle", myData[0]);
  }
});

window.onbeforeunload = () => {
  let title = store.state.title;
  let content = store.state.content;
  let list = store.state.list;
  let editIndex = store.state.editIndex;
  let myData = [title, content, list, editIndex];
  localStorage.setItem("myData", JSON.stringify(myData));
}

const JumpMain = () => {
  router.push("/");
  store.commit("jumpMain");
}

const handleJump = () => {
  if (route.name === "edit") router.push("preview");
  if (route.name === "preview" || route.name === "main") router.push("edit");
}

</script>

<style lang="postcss" scoped>
#app {
  background: #f5f5f5;

  & .n-layout-header {
      text-align: center;
      border-bottom: 1px solid #e6e6e6;
  }

  & .n-layout-content {
      margin:  auto;
      padding: 16px;
      max-width: 450px;
      
  }

}
  .router-link-active {
      text-decoration: none;
  }

  a {
      text-decoration: none;
      color: #000;
  }

</style>
