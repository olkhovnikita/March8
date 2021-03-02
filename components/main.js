new Vue({
    components: {
        'my-header': myHeader,
        'start': start,
        'choose': choose,
        'add-info': addInfo,
        'make-a-pic': makeAPic,
        'add-effect': addEffect,
        'postcard-ready': postcardReady,
        'send-postcard': sendPostcard,
        'my-canvas': myCanvas,
        'my-footer': myFooter
        },
    el: '#content',
    data: {
        page: 'postcard-ready',
        templateId: null,
        img: null,
        croppedImg: '',
        sloganId: 0,
        name: '',
        customSlogan: '',
        customImg: undefined,
        textArea: ''
    }
})
