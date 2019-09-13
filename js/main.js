var Website = (function () {
    var pages = document.querySelector(".pages");
    var r = document.querySelector(".root");
    var root = r.querySelector(".root-root");
    var title = r.querySelector(".root-title");
    console.log(pages, root);
    var sys = {};
    /**
     * @type {{[key: string]: Text}}
     */
    var doms = {};
    class Compon {
        /**
         * @returns {HTMLElement}
         */
        createDom() {
            var d = document.createElement("div");
            d.className = "button ico";
            return d;
        }
        constructor() {
            var d = this.dom = this.createDom();
            var thiz = this;
            d.addEventListener("click", function (ev) {
                thiz.onClick(ev);
            });
            /**
             * @type {PageDown | undefined}
             */
            this.parent = undefined;
        }
        /**
         * 
         * @param {MouseEvent} ev 
         */
        onClick(ev) { }
        clearPage() {
            root.textContent = null;
        }
        getPage() {
            return root;
        }
        onLostFources() { }
    }
    class Text extends Compon {
        constructor() {
            super();
        }
        name(value) {
            if (value == null) {
                return this.dom.textContent;
            }
            this.dom.textContent = value;
            return this;
        }
    }
    class PageDown extends Text {
        createDom() {
            return document.createElement("a");
        }
        /**
         * 
         * @param {*} value 
         * @returns {PageDown & string}
         */
        name(value) {
            if (value == null) {
                return this.ck.textContent;
            }
            this.ck.textContent = value;
            return this;
        }
        constructor() {
            super();
            this.open = false;
            var c = this.ck = this.dom;
            c.className = "button ico pagedown";
            var dd = this.dom = document.createElement("div");
            dd.className = "";
            dd.appendChild(c);
            var down = document.createElement("div");
            this.down = down;
            dd.append(down);
            down.style.display = "none";
            down.style.paddingLeft = "30px";
            /**
             * @type {{[key: string]: Text}}
             */
            this.doms = {};
        }
        onClick() {
            this.setOpen(!this.open);
        }
        setOpen(op) {
            this.open = op;
            this.down.style.display = op ? "" : "none";
            this.ck.className = "button ico pagedown" + (op ? " active" : "");
        }
        /**
         * @param {Compon} compon
         * @returns {PageDown}
         */
        append(compon) {
            this.down.appendChild(compon.dom);
            compon.parent = this;
            if (compon instanceof Text) {
                this.doms[compon.name()] = compon;
            }
            return this;
        }
    }
    /**
     * 
     * @param {*} values 
     * @param {*[]} editors
     * @returns {Node}
     */
    function make(values, editors) {
        if (values == null) {
            return document.createTextNode(String(values));
        }
        switch (typeof values) {
            case "function": {
                return values();
            }
            case "bigint":
            case "boolean": case "number": case "string": case "symbol": case "undefined": {
                return document.createTextNode(String(values));
            }
            case "object": {
                if (values instanceof Array) {
                    var div = document.createElement("div");
                    for (const value of values) {
                        div.appendChild(make(value));
                    }
                    return div;
                } else if (values instanceof HTMLElement) {
                    return values;
                } else {
                    switch (values.type) {
                        case "array": {
                            var div = values.dom;
                            if (div == null) {
                                div = document.createElement("div");
                            }
                            if (div instanceof Function) {
                                div = div();
                            }
                            for (const value of values) {
                                div.appendChild(make(value, editors));
                            }
                            return div;
                        }
                        case "pre": {
                            var div = document.createElement("pre");
                            div.textContent = values.value;
                            return div;
                        }
                        case "code": {
                            var div = document.createElement("pre");
                            div.textContent = values.code;
                            if ("height" in values) {
                                div.style.height = values.height;
                            }
                            var editor = ace.edit(div);
                            div.editor = editor;
                            if ("mode" in values)
                                editor.session.setMode('ace/mode/' + values.mode);
                            editor.setReadOnly(true);
                            if ("theme" in values) {
                                editor.setTheme(values.theme);
                            } else {
                                editor.setTheme('ace/theme/monokai');
                            }
                            if (editors != null) {
                                editors.push(editor);
                            }
                            return div;
                        }
                        case "package": {
                            var div = document.createElement("div");
                            div.className = "make-package-view-pool";
                            (function ($) {
                                function a(v,/** @type {HTMLDivElement} */dv) {
                                    if (v) {
                                        switch (typeof v) {
                                            case "string": {
                                                var file = document.createElement("div");
                                                file.className = "make-package-view-file";
                                                dv.appendChild(file);
                                                file.textContent = v;
                                                break;
                                            }
                                            case "object": {
                                                if (v instanceof Array) {
                                                    for (var ov of v) {
                                                        a(ov, dv);
                                                    }
                                                } else {
                                                    for (var ky in v) {
                                                        var ob = v[ky];
                                                        var rt = document.createElement("div");
                                                        rt.className = "make-package-view";
                                                        var title = document.createElement("div");
                                                        title.className = "make-package-view-title";
                                                        title.textContent = ky;
                                                        rt.appendChild(title);
                                                        var c = document.createElement("div");
                                                        c.className = "make-package-view-const";
                                                        rt.appendChild(c);
                                                        dv.appendChild(rt);
                                                        a(ob, c);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                a($, div);
                            })(values.pck);
                            return div;
                        }
                    }
                }
            }
        }
    }
    function pathenc(/** @type {string[]|string}*/path, mode) {
        if (mode) {
            // Encode
            let buffer = String.fromCharCode(path.length);
            for (const value of path) {
                buffer += String.fromCharCode(value.length);
                buffer += value;
            }
            return buffer;
        } else {
            /**
             * @type {string[]}
             */
            let paths = [];
            let size = path.charCodeAt(0);
            for (let pos = 1, count = 0; count < size; count++) {
                let len = path.charCodeAt(pos);
                let cut = path.substr(pos + 1, len);
                pos += len + 1;
                paths.push(cut);
            }
            return paths;
        }
    }
    function rep(/** @type {string} */value, mode) {
        if (mode) {
            return value.replace(/\%|\./gi, function (source) {
                if (source == '.') {
                    return '.,';
                }
                return '..';
            });
        } else {
            return value.replace(/\.[\.\,]/gi, function (source) {
                if (source == '..') return '%';
                return '.';
            });
        }
    }
    function open(/** @type {string[]} */path, update) {
        var rt = doms;
        var com = null;
        while (path.length) {
            var lt = path.shift();
            com = rt[lt];
            if (com instanceof PageDown) {
                rt = com.doms;
                com.setOpen(true);
            }
        }
        com.onClick();
        if (update) {
            awsl(pathenc(path, true), true);
        }
    };
    sys.open = open;
    function awsl(/** @type {string} */path, mode) {
        if (mode) {
            let encoded = rep(encodeURIComponent(path), 1);
            history.pushState(null, null, "#" + encoded);
        } else {
            if (path != false) {
                if (path.charAt(0) == '#') {
                    path = path.substring(1);
                }
            }
            if (path != false) {
                let decoded = decodeURIComponent(rep(path, 0));
                /**
                 * @type {string[]}
                 */
                var pat = pathenc(decoded, false);
                open(pat, false);
            }
        }
    }
    sys.hash = awsl;
    sys.pathenc = pathenc;
    /**
     * @type {Show}
     */
    var lastRend = null;
    class Show extends Text {
        constructor() {
            super();
        }
        /**
         * 
         * @param {Array} value 
         */
        value(values) {
            if (values == null) {
                return this;
            }
            var show = document.createElement("div");
            show.append(make(values, this.editors = []));
            this.show = show;
            return this;
        }
        onClick() {
            var title_ = this.name();
            let p = this.parent;
            let path = [title_];
            while (p != null) {
                let pn = p.name();
                path.unshift(pn);
                title_ = pn + " > " + title_;
                p = p.parent;
            }
            awsl(pathenc(path, true), true);
            title.textContent = title_;
            var pg = this.getPage();
            pg.textContent = '';
            pg.appendChild(this.show);
            if (this.editors) {
                for (const editor of this.editors) {
                    editor.resize();
                }
            }
            if (lastRend != null) {
                lastRend.onLostFources();
            }
            this.dom.className = "button ico active";
            lastRend = this;
        }
        onLostFources() {
            this.dom.className = "button ico";
        }
    }
    sys.Show = Show;
    sys.Compon = Compon;
    sys.PageDown = PageDown;
    sys.Text = Text;
    /**
     * @param {Compon} compon
     */
    sys.append = (compon) => {
        pages.appendChild(compon.dom);
        if (compon instanceof Text) {
            doms[compon.name()] = compon;
        }
        return sys;
    };
    /**
     * @param {HTMLElement} dom
     * @returns {HTMLElement}
     */
    sys.text = (dom, text) => {
        dom.textContent = text;
        return dom;
    }
    return sys;
})();