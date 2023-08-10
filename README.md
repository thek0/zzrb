# MEMENTO SvelteKit Electron TypeScript
Template to create a desktop app with SvelteKit, Electron and TypeScript (with electron-updater, electron-reload and electron-builder)

## Get Started

This is a project template for [Svelte](https://svelte.dev) and [Electron](https://www.electronjs.org/) apps. It lives at https://github.com/el3um4s/memento-sveltekit-electron-typescript.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit el3um4s/memento-sveltekit-electron-typescript
```

Then install the dependencies with

```bash
npm install
cd svelte
npm install
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

## Command

For development purpose:

- `npm run nodemon`: auto restart Electron on change
- `npm run svelte:build`: build Svelte code (and copy in `dist/www`

You can configure settings in `index.ts`. Change `developerOptions`:

- `isInProduction`: true if is in production
- `serveSvelteDev`: true when you want to watch svelte
- `buildSvelteDiv`: true when you want to build svelte
- `watchSvelteBuild`: true when you want to watch build svelte

For publish purpose:

- `npm run out:win`: create an exe file for Windows
- `npm run publish:win`: publish the app on GitHub

## Notes

I'm blogging about the development process in these posts:

- [Svelte, Electron & TypeScript](https://www.patreon.com/posts/svelte-electron-52952074)
- [Electron and TypeScript: how to use ipcMain and ipcRenderer](https://www.patreon.com/posts/electron-and-how-53505039)
- [SvelteKit & Electron](https://www.patreon.com/posts/sveltekit-53840008)