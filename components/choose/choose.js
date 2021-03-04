var choose = Vue.component('choose', {
    props: ['template'],
    template:
        `
    <div class='choosing'>
        <p class='choose-text'>Выбери понравившийся шаблон и нажми "Продолжить"</p>
        <div class='examples exam'>
            <div style='background-image: url(img/example_1.png)' :class="template=='1' ? 'example active' : 'example'" @click="setSceneId('1')"></div>
            <div style='background-image: url(img/example_2.png)' :class="template=='2' ? 'example active' : 'example'" @click="setSceneId('2')"></div>
            <div style='background-image: url(img/example_3.png)' :class="template=='3' ? 'example active' : 'example'" @click="setSceneId('3')"></div>
        </div>
        <div class='next'>
            <button type='button' class='next-btn-choose' @click="check('add-info')" >Продолжить</button>
        </div>
    </div>

        `,
    methods: {
        setSceneId: function (data) {
            this.$emit('template-number', data);
        },

        check: function (data) {
            if (this.$props.template) {
                this.$emit('page-number', data);
                console.log(this.$props.template);
            }
        },
    }

})