/* 
 * Exibe o código fonte de um elemento HTML
 * @author Omar Pautz (Spell Master)
 * 
 * @requires
 *  js-default.js (https://github.com/Spell-Master/sm-web/javascript/jsd/)
 *  ModalShow.js (https://github.com/Spell-Master/sm-web/javascript/ModalShow/)
 *  Prism.js (https://prismjs.com/)
 */

var showCode = showCode || {};
var jsd = jsd || {};
var Prism = Prism || {};

(function () {
    'use strict';
    var $this = {
        btnOpen: undefined,
        htmlCode: undefined,
        preCode: undefined,
        corners: '',
        modal: undefined
    };

    function printCode() {
        var $selfClose = '&nbsp;&sol;&gt;',
            $output = $this.corners
            .replace(/(<(?:hr|br|img|input|link|meta)[^>]*?)(?<!\/)>/g, `$1${$selfClose}`)
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&apos;')
            .replace(/"/g, '&quot;');
        $this.preCode.html($output.substring(1));
        Prism.highlightElement($this.preCode.root(0));
    }

    function offsetCode() {
        var $lines = $this.htmlCode.split('\n'), $spaceTotal = 0, $linesTotal = 0, $loop = 1;
        while ($lines[1].charAt($spaceTotal) === ' ') {
            $spaceTotal++;
        }
        $linesTotal = $lines.length;
        for (; $loop < $linesTotal; $loop++) {
            $lines[$loop] = $lines[$loop].slice($spaceTotal);
        }
        $this.corners = $lines.join('\n');
        printCode();
    }

    function openModal(e) {
        var $effects = ['fade', 'zoom', 'top', 'bottom', 'left', 'right'];
        $this.htmlCode = jsd(e.target).parent().prev().html();
        $this.modal.open({
            width: 900,
            effect: $effects[Math.floor(Math.random() * $effects.length)],
            onOpen: offsetCode()
        });
    }

    showCode.init = function () {
        $this.modal = new ModalShow(jsd('#show-code').root(0));
        $this.btnOpen = jsd('[data-code]');
        $this.preCode = jsd('.modal-content > pre > code');
        $this.btnOpen.click(openModal);
    };
}());
