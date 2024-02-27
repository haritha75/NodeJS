async function getProductStatistics() {
  try {
    const pipeline = [
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: "$price" },
          highestQuantity: { $max: "$quantity" },
        },
      },
    ];

    const result = await db.collection.aggregate(pipeline).toArray();
    return result[0];
  } catch (error) {
    console.error("Error in getProductStatistics:", error);
    throw error;
  }
}
