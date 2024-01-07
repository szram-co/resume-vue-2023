<template>
  <div v-if="$t" class="resume-container">
    <TopHeader :links="data.social" @beforeChange="resumeReady = false" @changed="onThemeChanged" />

    <section class="resume-profile">
      <div class="container">
        <div class="row">
          <div class="col col-lg-8 offset-lg-4 text-center text-lg-start">
            <h5
              v-motion
              :delay="250"
              :enter="{ opacity: 1, y: 0, scale: 1 }"
              :initial="{ opacity: 0, y: -100, scale: 0.8 }"
              class="resume-boxed d-inline-block mb-5"
            >
              {{ positionTitle }}
            </h5>
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col col-lg-4 pe-lg-5 order-lg-0 order-1">
            <div class="row">
              <div class="col col-12 col-sm-5 col-md-6 col-lg-12">
                <div
                  v-motion
                  :delay="200"
                  :enter="{ opacity: 1, y: 0, scale: 1 }"
                  :initial="{ opacity: 0, y: -100, scale: 0.8 }"
                  class="resume-picture"
                >
                  <img alt="" class="img-fluid d-block" src="./assets/patryk-szram-ai.png" />
                </div>
              </div>
              <div class="col col-12 col-sm-7 col-md-6 col-lg-12">
                <ul class="resume-contact">
                  <template v-if="recaptchaStatus === RECAPTCHA_STATUS.DONE">
                    <li
                      v-motion
                      :delay="200"
                      :enter="{ opacity: 1, x: 0, scale: 1 }"
                      :initial="{ opacity: 0, x: -100, scale: 0.8 }"
                    >
                      <a :href="`mailto:${contactEmail}`" class="link-lg">{{ contactEmail }}</a>
                    </li>
                    <li
                      v-motion
                      :delay="250"
                      :enter="{ opacity: 1, x: 0, scale: 1 }"
                      :initial="{ opacity: 0, x: -100, scale: 0.8 }"
                    >
                      <a :href="`tel:${contactPhone}`" class="link-lg">{{ contactPhone }}</a>
                    </li>
                    <li
                      v-motion
                      :delay="300"
                      :enter="{ opacity: 1, x: 0, scale: 1 }"
                      :initial="{ opacity: 0, x: -100, scale: 0.8 }"
                      class="pt-4"
                    >
                      <a :href="`tel:${currentLocation}`">{{ currentLocation }}</a>
                    </li>
                  </template>
                  <template v-else-if="recaptchaStatus === RECAPTCHA_STATUS.PENDING">
                    <li>
                      <div class="text-verified">
                        <h5 class="d-flex align-items-center justify-content-center gap-2">
                          <span class="d-inline-block">Captcha</span>
                          <span class="d-inline-block text-muted" style="width: 24px; height: 24px">
                            <span
                              class="spinner-border"
                              style="--bs-spinner-width: 24px; --bs-spinner-height: 24px"
                            ></span>
                          </span>
                          <span class="d-inline-block">Checking</span>
                        </h5>
                        <div
                          v-motion
                          :delay="200"
                          :enter="{ opacity: 1, y: 0 }"
                          :initial="{ opacity: 0, y: 100 }"
                          class="text-muted"
                        >
                          {{ $t('protecting') }}
                        </div>
                      </div>
                    </li>
                  </template>
                  <template v-else-if="recaptchaStatus === RECAPTCHA_STATUS.VERIFIED">
                    <li>
                      <div class="text-verified">
                        <h5 class="d-flex align-items-center justify-content-center gap-2">
                          <span class="d-inline-block">Captcha</span>
                          <span
                            class="d-inline-block text-success"
                            style="width: 24px; height: 24px"
                            ><i
                              v-motion
                              :delay="100"
                              :enter="{ opacity: 1, y: 0 }"
                              :initial="{ opacity: 0, y: -100 }"
                              class="bi bi-shield-fill-check"
                            ></i
                          ></span>
                          <span class="d-inline-block text-success">Protected</span>
                        </h5>
                        <div
                          v-motion
                          :delay="100"
                          :enter="{ opacity: 1, y: 0 }"
                          :initial="{ opacity: 0, y: 100 }"
                          class="text-success-emphasis"
                        >
                          {{ $t('protected') }}
                        </div>
                      </div>
                    </li>
                  </template>
                </ul>

                <div v-if="recaptchaStatus === RECAPTCHA_STATUS.DONE" class="resume-social">
                  <a
                    v-for="(link, key, n) in data.social"
                    :key="key"
                    v-motion
                    :delay="350 + 50 * n"
                    :enter="{ opacity: 1, y: 0, scale: 1, rotate: 0 }"
                    :hovered="{ scale: 1.2, rotate: 5 }"
                    :href="link.url"
                    :initial="{ opacity: 0, y: 100, rotate: -90 }"
                    :style="link.style"
                    :target="link.target"
                    :title="link.title"
                  >
                    <span :class="`bi ${link.icon} fs-2`"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div v-if="resumeReady" class="col col-lg-8 col-12 order-lg-1 order-0 d-print-table-cell">
            <h1
              v-motion
              :delay="100"
              :enter="{ opacity: 1, x: 0 }"
              :initial="{ opacity: 0, x: 100 }"
              class="resume-hello mb-5"
            >
              {{ $t('welcome') }}
              <br />
              {{ $t('fullName') }}
            </h1>
            <div class="resume-description">
              <p
                v-for="(paragraph, index) in $tm('bio')"
                :key="index"
                v-motion
                :delay="150 + 50 * index"
                :enter="{ opacity: 1, x: 0 }"
                :initial="{ opacity: 0, x: 100 }"
                class="mb-5"
              >
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <div
        v-motion
        :enter="{ opacity: 1, y: 0 }"
        :initial="{ opacity: 0, y: -100 }"
        class="resume-line-x"
      ></div>
    </div>

    <section v-if="resumeReady" class="resume-experience">
      <div class="container">
        <div class="row align-items-start">
          <div class="col col-lg-4 col-12 pe-lg-5 text-lg-end text-center order-lg-0 order-1">
            <SkillsList :skills="data.skillsKeys" :title="$t('header.skills')" />
            <SkillsList :skills="data.technologyKeys" :title="$t('header.technologies')" />
            <SkillsList :skills="data.toolsKeys" :title="$t('header.tools')" />
          </div>
          <div class="col col-lg-8 col-12 order-lg-1 order-0">
            <h2
              v-motion
              :enter="{ x: 0, opacity: 1 }"
              :initial="{ x: 50, opacity: 0 }"
              class="resume-soft"
            >
              {{ $t('header.experience') }}
            </h2>

            <div class="resume-timeline">
              <template v-for="(company, c) in data.experience">
                <div
                  :style="{
                    '--dot-primary': company.companyColor,
                    '--company-color': company.companyColorText
                  }"
                  class="resume-timeline__company"
                >
                  <div class="resume-timeline__logo">
                    <img :src="company.companyLogo" alt="" />
                  </div>
                  <div
                    :class="{ 'resume-timeline__dot--first': c === 0 }"
                    class="resume-timeline__dot"
                  >
                    <i></i>
                  </div>
                  <div class="resume-timeline__name">
                    <span
                      v-motion
                      :delay="150 + 200 * c"
                      :enter="{ x: 0, opacity: 1 }"
                      :initial="{ x: 100, opacity: 0 }"
                    >
                      {{ company.companyName }} {{ company.companyLocation }}
                    </span>
                    <em
                      v-motion
                      :delay="250 + 200 * c"
                      :enter="{ x: 0, opacity: 0.75 }"
                      :initial="{ x: 100, opacity: 0 }"
                    >
                      {{ company.companyDate }}
                    </em>
                  </div>

                  <template v-for="(position, p) in company.positions">
                    <div class="resume-timeline__date">
                      <div
                        v-motion
                        :delay="350 + 100 * c + 200 * p"
                        :class="{ 'date-current': !!position.positionDate.current }"
                        :enter="{ x: 0, opacity: position.positionDate.current ? 1 : 0.75 }"
                        class="date-end"
                        :initial="{ x: -50, opacity: 0 }"
                      >
                        {{ position.positionDate.end }}
                      </div>
                      <div
                        v-motion
                        :delay="400 + 100 * c + 200 * p"
                        :enter="{ x: 0, opacity: 0.75 }"
                        :initial="{ x: -50, opacity: 0 }"
                        class="date-start"
                      >
                        {{ position.positionDate.start }}
                      </div>
                    </div>
                    <div
                      :style="{
                        '--dot-secondary':
                          p === company.positions?.length - 1 &&
                          !!data.experience?.[c + 1]?.companyColor
                            ? data.experience[c + 1].companyColor
                            : company.companyColor
                      }"
                      class="resume-timeline__dot"
                    >
                      <i></i>
                    </div>
                    <div class="resume-timeline__position">
                      <h4
                        v-motion
                        :delay="450 + 200 * c + 200 * p"
                        :enter="{ x: 0, opacity: 1 }"
                        :initial="{ x: 100, opacity: 0 }"
                      >
                        {{ position.positionName }}
                      </h4>
                      <p
                        v-motion
                        :delay="550 + 200 * c + 200 * p"
                        :enter="{ x: 0, opacity: 1 }"
                        :initial="{ x: 100, opacity: 0 }"
                      >
                        {{ position.positionDesc }}
                      </p>
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
</template>

<script lang="ts" setup>
import { useChallengeV3, useRecaptchaProvider } from 'vue-recaptcha'
import TopHeader from './components/TopHeader.vue'
import SkillsList from './components/SkillsList.vue'

import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import logoRaiffeisen from '@/assets/logo-raiffeisen.png'
import logoStabilis from '@/assets/logo-stabilis.png'
import logoMoveCloser from '@/assets/logo-movecloser.png'
import logoCodeRabbit from '@/assets/logo-coderabbit.png'
import logoFlashMedia from '@/assets/logo-flash-media.png'

const resumeReady = ref(false)

dayjs.extend(duration)

useRecaptchaProvider()

enum RECAPTCHA_STATUS {
  DONE,
  PENDING,
  VERIFIED
}

const recaptchaResponse = ref()
const recaptchaStatus = ref(RECAPTCHA_STATUS.PENDING)

const { execute } = useChallengeV3('submit')

const positionTitle = 'Fullstack Web Developer'
const contactPhone = ref('+48795884999')
const contactEmail = ref('patryk@szram.co')
const resumePdf = computed(() => `/patryk-szram-resume-en.pdf`)

const { t, locale } = useI18n({ useScope: 'global' })
const currentLocation = `${t('city.gdz')}, ${t('country.pl')}`

function calculatePeriod(start: string, end: string) {
  const startDate = dayjs(start)
  const endDate = dayjs(end)

  if (startDate.isAfter(endDate)) {
    console.error('StartDate should be earlier than EndDate')
    return
  }

  const totalMonths = (endDate.year() - startDate.year()) * 12 + endDate.month() - startDate.month()
  const finalYears = Math.floor(totalMonths / 12)
  const finalMonths = totalMonths % 12

  const finalChunks: string[] = []

  if (finalYears > 0) {
    finalChunks.push(`${finalYears} ${t('dates.year', finalYears)}`)
  }

  if (finalMonths > 0) {
    finalChunks.push(`${finalMonths} ${t('dates.month', finalMonths)}`)
  }

  return finalChunks.join(', ')
}

const data = reactive({
  skillsKeys: [
    'skills.scrum',
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
  toolsKeys: [
    'tools.googleCloud',
    'tools.vercel',
    'tools.photoshopIllustrator',
    'tools.webpackBabel',
    'tools.ciCd',
    'tools.nodeNpm'
  ],
  social: {
    github: {
      target: '_blank',
      icon: 'bi-github',
      style: { '--social-color': '#24292e' },
      url: 'https://github.com/szram-co',
      title: 'github.com/szram-co'
    },
    linkedin: {
      target: '_blank',
      icon: 'bi-linkedin',
      style: { '--social-color': '#0a66c2' },
      url: 'https://www.linkedin.com/in/patryk-szram/',
      title: 'linkedin.com/in/patryk-szram'
    },
    pdf: {
      target: '_self',
      icon: 'bi-download',
      style: { '--social-color': 'var(--brand-secondary)' },
      url: resumePdf,
      title: 'linkedin.com/in/patryk-szram'
    }
  },
  experience: [
    {
      companyName: 'Raiffeisen Bank International AG',
      companyLogo: logoRaiffeisen,
      companyColor: '#fee600',
      companyColorText: '#d4c107',
      companyLocation: computed(() => `${t('city.inWaw')}, ${t('country.pl')}`),
      companyDate: computed(() => calculatePeriod('2020-05', '2023-12')),
      positions: [
        {
          positionName: 'Senior Frontend Developer',
          positionDesc: computed(() => t('jobs.raiffeisen.senior')),
          positionDate: {
            current: true, // TODO: pls change that
            end: computed(() => `${t('months.dec').slice(0, 3)} 2023`),
            start: computed(() => `${t('months.jun').slice(0, 3)} 2021`)
          }
        },
        {
          positionName: 'Frontend Developer',
          positionDesc: computed(() => t('jobs.raiffeisen.mid')),
          positionDate: {
            current: false,
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
      companyColorText: '#5dd4db',
      companyLocation: computed(() => `${t('city.inWaw')}, ${t('country.pl')}`),
      companyDate: computed(() => calculatePeriod('2018-11', '2020-05')),

      positions: [
        {
          positionName: 'Lead Frontend Developer',
          positionDesc: computed(() => t('jobs.stabilis.lead')),
          positionDate: {
            current: false,
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
      companyColorText: '#363e96',
      companyLocation: computed(() => `${t('city.inWaw')}, ${t('country.pl')}`),
      companyDate: computed(() => calculatePeriod('2017-03', '2018-11')),
      positions: [
        {
          positionName: 'Senior Fullstack Developer',
          positionDesc: computed(() => t('jobs.movecloser.fullstack')),
          positionDate: {
            current: false,
            end: computed(() => `${t('months.nov').slice(0, 3)} 2018`),
            start: computed(() => `${t('months.mar').slice(0, 3)} 2017`)
          }
        }
      ]
    },
    {
      companyName: 'Coderabbit',
      companyLogo: logoCodeRabbit,
      companyColor: '#d5dc2b',
      companyColorText: '#5e7555',
      companyLocation: computed(() => `${t('city.inWaw')}, ${t('country.pl')}`),
      companyDate: computed(() => calculatePeriod('2015-11', '2017-03')),
      positions: [
        {
          positionName: `Fullstack Developer`,
          positionDesc: computed(() => t('jobs.coderabbit.fullstack')),
          positionDate: {
            current: false,
            end: computed(() => `${t('months.nov').slice(0, 3)} 2017`),
            start: computed(() => `${t('months.mar').slice(0, 3)} 2015`)
          }
        }
      ]
    },
    {
      companyName: 'Flash-Media',
      companyLogo: logoFlashMedia,
      companyColor: '#ffd200',
      companyColorText: '#222',
      companyLocation: computed(() => `${t('city.inGda')}, ${t('country.pl')}`),
      companyDate: computed(() => calculatePeriod('2011-11', '2015-11')),
      positions: [
        {
          positionName: `Web Developer`,
          positionDesc: computed(() => t('jobs.flash-media.developer')),
          positionDate: {
            current: false,
            end: computed(() => `${t('months.mar').slice(0, 3)} 2015`),
            start: computed(() => `${t('months.nov').slice(0, 3)} 2011`)
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

const sleep = (m: number) => new Promise((r) => setTimeout(r, m))

const languageToggled = ref(false)

const onThemeChanged = () => {
  languageToggled.value = !languageToggled.value
  resumeReady.value = true
}

onMounted(async () => {
  contactPhone.value = formatPhoneNumber(contactPhone.value)
  await nextTick(() => {
    resumeReady.value = true
  })

  recaptchaResponse.value = await execute()

  await sleep(500)
  recaptchaStatus.value = RECAPTCHA_STATUS.VERIFIED

  await sleep(1500)
  recaptchaStatus.value = RECAPTCHA_STATUS.DONE
})
</script>

<style lang="scss">
@media print {
  .grecaptcha-badge {
    visibility: hidden;
  }
}
</style>
