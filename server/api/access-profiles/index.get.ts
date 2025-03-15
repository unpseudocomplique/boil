export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event);
    const firmId = session.user.firmId;
  
    const { page = '1', perPage = '10' } = getQuery(event);
    const pageNumber = parseInt(page as string, 10);
    const itemsPerPage = parseInt(perPage as string, 10);
  
    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(itemsPerPage) || itemsPerPage < 1) {
      throw createError({ statusCode: 400, message: 'Invalid pagination parameters' });
    }
  
    const skip = (pageNumber - 1) * itemsPerPage;
  
    try {
      const [accessProfiles, total] = await prisma.$transaction([
        prisma.accessProfile.findMany({
          where: { firmId },
          skip: skip,
          take: itemsPerPage,
          orderBy: { display: 'asc' },
        }),
        prisma.accessProfile.count({ where: { firmId } })
      ]);
  
      return {
        data: accessProfiles,
        pagination: {
          page: pageNumber,
          perPage: itemsPerPage,
          total: total,
          totalPages: Math.ceil(total / itemsPerPage)
        }
      };
    } catch (error) {
      console.error("Error fetching access profiles:", error);
      throw createError({ statusCode: 500, message: 'Failed to fetch access profiles' });
    }
  });