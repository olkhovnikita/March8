var postcardReady = Vue.component('postcard-ready', {
    template:
        `
    <div class='add-info'>
        <p class='choose-text'>Твоя открытка готова</p>
        <img id="img" class='square'>
        <p class='form-text pic-form-text'>Ты можешь скачать открытку и отправить её коллеге</p>
        <div class='info-btns add-info-btns'>
            <button type='button' class='next-btn' @click="changePage('add-effect')">Назад</button>
<<<<<<< HEAD
            <a href='#' download class='next-btn load'>Скачать</a>
=======
            <a href='#' id="download" class='next-btn load'>Скачать</a>
>>>>>>> 8dcac6a731eeb9eb9950ab25acfb130c4f34fe58
            <button type='button' class='next-btn' @click="changePage('send-postcard')">Далее</button>
    </div>
    </div>
    `,
    mounted() {
        var img = document.getElementById("img");
        img.src = finalImg;
        var download = document.getElementById("download");
        download.href = img.src;
    },
    methods: {

        changePage: function (data) {
            this.$emit('page-number', data);
        },
    }
})