import axios from "axios";

const state = {
  todos: [],
};
const getters = {
  allTodos: (state) => state.todos,
};
const actions = {
  async fetchTodos({ commit }) {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
    commit("setTodos", res.data);
  },
  async addTodo({ commit }, title) {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title, completed: false },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    commit("newTodo", res.data);
  },
  async deleteTodo({ commit }, todoId) {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`
    );
    if (res.status === 200) {
      commit("deleteTodo", todoId);
    }
  },
  async filterTodos({ commit }, e) {
    const limit = +e.target.options[e.target.options.selectedIndex].innerText;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    commit("setTodos", res.data);
  },
  async updateTodo({ commit }, upTodo) {
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${upTodo.id}`,
      upTodo,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    commit("updateTodo", res.data);
  },
};
const mutations = {
  setTodos: (state, todos) => {
    state.todos = todos;
  },
  updateTodo: (state, upTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === upTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, upTodo);
    }
  },
  newTodo: (state, todo) => state.todos.unshift(todo),
  deleteTodo: (state, todoId) =>
    (state.todos = state.todos.filter((todo) => todo.id !== todoId)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
