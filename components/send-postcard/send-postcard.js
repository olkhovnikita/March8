var sendPostcard = Vue.component('send-postcard', {
    props:['template'],
    template:
    `
    <form class='add-info' @submit='onSubmit' action=''>
        <p class='choose-text'>Отправь открытку</p>
        <div class='post-form form'>
            <img src='img/mail.png'>
            <div class='send-post'>
                <p class='form-text'>Кому</p>
                <input name='email' type='email' class='address post-address' placeholder='E-mail' required></input>
                <p class='form-text'>От кого</p>
                <input name='fio' type='text' class='address post-address' placeholder='ФИО' required></input>
            </div>
        </div>
        <div class='info-btns'>
            <button type='button' class='next-btn' @click="changePage('postcard-ready')">Назад</button>
            <button type='submit' class='next-btn'>Отправить</button>
        </div>
    </form>
    `,

    methods: {
        changePage: function (data) {
            this.$emit('page-number', data);
        },
    }
})