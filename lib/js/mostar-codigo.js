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
        htmlCod: undefined,
        preCode: undefined,
        corners: '',
        modalDt: undefined,
        modalFn: undefined,
        asideAh: null
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
        var $lines = $this.htmlCod.split('\n'), $spaceTotal = 0, $linesTotal = 0, $loop = 1;
        $this.asideAh.setAttr({'aria-hidden': 'false'});
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
        $this.htmlCod = jsd(e.target).parent().prev().html();
        $this.modalFn.open({
            width: 900,
            effect: $effects[Math.floor(Math.random() * $effects.length)],
            onOpen: offsetCode(),
            onClose: function () {
                $this.asideAh.setAttr({'aria-hidden': 'true'});
            }
        });
    }

    showCode.init = function () {
        $this.modalDt = jsd('#show-code');
        $this.modalFn = new ModalShow($this.modalDt.root(0));
        $this.btnOpen = jsd('[data-code]');
        $this.preCode = jsd('.modal-content > pre > code');
        $this.asideAh = $this.modalDt.parent();
        $this.btnOpen.click(openModal);
    };
}());
