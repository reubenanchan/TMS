import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router we just created

const app = createApp(App);
app.use(router); // Tell Vue to use the router
app.mount('#app');