/**
 * ****************************************************
 * * ModalShow
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2018
 * * @version 3.0 (2020)
 * ****************************************************
 */
var ModalShow=function(e){var l={modal:document.getElementById(e),close:null,content:null};function o(){l.close&&(l.close.removeEventListener("click",o),l.close.classList.remove("active"),l.close=null),l.modal.classList.remove("active")}function c(e){l.modal.querySelector(".modal-title").innerText=e}function t(){l.close||(l.close=l.modal.querySelector(".modal-close"),l.close.classList.add("active"),l.close.addEventListener("click",o,!0))}this.open=function(e,o){l.modal.querySelector(".modal-header").innerHTML='<div class="modal-close"></div><div class="modal-title"></div>',l.content=l.modal.querySelector(".modal-content"),e&&c(e),o&&t(),l.modal.classList.add("active")},this.close=o,this.title=c,this.showX=t,this.hiddenX=function(){l.close&&(l.close.classList.remove("active"),l.close.removeEventListener("click",close,!0),l.close=null)}};