import 'normalize.css';
import '@/assets/style';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import VueSanitize from 'vue-sanitize';
import { initialFetch } from '@/lib/fetch';
import 'focus-visible';
import { SET_MOBILE_LAYOUT } from '@/store/types';

Vue.config.productionTip = false;

const query = window.matchMedia('(min-width: 900px)');
const queryHandler = query => store.dispatch(SET_MOBILE_LAYOUT, !query.matches);
queryHandler(query);
query.addListener(queryHandler);

Vue.use(VueSanitize);

Vue.filter('date', date => {
  date = new Date(date);
  return date.toLocaleString('de-DE', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
});

export default new Vue({
  router,
  store,
  beforeCreate: initialFetch,
  render: create => create(App),
}).$mount('#root');

window.addEventListener('beforeinstallprompt', e => e.preventDefault());
