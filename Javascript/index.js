// 1. Select the '.menuBurger' element from the DOM.
let menuBurger = document.querySelector('.menuBurger'),
// 2. Select the '.basculant' element from the DOM.
basculant =  document.querySelector('.basculant')

// 3. Add a 'click' event listener to the '.basculant' element.
basculant.addEventListener('click', function (event) {
// 4. Toggle the 'active' class on the '.menuBurger' element.
menuBurger.classList.toggle('active')
})