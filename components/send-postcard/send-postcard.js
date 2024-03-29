var sending = false;

var sendPostcard = Vue.component('send-postcard', {
    props: ['template'],
    template:
        `
    <form class='add-info' @submit='onSubmit' action=''>
        <p class='choose-text'>Отправь открытку</p>
        <div class='post-form form'>
            <img src='img/mail.png'>
            <div class='send-post'>
                <p class='form-text'>Кому</p>
                <input id="email" name='email' type='email' class='address post-address' placeholder='E-mail' required></input>
                <p class='form-text'>От кого</p>
                <input id="sender" name='fio' type='text' class='address post-address' placeholder='ФИО' required></input>
            </div>
        </div>
        <div class='info-btns'>
            <button type='button' class='next-btn' @click="changePage('postcard-ready')">Назад</button>
            <button type='button' class='next-btn' @click="onSubmit" >Отправить</button>
        </div>
    </form>
    `,

    methods: {
        changePage: function (data) {
            this.$emit('page-number', data);
        },
        onSubmit: function () {
            var mail = document.getElementById("email");
            var sender = document.getElementById("sender");
            var sendingImage = finalImg.split(';base64,').pop().trim();
            //let base64Image = sendingImage.split(';base64,').pop();
            const formData = new FormData();
            formData.append("name", sender.value);
            formData.append("mail", mail.value);
            formData.append("image", sendingImage);

            if(sending == false){
                sending = true;
                axios.post("https://8march-rt.com:9001/upload-image-smtp", formData).then(res => {
                    console.log(res);
                    console.log(res.data);
                    this.changePage('final')
                });
            }
            
        }
    }
})