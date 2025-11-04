// 3️⃣ Role-based access control (RBAC)
// export const allowRoles = (...roles) => (req, res, next) => {
//   if (!roles.includes(req.user.role))
//     return res.status(403).json({ error: 'Forbidden: Insufficient role' });
//   next();
// };


const superAdmin = (req, res, next) => {
    const decoded = req.user
    if (!decoded || decoded.body?.role !== "super-admin") {
        return res.status(403).json({ error: "Forbidden: Insufficient privileges" });
    }
    next()
}

const institutionAdmin = (req, res, next) => {
    const decoded = req.user
    if (!decoded || (decoded.body?.role !== "admin" && !decoded.body?.isAdmin)) {
        return res.status(403).json({ error: "Forbidden: Insufficient privileges" });
    }
    next()
}

const professor = (req, res, next) => {
    const decoded = req.user
    if (!decoded || decoded.body?.role !== "professor") {
        return res.status(403).json({ error: "Forbidden: Insufficient privileges" });
    }
    next()
}

const student = (req, res, next) => {
    const decoded = req.user
    if (!decoded || decoded.body?.role !== "student") {
        return res.status(403).json({ error: "Forbidden: Insufficient privileges" });
    }
    next()
}

const rbac = {
    superAdmin,
    institutionAdmin,
    professor,
    student
}

export default rbac