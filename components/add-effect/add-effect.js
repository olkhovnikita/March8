var addEffect = Vue.component('add-effect', {
    props: ['template'],
    template:
        `
    <div class='add-info'>
        <p class='choose-text'>Добавь немного праздника</p>
        <div class='square'></div>
        <p class='form-text pic-form-text'>Выбери стикер или эффект в меню справа</p>
        <div class='info-btns'>
        <button type='button' class='next-btn' @click="changePage('make-a-pic')">Назад</button>
        <button type='button' class='next-btn' @click="changePage('postcard-ready')">Далее</button>
    </div>
    </div>
    `,

    methods: {
        changePage: function (data) {
            this.$emit('page-number', data);
        },
    }
})