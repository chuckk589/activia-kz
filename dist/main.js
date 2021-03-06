"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const app_config_service_1 = require("./modules/app-config/app-config.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableVersioning({ type: common_1.VersioningType.URI });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const configService = app.get(app_config_service_1.AppConfigService);
    await app.listen(configService.get('port'));
}
bootstrap();
//# sourceMappingURL=main.js.map