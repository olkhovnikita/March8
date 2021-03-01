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
            function base64_to_jpeg($base64_string, $output_file) {
                // open the output file for writing
                $ifp = fopen( $output_file, 'wb' ); 
            
                // split the string on commas
                // $data[ 0 ] == "data:image/png;base64"
                // $data[ 1 ] == <actual base64 string>
                $data = explode( ',', $base64_string );
            
                // we could add validation here with ensuring count( $data ) > 1
                fwrite( $ifp, base64_decode( $data[ 1 ] ) );
            
                // clean up the file resource
                fclose( $ifp ); 
            
                return $output_file; 
            }

            var mail = document.getElementById("email");
            var sender = document.getElementById("sender");
            var sendingImage = finalImg;
            let base64Image = sendingImage.split(';base64,').pop();
            const formData = new FormData();
            formData.append("name", mail.value);
            formData.append("mail", sender.value);
            formData.append("image", base64Image);

            axios.post("https://8march-rt.com:9001/upload-image", formData).then(res => {
                console.log(res);
                console.log(res.data);
                this.changePage('final')
            });
        }
    }
})