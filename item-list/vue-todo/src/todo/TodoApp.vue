<template>
  <section class="todoapp">
    <todo-input @add="addItem"></todo-input>
    <section class="main">
      <todo-list
        v-model="todoList"
        :status="status"
      ></todo-list>
    </section>
    <todo-toggle
      :leftCount="leftCount"
      :length="todoList.length"
      v-show="todoList.length"
      @category="handleCategoryDisplay"
    ></todo-toggle>
  </section>
</template>

<script>
import TodoInput from 'todo/TodoInput'
import TodoList from 'todo/TodoList'
import TodoToggle from 'todo/TodoToggle'
export default {
  name: 'TodoApp',
  components: {
    TodoInput,
    TodoList,
    TodoToggle
  },
  data () {
    return {
      todoList: [
        {'text': '11111', done: false},
        {'text': '22222', done: false},
        {'text': '33333', done: true}
      ],
      status: -1
    }
  },
  methods: {
    // 添加条目
    addItem (inputValue) {
      this.todoList.push({text: inputValue, done: false})
    },
    // 更改显示类别
    handleCategoryDisplay (status) {
      this.status = status
    }
  },
  computed: {
    // 未完成数量
    leftCount () {
      return this.todoList.filter(it => !it.done).length
    }
  }
}
</script>

<style lang="stylus" scoped>
  .todoapp
    background: #fff;
    margin: 130px 0 40px 0;
    position: relative;
    box-shadow:
      0 2px 4px 0 rgba(0, 0, 0, 0.2),
      0 25px 50px 0 rgba(0, 0, 0, 0.1);
    & >>> input::-webkit-input-placeholder
      font-style: italic;
      font-weight: 300;
      color: #e6e6e6;
    & >>> input::-moz-placeholder
      font-style: italic;
      font-weight: 300;
      color: #e6e6e6;

    & >>> input::input-placeholder
      font-style: italic;
      font-weight: 300;
      color: #e6e6e6;
    & >>> h1
      position: absolute;
      top: -155px;
      width: 100%;
      font-size: 100px;
      font-weight: 100;
      text-align: center;
      color: rgba(175, 47, 47, 0.15);
      -webkit-text-rendering: optimizeLegibility;
      -moz-text-rendering: optimizeLegibility;
      text-rendering: optimizeLegibility;
  .main
    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;
  @media screen and (-webkit-min-device-pixel-ratio:0) {
    .toggle-all,
    .todo-list li .toggle {
      background: none;
    }

    .todo-list li .toggle {
      height: 40px;
    }
  }

  @media (max-width: 430px) {
    .footer {
      height: 50px;
    }

    .filters {
      bottom: 10px;
    }
  }
</style>
