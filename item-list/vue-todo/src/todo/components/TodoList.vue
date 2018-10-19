<template>
  <div>
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      v-model="isCheckAll"
      @change="checkAll"
    >
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <todo-item
        v-for="(item, index) of todoList"
        v-show="showItem(item.done)"
        :key="index"
        :item="item"
        :index="index"
        @update="handleItemStatus"
        @del="handleItemDel"
      ></todo-item>
    </ul>
  </div>
</template>

<script>
import TodoItem from 'todo/TodoItem'
export default {
  name: 'TodoList',
  props: ['value', 'status'],
  components: {
    TodoItem
  },
  data () {
    return {
      todoList: this.value,
      isCheckAll: false,
      leftCount: 0
    }
  },
  methods: {
    // 当前条目完成与否
    handleItemStatus (index, isDone) {
      this.todoList[index].done = isDone
    },
    // 全选与否
    checkAll () {
      this.todoList.forEach(item => {
        item.done = this.isCheckAll
      })
      this.value = this.todoList
    },
    // 删除
    handleItemDel (index) {
      this.todoList.splice(index, 1)
    },
    showItem (isDone) {
      if (this.status === -1) {
        return true
      } else {
        return this.status === Number(isDone)
      }
    }
  },
  watch: {
    todoList: {
      handler (newValue) {
        this.isCheckAll = newValue.length > 0 && newValue.every(it => it.done)
      },
      deep: true
    },
    value (newValue) {
      this.todoList = newValue
    }
  }
}
</script>

<style lang="stylus" scoped>
  .toggle-all {
    text-align: center;
    border: none; /* Mobile Safari */
    opacity: 0;
    position: absolute;
  }
  .toggle-all + label {
    width: 60px;
    height: 34px;
    font-size: 0;
    position: absolute;
    top: -52px;
    left: -13px;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  .toggle-all + label:before {
    content: '❯';
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
  }
  .toggle-all:checked + label:before {
    color: #737373;
  }
  .todo-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
