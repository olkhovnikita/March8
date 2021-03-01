var postcardReady = Vue.component('postcard-ready', {
    template:
        `
    <div class='add-info'>
        <p class='choose-text'>Твоя открытка готова</p>
        <img id="img" class='square'>
        <p class='form-text pic-form-text'>Ты можешь скачать открытку и отправить её коллеге</p>
        <div class='info-btns add-info-btns'>
            <button type='button' class='next-btn' @click="changePage('add-effect')">Назад</button>
            <a href='#' id="download" class='next-btn load'>Скачать</a>
            <button type='button' class='next-btn' @click="changePage('send-postcard')">Далее</button>
    </div>
    </div>
    `,
    mounted(){
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