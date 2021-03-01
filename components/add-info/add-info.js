var addInfo = Vue.component('add-info', {
    props: ['template', 'sloganId', 'name', 'customSlogan'],
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
                <select class='options' id='sloganSelect' @change="disableDropDown">
                    <option selected value='0'>Нет</option>
                    <option value='1'>Свой вариант</option>
                </select>
            </div
            <div><p class='or-text'>ИЛИ</p>
                <div class='custom-options' >
                <p class='form-text'>Свой вариант поздравления</p>
                <textarea id='customSlogan' maxlength='130' class='options' placeholder='Не более 130 символов'></textarea>
                </div>
            </div>
            <div class='info-btns'>
                <button type='button' class='next-btn' @click="changePage('choose')">Назад</button>
                <button type='button' class='next-btn' @click="setInfo('make-a-pic')">Далее</button>
            </div>
        </div>
    </div>
    `,
    methods: {

        changePage: function (data) {
            this.$emit('page-number', data);
        },
        setInfo: function (data) {
            var name = document.getElementById('name');
            var textArea = document.getElementById('customSlogan');
            var dropDown = document.getElementById('sloganSelect');
            var customSlogan = '';
            if (dropDown.value == '0') {
                customSlogan = textArea.value;
            } else {
                customSlogan = dropDown.options[dropDown.selectedIndex].innerText;
            }
            this.$emit('name', name.value);
            this.$emit('slogan', customSlogan);
            this.$emit('page-number', data);



        },
        disableDropDown: function (event) {
            var textArea = document.getElementById('customSlogan');
            if (event.target.value == '0') {
                textArea.removeAttribute('disabled');
            } else {
                textArea.setAttribute('disabled', 'true');
            }
        }
    },


})