<template>
  <div v-if="$t" class="resume-container">
    <header class="header-top">
      <div class="container">
        <div class="row">
          <div class="col"></div>
          <div class="col col-auto">
            <div class="col-switch">
              <span class="text-switch">{{ $t('switch') }}</span>
              <button
                v-for="(lang, i) in availableLocales"
                :key="`language${i}`"
                :hidden="lang === locale.valueOf()"
                class="btn btn-sm btn-outline-light"
                @click="changeLanguage(lang)"
              >
                {{ languages?.[lang] }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="container-fluid">
      <section class="resume-profile">
        <div class="row align-items-start g-5">
          <div class="col col-4">
            <div class="resume-picture">
              <img alt="" class="img-fluid d-block" src="patryk-szram-ai.png" />
            </div>
            <ul class="resume-contact">
              <li>
                <a :href="`mailto:${contactEmail}`" class="link-lg">{{ contactEmail }}</a>
              </li>
              <li>
                <a :href="`tel:${contactPhone}`" class="link-lg">{{ contactPhone }}</a>
              </li>
              <li class="pt-5">
                <a :href="`tel:${currentLocation}`">{{ currentLocation }}</a>
              </li>
            </ul>
          </div>
          <div class="col col-8">
            <h5 class="resume-boxed border border-3 d-inline-block border-dark">
              {{ positionTitle }}
            </h5>
            <h1 class="resume-hello fw-bold my-5" v-html="$t('welcome')"></h1>
            <div class="resume-description fs-5 fw-medium">
              <p v-for="(paragraph, index) in $tm('bio')" :key="index" class="mb-5">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, availableLocales } = useI18n({ useScope: 'global' })

const languages = {
  en: 'English',
  pl: 'Polski'
}

const positionTitle = 'Fullstack Web Developer'
const contactPhone = ref('+48795884999')
const contactEmail = ref('patryk@szram.co')
const currentLocation = ref('Grudziądz, Polska')

const selectedLanguage = ref(localStorage.getItem('selectedLanguage') || 'pl')

const changeLanguage = (lang: string) => {
  selectedLanguage.value = lang
  localStorage.setItem('selectedLanguage', selectedLanguage.value)
  locale.value = selectedLanguage.value
}

const formatPhoneNumber = (phoneNumber: string): string => {
  const cleanNumber = phoneNumber.replace(/\D\+/g, '')

  if (cleanNumber.length > 0) {
    const regex = /.{1,3}/g
    const formattedNumber = cleanNumber.match(regex) ?? []
    return formattedNumber.join(' ').trim()
  }

  return phoneNumber
}

onMounted(() => {
  contactPhone.value = formatPhoneNumber(contactPhone.value)
  locale.value = selectedLanguage.value
})
</script>

<style lang="scss">
//@import 'variables';
</style>