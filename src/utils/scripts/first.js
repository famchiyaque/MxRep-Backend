import mongoose from 'mongoose'
const bcrypt = require("bcryptjs");
require("dotenv").config();

const { Institution } = require("../../models/tecbooks/institution.model");
const { User } = require("../../models/tecbooks/user.model");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mxrep";

async function connect() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to", MONGO_URI);
}

async function seed() {
  // create institutions
  const institutionsData = [
    {
      _id: new mongoose.Types.ObjectId(),
      name: "Universidad Nacional Demo",
      country: "Mexico",
      city: "Mexico City",
      email: "contact@undemo.edu.mx",
      domain: "undemo.edu.mx",
      slug: "undemo",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      name: "Instituto Tecnológico Ejemplo",
      country: "Mexico",
      city: "Monterrey",
      email: "info@itejemplo.edu.mx",
      domain: "itejemplo.edu.mx",
      slug: "itejemplo",
    },
    {
      _id: new mongoose.Types.ObjectId(),
      name: "Universidad Demo Norte",
      country: "Mexico",
      city: "Tijuana",
      email: "hello@udn.edu.mx",
      domain: "udn.edu.mx",
      slug: "udn",
    },
  ];

  // upsert institutions (avoid duplicates on re-run)
  for (const inst of institutionsData) {
    await Institution.updateOne({ slug: inst.slug }, { $set: inst }, { upsert: true });
  }
  const createdInstitutions = await Institution.find({ slug: { $in: institutionsData.map(i => i.slug) } });
  console.log("Institutions created/found:");
  createdInstitutions.forEach(i => console.log(i.slug, i._id.toString()));

  // create users referencing created institutions
  const passwordPlain = "Pass1234!";
  const passwordHash = await bcrypt.hash(passwordPlain, 10);

  const usersData = [
    {
      _id: new mongoose.Types.ObjectId(),
      institutionId: createdInstitutions[0]._id,
      firstNames: "María Fernanda",
      lastNames: "García",
      department: "Ingeniería Industrial",
      email: "maria.garcia@undemo.edu.mx",
      passwordHash,
      role: "professor",
      isAdmin: true,
      needsToConfigurePass: false,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      institutionId: createdInstitutions[0]._id,
      firstNames: "Carlos",
      lastNames: "López",
      department: "Administración",
      email: "carlos.lopez@undemo.edu.mx",
      passwordHash,
      role: "student",
      isAdmin: false,
      needsToConfigurePass: true,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      institutionId: createdInstitutions[1]._id,
      firstNames: "Ana",
      lastNames: "Martínez",
      department: "Negocios",
      email: "ana.martinez@itejemplo.edu.mx",
      passwordHash,
      role: "professor",
      isAdmin: false,
      needsToConfigurePass: false,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      institutionId: createdInstitutions[2]._id,
      firstNames: "Luis",
      lastNames: "Pérez",
      department: "Producción",
      email: "luis.perez@udn.edu.mx",
      passwordHash,
      role: "admin",
      isAdmin: true,
      needsToConfigurePass: false,
    },
  ];

  // upsert users by email
  for (const u of usersData) {
    await User.updateOne({ email: u.email }, { $set: u }, { upsert: true });
  }

  const createdUsers = await User.find({ email: { $in: usersData.map(u => u.email) } }).lean();
  console.log("Users created/found:");
  createdUsers.forEach(u => console.log(u.email, u.role, u.institutionId.toString()));

  console.log("\nSeed finished. Example login password for created users:", passwordPlain);
}

(async () => {
  try {
    await connect();
    await seed();
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
})();