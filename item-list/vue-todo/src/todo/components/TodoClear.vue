<template>
  <button
    class="clear-completed"
    @click="clearCompleted"
  >
    Clear completed
  </button>
</template>

<script>
export default {
  name: 'TodoClear',
  data () {
    return {

    }
  },
  methods: {
    clearCompleted () {
      const list = this.$parent.$parent.todoList
      this.$parent.$parent.todoList = list.filter(item => !item.done)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .clear-completed, html .clear-completed:active {
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
  }

  .clear-completed:hover {
    text-decoration: underline;
  }
</style>
