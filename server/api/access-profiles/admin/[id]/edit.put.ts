export default defineEventHandler(async (event) => {
    try {
        
        const session = await requireUserSession(event)
        const firmId = session.user.firmId
        const { accessProfile } = await readBody(event);

        if (!accessProfile?.display) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                message: 'Display name is required',
            });
        }

        const updatedAccessProfile = await prisma.accessProfile.update({
            where: {
                id: accessProfile.id,
                firmId
            },
            data: {
                display: accessProfile.display,
                managerUsers: accessProfile.managerUsers,
                manageProfiles: accessProfile.manageProfiles,
                manageFirm: accessProfile.manageFirm,
            },
        });

        return updatedAccessProfile;
    } catch (error: any) {
        console.error("Failed to update access profile:", error);
        // No need to explicitly roll back; Prisma handles it in $transaction
        if (error.statusCode) {
            throw error;
        }
        if (error.code === 'P2002') {
            throw createError({
                statusCode: 409,
                statusMessage: 'Conflict',
                message: 'Email must be unique',
            });
        }
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: 'Failed to update access profile',
        });
    }
});