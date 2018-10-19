<template>
  <span class="todo-count">
    <strong>{{ count }}</strong> items left
  </span>
</template>

<script>
export default {
  name: 'TodoCount',
  props: ['count'],
  data () {
    return {
      total: 1
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
  .todo-count {
    float: left;
    text-align: left;
  }

  .todo-count strong {
    font-weight: 300;
  }
</style>
