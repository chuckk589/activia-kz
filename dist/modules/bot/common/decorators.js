"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hears = exports.Filter = exports.On = exports.Command = exports.Use = exports.ComposerController = void 0;
const grammy_1 = require("grammy");
const constants_1 = require("../../../constants");
const helpers_1 = require("./helpers");
class BotListenerMetadata {
    constructor(method, payload, key, parent) {
        this.children = [];
        this.method = method;
        this.payload = method == ComposerMethod.hears ? (0, helpers_1.match)(payload) : payload;
        this.key = String(key);
        this.parent = parent;
    }
}
var ComposerMethod;
(function (ComposerMethod) {
    ComposerMethod["command"] = "command";
    ComposerMethod["on"] = "on";
    ComposerMethod["use"] = "use";
    ComposerMethod["hears"] = "hears";
    ComposerMethod["filter"] = "filter";
})(ComposerMethod || (ComposerMethod = {}));
function concatChildren(children, parent) {
    children.forEach((child) => {
        const pm = applyComposerMethod.call(this, child, parent);
        if (child.children.length) {
            concatChildren.call(this, child.children, pm);
        }
    });
}
function applyComposerMethod(handler, parent) {
    switch (handler.method) {
        case ComposerMethod.command:
        case ComposerMethod.on:
        case ComposerMethod.hears:
            return parent[handler.method](handler.payload, this[handler.key]);
        case ComposerMethod.use:
        case ComposerMethod.filter:
            return parent[handler.method](this[handler.key]);
    }
}
function ComposerController(constructor) {
    return class extends constructor {
        get _composer() {
            const composer = new grammy_1.Composer();
            let handlers = Reflect.getMetadata(constants_1.LISTENERS_METADATA, this);
            handlers = handlers.filter((handler) => handler.parent ? !handlers.find((h) => h.key === handler.parent)?.children.push(handler) : true);
            concatChildren.call(this, handlers, composer);
            return composer;
        }
    };
}
exports.ComposerController = ComposerController;
function createListenerDecorator(method) {
    return (payload, parent) => {
        return (_target, _key) => {
            const metadata = [new BotListenerMetadata(method, payload, _key, parent)];
            const previousValue = Reflect.getMetadata(constants_1.LISTENERS_METADATA, _target) || [];
            const value = [...previousValue, ...metadata];
            Reflect.defineMetadata(constants_1.LISTENERS_METADATA, value, _target);
        };
    };
}
exports.Use = createListenerDecorator(ComposerMethod.use);
exports.Command = createListenerDecorator(ComposerMethod.command);
exports.On = createListenerDecorator(ComposerMethod.on);
exports.Filter = createListenerDecorator(ComposerMethod.filter);
exports.Hears = createListenerDecorator(ComposerMethod.hears);
//# sourceMappingURL=decorators.js.map