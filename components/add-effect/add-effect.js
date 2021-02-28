var addEffect = Vue.component('add-effect', {
    props: ['template'],
    template:
        `
    <div class='add-info'>
        <div class='add-effect'>
            <div>
                <p class='choose-text'>Добавь немного праздника</p>
                <canvas class='example'>
                <p class='form-text pic-form-text'>Выбери стикер или эффект в меню справа</p>
            </div>
            <div class='choose-effect'>
                <div class='effects choose-effect-btn'>
                    <img id='popcorn' src='img/stars.png' @click="this.document.getElementById('effects').style.visibility = 'visible'">
                    <p class='effect-text'>эффекты</p>
                    <div id='effects' class='effects-options'>
                    <img src='img/stars.png' :class="template=='star1' ? 'effect effect-active' : 'effect'" @click="setSceneId('star1')">
                    <img src='img/stars2.png' :class="template=='star2' ? 'effect effect-active' : 'effect'" @click="setSceneId('star2')">
                    <img src='img/stars3.png' :class="template=='star3' ? 'effect effect-active' : 'effect'" @click="setSceneId('star3')">
                </div>
                </div>
                    <div class='stickers choose-effect-btn'>
                    <img src='img/effects.png' @click="this.document.getElementById('stickers').style.visibility = 'visible'">
                    <p class='effect-text'>стикеры</p>
                    <div id='stickers' class='stickers-options'>
                    <div class='img-row'>
                        <img src='img/1.png' :class="template=='greyFlower' ? 'effect effect-active' : 'effect'" @click="setSceneId('greyFlower')">
                        <img src='img/2.png' :class="template=='tulip' ? 'effect effect-active' : 'effect'" @click="setSceneId('tulip')">
                        <img src='img/3.png' :class="template=='shoe' ? 'effect effect-active' : 'effect'" @click="setSceneId('shoe')">
                        <img src='img/4.png' :class="template=='butterfly' ? 'effect effect-active' : 'effect'" @click="setSceneId('butterfly')">
                    </div>
                    <div class='img-row'>    
                        <img src='img/5.png' :class="template=='bear' ? 'effect effect-active' : 'effect'" @click="setSceneId('bear')">
                        <img src='img/6.png' :class="template=='gift' ? 'effect effect-active' : 'effect'" @click="setSceneId('gift')">
                        <img src='img/7.png' :class="template=='cat' ? 'effect effect-active' : 'effect'" @click="setSceneId('cat')">
                        <img src='img/8.png' :class="template=='rose' ? 'effect effect-active' : 'effect'" @click="setSceneId('rose')">
                    </div>
                    <div class='img-row'>
                        <img src='img/9.png' :class="template=='heart' ? 'effect effect-active' : 'effect'" @click="setSceneId('heart')">
                        <img src='img/10.png' :class="template=='lipstick' ? 'effect effect-active' : 'effect'" @click="setSceneId('lipstick')">
                        <img src='img/11.png' :class="template=='bouquet' ? 'effect effect-active' : 'effect'" @click="setSceneId('bouquet')">
                        <img src='img/12.png' :class="template=='like' ? 'effect effect-active' : 'effect'" @click="setSceneId('like')">
                    </div>
                    </div>
                </div>
                <div class='undo choose-effect-btn'>
                    <img src='img/undo.png'>
                    <p class='effect-text'>отменить<br>действие</p>
                </div>  
            </div>
            </div>
        <div class='info-btns'>
            <button type='button' class='next-btn' @click="changePage('make-a-pic')">Назад</button>
            <button type='button' class='next-btn' @click="changePage('postcard-ready')">Далее</button>
        </div>
    </div>
    `,

    methods: {
        changePage: function (data) {
            this.$emit('page-number', data);
        },
        src: function (template) {
            switch (template) {
                case '1':
                    return 'img/example_1.png'
                case '2':
                    return 'img/example_2.png'
                case '3':
                    return 'img/example_3.png'
            }
        },
        setSceneId: function (data) {
            this.$emit('template-number', data);
        },
    },
    mounted() {
        const popcorn = document.querySelector('#popcorn');
        var tooltip = document.querySelector('#effects');
        Popper.createPopper(popcorn, tooltip, {
            placement: 'right',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                },
            ],
        });
        const pop_corn = document.querySelector('#popcorn');
        var tool_tip = document.querySelector('#stickers');
        Popper.createPopper(pop_corn, tool_tip, {
            placement: 'right',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                },
            ],
        });

    },

    computed: function () {
        canvas = document.getElementById("drawingCanvas");
        context = canvas.getContext("2d");

        context.drawImage(src(template), 10, 10);
    }
})