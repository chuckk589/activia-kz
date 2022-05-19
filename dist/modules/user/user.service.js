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
exports.UserService = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("@nestjs/common");
const City_1 = require("../mikroorm/entities/City");
const Promo_1 = require("../mikroorm/entities/Promo");
const User_1 = require("../mikroorm/entities/User");
const retrieve_user_dto_1 = require("./dto/retrieve-user.dto");
let UserService = class UserService {
    constructor(em) {
        this.em = em;
    }
    async findAll() {
        const users = await this.em.find(User_1.User, {}, { populate: ['promo.translation.values', 'city.translation.values'] });
        return users.map((user) => new retrieve_user_dto_1.RetrieveUserDto(user));
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    async update(id, updateUserDto) {
        return await this.em.nativeUpdate(User_1.User, { id }, {
            ...(updateUserDto.city ? { city: this.em.getReference(City_1.City, Number(updateUserDto.city)) } : {}),
            ...(updateUserDto.credentials ? { credentials: updateUserDto.credentials } : {}),
            ...(updateUserDto.locale ? { locale: updateUserDto.locale } : {}),
            ...(updateUserDto.promo ? { promo: this.em.getReference(Promo_1.Promo, Number(updateUserDto.promo)) } : {}),
            ...(updateUserDto.phone ? { phone: updateUserDto.phone } : {}),
            ...(updateUserDto.role ? { role: updateUserDto.role } : {}),
            ...('registered' in updateUserDto ? { registered: Boolean(updateUserDto.registered) } : {}),
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map