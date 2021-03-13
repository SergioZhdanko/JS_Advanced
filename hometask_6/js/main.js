const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// const API = 'https://raw.QWERTYgithubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'; // Эмуляция ошибки запроса к сервверу
const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
    },
    mounted() {
        console.log(this);
    }
});

