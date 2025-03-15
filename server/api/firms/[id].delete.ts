export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params?.id;
        if (!id) {
            throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'Firm ID is required' });
        }

        await prisma.firm.delete({
            where: { id: id },
        });

        return; // Return nothing (204 No Content is implied)

    } catch (error: any) {
        console.error(`Failed to delete firm with ID ${event.context.params?.id}:`, error);

        if (error.code === 'P2025') {
            throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Firm not found' });
        }
        if (error.statusCode) {
            throw error;
        }
        throw createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: 'Failed to delete firm' });
    }
});