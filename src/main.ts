import './assets/base.css'

import { createApp } from 'vue'
import RecursiveTable from './components/RecursiveTable.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('RecursiveTable', RecursiveTable)
app.use(router)

app.mount('#app')
