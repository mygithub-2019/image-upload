import Vue from 'vue'
import App from './App.vue'
import UploadImageSection from './components/UploadImage.vue'
import PreviewSection from './components/PreviewImage.vue'

Vue.component('image-upload-section', UploadImageSection)
Vue.component('image-preview-section', PreviewSection)

new Vue({
  el: '#app',
  render: h => h(App)
})
