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
exports.User = exports.UserGender = exports.Locale = exports.UserRole = void 0;
const core_1 = require("@mikro-orm/core");
const bcrypt_1 = require("bcrypt");
const City_1 = require("./City");
const Promo_1 = require("./Promo");
const Check_1 = require("./Check");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var Locale;
(function (Locale) {
    Locale["RU"] = "ru";
    Locale["UZ"] = "uz";
})(Locale = exports.Locale || (exports.Locale = {}));
var UserGender;
(function (UserGender) {
    UserGender["MALE"] = "male";
    UserGender["FEMALE"] = "female";
})(UserGender = exports.UserGender || (exports.UserGender = {}));
let User = class User {
    constructor() {
        this.checks = new core_1.Collection(this);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    async beforeCreate() {
        if (this.password) {
            this.password = await (0, bcrypt_1.hash)(this.password, 10);
        }
    }
    async comparePassword(password) {
        if (this.password) {
            return await (0, bcrypt_1.compare)(password, this.password);
        }
        return true;
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, core_1.Unique)(),
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "chatId", void 0);
__decorate([
    (0, core_1.Unique)(),
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "credentials", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => Locale, default: Locale.RU }),
    __metadata("design:type", String)
], User.prototype, "locale", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => UserRole, default: UserRole.USER }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, core_1.Property)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "registered", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => City_1.City, { nullable: true }),
    __metadata("design:type", City_1.City)
], User.prototype, "city", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Promo_1.Promo, { nullable: true }),
    __metadata("design:type", Promo_1.Promo)
], User.prototype, "promo", void 0);
__decorate([
    (0, core_1.OneToMany)(() => Check_1.Check, (check) => check.user),
    __metadata("design:type", Object)
], User.prototype, "checks", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => UserGender, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.BeforeUpdate)(),
    (0, core_1.BeforeCreate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "beforeCreate", null);
User = __decorate([
    (0, core_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map