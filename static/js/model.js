// Get The modal elements


// Get DOM Elements
const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#plus-button');
const closeBtn = document.querySelector('.plus-close');

// Events
modalBtn.addEventListener('click', function(){
    modal.style.display = 'block';
});
closeBtn.addEventListener('click', function(){
    modal.style.display = 'none';
});
window.addEventListener('click', outsideClick);


function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}
