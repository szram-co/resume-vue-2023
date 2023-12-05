<template>
  <div v-if="$t" ref="parallaxTarget">
    <TopHeader />
    <div class="resume-container">
      <section class="resume-profile" :style="parallaxStyle">
        <div class="container">
          <div
            class="row"
            v-motion
            :initial="{
              y: 100,
              opacity: 0
            }"
            :enter="{
              y: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: '100',
                delay: 100
              }
            }"
          >
            <div class="col col-8 offset-4">
              <h5 class="resume-boxed border border-3 d-inline-block border-dark mb-5">
                {{ positionTitle }}
              </h5>
            </div>
          </div>
          <div class="row align-items-start">
            <div class="col col-4 pe-5">
              <div class="resume-picture" v-motion-slide-left>
                <img alt="" class="img-fluid d-block" src="./assets/patryk-szram-ai.png" />
              </div>

              <ul class="resume-contact" v-motion-slide-left>
                <template v-if="recaptchaVerified">
                  <li>
                    <a :href="`mailto:${contactEmail}`" class="link-lg">{{ contactEmail }}</a>
                  </li>
                  <li>
                    <a :href="`tel:${contactPhone}`" class="link-lg">{{ contactPhone }}</a>
                  </li>
                  <li class="pt-4">
                    <a :href="`tel:${currentLocation}`">{{ currentLocation }}</a>
                  </li>
                </template>
                <template v-else>
                  <li>
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </li>
                </template>
              </ul>

              <div class="resume-social" v-motion-slide-left>
                <a
                  :target="link.target"
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
              <h1
                class="resume-hello fw-bold mb-5"
                v-motion
                :initial="{
                  scale: 0.8
                }"
                :enter="{
                  scale: 1,
                  transition: {
                    delay: 100
                  }
                }"
              >
                {{ $t('welcome') }}<br />{{ $t('fullName') }}.
              </h1>
              <div class="resume-description fs-5 fw-medium">
                <p
                  v-for="(paragraph, index) in $tm('bio')"
                  :key="index"
                  class="mb-5"
                  v-motion-slide-right
                >
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="container">
        <div class="resume-line-x"></div>
      </div>

      <section class="resume-experience">
        <div class="container">
          <div class="row align-items-start">
            <div class="col col-4 pe-5 text-end">
              <SkillsList :title="$t('header.skills')" :list="data.skillsKeys" />
              <SkillsList :title="$t('header.technologies')" :list="data.technologyKeys" />
              <SkillsList :title="$t('header.tools')" :list="data.toolsKeys" />
            </div>
            <div class="col col-8">
              <h2 class="resume-soft">
                {{ $t('header.experience') }}
              </h2>

              <div class="resume-timeline">
                <template v-for="(company, c) in data.experience">
                  <div
                    class="resume-timeline__company"
                    :style="{ '--dot-primary': company.companyColor }"
                  >
                    <div class="resume-timeline__logo">
                      <img :src="company.companyLogo" alt="" />
                    </div>
                    <div
                      class="resume-timeline__dot"
                      :class="{ 'resume-timeline__dot--first': c === 0 }"
                    >
                      <i></i>
                    </div>
                    <div class="resume-timeline__name">
                      {{ company.companyName }} {{ company.companyLocation }}
                      <em>{{ company.companyDate }}</em>
                    </div>

                    <template v-for="(position, p) in company.positions">
                      <div class="resume-timeline__date">
                        <div class="date-end">{{ position.positionDate.end }}</div>
                        <div class="date-start">{{ position.positionDate.start }}</div>
                      </div>
                      <div
                        class="resume-timeline__dot"
                        :style="{
                          '--dot-secondary':
                            c > 0 && !!company.positions?.[p + 1]
                              ? company.companyColor
                              : company.companyColor
                        }"
                      >
                        <i></i>
                      </div>
                      <div class="resume-timeline__position">
                        <h4>{{ position.positionName }}</h4>
                        <p>{{ position.positionDesc }}</p>
                      </div>
                    </template>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useParallax } from '@vueuse/core'
import { useChallengeV3, useRecaptchaProvider } from 'vue-recaptcha/head'
import TopHeader from './components/TopHeader.vue'
import SkillsList from './components/SkillsList.vue'

import type { CSSProperties } from 'vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs, { Dayjs } from 'dayjs'
import duration from 'dayjs/plugin/duration'
import logoRaiffeisen from '@/assets/logo-raiffeisen.png'
import logoStabilis from '@/assets/logo-stabilis.png'
import logoMoveCloser from '@/assets/logo-movecloser.png'

const resumeReady = ref(false)

const parallaxTarget = ref(null)
const parallax = reactive(useParallax(parallaxTarget))

const parallaxStyle = computed(
  (): CSSProperties => ({
    transform: `translateX(${-1 * parallax.tilt * 2}rem) translateY(${-1 * parallax.roll * 2}rem)`
  })
)

dayjs.extend(duration)

useRecaptchaProvider()
const recaptchaResponse = ref()
const recaptchaVerified = computed(() => !!recaptchaResponse?.value)

const { execute } = useChallengeV3('submit')

const positionTitle = 'Fullstack Web Developer'
const contactPhone = ref('+48795884999')
const contactEmail = ref('patryk@szram.co')
const resumePdf = computed(() => `/patryk-szram-resume-${locale.value}.pdf`)

const { t, locale } = useI18n({ useScope: 'global' })
const currentLocation = `${t('city.gdz')}, ${t('country.pl')}`

const companyTimePeriod = (start: Dayjs, end: Dayjs) => {
  const dateStart = start.hour(12)
  const dateEnd = end.hour(12)
  const dateDiff = dayjs.duration(dateStart.diff(dateEnd))
  const textYear = dateDiff.years() <= 1 ? t('dates.year') : t('dates.years')
  const textMonth = dateDiff.months() <= 1 ? t('dates.month') : t('dates.months')

  return `${dateDiff.years()} ${textYear}, ${dateDiff.months()} ${textMonth}`
}

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
      target: '_blank',
      icon: 'bi-github',
      url: 'https://github.com/szram-co',
      title: 'github.com/szram-co'
    },
    linkedin: {
      target: '_blank',
      icon: 'bi-linkedin',
      url: 'https://www.linkedin.com/in/patryk-szram/',
      title: 'linkedin.com/in/patryk-szram'
    },
    pdf: {
      target: '_self',
      icon: 'bi-download',
      url: resumePdf,
      title: 'linkedin.com/in/patryk-szram'
    }
  },
  experience: [
    {
      companyName: 'Raiffeisen Bank International AG',
      companyLogo: logoRaiffeisen,
      companyColor: '#fee600',
      companyLocation: computed(() => `${t('city.inWaw')}, ${t('country.pl')}`),
      companyDate: computed(() => companyTimePeriod(dayjs(), dayjs('2020-05'))),
      positions: [
        {
          positionName: 'Senior Frontend Developer',
          positionDesc: computed(() => t('jobs.raiffeisen.senior')),
          positionDate: {
            end: computed(() => `${t('dates.present')}`),
            start: computed(() => `${t('months.jun').slice(0, 3)} 2021`)
          }
        },
        {
          positionName: 'Frontend Developer',
          positionDesc: computed(() => t('jobs.raiffeisen.mid')),
          positionDate: {
            end: computed(() => `${t('months.jun').slice(0, 3)} 2021`),
            start: computed(() => `${t('months.may').slice(0, 3)} 2020`)
          }
        }
      ]
    },
    {
      companyName: 'STABILIS.IO®',
      companyLogo: logoStabilis,
      companyColor: '#76f2f9',
      companyLocation: computed(() => `${t('city.inWaw')}, ${t('country.pl')}`),
      companyDate: computed(() => companyTimePeriod(dayjs('2020-05'), dayjs('2018-11'))),

      positions: [
        {
          positionName: 'Lead Frontend Developer',
          positionDesc: computed(() => t('jobs.stabilis.lead')),
          positionDate: {
            end: computed(() => `${t('months.may').slice(0, 3)} 2020`),
            start: computed(() => `${t('months.nov').slice(0, 3)} 2018`)
          }
        }
      ]
    },
    {
      companyName: 'Move Closer',
      companyLogo: logoMoveCloser,
      companyColor: '#1a2bd9',
      companyLocation: computed(() => `${t('city.inWaw')}, ${t('country.pl')}`),
      companyDate: computed(() => companyTimePeriod(dayjs('2018-11'), dayjs('2017-03'))),
      positions: [
        {
          positionName: 'Senior Fullstack Developer',
          positionDesc: computed(() => t('jobs.movecloser.fullstack')),
          positionDate: {
            end: computed(() => `${t('months.nov').slice(0, 3)} 2018`),
            start: computed(() => `${t('months.mar').slice(0, 3)} 2017`)
          }
        }
      ]
    }
  ]
})

const formatPhoneNumber = (phoneNumber: string): string => {
  const cleanNumber = phoneNumber.replace(/\D\+/g, '')

  if (cleanNumber.length > 0) {
    const regex = /.{1,3}/g
    const formattedNumber = cleanNumber.match(regex) ?? []
    return formattedNumber.join(' ').trim()
  }

  return phoneNumber
}

onMounted(async () => {
  contactPhone.value = formatPhoneNumber(contactPhone.value)
  recaptchaResponse.value = await execute()
  resumeReady.value = true
})
</script>