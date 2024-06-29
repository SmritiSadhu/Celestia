const mongoose = require('mongoose')
const Roles = require('./models/Roles')

mongoose.connect(MONGO_URL, {

})
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo...')
})
mongoose.connection.on('error', (err) => {
    console.log('error connecting...', err)
})


// async function genRoles() {
//     try {
//         const rolesData = await Roles.find();
//         console.log(rolesData)
//     }
//     catch (e) {
//         console.log(e);
//     }
// }

// genRoles();


// async function genRoles() {
//     try {
//       const roleData = {
//         roleDomain: "Tech",
//         role: "Multinational Executive",
//       roleSummary: "We are seeking a Multinational Executive for an EB-1C visa application. This role involves overseeing international operations, managing global teams, and driving strategic initiatives across multiple countries.",
//       responsibilities: [
//         "Directing and overseeing international business operations and strategies.",
//         "Managing and leading global teams to achieve organizational goals.",
//         "Developing and implementing strategic plans to expand market presence and profitability.",
//         "Ensuring compliance with international regulations and corporate policies.",
//         "Building and maintaining relationships with key stakeholders and clients worldwide."
//       ],
//       requirements: [
//         "Bachelor’s degree in Business Administration, Management, or a related field.",
//         "Minimum of 3 years of experience in a senior executive or managerial role.",
//         "Proven track record of managing multinational teams and operations.",
//         "Strong leadership and decision-making skills.",
//         "Excellent communication and interpersonal skills.",
//         "Experience in multinational corporations or global enterprises."
//       ]
//       };
//       const newRole = new Roles({
//         role: roleData.role,
//         roleDomain:roleData.roleDomain,
//         roleSummary: roleData.roleSummary,
//         responsibilities: roleData.responsibilities,
//         requirements: roleData.requirements,
//       });
//       const savedRole = await newRole.save();
//       console.log("Role data saved successfully:", savedRole);
//     } catch (error) {
//       console.error("Error saving role data:", error);
//     }
//   }
//   genRoles();