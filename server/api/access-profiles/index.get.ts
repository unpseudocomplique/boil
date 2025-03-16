export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const firmId = session.user.firmId;

  const { page = '1', perPage = '10', search = '' as string } = getQuery(event);
  const pageNumber = parseInt(page as string, 10) - 1;
  const itemsPerPage = parseInt(perPage as string, 10);

  if (isNaN(pageNumber) || isNaN(itemsPerPage)) {
    throw createError({ statusCode: 400, message: 'Invalid pagination parameters' });
  }

  const skip = pageNumber * itemsPerPage;

  const where = {
    firmId,
    ...(search ? { display: { search } } : {}),
  }
  try {
    const [accessProfiles, total] = await prisma.$transaction([
      prisma.accessProfile.findMany({
        where,
        skip: skip,
        take: itemsPerPage,
        orderBy: { display: 'asc' },
      }),
      prisma.accessProfile.count({ where })
    ]);

    return {
      data: accessProfiles,
      pagination: {
        page: pageNumber + 1,
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