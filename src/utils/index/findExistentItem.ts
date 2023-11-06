import prisma from "../../../config/clientPrisma";

async function identifyEmail(find: string) {
    let toggleEmail;

    const includeAva = find.includes("@");
    if (includeAva) {
        toggleEmail = true;
    }

    return toggleEmail ? true : false;
}

async function  findExistentItem (item:string, keySearch: string | number) {

    switch(item){

        case 'user':
            const valueType = typeof keySearch == "string";

            if (valueType) {
                const identify = await identifyEmail(keySearch);
        
                if (identify) {
                    return await prisma.user.findFirst({
                        where: {
                            email: {
                                equals: keySearch,
                            },
                        },
                    });
                }
            } else {
                return await prisma.user.findFirst({
                    where: {
                        id: Number(keySearch),
                    },
                });
            }
        break;


    }
}

export default findExistentItem