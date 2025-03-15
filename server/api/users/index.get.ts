
export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)

    const firmId = session.user.firmId
    try {
        const users = await prisma.user.findMany({
            where: {
                userFirms: {
                  some: {
                    firmId: firmId,
                  },
                },
              },
            include: {
                userFirms: {
                    where: {
                        firmId: firmId, // Ensure we only get relevant UserFirm data.
                    },
                    include: {
                        accessProfile: true, //include the accessProfile
                    }
                },
            },
        });
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw createError({ statusCode: 500, message: 'Failed to fetch users' });
    }
});