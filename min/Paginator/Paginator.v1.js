/**
 * ****************************************************
 * * Paginator
 * * @author Spell-Master (Omar Pautz)
 * * @copyright 2020
 * * @version 1.0
 * ****************************************************
 * * Realiza paginação de elementos.
 * ****************************************************
 */
var Paginator=function(i,a){if(i&&a){var t={itens:document.getElementsByClassName(i),limit:parseInt(a),offset:0,rows:0,amount:0};function n(i){t.rows=i?parseInt(i):1,t.offset=t.rows*t.limit-t.limit,function(){for(var i=0;i<t.itens.length;i++)t.itens[i].style.display="none"}(),function(){var i=t.rows-1,a=t.rows+1,n=t.itens.length;if(n>t.limit){for(t.amount=Math.ceil(n/t.limit),t.linksHtml='<ul class="paginator">',1!=t.rows&&(t.linksHtml+='<li><a title="Primeira Página" data-link-paginator="1" class="paginator-link"> &lt; </a></li>');i<=t.rows-1;i++)i>=1&&(t.linksHtml+='<li><a title="Página'+i+'" data-link-paginator="'+i+'" class="paginator-link">'+i+"</a></li>");for(t.linksHtml+='<li class="current"><a>'+t.rows+"</a></li>";a<=t.rows+1;a++)a<=t.amount&&(t.linksHtml+='<li><a title="Página '+a+'" data-link-paginator="'+a+'" class="paginator-link">'+a+"</a></li>");t.amount!=i&&(t.linksHtml+='<li><a title="Última Página" data-link-paginator="'+t.amount+'" class="paginator-link"> &gt; </a></li>'),t.linksHtml+='<li><a class="amount">'+t.rows+"/ "+t.amount+"</a></li>",t.linksHtml+="</ul>",document.querySelectorAll("[data-paginator]").forEach(l)}}(),function(){for(var i=t.offset,a=t.offset+t.limit,n=i;n<a;n++)void 0!==t.itens[n]&&null!==t.itens[n]&&(t.itens[n].style.display="block"),i++}()}function l(i){i.innerHTML=t.linksHtml,document.querySelectorAll("[data-link-paginator]").forEach(o)}function o(i){i.addEventListener("click",s,!1)}function s(i){var a=i.target.dataset.linkPaginator;"undefined"!==a&&n(a)}this.init=n}else console.error("Parâmetros de iniciação necessários para paginação não definidos")};