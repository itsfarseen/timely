import styles from './styles.css'
import Vue from 'vue';
import App from './App.vue'

let vm = new Vue({
    el: "#app",
    components: {App},
    data: {
        a: 1 
    },
    created: function() {
        // `this` points to the vm instance
        console.log(process.versions);
    }
});

