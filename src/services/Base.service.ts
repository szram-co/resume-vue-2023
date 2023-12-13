export class BaseService<StateType = any> {
  static key: string
  state: StateType = {} as StateType

  constructor() {
    BaseService.key = this.constructor.name
    this.setServiceState({})
  }

  static getServiceKey() {
    return BaseService.key
  }

  setServiceState(state: Partial<StateType>) {
    this.state = { ...this.state, ...state } as StateType
  }
}
