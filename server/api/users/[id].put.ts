export default defineEventHandler(async (event) => {

    const session = await requireUserSession(event)

    const firmId = session.user.firmId

    const userId = getRouterParam(event, 'id');


    const body = await readBody(event);

    try {
        const validatedData = body
        // Check if the user exists and belongs to the firm
        const existingUser = await prisma.user.findFirst({
            where: {
                id: userId,
                userFirms: {
                    some: {
                        firmId: firmId,
                    },
                },
            }
        });
        if (!existingUser) {
            throw createError({ statusCode: 404, message: 'User not found or not accessible' });
        }
        // Hash password if new password
        let { accessProfileId, password, ...updateData } = validatedData
        // if (validatedData.password) {

        //     const hashedPassword = await hashPassword(user.password)
        //     updateData.password = await bcrypt.hash(validatedData.password, 10); // Hash the new password
        // }
        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...updateData,
                ...(password ? { password: await hashPassword(password) } : {}),
            },
            include: { // include to return this data
                userFirms: {
                    where: {
                        firmId: firmId
                    },
                    include: {
                        accessProfile: true
                    }
                },
            }
        });

        if (accessProfileId) {
            await prisma.userFirm.update({
                where: {
                    userId_firmId: {
                        firmId: firmId,
                        userId: userId,
                    }
                },
                data: {
                    accessProfileId: accessProfileId,
                },
            })
        }

        return updatedUser;
    } catch (error: any) {
        console.error("Error updating user:", error);
        if (error.code === 'P2002') { // Prisma unique constraint violation
            throw createError({ statusCode: 409, message: 'Email already exists' });
        }
        if (error instanceof Error && error.name === 'ZodError') {
            throw createError({ statusCode: 400, message: error.message });
        }
        throw createError({ statusCode: 500, message: 'Failed to update user' });
    }
});