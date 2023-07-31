<script setup>
const props = defineProps(['content'])
</script>

<template>
  <div class="cell">{{ props.content }}</div>
</template>

<style scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border: 1px solid black;
  cursor: default;
}
</style>
