var Website = (function () {
    var pages = document.querySelector(".pages");
    var r = document.querySelector(".root");
    var root = r.querySelector(".root-root");
    var title = r.querySelector(".root-title");
    console.log(pages, root);
    var sys = {};
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
        }
        onClick() {
            var op = this.open = !this.open;
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
                    }
                }
            }
        }
    }
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
            while (p != null) {
                title_ = p.name() + " > " + title_;
                p = p.parent;
            }
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