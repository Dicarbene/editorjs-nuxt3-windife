import { resolve } from "path";
import { fileURLToPath } from "url";
import { defineNuxtModule, addComponentsDir, addComponent, addPlugin, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions { }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt3-editorjs',
    configKey: 'nuxt3EditorJS'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    const components_dir = fileURLToPath(
      new URL("./runtime/components", import.meta.url)
    );
/*     addComponentsDir({
      path: components_dir,
    }); */
    //nuxt.options.css.push(resolve(css_dir, "editor.css"));
    const resolver = createResolver(import.meta.url)
    addComponent({
      name: 'EditorClient', // name of the component to be used in vue templates
      filePath: resolver.resolve('runtime/components/EditorClient.vue')
    })
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  }
})
