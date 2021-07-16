import * as Vuex from "vuex";

const store = Vuex.createStore({
    state() {
        return {
            titleList: [],
            contentList: [],
            content: '',
            title: '',
            editIndex: 0
        }
    },
    mutations: {
        updateTitleList(state, tasks) {
            state.titleList = tasks;
        },
        updateContentList(state, tasks) {
            state.contentList = tasks;
        },
        updateContent(state, tasks) {
            state.content = tasks;
        },
        updateTitle(state, tasks) {
            state.title = tasks;
        },
        updateEditIndex(state, tasks) {
            state.editIndex = tasks;
        },
        addTask(state, task, content) {
            state.titleList.unshift(task);
            state.contentList.unshift(content);
            state.content = '';
            state.title = '';
            state.editIndex = 0;
        },
        deleteTask(state, index) {
            state.titleList.splice(index, 1);
            state.contentList.splice(index, 1);
        },
        //提交编辑
        edit(state, data) {
            state.titleList[data.index] = data.title;
            state.contentList[data.index] = data.content;
            state.content = '';
            state.title = '';
            state.editIndex = 0;
        },
        //去编辑
        updatEdit(state, index) {
            state.editIndex = index;
            state.content = contentList[index];
            state.title = titleList[index];
        },
        //自动保存
        saveEdit(state, data) {
            state.content = data.content;
            state.title = data.title;
        }
    }
});

export default store;