<template>
  <nav class="navbar navbar-expand fixed-top bg-body-gradient">
    <div class="container justify-content-between">
      <strong class="navbar-text"> WIP <sup class="badge bg-dark fw-normal">90%</sup> </strong>
      <ul class="navbar-nav align-items-center">
        <template v-for="(lang, key) in $i18n.availableLocales" :key="key">
          <li v-if="lang !== $i18n.locale" class="nav-item">
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
        <li class="nav-item align-self-center">
          <div class="vr h-50 mx-2"></div>
        </li>
        <li class="nav-item">
          <button
            v-if="themeReady"
            v-motion
            :enter="{ y: 0, opacity: 1 }"
            :initial="{ y: 20 * (themeColorMode === ThemeColorMode.dark ? -1 : 1), opacity: 0 }"
            class="btn btn-link nav-link text-light text-decoration-none"
            role="button"
            @click="toggleThemeColor"
          >
            <i v-if="themeColorMode === ThemeColorMode.dark" class="bi bi-sun-fill"></i>
            <i v-if="themeColorMode === ThemeColorMode.light" class="bi bi-moon-stars-fill"></i>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { nextTick, onMounted, ref } from 'vue'
import { ThemeColorMode, ThemeService } from '@/services/Theme.service'
import { FactoryService } from '@/services/Factory.service'

const themeReady = ref(false)
const themeService = FactoryService.useService(ThemeService)
const themeColorMode = ref(themeService.getColorMode())

const LocalStoreKey: string = 'szramLanguage'
const getStoredLanguage = localStorage.getItem(LocalStoreKey)
const getPreferredLanguage = window?.navigator?.language?.includes('pl') ? 'pl' : 'en'
const { locale: language } = useI18n({ useScope: 'global' })

const emit = defineEmits(['beforeChange', 'changed'])

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

const toggleThemeColor = () => {
  themeReady.value = false
  themeService.toggleColorMode()

  nextTick(() => {
    themeColorMode.value = themeService.getColorMode()
    themeReady.value = true
  })
}

onMounted(() => {
  language.value = getStoredLanguage || getPreferredLanguage

  themeService.setup()

  nextTick(() => {
    themeColorMode.value = themeService.getColorMode()
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