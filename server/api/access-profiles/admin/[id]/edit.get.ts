export default defineEventHandler(async (event) => {
    try {

        const session = await requireUserSession(event)

        const firmId = session.user.firmId
        const accessProfileId = getRouterParam(event, 'id')
        const accessProfile = await prisma.accessProfile.findUnique({
            where: {
                id: accessProfileId,
                firmId: firmId
            }
        });
        
        return accessProfile;
    } catch (error) {
        console.error("Failed to fetch access profile:", error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: 'Failed to fetch access profile',
        });
    }
});