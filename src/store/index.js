import * as Vuex from "vuex";

const store = Vuex.createStore({
    state() {
        return {
            list: [],
            content: '',
            title: '',
            editIndex: null
        }
    },
    mutations: {
        updateList(state, tasks) {
            state.list = tasks;
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
            state.list.unshift(tasks.task);
        },
        deleteTask(state, index) {
            state.list.splice(index, 1);
        },
        //提交编辑
        edit(state, data) {
            state.list[data.index].title = data.title;
            state.list[data.index].content = data.content;
        },
        //去编辑
        updatEdit(state, index) {
            state.editIndex = index;
            state.content = state.list[index].content;
            state.title = state.list[index].title;
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