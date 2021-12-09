import { Injectable } from '@angular/core';
import { AppGlobalSettingsService } from './app-global-settings.service';
@Injectable({
    providedIn: 'root'
})
export class AppStorageService {
    private static Version = '1.1'

    private localStorage = localStorage
    private readonly storagePrefix: string

    constructor() {
        this.storagePrefix = 'pocket-pod-store-'
        this.__updateStorage()
    }

    private __updateStorage() {
        const version = this.getVersion()
        if (!version) {
            const oldStoragePrefix = this.storagePrefix.substr(0, this.storagePrefix.length - 1)
            const removeKeys = []
            for (let i = 0; i < this.localStorage.length; i++) {
                const key = this.localStorage.key(i)
                if (key.startsWith(oldStoragePrefix) && !key.startsWith(this.storagePrefix)) {
                    const value = this.localStorage.getItem(key)
                    const newKey = this.storagePrefix + key.substr(oldStoragePrefix.length)
                    this.localStorage.setItem(newKey, value)
                    removeKeys.push(key)
                }
            }
            for (let i = 0; i < removeKeys.length; i++) {
                this.localStorage.removeItem(removeKeys[i])
            }
        } else if (version === '1.0') {
            const newOrderKey = 'controlsOrder'
            const oldOrderKey = 'dragOrder'
            const controlsOrder = this.getStringArray(oldOrderKey, []) || this.getStringArray(newOrderKey, [])
            this.removeItem(oldOrderKey)
            this.removeItem(newOrderKey)
            if (controlsOrder.length) {
                const missingItem = 'Program Center'
                if (-1 === controlsOrder.indexOf(missingItem)) {
                    controlsOrder.push(missingItem)
                }
                if (controlsOrder.length !== AppGlobalSettingsService.DEFAULT_CONTROLS_ORDER.length) {
                    this.setStringArray(newOrderKey, AppGlobalSettingsService.DEFAULT_CONTROLS_ORDER)
                } else {
                    this.setStringArray(newOrderKey, controlsOrder)
                }
            }
        }
        this.setVersion(AppStorageService.Version)
    }

    clear() {
        this.localStorage.clear()
    }

    getVersion() {
        return this.getString('version')
    }

    private setVersion(value: string) {
        this.setString('version', value)
    }

    private getItem<T>(key: string): T {
        const val = this.localStorage.getItem(`${this.storagePrefix}${key}`)
        if (null === val)
            return val as unknown as T
        return JSON.parse(val) as T
    }

    private setItem(key: string, value: any): void {
        this.localStorage.setItem(`${this.storagePrefix}${key}`, JSON.stringify(value))
    }

    private removeItem(key: string): void {
        this.localStorage.removeItem(`${this.storagePrefix}${key}`)
    }

    getString(key: string, defaultValue?: string) {
        const val = this.getItem<string>(key)
        if (null === val) {
            return defaultValue
        }
        return val
    }

    setString(key: string, value: string) {
        this.setItem(key, value)
    }

    getBool(key: string, defaultValue?: boolean) {
        const val = this.getItem<boolean>(key)
        if (null === val) {
            return defaultValue
        }
        return val
    }

    setBool(key: string, value: boolean) {
        this.setItem(key, value)
    }

    getNum(key: string, defaultValue?: number) {
        const val = this.getItem<number>(key)
        if (null === val) {
            return defaultValue
        }
        return val
    }

    setNum(key: string, value: number) {
        this.setItem(key, value)
    }

    getStringArray(key: string, defaultValue?: string[]) {
        const val = this.getItem<string[]>(key)
        if (null === val) {
            return defaultValue
        }
        return val
    }

    setStringArray(key: string, value: string[]) {
        this.setItem(key, value)
    }

    // loadOrder(): string[] {
    //     return this.getItem<string[]>('control-order')
    // }

    // storeOrder(order: string[]): void {
    //     this.setItem('control-order', order)
    // }

    // clearOrder(): void {
    //     this.removeItem('control-order')
    // }

    // loadOrderOriginal(): string[] {
    //     return this.getItem<string[]>('control-order-original')
    // }

    // storeOrderOriginal(order: string[]): void {
    //     return this.setItem('control-order-original', order)
    // }

    // clearOrderOriginal(): void {
    //     this.removeItem('control-order-original')
    // }

    // appsOrder(apps: IApplicationDef[]): IApplicationDef[] {
    //     const order = this.loadOrder()
    //     if ((order || []).length) {
    //         this.orderBy(apps, order)
    //     }
    //     return apps
    // }

    // appsStoreOrder(apps: IApplicationDef[]) {
    //     const order = this.createOrder(apps)
    //     this.storeOrder(order)
    // }

    // createOrder(apps: IApplicationDef[]): string[] {
    //     const order = []
    //     apps.forEach((item, ix, all) => {
    //         order.push(this.createSortId(item.id))
    //     })
    //     return order
    // }


    // private createSortId(key: string): string {
    //     return this.hashCode(key) + ''
    // }

    // /**
    //  * @param apps
    //  * @param order
    //  */
    // orderBy(apps: IApplicationDef[], order: string[] = []): IApplicationDef[] {
    //     const keys = {}
    //     const getkey = (id: string) => {
    //         const _key = this.createSortId(id)
    //         return keys[id] = _key
    //     }
    //     const result = apps.sort((a1, a2) => {
    //         const key1 = keys[a1.id] || getkey(a1.id)
    //         const key2 = keys[a2.id] || getkey(a2.id)
    //         return order.indexOf(key1) - order.indexOf(key2)
    //     })
    //     return result
    // }

    // orderBySync(apps: IApplicationDef[], order: string[] = []): IApplicationDef[] {
    //     const mapIdToApp = {}
    //     const appsNotOccurringInOrderArray = []
    //     for (let i = 0; i < apps.length; i++) {
    //         mapIdToApp[this.createSortId(apps[i].id)] = apps[i]
    //         if (-1 === order.indexOf(this.createSortId(apps[i].id))) {
    //             appsNotOccurringInOrderArray.push(apps[i])
    //         }
    //     }

    //     let orderedApps = []
    //     for (let i = 0; i < order.length; i++) {
    //         const id = order[i]
    //         const app = mapIdToApp[id]
    //         if (app) {
    //             orderedApps.push(app)
    //         }
    //     }
    //     orderedApps = orderedApps.concat(appsNotOccurringInOrderArray)
    //     for (let i = 0; i < orderedApps.length; i++) {
    //         apps[i] = orderedApps[i]
    //     }
    //     return apps
    // }

    // appsOrderOriginal(apps: IApplicationDef[]): IApplicationDef[] {
    //     return this.orderBy(apps, this.loadOrderOriginal())
    // }

    // appsStoreOrderOriginal(apps: IApplicationDef[]) {
    //     const order = this.createOrder(apps)
    //     this.storeOrderOriginal(order)
    // }

    hashCode(s) {
        let h = 0
        const l = s.length
        let i = 0
        if (l > 0) {
            while (i < l) {
                h = (h << 5) - h + s.charCodeAt(i++) | 0
            }
        }
        return h
    }
}
