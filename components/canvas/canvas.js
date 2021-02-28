var myCanvas = Vue.component('my-canvas', {
    props: ['customImg'],
    template:
        `
        <div class='my-canvas'>
            <canvas id='myCanvas' @click="initCanvas"></canvas>
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
            var canvas;
            canvas = document.getElementById("myCanvas");
            context = canvas.getContext("2d");
            var imageCopy = document.getElementById("savedImageCopy");
            if (canvas) {
                imageCopy.src = canvas.toDataURL();
                customImg = imageCopy.src;
                console.log(customImg);
                this.$emit('page-number', 'make-a-pic');
                this.$emit('custom-img', customImg);
            }
        },
        changePage: function (data) {
            this.$emit('page-number', data);
        },
    },


    mounted() {

        this.$nextTick(function () {
            // Код, который будет запущен только после
            // отображения всех представлений
            
            var canvas;
            var context;
            canvas = document.getElementById("myCanvas");
            context = canvas.getContext("2d");
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            window.addEventListener('resize', function () {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            })
            // Подключаем требуемые для рисования события
            canvas.onmousedown = startDrawing;
            canvas.onmouseup = stopDrawing;
            canvas.onmouseout = stopDrawing;
            canvas.onmousemove = draw;

            function startDrawing(e) {
                // Начинаем рисовать
                isDrawing = true;

                // Создаем новый путь (с текущим цветом и толщиной линии) 
                context.beginPath();

                // Нажатием левой кнопки мыши помещаем "кисть" на холст
                context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);

                context.strokeStyle = 'black';
                context.lineWidth = 1;
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