import nodemailer from "nodemailer"

// This service is for creating and sending emails
// to the correct user with the correct link 

// Should be dynamic, but there are a few use cases to keep in mind:

// 1. Verify Email email to student on registration
// - should have the institution and email of student
// - should be sent to correct email
// - should generate jwt with student institution, email, and expiry in jwt
// - expiry should only last an hour
// - should sign this jwt
// - should contain button with link to frontend/mxrep/registration/student/finalize
// - should attach signed jwt as 'token' param in url of button



const sendMail = async (email,token) => {  

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GmailUser,
            pass: process.env.GmailPassword,
        },
    });

    const htmlBody = `
        <b>¡Bienvenido!</b>
        <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
        <a href="http://localhost:5173/frontend/mxrep/registration/student/finalize?token=${token}">Verificar mi cuenta</a>
    `;

    (async() => {
        const info = await transporter.sendMail({
            from: process.env.GmailName,
            to: email,
            subject: "Hello ",
            text: "Hello world?",
            html: htmlBody,
        });
        console.log("Message sent: %s", info.messageId);
    })();
}

export default {
    sendMail
};

// 2. Professor Registration Request Email -> Admin
// - should have the institution and name of new professor
// - should be sent to institutional admin (if various, choose one)
// - should include button with redirect to institutional admin panel
//     -> frontend/mxrep/{institution_slug}/admin-panel/approval

// 3. Professor registration reminder email -> admin
// - same as before, just reminder

// 4. Registry invitation email admin -> professor
// - receive prefilled info for professor: email, institution, ...
// - send 

// 5. Game Invite register professor -> students
// - receive array of student emails
// - receive unique new game code
// - send email to each student
// - email contains button with link: front/mxrep/student-panel/join-game?code=...
// - include code as 'code' param

// 4. Reset Password email
// - receive user's email
// - generate jwt with institution, email, and expiry (1 hour)
// - sign jwt
// - email contain button with link: front/mxrep/{slug}/reset-password
// - include jwt as 'token' param in url