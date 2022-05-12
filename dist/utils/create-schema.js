"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
(async () => {
    const orm = await core_1.MikroORM.init({
        entities: ['./src/modules/mikroorm/entities/'],
        dbName: 'activia-uz',
        type: 'mysql',
        clientUrl: 'mysql://root:admin@127.0.0.1:3306/activia-uz',
    });
    const generator = orm.getSchemaGenerator();
    const dropDump = await generator.getDropSchemaSQL();
    console.log(dropDump);
    const createDump = await generator.getCreateSchemaSQL();
    console.log(createDump);
    const updateDump = await generator.getUpdateSchemaSQL();
    console.log(updateDump);
    const dropAndCreateDump = await generator.generate();
    console.log(dropAndCreateDump);
    await generator.dropSchema();
    await generator.createSchema();
    await generator.updateSchema();
    await generator.refreshDatabase();
    await generator.clearDatabase();
    await orm.close(true);
})();
//# sourceMappingURL=create-schema.js.map