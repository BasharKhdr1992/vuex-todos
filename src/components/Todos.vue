<template>
  <h3>Todos</h3>
  <div class="legend">
    <span>Double click to mark as complete</span>
    <span> <span class="incomplete-box"></span> = Incomplete </span>
    <span> <span class="complete-box"></span> = complete </span>
  </div>
  <div class="todos">
    <div
      v-for="todo in allTodos"
      v-bind:key="todo.id"
      @dblclick="onDblClick(todo)"
      :class="[todo.completed ? 'is-complete' : '', 'todo']"
    >
      {{ todo.title }}
      <i class="fas fa-trash-alt" @click="onTodoDelete(todo.id)"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Todos",
  methods: {
    onDblClick(todo) {
      this.updateTodo({ ...todo, completed: !todo.completed });
    },
    onTodoDelete(id) {
      this.deleteTodo(id);
    },
    ...mapActions(["fetchTodos", "deleteTodo", "updateTodo"]),
  },
  computed: mapGetters(["allTodos"]),
  created() {
    this.fetchTodos();
  },
};
</script>
<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}
.legend {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.legend > span {
  width: 33%;
  display: inline-block;
  text-align: center;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}
.is-complete {
  background: #35495e;
  color: #fff;
}
@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>
