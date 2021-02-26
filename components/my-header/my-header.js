var myHeader = Vue.component ('my-header', {
    props:['page'],
    template: 
    `
    <div class="header" :aria-page="page">
        <img src='img/about-females.png' alt='about females'>
        <p class='create-text'>Создай персональную открытку<br><span>и поздравь коллегу с 8 марта</span></p>
    </div>
    `,


})