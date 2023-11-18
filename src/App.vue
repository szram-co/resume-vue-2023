<template>
  <div class="resume-container py-5">
    <header class="header-top"></header>

    <section class="resume-profile">
      <div class="container">
        <div class="row">
          <div class="col col-4">
            <div class="resume-picture">
              <img alt="" class="img-fluid" src="patryk-szram-ai.png" />
            </div>
            <ul class="resume-contact">
              <li>
                <a :href="`mailto:${resume.contactEmail}`">{{ resume.contactEmail }}</a>
              </li>
              <li>
                <a :href="`tel:${resume.contactPhone}`">{{ resume.contactPhone }}</a>
              </li>
            </ul>
          </div>
          <div class="col col-8">
            <h5
              class="resume-boxed border border-4 px-5 py-2 d-inline-block border-dark fw-bold m-0"
            >
              {{ resume.jobTitle }}
            </h5>
            <h1 class="resume-hello fw-bold my-5">
              {{ resume.welcome }}<br />{{ resume.fullName }}.
            </h1>
            <div class="resume-description fs-5 fw-medium">
              <p class="mb-5">
                Mam ponad dekadę doświadczenia w obszarze web developmentu. Koncentruję się na
                projektowaniu i rozwijaniu responsywnych aplikacji internetowych, dostosowywanych do
                potrzeb biznesowych klienta. Zajmuję się architekturą środowisk aplikacji,
                opracowywaniem struktury aplikacji, wyborem optymalnych technologii oraz
                rozwiązaniami pozwalającymi zadbać o produktywność rozwoju i wydajność aplikacji.
                Projektuję strategie usprawniające procesy związane z wdrażaniem i rozwojem
                aplikacji. Dodatkowo, posiadam umiejętności w zakresie projektowania grafiki
                przeznaczonej do publikacji oraz web designu opartego na znajomości najnowszych
                trendów UX/UI.
              </p>
              <p class="mb-5">
                Jako Fullstack Web Developer ze znajomością JS/TS, SASS/LESS, PHP/SQL posiadam
                wszechstronne doświadczenie w sektorze web developmentu i e-commerce. Jestem
                zaangażowanym, szybko uczącym się samoukiem. Rozumiem dobre praktyki programowania,
                stawiane przede mną cele biznesowe oraz wymagania projektowe klientów. Zawsze
                pozostaję otwarty na nowe wyzwania. Kocham piłkę nożną i jestem dumnym ojcem dwójki
                wspaniałych dzieci.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="resume-career">
      <div class="container">
        <div class="row">
          <div class="col col--sm">
            <h4 class="resume-header">Umiejętności</h4>
            <ul class="resume-skills">
              <li v-for="(skill, index) in resume.skills.soft" :key="index">{{ skill }}</li>
            </ul>
            <h4 class="resume-header">Technologie</h4>
            <ul class="resume-skills">
              <li v-for="(skill, index) in resume.skills.tech" :key="index">{{ skill }}</li>
            </ul>
            <h4 class="resume-header">Narzędzia</h4>
            <ul class="resume-skills">
              <li v-for="(skill, index) in resume.skills.tool" :key="index">{{ skill }}</li>
            </ul>
          </div>
          <div class="col">
            <h2 class="resume-soft">Doświadczenie</h2>
            <div class="resume-timeline">
              <div class="resume-timeline__company">
                <div class="resume-company__logo"></div>
                <h5 class="resume-company">Raiffeisen Bank International AG w Warszawie, Polska</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const resume = reactive({
  welcome: 'Cześć, jestem',
  fullName: 'Patryk Szram',
  jobTitle: 'Fullstack Web Developer',
  contactEmail: 'patryk@szram.co',
  contactPhone: '+48795884999',
  currentLocation: 'Grudziądz, Poland',
  skills: {
    soft: [
      'Zrozumienie celów biznesowych',
      'Adaptacja do nowych technologii',
      'Planowanie skalowalnej architektury',
      'Dbałość o jakość i testowanie aplikacji',
      'Empatia w relacjach zespołowych',
      'Proaktywne poszukiwanie efektywności',
      'Samodzielność i inicjatywa',
      'Kreatywność w rozwiązywaniu wyzwań',
      'Zdolność do szybkiego uczenia się',
      'Projektowanie interfejsów UX/UI'
    ],
    tech: [
      'JavaScript/TypeScript',
      'Angular/Vue',
      'PHP/SQL',
      'SASS/LESS',
      'Material UI/Bootstrap',
      'PWA/SPA',
      'LINUX/OS X',
      'GIT'
    ],
    tool: ['Photoshop/Illustrator', 'Webpack/Babel', 'CI/CD', 'NODE/NPM']
  }
})
</script>

<style lang="scss" scoped>
@import 'variables';
</style>