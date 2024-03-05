import prisma from "../../../config/clientPrisma";

type removeQuantityInStockProps = {
  product_id: number;
  quantity: number;
};

export default async function removeQuantityInStock(
    userOrder: removeQuantityInStockProps[]
) {
    for (const item of userOrder) {
        const findProductStock = await prisma.stock.findUnique({
            where: {
                product_id: item.product_id,
            },
        });

        const editProductStock = await prisma.stock.update({
            where: {
                product_id: item.product_id,
            },
            data: {
                quantity: Number(findProductStock?.quantity) - Number(item.quantity),
            },
        });
        if (editProductStock) {
            if (editProductStock.quantity! <= 0) {
                await prisma.stock.update({
                    where: {
                        product_id: item.product_id,
                    },
                    data: {
                        status: "Indisponível",
                    },
                });
            }
        }
    }
}
