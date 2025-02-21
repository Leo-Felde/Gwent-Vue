<template>
  <div class="card">
    card
  </div>
</template>

<script setup lang="ts">


</script>

<style lang="sass" scoped>
.card
  width: 80px
  height: 120px
  background: white
  border: 1px solid #333
  text-align: center
  line-height: 120px
  font-weight: bold
  cursor: pointer

.card.selected
  border: 2px solid yellow
  box-shadow: 0 0 10px yellow
</style>
