var start = Vue.component('start', {
    props: ['template'],
    template:
        `
    <div class='start'>
        <button type='button' class='start-btn' @click="changePage('choose')">Создать открытку</button>
        <p class='form-text start-form-text'>Переверни экран горизонтально, так будет удобнее!</p>
    </div>
    `,

    methods: {
        changePage: function (data) {
            this.$emit('page-number', data);
            console.log(this.$props.template);
        }
    }
})