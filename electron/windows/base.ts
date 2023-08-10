import { app, BrowserWindow, globalShortcut, screen } from "electron"
import path from "path"
import EventEmitter from "events"
import ConfigureDev from "../configureDev"
import { DeveloperOptions } from "../configureDev"
import serve from "electron-serve"

const appName = "zzrb"

const defaultSettings = {
    title: "zzrb",
    width: 854,
    height: 480,
}

const defaultSettingsDev: DeveloperOptions = {
    isInProduction: true, // true if is in production
    serveSvelteDev: false, // true when you want to watch svelte
    buildSvelteDev: false, // true when you want to build svelte
    watchSvelteBuild: false, // true when you want to watch build svelte
}

class ZWindow {
    window!: BrowserWindow
    settings: { [key: string]: any }
    onEvent: EventEmitter = new EventEmitter()
    settingsDev: DeveloperOptions
    configDev: ConfigureDev

    isMainWindow: boolean = false

    constructor(
        settings: { [key: string]: any } | null = null,
        settingsDev: DeveloperOptions | null = null
    ) {
        this.settings = settings ? { ...settings } : { ...defaultSettings }
        this.settingsDev = settingsDev
            ? { ...settingsDev }
            : { ...defaultSettingsDev }

        this.configDev = new ConfigureDev(this.settingsDev)

        app.on("ready", this.onAppReady)
    }

    async createWindow() {
        let settings = { ...this.settings }
        app.name = appName
        let window = new BrowserWindow({
            ...settings,
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                sandbox: false,
                preload: path.join(__dirname, "preload.js"),
            },
        })

        if (this.configDev.isLocalHost()) {
            try {
                await window.loadURL("http://localhost:5173/")
            } catch (error) {
                console.log(`ERROR: window.loadURL("http://localhost:5173/");`)
                console.log(error)
            }
        } else if (this.configDev.isElectronServe()) {
            try {
                await this.configDev.loadURL(window)
            } catch (error) {
                console.log(`this.configDev.loadURL(window);`)
                console.log(error)
            }
        }

        if (this.isMainWindow) {
            window.show()
        }

        return window
    }

    async onAppReady() {
        this.window = await this.createWindow()
        this.onEvent.emit("window-created")
    }

    onWindowAllClosed() {
        if (process.platform !== "darwin") {
            app.quit()
        }
    }

    onActivate() {
        if (!this.window) {
            this.createWindow()
        }
    }
}

export default ZWindow
