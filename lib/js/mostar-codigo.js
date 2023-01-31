/* 
 * Exibe o código fonte de um elemento HTML
 * @author Omar Pautz (Spell Master)
 * 
 * @requires js-default.js, ModalShow, Prism.js (https://prismjs.com/)
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
        line: [],
        space: '',
        spaceTotal: 0,
        linesTotal: 0,
        loop: 0,
        strLine: '',
        finalCode: '',
        modal: undefined,
        effects: ['fade', 'zoom', 'top', 'bottom', 'left', 'right']
    };

    function printCode() {
        $this.finalCode = $this.strLine.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        //$this.preCode.html($this.finalCode);
        $this.preCode.html($this.finalCode.substring(1));
        Prism.highlightElement($this.preCode[0]);
    }

    function offsetCode() {
        $this.lines = $this.htmlCode.split('\n');
        $this.space = $this.lines[1];
        $this.spaceTotal = 0;
        $this.linesTotal = 0;
        $this.loop = 1;
        while ($this.space.charAt($this.spaceTotal) == ' ') {
            $this.spaceTotal++;
        }
        $this.linesTotal = $this.lines.length;
        for (; $this.loop < $this.linesTotal; $this.loop++) {
            $this.lines[$this.loop] = $this.lines[$this.loop].slice($this.spaceTotal);
        }
        $this.strLine = $this.lines.join('\n');
        printCode();
    }

    function openCode() {
        $this.htmlCode = jsd(this).parent().prev().html();
        $this.modal.open({
            width: 900,
            effect: $this.effects[Math.floor(Math.random() * $this.effects.length)],
            onOpen: offsetCode
        });
    }

    showCode.init = function () {
        $this.modal = new ModalShow('show-code');
        $this.btnOpen = jsd('[data-code]');
        $this.preCode = jsd('.modal-content > pre > code');
        $this.btnOpen.click(openCode);
    };
}());
