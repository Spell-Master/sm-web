/**
 * ****************************************************
 * * @Class ImageGalery
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2020
 * * @version 1.0
 * ****************************************************
 * * Exibe imagens como forma de galeria.
 * ****************************************************
 */
var ImageGalery=function(e){var t=document.getElementById(e),n={backGround:null,galeryBox:null,boxImg:null,thumb:null,close:null,parent:null};function a(e){n.parent=e.target.parentNode,function(){for(var e,t=n.parent.getElementsByTagName("img"),a=0;a<t.length;a++)(e=document.createElement("img")).src=t[a].src,e.classList.add("thumb"),n.thumb.appendChild(e),e.addEventListener("click",c,!1)}(),l()}function l(){n.backGround.classList.toggle("active"),n.galeryBox.classList.toggle("active"),n.thumb.classList.toggle("active"),n.close.classList.toggle("active")}function c(e){n.backGround.src=e.target.src,n.boxImg.src=e.target.src}function d(){n.backGround.src=null,n.boxImg.src=null,n.thumb.innerHTML=null;var e,t=n.thumb.getElementsByTagName("img");for(e=0;e<t.length;e++)t[e].parentNode&&t[e].parentNode.removeChild(t[e]);l()}function o(e){27==e.keyCode&&d()}n.backGround=document.createElement("img"),n.backGround.classList.add("galery-background"),document.body.appendChild(n.backGround),n.galeryBox=document.createElement("div"),n.boxImg=document.createElement("img"),n.galeryBox.classList.add("galery-box"),n.boxImg.classList.add("galery-image"),document.body.appendChild(n.galeryBox),n.galeryBox.appendChild(n.boxImg),n.thumb=document.createElement("div"),n.thumb.classList.add("thumb-background"),document.body.appendChild(n.thumb),n.close=document.createElement("a"),n.close.classList.add("galery-x"),n.close.title="Fechar",document.body.appendChild(n.close),n.close.addEventListener("click",d,!1),t.querySelectorAll("img").forEach(function(e){e.addEventListener("click",a,!1),e.addEventListener("click",c,!1),document.addEventListener("keypress",o,!1)})};