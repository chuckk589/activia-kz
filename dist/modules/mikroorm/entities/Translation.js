"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translation = void 0;
const core_1 = require("@mikro-orm/core");
const TranslationValue_1 = require("./TranslationValue");
let Translation = class Translation {
    constructor() {
        this.values = new core_1.Collection(this);
    }
    getLocalizedLabel(locale) {
        return this.values?.toArray().find((v) => v.code == locale)?.value ?? this.name;
    }
    getAllLabels() {
        return this.values.toArray().reduce((acc, cur) => {
            acc[cur.code] = cur.value;
            return acc;
        }, {});
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Translation.prototype, "id", void 0);
__decorate([
    (0, core_1.Unique)(),
    (0, core_1.Property)({ length: 255 }),
    __metadata("design:type", String)
], Translation.prototype, "name", void 0);
__decorate([
    (0, core_1.OneToMany)(() => TranslationValue_1.TranslationValue, (TranslationValue) => TranslationValue.translation),
    __metadata("design:type", Object)
], Translation.prototype, "values", void 0);
Translation = __decorate([
    (0, core_1.Entity)()
], Translation);
exports.Translation = Translation;
//# sourceMappingURL=Translation.js.map