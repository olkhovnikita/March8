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
            context.fillStyle = '#993def';
            if (canvas.width > canvas.height * 1.77777777778) {
                context.fillRect(0, 0, (canvas.width - canvas.height * 1.77777777778) / 2, canvas.height);
                context.fillRect(canvas.width - (canvas.width - canvas.height * 1.77777777778) / 2, 0, (canvas.width - canvas.height * 1.77777777778) / 2, canvas.height);
            } else {
                context.fillRect(0, 0, canvas.width, (canvas.height - canvas.width * 0.5625) / 2);
                context.fillRect(0, canvas.height - (canvas.height - canvas.width * 0.5625) / 2, canvas.width, (canvas.height - canvas.width * 0.5625) / 2);
            }
        },
        saveCanvas: function () {
            function cropHDFromCenterPlusExport(img, canvWidth, canvHeight) {
                // create a temporary canvas sized to the cropped size
                var canvas1 = document.createElement('canvas');
                var ctx1 = canvas1.getContext('2d');
                
                // use the extended from of drawImage to draw the
                // cropped area to the temp canvas
                //ctx1.drawImage(img, cropX, cropY, cropWidth, cropHeight, cropWidth / 2 - canvWidth / 2, 0, cropWidth, cropHeight);
                // return the .toDataURL of the temp canvas
                if (canvWidth > canvHeight * 1.77777777778) {
                    var cropWidth = canvHeight*1.77777777778;
                    canvas1.width = cropWidth;
                    canvas1.height = canvHeight;
                    ctx1.drawImage(img, (canvWidth-cropWidth)/2, 0, cropWidth, canvHeight, 0, 0, cropWidth, canvHeight);
                }
                else {
                    var cropHeight = canvWidth * 0.5625;
                    canvas1.width = canvWidth;
                    canvas1.height = cropHeight;
                    ctx1.drawImage(img, 0, (canvHeight-cropHeight)/2, canvWidth, cropHeight, 0, 0, canvWidth, cropHeight);//(canvWidth-cropWidth)/2, 0, cropWidth, canvHeight, 0, 0, cropWidth, canvHeight);
                }

                return (canvas1.toDataURL());
            }

            var canvas;
            canvas = document.getElementById("myCanvas");
            context = canvas.getContext("2d");
            var imageCopy = document.getElementById("savedImageCopy");
            if (canvas) {
                var img = new Image();
                img.src = canvas.toDataURL();
                self = this;
                img.onload = function () {
                    var croppedURL = cropHDFromCenterPlusExport(img, canvas.width, canvas.height);
                    
                    imageCopy.src = croppedURL; //canvas.toDataURL();
                    cust = croppedURL;
                    self.$emit('page-number', 'make-a-pic');
                    self.$emit('custom-img', croppedURL);

                    canvas.parentNode.removeChild(canvas);
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
                //canvas.width = window.innerWidth;
                //canvas.height = window.innerHeight;

            })
            // Подключаем требуемые для рисования события
            canvas.onmousedown = startDrawing;
            canvas.onmouseup = stopDrawing;
            canvas.onmouseout = stopDrawing;
            canvas.onmousemove = draw;

            context.fillStyle = '#993def';
            if (canvas.width > canvas.height * 1.77777777778) {
                context.fillRect(0, 0, (canvas.width - canvas.height * 1.77777777778) / 2, canvas.height);
                context.fillRect(canvas.width - (canvas.width - canvas.height * 1.77777777778) / 2, 0, (canvas.width - canvas.height * 1.77777777778) / 2, canvas.height);
            } else {
                context.fillRect(0, 0, canvas.width, (canvas.height - canvas.width * 0.5625) / 2);
                context.fillRect(0, canvas.height - (canvas.height - canvas.width * 0.5625) / 2, canvas.width, (canvas.height - canvas.width * 0.5625) / 2);
            }



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