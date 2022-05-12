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
function ComposerController(constructor) {
    const fn = (fn) => fn();
    return class extends constructor {
        constructor() {
            super(...arguments);
            this._composer = fn(() => {
                const composer = new grammy_1.Composer();
                const handlers = Reflect.getMetadata(constants_1.LISTENERS_METADATA, constructor.prototype);
                const that = this;
                handlers.map((handler) => {
                    switch (handler.method) {
                        case ComposerMethod.on: {
                            composer.on(handler.payload, that[handler.key]);
                            break;
                        }
                        case ComposerMethod.command: {
                            composer.command(handler.payload, that[handler.key]);
                            break;
                        }
                        case ComposerMethod.use: {
                            composer.use(that[handler.key]);
                            break;
                        }
                        case ComposerMethod.hears: {
                            composer.hears(handler.payload, that[handler.key]);
                            break;
                        }
                        case ComposerMethod.filter: {
                            composer.filter(that[handler.key]);
                            break;
                        }
                    }
                });
                return composer;
            });
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