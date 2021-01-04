"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var preact_1 = require("htm/preact");
var home_1 = require("./pages/home");
var contact_1 = require("./pages/contact");
var about_1 = require("./pages/about");
var routes = [
    {
        path: '/',
        component: home_1["default"]
    },
    {
        path: '/contact',
        component: contact_1["default"]
    },
    {
        path: '/about',
        component: about_1["default"]
    },
];
document.body.addEventListener('click', function (ev) {
    var target = ev.target;
    if ((target === null || target === void 0 ? void 0 : target.tagName.toUpperCase()) === 'A') {
        var el = target;
        var href_1 = el.getAttribute('href');
        var route = routes.find(function (r) { return href_1.startsWith(r.path); });
        if (route) {
            ev.preventDefault();
            preact_1.render(preact_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<", " />"], ["<", " />"])), route.component), document.getElementById('root'));
            // const a = document.getElementById('script');
            // const b = document.createElement('script');
            // b.id = 'script';
            // b.type = 'module';
            // b.src = './dist/pages' + href + '.js';
            // a.parentNode.append(b);
            // a.parentNode.removeChild(a);
        }
    }
});
var templateObject_1;
//# sourceMappingURL=router.js.map