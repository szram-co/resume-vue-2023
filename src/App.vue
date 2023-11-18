<template>
  <div class="resume-container py-5">
    <header class="header-top"></header>
    <div class="container">
      <section class="resume-profile">
        <div class="row align-items-center g-5">
          <div class="col col-4">
            <div class="resume-picture">
              <img alt="" class="img-fluid d-block" src="patryk-szram-ai.png" />
            </div>
            <ul class="resume-contact">
              <li>
                <a :href="`mailto:${resume.contactEmail}`">{{ resume.contactEmail }}</a>
              </li>
              <li>
                <a :href="`tel:${resume.contactPhone}`">{{ resume.contactPhone }}</a>
              </li>
              <li>
                {{ resume.currentLocation }}
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
      </section>
    </div>

    <div class="container">
      <section class="resume-career">
        <div class="row g-5">
          <div class="col col-4 text-end">
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
          <div class="col col-8">
            <h2 class="resume-soft">Doświadczenie</h2>
            <div class="resume-timeline">
              <template v-for="c in 3" :key="c">
                <div class="resume-timeline__logo ratio ratio-1x1">
                  <img alt="" src="logo-raiffeisen.png" />
                </div>
                <div class="resume-timeline__point">
                  <div class="resume-timeline__dot"></div>
                  <div class="resume-timeline__dot__glow"></div>
                </div>
                <h3 class="resume-timeline__name">
                  Raiffeisen Bank International AG w Warszawie, Polska

                  <em class="resume-timeline__period"> 3 lat, 7 mies. </em>
                </h3>
                <template v-for="p in 3" :key="p">
                  <div class="resume-timeline__date">
                    <strong>LIS 2023</strong>
                    <em>CZE 2021</em>
                  </div>
                  <div class="resume-timeline__point" style="--dot-size: 0.75rem">
                    <div class="resume-timeline__dot"></div>
                  </div>
                  <div class="resume-timeline__details">
                    <h3>Senior Frontend Developer</h3>
                    <p>
                      Do moich kluczowych obowiązków należało utrzymanie i rozwój wewnętrznej
                      aplikacji internetowej CRM przeznaczonej dla wewnętrznych pracowników banku do
                      obsługi klientów z całej europy. Zapewnienie najwyższej jakości kodu
                      aplikacji, projektowanie i implementacja rozwiązań we współpracy z UX
                      designerem. Bezustanna dbałość o pokrycie testami jednostkowymi na poziomie
                      minimum 80% całego kodu źródłowego aplikacji.
                    </p>
                  </div>
                </template>
              </template>
            </div>
          </div>
        </div>
      </section>
    </div>
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

<style lang="scss">
//@import 'variables';
</style>