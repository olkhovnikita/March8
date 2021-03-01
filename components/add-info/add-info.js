var addInfo = Vue.component('add-info', {
    props: ['template', 'sloganId', 'name', 'customSlogan'],
    template:
        `
    <div class='add-info'>
        <p class='choose-text'>Добавь имя и поздравление</p>
        <div class='form'>
            <p class='form-text' >Имя</p>
            <input type='text' placeholder='Введите имя адресата' id='name' @change="nameToSend">
        </div>
        <div class='grats-options'>
            <div class='ready-options'>
                <p class='form-text'>Выбери поздравление</p>
                <select class='options' id='sloganSelect' @change="disableDropDown">
                    <option selected value='0'>Нет</option>
                    <option value='1'>Поздравляю с праздником весны! Пусть цифровой мир дарит бесконечные возможности и успех.</option>
                    <option value='2'>Поздравляю с 8 Марта! Пусть технологии приносят счастье, развитие – успех, мир дарит человечность, и мечты сбываются просто.</option>
                    <option value='3'>Поздравляю с 8 Марта! Желаю счастливых событий и классного настроения на территории весны.
                    </option>
                    <option value='4'>Поздравляю с Международным женским днём! Пусть новые возможности открываются, как бутоны любимых цветов.</option>
                    <option value='5'>Поздравляю с праздников весны! Пусть мир дарит красоту и вдохновение, а близкие люди – любовь и счастье.</option>
                    <option value='6'>Поздравляю с праздником весны! Пусть будет много солнечных дней и приятных сюрпризов.</option>
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
        nameToSend: function (data) {
            var inpField = document.getElementById('name');
            nameToSend = inpField.value;
        },
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