
class Http {

    defaults = {
        type: 'GET',
        url: '/',
        data: null,
    };

    methods = {
        success: function () {},
        error: function () {},
        always: function () {}
    };

    constructor(options) {
        if (!this.supports()) return;
        options = options || {};
        var settings = this.extend(this.defaults, options);
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('ok');
                self.methods.success.call(this, xhr, 1);
            } else {
                console.log('not ok');
                self.methods.error.call(this, xhr, 2);
            }
            self.methods.always.call(this, xhr, 3);
            console.log(xhr.status);
        };
        xhr.open(settings.type, settings.url, true);
        xhr.send(settings.data);
    }

    success(callback) {
        this.methods.success = callback;
        return this;
    }

    error(callback) {
        this.methods.error = callback;
        return this;
    }

    always(callback) {
        this.methods.always = callback;
        return this;
    }

    supports() {
        return !!window.XMLHttpRequest && !!window.JSON;
    }

    extend() {
        var extended = {};

        var self = this;

        var merge = function (obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = self.extend(extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;
    }

    debug() {
        console.log(this);
    }

    static request(options) {
        return new Http(options);
    }

}

export default Http;