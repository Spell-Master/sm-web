/* 
 * Exibe o código fonte de um elemento corrigindo sua indentação
 * @author Omar Pautz (Spell Master)
 * 
 * @param {STR} alvo
 * #ID do elemento para capturar o código html.
 * 
 * @requires js-default.js & Prism.js (https://prismjs.com/)
 */

var smCode = smCode || {};

(function () {
    'use strict';

    var $viewCode = null,
            $pre = null,
            $target = null,
            $lines = null,
            $space = null,
            $spaceTotal = 0,
            $linesTotal = 0,
            $i = 0,
            $ident = '',
            $cod = '';

    smCode.openCode = function (tgt) {
        $viewCode = jsd('#view-code');
        $pre = $viewCode.find('.code-pre');
        $target = jsd('#' + tgt).html();
        $lines = $target.split('\n');
        $space = $lines[1];
        $spaceTotal = 1;
        $linesTotal = 0;
        $i = 0;
        $ident = '';
        $cod = '';

        while ($space.charAt($spaceTotal) == ' ') {
            $spaceTotal++;
        }
        $linesTotal = $lines.length;
        for ($i = 1; $i < $linesTotal; $i++) {
            $lines[$i] = $lines[$i].slice($spaceTotal);
        }
        $ident = $lines.join('\n');
        $cod = $ident.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        $pre.html('<pre><code class="language-html">' + $cod + '</code></pre>');
        Prism.highlightAll();
        $viewCode.addClass('active');
    };

    smCode.coseCode = function () {
        $pre.html('');
        $viewCode.removeClass('active');
    };

}());


