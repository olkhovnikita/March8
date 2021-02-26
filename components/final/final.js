var final = Vue.component('final', {
    props: ['template'],
    template:
        `
    <div class='start'>
        <button type='button' class='start-btn' @click="changePage('choose')">Создать еще одну открытку</button>
    </div>
    `,

    methods: {
        changePage: function (data) {
            this.$emit('page-number', data);
        },
    }
})