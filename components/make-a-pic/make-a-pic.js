var makeAPic = Vue.component('make-a-pic', {
    props: ['template', 'customImg', 'name'],
    template:
        `
    <div class='add-info'>
        <p class='choose-text'>Создай авторский рисунок</p>
        <div class='preview'>
            <img :src='customImg' width='90%' class='square' @click="changePage('my-canvas')">
            <img src='img/pen.png' alt='pen' class='pen' @click="changePage('my-canvas')">
        </div>
        <p class='form-text another-pic-form-text'>Нажми на белое поле и создай рисунок в появившемся окне, далее нажми на галочку</p>
        <div class='info-btns add-info-btns'>
            <button type='button' class='next-btn' @click="changePage('add-info')">Назад</button>
            <button type='button' class='next-btn' @click="skip('add-effect')">Пропустить</button>
            <button type='button' class='next-btn' @click="changePage('add-effect')">Далее</button>
        </div>
    </div>
    `,

    methods: {
        changePage: function (data) {
            this.$emit('page-number', data);
        },
        skip: function (data) {
            this.$emit('custom-img', 'img/white_square.png'),
                this.$emit('page-number', data);
        }

    }
})