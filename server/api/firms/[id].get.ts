export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params?.id;
        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                message: 'Firm ID is required',
            });
        }

        const firm = await prisma.firm.findUnique({
            where: { id: id },
        });

        if (!firm) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Not Found',
                message: 'Firm not found',
            });
        }

        return firm;
    } catch (error: any) {
        console.error(`Failed to fetch firm with ID ${event.context.params?.id}:`, error);
        if (error.statusCode) {
            throw error;
        }
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: 'Failed to fetch firm',
        });
    }
});