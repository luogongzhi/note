<template>
  <n-list-item class="task-item-wrapper">
    <template #prefix>
      <n-icon size="16">
        <drag-indicator-outlined />
      </n-icon>
    </template>
    <swiper
      :initial-slide="1"
      :slides-per-view="1"
      :resistance-ratio="0"
      :speed="200"
      @transitionEnd="onTransitionEnd"
    >
      <swiper-slide class="delete-slide">删除</swiper-slide>
      <swiper-slide @click="onClick">{{ task.title }}</swiper-slide>
      <swiper-slide class="edit-slide">编辑</swiper-slide>
    </swiper>
  </n-list-item>
</template>

<script setup>
import { defineProps, defineEmit } from "vue";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { DragIndicatorOutlined } from "@vicons/material";
import { NListItem, NIcon } from "naive-ui";

const props = defineProps({
  taskIndex: Number,
  task: Object,
});

const emit = defineEmit(["delete", "edit"]);

const onTransitionEnd = (instance) => {
  const { activeIndex } = instance;
  if (activeIndex === 0) {
        emit("delete");
        setTimeout(() => {
        instance.destroy();
        }, 1);
  } else if (activeIndex === 2) {
        emit("edit");
  } 
};

const onClick = () => {
  emit("edit");
};
</script>

<style lang="postcss">
.task-item-wrapper {
  padding: 0 !important;
  border: 1px solid var(--merged-border-color);
  cursor: move;

  & .n-list-item__prefix {
    margin: 0px !important;
    padding: 8px;
    display: flex;
  }

  & .swiper-container {
    width: 100%;
    height: 100%;
    cursor: default;
  }

  & .swiper-slide {
    padding: 8px 0;
    display: flex;
    align-items: center;
    width: 100% !important;
  }

  & .edit-slide {
    box-sizing:border-box;
    color: white;
    background: green;
    padding-right: 16px;
    justify-content: flex-end;
  }

  & .delete-slide {
    box-sizing:border-box;
    color: white;
    background: tomato;
    padding-left: 16px;
    justify-content: flex-start;
  }
}

.task-item-wrapper:not(:last-child) {
  border-bottom: none !important;
}
</style>