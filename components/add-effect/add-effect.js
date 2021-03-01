var bgImg;
var lines;
var fontsize;
var customImg;
var topObjects = [];
var selectedTop;
var bgId;
var widthAspect;
var drawContext;
var availableObjects = [
    {
        "name": "star1",
        "width": "1000",
        "height": "1000",
        "img": "star.png"
    },
    {
        "name": "star2",
        "width": "1000",
        "height": "1000",
        "img": "star2.png"
    },
    {
        "name": "star3",
        "width": "1000",
        "height": "1000",
        "img": "star3.png"
    },
    {
        "name": "greyFlower",
        "width": "393",
        "height": "360",
        "img": "1.png"
    },
    {
        "name": "tulip",
        "width": "393",
        "height": "360",
        "img": "2.png"
    },
    {
        "name": "shoe",
        "width": "393",
        "height": "360",
        "img": "3.png"
    },
    {
        "name": "butterfly",
        "width": "393",
        "height": "360",
        "img": "4.png"
    },
    {
        "name": "bear",
        "width": "393",
        "height": "360",
        "img": "5.png"
    },
    {
        "name": "gift",
        "width": "393",
        "height": "360",
        "img": "6.png"
    },
    {
        "name": "cat",
        "width": "393",
        "height": "360",
        "img": "7.png"
    },
    {
        "name": "rose",
        "width": "393",
        "height": "360",
        "img": "8.png"
    },
    {
        "name": "heart",
        "width": "393",
        "height": "360",
        "img": "9.png"
    },
    {
        "name": "lipstick",
        "width": "393",
        "height": "360",
        "img": "10.png"
    },
    {
        "name": "bouquet",
        "width": "393",
        "height": "360",
        "img": "11.png"
    },
    {
        "name": "like",
        "width": "393",
        "height": "360",
        "img": "12.png"
    }

];

var addEffect = Vue.component('add-effect', {
    props: ['template', 'slogan', 'customImg'],
    template:
        `
    <div class='add-info add-effect-wrap'>
        <div class='add-effect'>
            <div>
                <p class='choose-text'>Добавь немного праздника</p>
                <canvas id='selectedImg' class='example' width='1920' height='1080'></canvas>
                <p class='form-text pic-form-text'>Выбери стикер или эффект в меню справа</p>
            </div>
            <div class='choose-effect'>
            <div class='pick-effect'>
                <div class='effects choose-effect-btn'>
                    <img src='img/stars.png'>
                    <p class='effect-text'>эффекты</p>
                </div>

                <div class='stickers choose-effect-btn'>
                    <img src='img/effects.png'>
                    <p class='effect-text'>стикеры</p>
                </div>
                <div class='undo choose-effect-btn'>
                    <img src='img/undo.png'  @click="backStep()">
                    <p class='effect-text'>отменить<br>действие</p>
                </div> 
                </div>
                <div class='pick-effect pick-effect_'>
                    <div id='effects' class='effects-options'>
                        <img src='img/stars.png' :class="template=='star1' ? 'effect effect-active' : 'effect'" @click="setSceneId('star1')">
                        <img src='img/stars2.png' :class="template=='star2' ? 'effect effect-active' : 'effect'" @click="setSceneId('star2')">
                        <img src='img/stars3.png' :class="template=='star3' ? 'effect effect-active' : 'effect'" @click="setSceneId('star3')">
                    </div>
                    <div class='stickers-options'>
                        <div class='img-row'>
                            <img src='img/1.png' :class="template=='greyFlower' ? 'effect effect-active' : 'effect'" @click="setSceneId('greyFlower')">
                            <img src='img/2.png' :class="template=='tulip' ? 'effect effect-active' : 'effect'" @click="setSceneId('tulip')">
                            <img src='img/3.png' :class="template=='shoe' ? 'effect effect-active' : 'effect'" @click="setSceneId('shoe')">
                            <img src='img/4.png' :class="template=='butterfly' ? 'effect effect-active' : 'effect'" @click="setSceneId('butterfly')"> <br> 
                        </div>
                        <div class='img-row'>
                            <img src='img/5.png' :class="template=='bear' ? 'effect effect-active' : 'effect'" @click="setSceneId('bear')">
                            <img src='img/6.png' :class="template=='gift' ? 'effect effect-active' : 'effect'" @click="setSceneId('gift')">
                            <img src='img/7.png' :class="template=='cat' ? 'effect effect-active' : 'effect'" @click="setSceneId('cat')">
                            <img src='img/8.png' :class="template=='rose' ? 'effect effect-active' : 'effect'" @click="setSceneId('rose')"><br>
                        </div>
                        <div class='img-row'>
                            <img src='img/9.png' :class="template=='heart' ? 'effect effect-active' : 'effect'" @click="setSceneId('heart')">
                            <img src='img/10.png' :class="template=='lipstick' ? 'effect effect-active' : 'effect'" @click="setSceneId('lipstick')">
                            <img src='img/11.png' :class="template=='bouquet' ? 'effect effect-active' : 'effect'" @click="setSceneId('bouquet')">
                            <img src='img/12.png' :class="template=='like' ? 'effect effect-active' : 'effect'" @click="setSceneId('like')">
                        </div>
                     </div>

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
        backStep : function (){
            if(topObjects.length > 0){
                topObjects.splice(-1,1);
                drawing();
            }
        },
        changePage: function (data) {
            var canvas = document.getElementById('selectedImg');
            finalImg = canvas.toDataURL("image/jpeg");
            console.log(finalImg);
            this.$emit('page-number', data);
        },
        setSceneId: function (data) {
            availableObjects.forEach(v => {
                if (v.name === data) {
                    var selectedImg = new Image();
                    selectedImg.src = "canvImg/" + v.img;

                    selectedTop = {
                        "obj": selectedImg,
                        "x": v.width,
                        "height": v.height,
                        "width": v.width
                    }
                }
            });
            this.$emit('template-number', data);
        },
    },
    mounted() {
        var draw;
        function fragmentText(text, maxWidth, ctx) {
            var words = text.split(' '),
                lines = [],
                line = "";
            if (ctx.measureText(text).width * widthAspect < maxWidth) {
                return [text];
            }
            while (words.length > 0) {
                var split = false;
                while (ctx.measureText(words[0]).width * widthAspect >= maxWidth) {
                    var tmp = words[0];
                    words[0] = tmp.slice(0, -1);
                    if (!split) {
                        split = true;
                        words.splice(1, 0, tmp.slice(-1));
                    } else {
                        words[1] = tmp.slice(-1) + words[1];
                    }
                }
                if (ctx.measureText(line + words[0]).width * widthAspect < maxWidth) {
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
        draw = document.getElementById('selectedImg');
        let rectTmp = draw.getBoundingClientRect(); 
        widthAspect = 1920 / rectTmp.width;
        drawContext = draw.getContext("2d")

        function clicked(e) {
            if (selectedTop != undefined) {
                let rect = draw.getBoundingClientRect();
                let x = (1920 / rect.width) * (e.clientX - rect.left);
                let y = (1080 / rect.height) * (e.clientY - rect.top);
                selectedTop.x = x - (selectedTop.width / 2);
                selectedTop.y = y - (selectedTop.height / 2);

                var tmpImg = new Image();
                tmpImg.src = selectedTop.obj.src;

                var tmpSelObj = {
                    "x" : x - (selectedTop.width / 2),
                    "y" : y - (selectedTop.height / 2),
                    "width" : selectedTop.width,
                    "height": selectedTop.height,
                    "obj" : tmpImg
                };

                topObjects.push(tmpSelObj)
                drawing();
            }
        }

        bgImg = new Image();
        if (this.$props.customImg != undefined) {
            customImg = new Image();
            customImg.src = this.$props.customImg;
        }
        ;

        switch (this.$props.template) {
            case '1':
                bgImg.src = 'canvImg/bg1.png';
                fontsize = 50;
                lines = fragmentText(this.$props.slogan, 650 - parseInt(fontsize, 0), drawContext);
                break;
            case '2':
                bgImg.src = 'canvImg/bg2.png';
                fontsize = 50;
                lines = fragmentText(this.$props.slogan, 850 - parseInt(fontsize, 0), drawContext);
                break;
            case '3':
                bgImg.src = 'canvImg/bg3.png';
                fontsize = 40;
                lines = fragmentText(this.$props.slogan, 520 - parseInt(fontsize, 0), drawContext);
                break;
        }
        bgImg.onload = function() {
            drawing();
        }

        draw.onmousedown = clicked;
        draw.addEventListener("touchstart", function (e) {
            mousePos = getTouchPos(draw, e);
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            draw.dispatchEvent(mouseEvent);
        }, false);
        bgId = this.$props.template;

     
        this.$nextTick(function () {
            drawing();
        })
    },
})


function drawing() {
    drawContext.clearRect(0, 0, 1920, 1080);
    drawContext.drawImage(bgImg, 0, 0, 1920, 1080);
    drawContext.textAlign = "center";
    switch (bgId) {
        case '1':
            if (customImg != undefined) {
                drawContext.drawImage(customImg, 800, 260, 220, 110);
            }
            drawContext.font = fontsize + 'px serif';
            drawContext.fillStyle = '#993def';

            lines.forEach(function (line, i) {
                drawContext.fillText(line, 365 + 650 / 2, 390 + (i + 1) * parseInt(fontsize, 0));
            });
            break;
        case '2':
            if (customImg != undefined) {
                drawContext.drawImage(customImg, 500, 210, 350, 190);
            }
            drawContext.font = fontsize + 'px serif';
            drawContext.fillStyle = '#993def';

            lines.forEach(function (line, i) {
                drawContext.fillText(line, 500 + 850 / 2, 400 + (i + 1) * parseInt(fontsize, 0));
            });
            break;
        case '3':
            if (customImg != undefined) {
                drawContext.drawImage(customImg, 880, 320, 220, 110);
            }
            drawContext.font = fontsize + 'px serif';
            drawContext.fillStyle = '#993def';

            lines.forEach(function (line, i) {
                drawContext.fillText(line, 850 + 520 / 2, 430 + (i + 1) * parseInt(fontsize, 0));
            });
            break;
    }
    topObjects.forEach(obj => {
        drawContext.drawImage(obj.obj, obj.x, obj.y, obj.width, obj.height);
    });
}