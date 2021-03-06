import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router/router'


Vue.use(VueRouter)
Vue.use(VueResource)
// 按需引用element
import { Button, Message, MessageBox, Notification, Popover, Tag, Input } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
const components = [Button, Message, MessageBox, Notification, Popover, Tag, Input]

components.forEach((item) => {
  Vue.component(item.name, item)
})

const MsgBox = MessageBox
Vue.prototype.$msgbox = MsgBox
Vue.prototype.$alert = MsgBox.alert
Vue.prototype.$confirm = MsgBox.confirm
Vue.prototype.$prompt = MsgBox.prompt
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification



new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
