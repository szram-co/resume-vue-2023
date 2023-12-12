<template>
  <div class="resume-skills">
    <h3
      v-motion
      :enter="{ x: 0, opacity: 1 }"
      :initial="{ x: -50, opacity: 0 }"
      class="resume-header"
    >
      {{ title }}
    </h3>
    <ul class="resume-list">
      <template v-for="(skillKey, n) in skills" :key="skillKey">
        <li
          v-motion
          :delay="100 + 50 * n"
          :enter="{ x: 0, opacity: 1 }"
          :initial="{ x: -50, opacity: 0 }"
        >
          {{ $t(`${skillKey}`) }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  skills: {
    type: Array<string>,
    required: true
  }
})
</script>

<style lang="scss">
@import '@/app.scss';

.resume-header {
  font-size: 1.5rem;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 3rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.resume-list {
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
