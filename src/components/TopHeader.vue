<template>
  <nav class="navbar navbar-expand fixed-top bg-body-gradient">
    <div class="container">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <button
            aria-expanded="false"
            class="btn btn-outline-light btn-sm dropdown-toggle"
            data-bs-toggle="dropdown"
            type="button"
          >
            <i class="bi bi-globe2"></i>
            {{ locale.toString().toLocaleUpperCase() }}
          </button>
          <ul class="dropdown-menu">
            <li v-for="(lang, key) in $i18n.availableLocales" :key="key">
              <button
                :class="{ active: lang === $i18n.locale }"
                class="dropdown-item"
                type="button"
                @click.prevent="changeLanguage(lang)"
              >
                {{ lang.toString().toLocaleUpperCase() }}
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { nextTick, onMounted } from 'vue'

const defaultLanguage = window?.navigator?.language?.includes('pl') ? 'pl' : 'en'
const selectedLanguage = localStorage.getItem('selectedLanguage')
const { locale } = useI18n({ useScope: 'global' })

const emit = defineEmits(['beforeChangeLang', 'changedLang'])

const changeLanguage = (lang: string) => {
  switch (lang) {
    default:
    case 'pl':
      break
  }
  emit('beforeChangeLang')
  localStorage.setItem('selectedLanguage', lang)
  locale.value = lang
  nextTick(() => {
    emit('changedLang')
  })
}

onMounted(() => {
  locale.value = selectedLanguage || defaultLanguage
})
</script>

<style lang="scss" scoped>
@import '@/app';

.bg-body-gradient {
  background: var(--brand-gradient);
}
</style>