export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {

        if (!body.email || !body.password) {
            throw createError({ statusCode: 400, message: 'Email and password are required' });
        }

        const userFirm = await prisma.userFirm.findFirst({
            where: {
                user: {
                    email: body.email,
                },
            },
            include: {
                firm: true,
                user: true,
                accessProfile: true,
            },
        });

        if (!userFirm) {
            throw createError({ statusCode: 404, message: 'User not found' });
        }
        if (!(await verifyPassword(userFirm.user.password, body.password))) {
            throw createError({ statusCode: 404, message: 'Invalid password' });
        }



        await setUserSession(event, {
            user: userFirm,
            loggedInAt: new Date()
        })

        return {
            userFirm: {
                ...userFirm,
                user: {
                    ...userFirm.user,
                    password: undefined,
                }
            },
        };
    } catch (error) {
        console.error("Error logging in:", error);
        if (error instanceof Error && error.name === 'ZodError') {
            throw createError({ statusCode: 400, message: error.message });
        }
        throw createError({ statusCode: 500, message: 'Failed to log in' });
    }
});