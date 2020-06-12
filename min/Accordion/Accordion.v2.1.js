/**
 * ****************************************************
 * * @Class Accordion
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2018
 * * @version 2.1 (2020)
 * ****************************************************
 * * Executa efeito sanfona em elementos
 * ****************************************************
 */
var Accordion=function(){var t=document.getElementsByClassName("acc-button"),e={target:null,next:null,last:null,copy:null,height:null};function n(t){e.target=t.target,e.next=e.target.nextElementSibling,e.last==e.next?i():(e.last&&i(),l(),a())}function l(){e.copy=e.next.cloneNode(!0),e.copy.setAttribute("style","height:auto; visibility:visible"),e.next.parentNode.appendChild(e.copy),e.height=e.copy.offsetHeight,e.next.parentNode.removeChild(e.copy)}function i(){e.last.previousElementSibling.classList.remove("active"),e.last.style.height="0px",e.last=null,e.height=0}function a(){e.target.classList.add("active"),e.next.style.height=e.height+"px",e.last=e.next}!function(){for(var e=0;e<t.length;e++)t[e].addEventListener("click",n,!1)}(),this.forceOpen=function(t){var n;n=t?parseInt(t-1):0,e.next=document.getElementsByClassName("acc-container")[n],e.last=e.next,e.target=e.next.previousElementSibling,l(),a()}};