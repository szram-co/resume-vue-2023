<template>
  <nav class="navbar navbar-expand fixed-top bg-body-gradient">
    <div class="container">
      <a class="navbar-brand mb-0 h1 text-light me-auto" href="/">szram.co</a>
      <ul class="navbar-nav align-items-center">
        <li
          v-for="(link, key, n) in prop.links"
          :key="key"
          v-motion
          :delay="350 + 50 * n"
          :enter="{ opacity: 1, y: 0, scale: 1, rotate: 0 }"
          :initial="{ opacity: 0, y: 100, rotate: -90 }"
          :style="link.style"
          class="nav-item"
        >
          <a
            :hovered="{ scale: 1.2, rotate: 5 }"
            :href="link.url"
            :target="link.target"
            :title="link.title"
            class="btn btn-link nav-link text-light"
          >
            <span :class="`bi ${link.icon}`"></span>
          </a>
        </li>
        <li class="nav-item d-block">
          <div class="vr h-100 d-block mx-2"></div>
        </li>
        <li class="nav-item">
          <button
            class="btn btn-link nav-link text-light text-decoration-none"
            role="button"
            @click="toggleDark()"
          >
            <i v-if="isDark" class="bi bi-sun-fill"></i>
            <i v-if="!isDark" class="bi bi-moon-stars-fill"></i>
          </button>
        </li>
        <template v-for="(lang, key) in $i18n.availableLocales" :key="key">
          <li v-if="lang !== $i18n.locale" class="nav-item nav-item--lang">
            <button
              v-motion
              :enter="{ scale: 1, y: 0, opacity: 1 }"
              :initial="{ scale: 0.5, y: 20 * (languageToggled ? -1 : 1), opacity: 0 }"
              class="btn btn-link nav-link text-light text-decoration-none"
              role="button"
              @click.prevent="changeLanguage(lang)"
            >
              <span class="letter-spacing">
                {{ lang.toString().toLocaleUpperCase() }}
              </span>
            </button>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { nextTick, onMounted, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

const themeReady = ref(false)

const isDark = useDark({
  selector: 'html',
  attribute: 'data-bs-theme',
  valueDark: 'dark',
  valueLight: 'light'
})
const toggleDark = useToggle(isDark)

const LocalStoreKey: string = 'szramLanguage'
const getStoredLanguage = localStorage.getItem(LocalStoreKey)
const getPreferredLanguage = window?.navigator?.language?.includes('pl') ? 'pl' : 'en'
const { locale: language } = useI18n({ useScope: 'global' })

const emit = defineEmits(['beforeChange', 'changed'])
const prop = defineProps(['links'])

const languageToggled = ref(false)

const changeLanguage = (lang: string) => {
  switch (lang) {
    default:
    case 'pl':
      break
  }
  emit('beforeChange')
  localStorage.setItem(LocalStoreKey, lang)
  language.value = lang
  nextTick(() => {
    emit('changed')
  })

  languageToggled.value = !languageToggled.value
}

onMounted(() => {
  language.value = getStoredLanguage || getPreferredLanguage

  nextTick(() => {
    themeReady.value = true
  })
})
</script>

<style lang="scss" scoped>
@import '@/app';

.bg-body-gradient {
  background: var(--brand-gradient);
}
</style>
