var canvas;

var myCanvas = Vue.component('my-canvas', {
    props: ['customImg'],
    template: `
        <div class='my-canvas'>
            <canvas id='myCanvas'></canvas>
            <div class="toolbar">
                <button class='next-btn' @click="changePage('make-a-pic')">Назад</button>
                <button class='next-btn' @click="clearCanvas()">&#10008</button>
                <button class='next-btn' @click="saveCanvas()">&#10004</button>
                <img id="savedImageCopy">

            </div>
        </div>
    `,

    methods: {
        clearCanvas: function () {
            var context;
            var canvas;
            canvas = document.getElementById("myCanvas");
            context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
        },
        saveCanvas: function () {
            function cropPlusExport(img,cropX,cropY,cropWidth,cropHeight, canvWidth){
                // create a temporary canvas sized to the cropped size
                var canvas1=document.createElement('canvas');
                var ctx1=canvas1.getContext('2d');
                canvas1.width=cropWidth;
                canvas1.height=cropHeight;
                // use the extended from of drawImage to draw the
                // cropped area to the temp canvas
                ctx1.drawImage(img,cropX,cropY,cropWidth,cropHeight,cropWidth/2 - canvWidth/2,0,cropWidth,cropHeight);
                // return the .toDataURL of the temp canvas
                return(canvas1.toDataURL());
              }

            var canvas;
            canvas = document.getElementById("myCanvas");
            context = canvas.getContext("2d");
            var imageCopy = document.getElementById("savedImageCopy");
            if (canvas) {
                var img = new Image();
                img.src = canvas.toDataURL();
                self = this;
                img.onload = function() {
                    //var croppedURL=cropPlusExport(img, 0, canvas.height/2 - (9 * canvas.width/ 16)/2, canvas.width,  9 * canvas.width/ 16); croppX
                    var croppedURL=cropPlusExport(img, canvas.width/2 - (canvas.height * 16/9) /2 , 0, (canvas.height * 16)/9, canvas.height, canvas.width);
                    //var cropImg=new Image();
                    //cropImg.src=croppedURL;
    
                    imageCopy.src = croppedURL;//canvas.toDataURL();
                    customImg = imageCopy.src;
                    console.log(customImg);
                    self.$emit('page-number', 'make-a-pic');
                    self.$emit('custom-img', customImg);
                }
                

            }
        },
        changePage: function (data) {
            this.$emit('page-number', data);
        },
    },


    mounted() {
        
        this.$nextTick(function () {
            function getTouchPos(canvasDom, touchEvent) {
                var rect = canvasDom.getBoundingClientRect();
                return {
                    x: touchEvent.touches[0].clientX - rect.left,
                    y: touchEvent.touches[0].clientY - rect.top
                };
            }
            // Код, который будет запущен только после
            // отображения всех представлений


            var context;
            canvas = document.getElementById("myCanvas");
            context = canvas.getContext("2d");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            window.addEventListener('resize', function () {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            })
            // Подключаем требуемые для рисования события
            canvas.onmousedown = startDrawing;
            canvas.onmouseup = stopDrawing;
            canvas.onmouseout = stopDrawing;
            canvas.onmousemove = draw;

            canvas.addEventListener("touchstart", function (e) {
                e.preventDefault();
                mousePos = getTouchPos(canvas, e);
                var touch = e.touches[0];
                var mouseEvent = new MouseEvent("mousedown", {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                canvas.dispatchEvent(mouseEvent);
            }, false);

            canvas.addEventListener("touchend", function (e) {
                e.preventDefault();
                var mouseEvent = new MouseEvent("mouseup", {});
                canvas.dispatchEvent(mouseEvent);
            }, false);
            canvas.addEventListener("touchmove", function (e) {
                e.preventDefault();
                var touch = e.touches[0];
                var mouseEvent = new MouseEvent("mousemove", {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                canvas.dispatchEvent(mouseEvent);
            }, false);


            function startDrawing(e) {
                // Начинаем рисовать
                isDrawing = true;

                // Создаем новый путь (с текущим цветом и толщиной линии) 
                context.beginPath();

                // Нажатием левой кнопки мыши помещаем "кисть" на холст
                context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);

                context.strokeStyle = '#993def';
                context.lineWidth = 10;
            }

            function draw(e) {
                if (isDrawing == true) {
                    // Определяем текущие координаты указателя мыши
                    var x = e.pageX - canvas.offsetLeft;
                    var y = e.pageY - canvas.offsetTop;
                    // Рисуем линию до новой координаты
                    context.lineTo(x, y);
                    context.stroke();
                }
            }

            function stopDrawing() {
                isDrawing = false;
            }

        })
    }

})