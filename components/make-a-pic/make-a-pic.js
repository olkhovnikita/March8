var makeAPic = Vue.component('make-a-pic', {
    props:['template'],
    template: 
    `
    <div class='add-info'>
        <p class='choose-text'>Создай авторский рисунок</p>
        <div class='square'></div>
        <p class='form-text pic-form-text'>Нажми на белое поле и создай рисунок в появившемся окне, далее нажми на галочку</p>
        <div class='info-btns add-info-btns'>
            <button type='button' class='next-btn' @click="changePage('add-info')">Назад</button>
            <button type='button' class='next-btn' @click="changePage('add-effect')">Пропустить</button>
            <button type='button' class='next-btn' @click="changePage('add-effect')">Далее</button>
        </div>
    </div>
    `,

    methods: {
        changePage: function (data) {
            this.$emit('page-number', data);
        },
    }
})