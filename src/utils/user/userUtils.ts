//import prisma from "../../../config/clientPrisma";

//import identifyEmail from "../index/findExistentItem";

// export default async function findExistentUser(keySearch: any) {
//     const valueType = typeof keySearch == "string";

//     if (valueType) {
//         const identify = identifyEmail(keySearch);

//         if (identify) {
//             return await prisma.user.findFirst({
//                 where: {
//                     email: {
//                         equals: keySearch,
//                     },
//                 },
//             });
//         }
//     } else {
//         return await prisma.user.findFirst({
//             where: {
//                 id: Number(keySearch),
//             },
//         });
//     }
// }
