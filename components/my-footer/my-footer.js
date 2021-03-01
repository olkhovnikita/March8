var myFooter = Vue.component('my-footer', {
    props:['page'],
    template:
    `
    <div class="footer" :aria-page="page">
        <img src='img/text_logo.png'>
    </div>
    `
})