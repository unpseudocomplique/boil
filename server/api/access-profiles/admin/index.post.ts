export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event);
    const firmId = session.user.firmId;

    const body = await readBody(event);

    try {
        const accessProfile = await prisma.accessProfile.create({
            data: {
                ...body,
                display: body.display || 'My new profile',
                firmId: firmId,
            },
        });

        return accessProfile;
    } catch (error) {
        console.error("Error creating access profile:", error);
        if (error instanceof Error && error.name === 'ZodError') {
            throw createError({ statusCode: 400, message: error.message });
        }
        throw createError({ statusCode: 500, message: 'Failed to create access profile' });
    }
});