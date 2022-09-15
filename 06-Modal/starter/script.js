'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btn = document.querySelector('.close-modal');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
// console.log(btnsOpenModal); querySelectorAll returns a node list!!!!!
// addEventListener can NOT be applied to node list!!!!! need to use for loop

const openModal = function () {
  console.log('Button clicked');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  //e for event, can use whatever
  // console.log(e);
  // have a look at console, js will create an object, and key variable will be the key you press down!
  console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    //! to inverse the boolean
    closeModal(); //call the function
  }
});
