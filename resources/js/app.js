import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import Layout from './Layouts/Layout.vue'; // Ensure this path is correct

// Dynamically import all Vue pages
const pages = import.meta.glob('./Pages/**/*.vue');

createInertiaApp({
  resolve: name => {
    // Construct the path to the page component
    const path = `./Pages/${name}.vue`;

    // Check if the page exists
    if (pages[path]) {
      return pages[path]().then(module => {
        const page = module.default;
        // Assign the Layout to every page if not already assigned
        page.layout = page.layout || Layout;
        return page;
      });
    }

    // If the page doesn't exist, throw an error
    throw new Error(`Page "${name}" not found at path "${path}"`);
  },
  setup({ el, app, props, plugin }) {
    createApp({ render: () => h(app, props) })
      .use(plugin)
      .mount(el);
  },
});
