import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

// VueSocketIO packagae
import VueSocketIO from "vue-socket.io";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:4000" // Local Express Server
  })
);

import JsonViewer from 'vue-json-viewer'

// Import JsonViewer as a Vue.js plugin
Vue.use(JsonViewer)

Vue.config.productionTip = false
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
