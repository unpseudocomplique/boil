export default defineEventHandler(async (event) => {
    try {

        const session = await requireUserSession(event)

        const firmId = session.user.firmId
        const firm = await prisma.firm.findUnique({
            where: {
                id: firmId
            }
        });
        return firm;
    } catch (error) {
        console.error("Failed to fetch firm:", error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: 'Failed to fetch firm',
        });
    }
});