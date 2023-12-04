<template>
  <h3 class="resume-header">
    {{ title }}
  </h3>
  <ul class="resume-skills">
    <li v-for="(skillKey, n) in list" :key="n">
      {{ $t(`${skillKey}`) }}
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String
    },
    list: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';

.resume-header {
  font-size: 1.5rem;
  font-family: $font-head;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 3rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.resume-skills {
  display: block;
  padding: 0;
  margin: 0 0 3rem;
  list-style: none;
  line-height: 2.5rem;
  font-size: 1rem;
  margin-block-start: 1rem;
  margin-block-end: 1.5rem;

  li {
    padding: 0;
    margin: 0;
    font-size: 1.125rem;
  }
}
</style>
