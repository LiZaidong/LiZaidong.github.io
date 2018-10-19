<template>
  <footer class="footer">
    <todo-count
      :count="leftCount"
    ></todo-count>
    <ul class="filters">
      <li><a @click="categorySwitch(-1)" :class="{selected: selected(-1)}">All</a></li>
      <li><a @click="categorySwitch(0)" :class="{selected: selected(0)}">Active</a></li>
      <li><a @click="categorySwitch(1)" :class="{selected: selected(1)}">Completed</a></li>
    </ul>
    <todo-clear v-show="showClear"></todo-clear>
  </footer>
</template>

<script>
import TodoCount from 'todo/TodoCount'
import TodoClear from 'todo/TodoClear'
export default {
  name: 'TodoToggle',
  props: ['leftCount', 'length'],
  components: {
    TodoCount,
    TodoClear
  },
  data () {
    return {
      status: -1
    }
  },
  methods: {
    // 更改显示类别
    categorySwitch (value) {
      this.status = value
      this.$emit('category', this.status)
    },
    // 切换当前显示
    selected (status) {
      return this.status === status
    }
  },
  computed: {
    showClear () {
      return this.leftCount < this.length
    }
  }
}
</script>

<style lang="stylus" scoped>
  .footer {
    color: #777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
  }
  .footer:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
                0 8px 0 -3px #f6f6f6,
                0 9px 1px -3px rgba(0, 0, 0, 0.2),
                0 16px 0 -6px #f6f6f6,
                0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
  .filters {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
  }

  .filters li {
    display: inline;
  }

  .filters li a {
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
  }

  .filters li a:hover {
    border-color: rgba(175, 47, 47, 0.1);
  }

  .filters li a.selected {
    border-color: rgba(175, 47, 47, 0.2);
  }
</style>
