<template>
  <header class="header-top" v-if="$t">
    <div class="container">
      <div class="switch-locale">
        <a
          href="#"
          v-for="(locale, key) in $i18n.availableLocales"
          :key="key"
          @click.prevent="changeLanguage(locale)"
          :class="{ active: locale === $i18n.locale }"
        >
          {{ locale.toString().toLocaleUpperCase() }}
        </a>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'

export default {
  computed: {
    defaultLanguage: () => {
      return window?.navigator?.language?.includes('pl') ? 'pl' : 'en'
    },
    selectedLanguage: () => {
      return localStorage.getItem('selectedLanguage')
    }
  },
  mounted() {
    const { locale } = useI18n({ useScope: 'global' })

    locale.value = this.selectedLanguage || this.defaultLanguage
  },
  methods: {
    changeLanguage(locale: string) {
      localStorage.setItem('selectedLanguage', locale)
      this.$i18n.locale = locale
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';

.header-top {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  background: $gradient-cyan;
  color: $light;
  z-index: 1;
}

.switch-locale {
  margin-left: auto;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  font-family: $font-cond;
  font-size: 1rem;
  gap: 0.5rem;

  a {
    display: block;
    width: 1.5rem;
    height: 1.75rem;
    line-height: 1.75rem;
    text-decoration: none;
    color: $light;
    text-align: center;
    border-radius: 0.25rem;

    &:not(.active) {
      opacity: 0.5;
    }
  }

  i {
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    color: $primary;
  }
}
</style>