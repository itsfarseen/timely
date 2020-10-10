import styles from './styles.css'
import Vue from 'vue';
import App from './App.vue'
import data from './data.js'

data.initialize();

let vm = new Vue({
    el: "#app",
    components: {App},
    data: {
        a: 1 
    },
    render:  h => h('App',''),
});

