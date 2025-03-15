export default defineOAuthGoogleEventHandler({
    config: {
        emailRequired: true
        
    },
    async onSuccess(event, { user, tokens }) {

        const foundUser = await prisma.user.findFirst({
            where: {
                email: user.email
            }
        })

        if(!foundUser) {
            return sendRedirect(event, '/auth/login?error=email')
        }
        
        const userFirm = await prisma.userFirm.findFirst({
            where: {
                userId: foundUser.id,
            },
            include: {
                accessProfile: true,
                user: {
                    omit: {
                        password: true,
                    }
                },
                firm: true
            }
        })

        await setUserSession(event, {
            user: userFirm,
            loggedInAt: new Date()
        })
        return sendRedirect(event, '/')
    },
    // Optional, will return a json error and 401 status code by default
    onError(event, error) {
        console.error('GitHub OAuth error:', error)
        return sendRedirect(event, '/')
    },
})