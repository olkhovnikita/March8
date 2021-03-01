var start = Vue.component('start', {
    props: ['template'],
    template:
        `
    <div class='start'>
        <button type='button' class='start-btn' @click="changePage('choose')">Создать открытку</button>
    </div>
    `,

    methods: {
        changePage: function (data) {
            this.$emit('page-number', data);
            console.log(this.$props.template);
        }
    }
})