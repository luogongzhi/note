import * as Vuex from "vuex";

const store = Vuex.createStore({
    state() {
        return {
            titleList: [],
            contentList: [],
            content: '',
            title: '',
            editIndex: null
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
        addTask(state, tasks) {
            state.titleList.unshift(tasks.task);
            state.contentList.unshift(tasks.content);
        },
        deleteTask(state, index) {
            state.titleList.splice(index, 1);
            state.contentList.splice(index, 1);
        },
        //提交编辑
        edit(state, data) {
            state.titleList[data.index].title = data.title;
            state.contentList[data.index] = data.content;
        },
        //去编辑
        updatEdit(state, index) {
            state.editIndex = index;
            state.content = state.contentList[index];
            state.title = state.titleList[index].title;
        },
        //自动保存
        saveEdit(state, data) {
            state.content = data.content;
            state.title = data.title;
        },
        //跳往main
        jumpMain(state) {
            state.content = '';
            state.title = '';
            state.editIndex = null;
        }
    }
});

export default store;