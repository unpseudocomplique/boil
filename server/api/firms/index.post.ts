export default defineEventHandler(async (event) => {
  const transactionResult = await prisma.$transaction(async (prisma) => {
    try {
      const { user, firm } = await readBody(event);
      if (!user || !firm?.display) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'Display name is required',
        });
      }

      const newFirm = await prisma.firm.create({
        data: {
          display: firm.display,
        },
      });

      // --- Create Default Access Profiles ---
      // Example: Create a default "Admin" access profile.  Adapt this to your needs.
      const defaultAccessProfile = await prisma.accessProfile.create({
        data: {
          firmId: newFirm.id,
          display: "Admin",
          // Add any other default fields for AccessProfile here
        },
      });
      
      const hashedPassword = await hashPassword(user.password)
      const defaultUser = await prisma.user.create({
        data: {
          ...user,
          password: hashedPassword,
        }
      })

      // --- Create Default UserFirm ---
      // Example:  Connect the new firm, a default user (you'd likely get this from auth), and the default access profile.
      const createdUserFirm = await prisma.userFirm.create({
        data: {
          firmId: newFirm.id,
          userId: defaultUser.id, //  Replace with the actual logged-in user's ID
          accessProfileId: defaultAccessProfile.id,
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
        user: createdUserFirm,
        // Private data accessible only on server/ routes
        secure: {
        },
        // Any extra fields for the session data
        loggedInAt: new Date()
      })

      return newFirm; // Return the new firm
    } catch (error: any) {
      console.error("Failed to create firm and default values:", error);
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
        message: 'Failed to create firm and associated data',
      });
    }
  });
  return transactionResult;
});