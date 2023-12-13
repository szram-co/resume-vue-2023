<template>
  <div v-if="$t" class="resume-container">
    <TopHeader @beforeChange="resumeReady = false" @changed="onThemeChanged" />

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
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </li>
                  </template>
                  <template v-else-if="recaptchaStatus === RECAPTCHA_STATUS.VERIFIED">
                    <li
                      v-motion
                      :delay="200"
                      :enter="{ opacity: 1, y: 0, scale: 1 }"
                      :initial="{ opacity: 0, y: -100, scale: 0.75 }"
                    >
                      <div class="text-verified">
                        <i class="bi bi-check-circle-fill text-success"></i><br />
                        <div class="text-success">Zweryfikowany odbiorca</div>
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
          <div v-if="resumeReady" class="col col-lg-8 col-12 order-lg-1 order-0">
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
                  :style="{ '--dot-primary': company.companyColor }"
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
                        :class="{ 'date-current': position.positionDate?.current }"
                        :enter="{ x: 0, opacity: position.positionDate?.current ? 1 : 0.75 }"
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
import dayjs, { Dayjs } from 'dayjs'
import duration from 'dayjs/plugin/duration'
import logoRaiffeisen from '@/assets/logo-raiffeisen.png'
import logoStabilis from '@/assets/logo-stabilis.png'
import logoMoveCloser from '@/assets/logo-movecloser.png'

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
      companyLocation: computed(() => `${t('city.inWaw')}, ${t('country.pl')}`),
      companyDate: computed(() => companyTimePeriod(dayjs(), dayjs('2020-05'))),
      positions: [
        {
          positionName: 'Senior Frontend Developer',
          positionDesc: computed(() => t('jobs.raiffeisen.senior')),
          positionDate: {
            current: true, // TODO: pls change that
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

const getRandColor = (brightness: number) => {
  // Six levels of brightness from 0 to 5, 0 being the darkest
  const rgbColor = [Math.random() * 256, Math.random() * 256, Math.random() * 256]
  const mixColor = [brightness * 51, brightness * 51, brightness * 51] //51 => 255/5
  const rgbMixed = [
    rgbColor[0] + mixColor[0],
    rgbColor[1] + mixColor[1],
    rgbColor[2] + mixColor[2]
  ].map(function (x) {
    return Math.round(x / 2.0)
  })

  return 'rgb(' + rgbMixed.join(',') + ')'
}

const languageToggled = ref(false)

const onThemeChanged = () => {
  if (languageToggled.value) {
    document.documentElement.style.removeProperty('--brand-primary')
  } else {
    document.documentElement.style.setProperty('--brand-primary', getRandColor(3))
  }

  languageToggled.value = !languageToggled.value
  resumeReady.value = true
}

onMounted(async () => {
  contactPhone.value = formatPhoneNumber(contactPhone.value)
  await nextTick(() => {
    resumeReady.value = true
  })
  recaptchaResponse.value = await execute()
  recaptchaStatus.value = RECAPTCHA_STATUS.VERIFIED

  setTimeout(async () => {
    recaptchaStatus.value = RECAPTCHA_STATUS.DONE
  }, 2000)
})
</script>