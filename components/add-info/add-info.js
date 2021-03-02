var addInfo = Vue.component('add-info', {
    props: ['template', 'sloganId', 'name', 'customSlogan', 'textareaData'],
    data: function () {
        return {
            showDropdown: false,
            optionValue: '0'
        }
    },
    template:
        `
    <div class='add-info add-info-wrap'>
        <p class='choose-text'>Добавь имя и поздравление</p>
        <div class='form'>
            <p class='form-text' >Имя</p>
            <input id="name" type='text' placeholder='Введите имя адресата' @change="nameToSend">
        </div>
        <div class='grats-options'>
            <div class='ready-options'>
                <p class='form-text'>Выбери поздравление</p>
                <div class='options-block' >
                <button class='select-btn' @click='showDropdown = !showDropdown'>&#8744;</button>
                <div id='sloganSelect' :style='showDropdown ? "display:block" : "display:none"'>
                    <p class='option' @click='selectPozd(0)' :data-checked='optionValue == "0" ? "true" : "false"' data-value='0'>Нет</p>
                    <p class='option' @click='selectPozd(1)' :data-checked='optionValue == "1" ? "true" : "false"' data-value='1'>Поздравляю с праздником весны! Пусть цифровой мир дарит бесконечные возможности и успех.</p>
                    <p class='option' @click='selectPozd(2)' :data-checked='optionValue == "2" ? "true" : "false"' data-value='2'>Поздравляю с 8 Марта! Пусть технологии приносят счастье, развитие – успех, мир дарит человечность, и мечты сбываются просто.</p>
                    <p class='option' @click='selectPozd(3)' :data-checked='optionValue == "3" ? "true" : "false"' data-value='3'>Поздравляю с 8 Марта! Желаю счастливых событий и классного настроения на территории весны.
                    </p>
                    <p class='option' @click='selectPozd(4)' :data-checked='optionValue == "4" ? "true" : "false"' data-value='4'>Поздравляю с Международным женским днём! Пусть новые возможности открываются, как бутоны любимых цветов.</p>
                    <p class='option' @click='selectPozd(5)' :data-checked='optionValue == "5" ? "true" : "false"' data-value='5'>Поздравляю с праздников весны! Пусть мир дарит красоту и вдохновение, а близкие люди – любовь и счастье.</p>
                    <p class='option' @click='selectPozd(6)' :data-checked='optionValue == "6" ? "true" : "false"' data-value='6'>Поздравляю с праздником весны! Пусть будет много солнечных дней и приятных сюрпризов.</p>
                </div>
                <textarea id='textareaData' :value='getPreparedSlogan(optionValue)' readonly></textarea>
                </div>
            </div
            <div><p class='or-text'>ИЛИ</p>
                <div class='custom-options' >
                <p class='form-text'>Свой вариант поздравления</p>
                <textarea id='customSlogan' :disabled='optionValue != "0"' maxlength='130' class='options_2' placeholder='Не более 130 символов'></textarea>
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

        getPreparedSlogan: function(id){
            if(id == '0'){
                return ''
            } 
            return document.querySelector(`[data-value="${id}"]`).innerText;
        },
        selectPozd: function(id) {
            this.optionValue = id;
            this.showDropdown = false;
        },

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
            var sloganNode = document.querySelector('[data-checked = true]');
            var customSlogan = '';
            if (sloganNode.getAttribute('data-value') == '0') {
                customSlogan = textArea.value;
            } else {
                customSlogan = sloganNode.innerText;
            }
            this.$emit('name', name.value);
            this.$emit('slogan', customSlogan);
            this.$emit('page-number', data);



        },

    },

})