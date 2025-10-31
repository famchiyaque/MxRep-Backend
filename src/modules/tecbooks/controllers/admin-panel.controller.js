export const getInboxRequests = async (req, res) => {
  try {
    const { institutionId } = req.params;
    const requests = await institutionModel.find({
      institutionId: institutionId,
      status: "pending",
    });
    res.status(200).send({ data: requests });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};
