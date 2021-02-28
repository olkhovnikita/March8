var bgImg;
var customImg;

var addEffect = Vue.component('add-effect', {
    props: ['template', 'slogan', 'customImg'],
    template:
        `
    <div class='add-info'>
        <div class='add-effect'>
            <div>
                <p class='choose-text'>Добавь немного праздника</p>
                <canvas id='selectedImg' class='example' width='1920' height='1080'></canvas>
                <p class='form-text pic-form-text'>Выбери стикер или эффект в меню справа</p>
            </div>
            <div class='choose-effect'>
                <div class='effects choose-effect-btn'>
                    <img id='popcorn' src='img/stars.png'>
                    <p class='effect-text'>эффекты</p>
                    <div id='effects' class='effects-options'>
                    <img src='img/stars.png' :class="template=='star1' ? 'effect effect-active' : 'effect'" @click="setSceneId('star1')">
                    <img src='img/stars2.png' :class="template=='star2' ? 'effect effect-active' : 'effect'" @click="setSceneId('star2')">
                    <img src='img/stars3.png' :class="template=='star3' ? 'effect effect-active' : 'effect'" @click="setSceneId('star3')">
                </div>
                </div>
                    <div class='stickers choose-effect-btn'>
                    <img src='img/effects.png'>
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
            console.log(src);
        },
        setSceneId: function (data) {
            this.$emit('template-number', data);
        },
    },
    mounted() {
        function fragmentText(text, maxWidth, ctx) {
            var words = text.split(' '),
                lines = [],
                line = "";
            if (ctx.measureText(text).width < maxWidth) {
                return [text];
            }
            while (words.length > 0) {
                var split = false;
                while (ctx.measureText(words[0]).width >= maxWidth) {
                    var tmp = words[0];
                    words[0] = tmp.slice(0, -1);
                    if (!split) {
                        split = true;
                        words.splice(1, 0, tmp.slice(-1));
                    } else {
                        words[1] = tmp.slice(-1) + words[1];
                    }
                }
                if (ctx.measureText(line + words[0]).width < maxWidth) {
                    line += words.shift() + " ";
                } else {
                    lines.push(line);
                    line = "";
                }
                if (words.length === 0) {
                    lines.push(line);
                }
            }
            return lines;
        }

        bgImg = new Image();
        if(this.$props.customImg != undefined){
            customImg = new Image();
            customImg.src = this.$props.customImg;
        }
        
        switch (this.$props.template) {
            case '1':
                bgImg.src = 'img/example_1.png'
                break;
            case '2':
                bgImg.src = 'img/example_2.png'
                break;
            case '3':
                bgImg.src = 'img/example_3.png'
                break;
        }        
        var draw = document.getElementById('selectedImg');
        var drawContext = draw.getContext("2d");

        this.$nextTick(function () {

            drawContext.drawImage(bgImg, 0, 0, 1920, 1080);

            
            
            drawContext.textAlign = "center";
           
            switch (this.$props.template) {
                case '1':
                    if(customImg != undefined){
                        drawContext.drawImage(customImg, 800, 260, 220, 110);
                    }
                    var fontsize = 50;
                    drawContext.font = fontsize + 'px serif';
                    var lines = fragmentText(this.$props.slogan, 650 - parseInt(fontsize,0), drawContext);
                    lines.forEach(function(line, i) {
                        drawContext.fillText(line, 365 + 650 / 2, 390 + (i + 1) * parseInt(fontsize,0));
                    });
                    break;
                case '2':
                    if(customImg != undefined){
                        drawContext.drawImage(customImg, 500, 210, 350, 190);
                    }
                    var fontsize = 50;
                    drawContext.font = fontsize + 'px serif';
                    var lines = fragmentText(this.$props.slogan, 850 - parseInt(fontsize,0), drawContext);
                    lines.forEach(function(line, i) {
                        drawContext.fillText(line, 500 + 850 / 2, 400 + (i + 1) * parseInt(fontsize,0));
                    });
                    break;
                case '3':
                    if(customImg != undefined){
                        drawContext.drawImage(customImg, 880, 320, 220, 110);
                    }
                    var fontsize = 40;
                    drawContext.font = fontsize + 'px serif';
                    var lines = fragmentText(this.$props.slogan, 520 - parseInt(fontsize,0), drawContext);
                    lines.forEach(function(line, i) {
                        drawContext.fillText(line, 850 + 520 / 2, 430 + (i + 1) * parseInt(fontsize,0));
                    });
                    break;
                }
        })

    },
})
