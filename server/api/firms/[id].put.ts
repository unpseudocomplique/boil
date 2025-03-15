export default defineEventHandler(async (event) => {
    try {
        const id = event.context.params?.id;
        if (!id) {
            throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'Firm ID is required' });
        }

        const body = await readBody(event);
        if (!body || !body.display) {
            throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'Display name is required' });
        }

        const updatedFirm = await prisma.firm.update({
            where: { id: id },
            data: {
                display: body.display,
            },
        });

        return updatedFirm;

    } catch (error: any) {
        console.error(`Failed to update firm with ID ${event.context.params?.id}:`, error);

        if (error.code === 'P2025') {
            throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Firm not found' });
        }
        if (error.statusCode) {
            throw error;
        }
        throw createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: 'Failed to update firm' });
    }
});