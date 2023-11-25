"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/index/findExistentItem.ts
var findExistentItem_exports = {};
__export(findExistentItem_exports, {
  default: () => findExistentItem_default
});
module.exports = __toCommonJS(findExistentItem_exports);

// config/clientPrisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var clientPrisma_default = prisma;

// src/utils/index/findExistentItem.ts
async function identifyEmail(find) {
  let toggleEmail;
  const includeAva = find.includes("@");
  if (includeAva) {
    toggleEmail = true;
  }
  return toggleEmail ? true : false;
}
async function findExistentItem(item, keySearch) {
  switch (item) {
    case "user":
      const valueType = typeof keySearch == "string";
      if (valueType) {
        const identify = await identifyEmail(keySearch);
        if (identify) {
          return await clientPrisma_default.user.findFirst({
            where: {
              email: {
                equals: keySearch
              }
            }
          });
        }
      } else {
        return await clientPrisma_default.user.findFirst({
          where: {
            id: Number(keySearch)
          }
        });
      }
      break;
  }
}
var findExistentItem_default = findExistentItem;
