import superAdminPanelUseCases from "../use-cases/register.use-cases.js";

const getInbox = async (req, res, decoded) => {
  try {
    const inbox = await superAdminPanelUseCases.getInbox(decoded)
    return res.status(200).json(inbox)
  } catch (err) {
    console.error("[Controller Error] get super admin inbox:", err.message);
    
    // Optionally check for known error types
    const status = err.statusCode || 500;
    const message = err.userMessage || "Internal server error";

    return res.status(status).json({ error: message });
  }
}


const superAdminControllers = {
    getInbox
};
  
export default superAdminControllers;