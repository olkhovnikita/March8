var postcardReady = Vue.component('postcard-ready', {
    template:
        `
    <div class='add-info'>
        <p class='choose-text'>Твоя открытка готова</p>
        <div class='square'></div>
        <p class='form-text pic-form-text'>Ты можешь скачать открытку и отправить её коллеге</p>
        <div class='info-btns add-info-btns'>
            <button type='button' class='next-btn' @click="changePage('add-effect')">Назад</button>
            <a href='#' class='next-btn load'>Скачать</a>
            <button type='button' class='next-btn' @click="changePage('send-postcard')">Далее</button>
    </div>
    </div>
    `,

    methods: {
        changePage: function (data) {
            this.$emit('page-number', data);
        },
    }
})