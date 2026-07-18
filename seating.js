
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.zoom-img');
const modalTitle = document.querySelector('.modal-title');
const closeButton = document.querySelector('.close');
const data = {
 left: { title: 'Левая часть стола', src: 'img/hall/table-left.webp', alt: 'Увеличенная левая часть свадебного стола' },
 right: { title: 'Правая часть стола', src: 'img/hall/table-right.webp', alt: 'Увеличенная правая часть свадебного стола' }
};
let lastTrigger = null;
function openZone(side, trigger){ const item=data[side]; if(!item)return; lastTrigger=trigger||null; modalTitle.textContent=item.title; modalImage.src=item.src; modalImage.alt=item.alt; modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; closeButton.focus(); }
function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; if(lastTrigger)lastTrigger.focus(); }
document.querySelectorAll('[data-zone]').forEach(btn=>btn.addEventListener('click',()=>openZone(btn.dataset.zone,btn)));
closeButton.addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal()});
window.addEventListener('DOMContentLoaded',()=>document.body.classList.add('is-ready'));
