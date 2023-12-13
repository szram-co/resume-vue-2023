interface AbstractClassConstructor<T> {
  new (...args: any[]): T
}

export class FactoryService {
  private static instanceMap: Record<string, AbstractClassConstructor<any>> = {}

  static createService<T extends AbstractClassConstructor<any>>(
    serviceInstance: T
  ): InstanceType<T> {
    const className = (serviceInstance as any).name
    if (!this.instanceMap[className]) {
      const Factory = serviceInstance as AbstractClassConstructor<T>
      this.instanceMap[className] = new Factory()
    }
    return this.instanceMap[className] as InstanceType<T>
  }

  static useService<T extends AbstractClassConstructor<any>>(serviceInstance: T) {
    return this.instanceMap[serviceInstance.name] as InstanceType<T>
  }
}
