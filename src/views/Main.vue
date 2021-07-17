<template>
  <n-space vertical>
    <n-list v-if="titleList.length">
      <draggable
        :list="titleList"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ index, element }">
          <task-item
            :taskIndex="index"
            :task="element"
            :key="element.id"
            @delete="() => onDelete(index)"
            @edit="() => onEdit(index)"
          />
        </template>
      </draggable>
    </n-list>
    <n-thing v-else> 请添加你的笔记 </n-thing>
    <div class="extra">
      <n-button @click="router.push('edit')"> 添加 </n-button>
    </div>
  </n-space>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  NList,
  NListItem,
  NButton,
  NSpace,
  NThing,
} from "naive-ui";
import TaskItem from "../components/TaskItem.vue";
import draggable from "vuedraggable";

const store = useStore();
const titleList = computed(() => store.state.titleList);
const router = useRouter();

const onDelete = (index) => {
  store.commit("deleteTask", index);
};

const onEdit = (index) => {
  store.commit("updatEdit", index);
  router.push('edit');
};

</script>

<style scoped>
  .n-thing {
    text-align: center;
  }

  .extra {
    display: flex;
    justify-content: center;
  }
</style>
