var WebConsole = (function () {
    class ArrayReader {
        constructor(/** @type {number[]}*/array,/** @type {number} */pos,/** @type {number} */limit) {
            this.arr = array;
            this.pos = pos;
            this.limit = limit;
        }
        read() {
            if (this.pos < this.limit) {
                return this.arr[this.pos++];
            }
            return -1;
        }
    }
    var Colors = {
        BLACK: 0,
        RED: 1,
        GREEN: 2,
        YELLOW: 3,
        BLUE: 4,
        PURPLE: 5,
        CYAN: 6,
        WHITE: 7
    };
    var $RIGHT = '['.charCodeAt(0);
    var $M = 'm'.charCodeAt(0);
    function upd(dom, val) {
        var clist = [];
        var color = val.color;
        if (color >= 0) {
            clist.push("wc-color" + color);
        }
        var bg = val.background;
        if (bg >= 0) {
            clist.push("wc-bg" + bg);
        }
        if (val.underline) {
            clist.push("wc-underline");
        }
        if (val.bold) {
            clist.push("wc-bold");
        }
        dom.className = clist.join(" ");
    }
    function parse(ret,/** @type {Int8Array} */ val) {
        if (ret == null || val == null) return;
        if (!val.length) {
            ret.bold = false;
            ret.underline = false;
            ret.color = -1;
            ret.background = -1;
            return;
        }
        var f = 0;
        while (true) {
            var e = val.indexOf(59, f);
            var br = false;
            var x;
            if (e == -1) {
                br = true;
                x = val.subarray(f);
            } else {
                x = val.subarray(f, e);
                f = e + 1;
            }
            //console.log("AN", x);
            switch (x.length) {
                case 0: {
                    ret.bold = false;
                    ret.underline = false;
                    ret.color = -1;
                    ret.background = -1;
                    break;
                }
                case 1: {
                    switch (x[0]) {
                        //case 91:
                        case 48: { // 0
                            ret.bold = false;
                            ret.underline = false;
                            ret.color = -1;
                            ret.background = -1;
                            break;
                        }
                        case 48 + 1: {
                            ret.bold = true;
                            break;
                        }
                        case 48 + 4: {
                            ret.underline = true;
                            break;
                        }
                        case 48 + 7: {
                            var a = ret.color;
                            ret.color = ret.background;
                            ret.background = a;
                            break;
                        }
                        default: {
                            console.log("Unknown: " + x[0] + " (" + String.fromCharCode(x[0]) + ")");
                            break;
                        }
                    }
                    break;
                }
                case 2: {
                    switch (x[0]) {
                        case 48 + 3: {
                            var v = x[1] - 48;
                            if (v >= 0 && v < 8) {
                                ret.color = v;
                            }
                            break;
                        }
                        case 48 + 4: {
                            var v = x[1] - 48;
                            if (v >= 0 && v < 8) {
                                ret.background = v;
                            }
                            break;
                        }
                        case 50: {
                            if (x[1] == 50) {
                                ret.bold = false;
                                ret.underline = false;
                                ret.color = -1;
                                ret.background = -1;
                            }
                            break;
                        }
                        default: {
                            console.log("Unknown: " + x[0] + "," + x[1] + " (" + String.fromCharCode(x[0]) + "," + String.fromCharCode(x[1]) + ")");
                            break;
                        }
                    }
                }
            }
            if (br) {
                break;
            }
        }
    }
    /**
     * @param {number} from 
     * @param {number} end 
     */
    function subarray(from, end) {
        /**
         * @type {number[]}
         */
        var self = this;
        if (end == undefined) {
            end = self.length;
        }
        if (from == undefined) from = 0;
        var nw = [];
        for (var x = 0; from < end; from++ , x++) {
            nw[x] = self[from];
        }
        return nw;
    }
    /*
    var tasks = [];
    (function () {
        var bypass = false;
        var charset = 'gbk';
        var app;
        var RD = new FileReader();
        RD.onload = function (e) {
            app.textContent += RD.result;
            bypass = false;
        };
        setInterval(function () {
            if (bypass) return;
            if (tasks.length) {
                var task = tasks.shift();
                if (task) {
                    var dom = task[0];
                    var blob = task[1];
                    app = dom;
                    bypass = true;
                    RD.readAsText(blob, charset);
                }
            }
        }, 20);
    })();*/
    return function () {
        var pool = document.createElement("div");
        pool.className = "wc-pool";
        var dom = document.createElement("div");
        dom.className = "wc-line";
        pool.appendChild(dom);
        var current = newLine();
        function openNew() {
            dom = document.createElement("div");
            dom.className = "wc-line";
            pool.appendChild(dom);
            current.d = null;
            newLine();
        }
        function newLine(value) {
            /**
             * @type {HTMLElement}
             */
            var dx = null;
            if (current != null) dx = current.d;
            if (dx == null) {
                dx = document.createElement("span");
                dom.appendChild(dx);
                if (current != null) current.d = dx;
            }
            var ret = { d: dx, bold: false, underline: false, color: -1, background: -1 };
            if (current != null) {
                ret.underline = current.underline;
                ret.bold = current.bold;
                ret.background = current.background;
                ret.color = current.color;
            }
            parse(ret, value);
            if (current != null) {
                if (current.underline != ret.underline ||
                    current.bold != ret.bold ||
                    current.background != ret.background ||
                    current.color != ret.color) {
                    ret.d = dx = document.createElement("span");
                    dom.appendChild(dx);
                    upd(dx, ret);
                }
            } else {
                upd(dx, ret);
            }
            return ret;
        }
        function clear() {
            current = null;
            pool.textContent = '';
            pool.appendChild(dom = document.createElement("div"));
            dom.className = "wc-line";
            current = newLine();
        }
        var max;
        function app(/** @type {Int8Array} */data) {
            //max = 5000;
            var f = 0;
            while (true/*max > 0*/) {
                var ed = data.indexOf(10, f);
                if (ed < f) {
                    push((data.subarray(f)));
                    break;
                } else {
                    push((data.subarray(f, ed)));
                    f = ed + 1;
                }
                openNew();
            }
        }
        function push(/** @type {Int8Array} */data) {
            var buffer = [];
            buffer.subarray = subarray;
            var reader = new ArrayReader(data, 0, data.length);
            while (true) {
                var read = reader.read();
                if (read == -1) break;
                if (read == 27) {
                    var next = reader.read();
                    if (next == $RIGHT) {
                        // Write buffed
                        current.d.textContent += String.fromCodePoint.apply(null, buffer);
                        buffer.splice(0);
                        var fd = false;
                        while (true) {
                            var rd = reader.read();
                            if (rd == $M) {
                                fd = true;
                                break;
                            } else {
                                buffer.push(rd);
                            }
                        }
                        if (!fd) {
                            buffer.unshift(27, $RIGHT);
                            current.d.textContent += String.fromCodePoint.apply(null, buffer);
                            // tasks.push([current.d, new Blob(Int8Array.of(buffer))]);
                            break;
                        }
                        current = newLine(buffer);
                        buffer.splice(0);
                        // OPEN CHECKUP

                    } else {
                        buffer.push(read);
                        buffer.push(next);
                    }
                } else {
                    buffer.push(read);
                }
            }
            if (buffer.length) {
                current.d.textContent += String.fromCodePoint.apply(null, buffer);
                // tasks.push([current.d, new Blob(Int8Array.of(buffer))]);
            }
            /*for (var i = 0; i < data.length; i++) {
                var read = data[i];
                if (read == 27) {
                    var next = data[++i];
                    if (next == $RIGHT) {
                        current.d.textContent += String.fromCodePoint.apply(null, buffer);
                        buffer.splice(0);
                        var ed = data.indexOf($M, i);
                        if (ed < i) {
                            current.d.textContent += String.fromCodePoint.apply(null, data.subarray(i));
                            break;
                        } else {
                            var ansi = data.subarray(i + 1, ed);
                            i = ed;
                            current = newLine(ansi);
                        }
                    } else {
                        buffer.push(read);
                        buffer.push(next);
                    }
                } else {
                    buffer.push(read);
                }
            }
            if (buffer.length) {
                current.d.textContent += String.fromCodePoint.apply(null, buffer);
            }*/
            /*var fr = 0, mfrom = 0;
            while (true) {
                var ed = data.indexOf(27, fr);
                if (ed < fr) {
                    current.d.textContent += String.fromCodePoint.apply(null, data.subarray(mfrom));
                    break;
                } else {
                    if ($RIGHT == data[ed + 1]) { // IN ANSI MODE
                        current.d.textContent += String.fromCodePoint.apply(null, data.subarray(mfrom, ed)); // Buffed
                        //var oldfrom = mfrom;
                        // ed = \033
                        mfrom = ed + 1; // Pos at ']'
                        var me = data.indexOf($M, mfrom); // Find the ending 'm'
                        if (me < 0) { // No ENDING
                            current.d.textContent += String.fromCodePoint.apply(null, data.subarray(ed)); // Write all
                            break;
                        } else {
                            var ansi = data.subarray(ed + 2, me);
                            //console.log("Ansi " + String.fromCodePoint.apply(null, ansi));
                            mfrom = me;
                            fr = mfrom; // Next Search start pos
                            current = newLine(ansi);// Update status
                        }
                    } else {
                        fr += 2;
                    }
                }
            }*/
        }
        return {
            DOM: pool,
            clear: clear,
            push: app
        };
    };
})();