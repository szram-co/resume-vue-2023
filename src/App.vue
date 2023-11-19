<template>
  <div v-if="$t" class="resume-container">
    <TopHeader />

    <div class="container">
      <section class="resume-profile">
        <div class="row">
          <div class="col col-8 offset-4">
            <h5 class="resume-boxed border border-3 d-inline-block border-dark mb-5">
              {{ positionTitle }}
            </h5>
          </div>
        </div>

        <div class="row align-items-start g-4">
          <div class="col col-4">
            <div class="resume-picture">
              <img alt="" class="img-fluid d-block" src="./assets/patryk-szram-ai.png" />
            </div>
            <ul class="resume-contact">
              <li>
                <a :href="`mailto:${contactEmail}`" class="link-lg">{{ contactEmail }}</a>
              </li>
              <li>
                <a :href="`tel:${contactPhone}`" class="link-lg">{{ contactPhone }}</a>
              </li>
              <li class="pt-4">
                <a :href="`tel:${currentLocation}`">{{ currentLocation }}</a>
              </li>
            </ul>

            <div class="resume-social">
              <a
                target="_blank"
                :href="link.url"
                v-for="(link, key) in data.social"
                :key="key"
                :title="link.title"
              >
                <span :class="`bi ${link.icon} fs-2`"></span>
              </a>
            </div>
          </div>
          <div class="col col-8">
            <h1 class="resume-hello fw-bold mb-5">
              {{ $t('welcome') }}<br />{{ $t('fullName') }}.
            </h1>
            <div class="resume-description fs-5 fw-medium">
              <p v-for="(paragraph, index) in $tm('bio')" :key="index" class="mb-5">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div class="resume-line-x"></div>

      <section class="resume-experience">
        <div class="row align-items-start gx-4">
          <div class="col col-4 text-end">
            <SkillsList :title="$t('header.skills')" :list="data.skillsKeys" />
            <SkillsList :title="$t('header.technologies')" :list="data.technologyKeys" />
            <SkillsList :title="$t('header.tools')" :list="data.toolsKeys" />
          </div>
          <div class="col col-8">
            <h2 class="resume-soft">
              {{ $t('header.experience') }}
            </h2>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TopHeader from './components/TopHeader.vue'
import SkillsList from './components/SkillsList.vue'

import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const positionTitle = 'Fullstack Web Developer'
const contactPhone = ref('+48795884999')
const contactEmail = ref('patryk@szram.co')

const { t } = useI18n({ useScope: 'global' })
const currentLocation = t('location')

const data = reactive({
  skillsKeys: [
    'skills.understandingBusinessGoals',
    'skills.adaptingToNewTechnologies',
    'skills.planningScalableArchitecture',
    'skills.ensuringAppQualityTesting',
    'skills.empathyInTeamRelationships',
    'skills.proactiveEfficiencySeeking',
    'skills.independenceAndInitiative',
    'skills.creativityInProblemSolving',
    'skills.abilityToLearnQuickly',
    'skills.uxUiInterfaceDesign'
  ],
  technologyKeys: [
    'technologies.javascriptTypescript',
    'technologies.angularVue',
    'technologies.phpSql',
    'technologies.sassLess',
    'technologies.materialUiBootstrap',
    'technologies.pwaSpa',
    'technologies.linuxOsx',
    'technologies.git'
  ],
  toolsKeys: ['tools.photoshopIllustrator', 'tools.webpackBabel', 'tools.ciCd', 'tools.nodeNpm'],
  social: {
    github: {
      icon: 'bi-github',
      url: 'https://github.com/coderabbitpl',
      title: 'github.com/coderabbitpl'
    },
    linkedin: {
      icon: 'bi-linkedin',
      url: 'https://www.linkedin.com/in/patryk-szram/',
      title: 'linkedin.com/in/patryk-szram'
    },
    behance: {
      icon: 'bi-behance',
      url: 'https://www.behance.net/patrykszram',
      title: 'behance.net/patrykszram'
    }
  }
})

const formatPhoneNumber = (phoneNumber: string): string => {
  const cleanNumber = phoneNumber.replace(/\D\+/g, '')
  const maskedNumber = cleanNumber.replace('884', '000')

  if (cleanNumber.length > 0) {
    const regex = /.{1,3}/g
    const formattedNumber = maskedNumber.match(regex) ?? []
    return formattedNumber.join(' ').trim()
  }

  return phoneNumber
}

onMounted(() => {
  contactPhone.value = formatPhoneNumber(contactPhone.value)
})
</script>