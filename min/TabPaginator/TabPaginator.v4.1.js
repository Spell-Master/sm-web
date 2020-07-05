/**
 * ****************************************************
 * * TabPaginator
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2017
 * * @version 4.1 (2020)
 * ****************************************************
 * * Executa paginação de conteúdo por blocos.
 * ****************************************************
 */
var TabPaginator=function(n){var e=n?document.getElementById(n):document,t={link:e.getElementsByClassName("tab-link"),body:e.getElementsByClassName("tab-body"),index:0};function i(n){return function(){a(n)}}function a(n){!function(){var n;for(n=0;n<t.link.length;n++)t.link[n].classList.remove("active"),t.body[n].classList.remove("active")}(),t.index=n?parseInt(n-1):0,t.link[t.index].classList.add("active"),t.body[t.index].classList.add("active")}!function(){for(var n=0;n<t.link.length;n++)t.link[n].addEventListener("click",i(n+1),!1)}(),a(),this.openTab=a};