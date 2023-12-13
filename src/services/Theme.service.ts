import { BaseService } from '@/services/Base.service'

enum LocalStoreKey {
  COLOR_MODE = 'szramThemeMode',
  LANGUAGE = 'szramLanguage'
}

export enum ThemeLanguage {
  PL = 'pl',
  EN = 'en',
  ES = 'es',
  GR = 'gr',
  DE = 'de'
}

export type LanguageName = keyof typeof ThemeLanguage

export enum ThemeColorMode {
  dark = 'dark',
  light = 'light'
}

export type ColorModeName = keyof typeof ThemeColorMode

export class ThemeService extends BaseService {
  // readonly localStoreKey = { COLOR_MODE: 'szramThemeMode', LANGUAGE: 'szramLanguage' }
  readonly colorModes = Object.keys(ThemeColorMode) as ColorModeName[]
  readonly languages = Object.keys(ThemeLanguage) as LanguageName[]

  constructor() {
    super()

    this.setServiceState({
      colorMode: this.getColorMode()
    })
  }

  getServiceKey(): string {
    return 'ThemeServiceKey'
  }

  isStoredColorMode() {
    const storedColorMode = this.getStoredColorMode()

    return !(!storedColorMode?.length || !this.colorModes.includes(storedColorMode))
  }

  getStoredColorModeName() {
    return localStorage.getItem(LocalStoreKey.COLOR_MODE) as ColorModeName
  }

  getStoredColorMode() {
    return ThemeColorMode[this.getStoredColorModeName()]
  }

  saveColorMode(colorModeName: ColorModeName) {
    if (!colorModeName?.length || !this.colorModes.includes(colorModeName)) {
      return
    }

    localStorage.setItem(LocalStoreKey.COLOR_MODE, colorModeName)
  }

  prefersDarkColorMode(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  getPreferredColorMode() {
    return this.prefersDarkColorMode() ? ThemeColorMode.dark : ThemeColorMode.light
  }

  getColorMode() {
    if (this.isStoredColorMode()) {
      return this.getStoredColorMode()
    }

    return this.getPreferredColorMode()
  }

  updateColorMode(themeMode: ThemeColorMode) {
    this.saveColorMode(themeMode)

    document.documentElement.setAttribute('data-bs-theme', this.getColorMode().toString())
  }

  setup() {
    return this.updateColorMode(this.getColorMode())
  }

  toggleColorMode() {
    return this.getColorMode() === ThemeColorMode.dark
      ? this.updateColorMode(ThemeColorMode.light)
      : this.updateColorMode(ThemeColorMode.dark)
  }
}
