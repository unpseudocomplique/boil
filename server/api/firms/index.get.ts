export default defineEventHandler(async (event) => {
    try {
        const firms = await prisma.firm.findMany();
        return firms;
    } catch (error) {
        console.error("Failed to fetch firms:", error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: 'Failed to fetch firms',
        });
    }
});