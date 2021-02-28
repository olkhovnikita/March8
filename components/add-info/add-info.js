var addInfo = Vue.component('add-info', {
    props: ['template', 'sloganId', 'name', 'customSlogan', 'set-slogan-id'],
    template:
        `
    <div class='add-info'>
        <p class='choose-text'>Добавь имя и поздравление</p>
        <div class='form'>
            <p class='form-text' >Имя</p>
            <input type='text' placeholder='Введите имя адресата' id='name'>
        </div>
        <div class='grats-options'>
            <div class='ready-options'>
                <p class='form-text'>Выбери поздравление</p>
                <select @change='setSlogan' class='options' id='sloganSelect'>
                    <option value='0'>Нет</option>
                    <option value='1'>Свой вариант</option>
                </select>
            </div
            <div><p class='or-text'>ИЛИ</p>
                <div class='custom-options' >
                <p class='form-text'>Свой вариант поздравления</p>
                <textarea id='customSlogan' max-length='130' class='options' placeholder='Не более 130 символов' :disabled = "sloganId != 0" ></textarea>
                </div>
            </div>
            <div class='info-btns'>
                <button type='button' class='next-btn' @click="changePage('choose')">Назад</button>
                <button type='button' class='next-btn' @click="getInfo('make-a-pic')">Далее</button>
            </div>
        </div>
    </div>
    `,
    methods: {

        changePage: function (data) {
            this.$emit('page-number', data);
        },
        setSlogan: function (event) {
            this.$emit('set-slogan-id', event.target.value);
            console.log(event.target.value, this.$props.sloganId);
        },
        getInfo: function(data) {
            var name = document.getElementById('name');
            var customSlogan = document.getElementById('customSlogan');
            
            this.$emit('name', name);
            this.$emit('custom-slogan', customSlogan);
            
            console.log(name.value);
            console.log(customSlogan.value);


            this.$emit('page-number', data);



        }
    },


})