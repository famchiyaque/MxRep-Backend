import nodemailer from "nodemailer"
import { DatabaseError } from "#src/utils/errors/AppError.js"
import { getStudentVerificationEmail } from "./templates/studentVerification.template.js"
import { getProfessorRequestNotificationEmail } from "./templates/professorRequestNotification.template.js"

// This service is for creating and sending emails
// to the correct user with the correct link 

// Should be dynamic, but there are a few use cases to keep in mind:

// 1. Verify Email email to student on registration
// 2. Professor Registration Request Email -> Admin
// 3. Professor registration reminder email -> admin
// 4. Registry invitation email admin -> professor
// 5. Game Invite register professor -> students
// 6. Reset Password email

const sendMail = async (email, token, emailType = 'student-verification', additionalData = {}) => {  
    try {
        // Validate environment variables
        if (!process.env.GmailUser || !process.env.GmailPassword) {
            console.error("[Email Service] Missing Gmail credentials in environment variables");
            throw new DatabaseError("Email service is not configured. Please contact support.");
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GmailUser,
                pass: process.env.GmailPassword,
            },
        });

        // Get HTML template based on email type
        let htmlBody;
        let subject;
        
        switch (emailType) {
            case 'student-verification': {
                const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8322';
                const verificationLink = `${frontendUrl}/mxrep/registry/student/finalize?token=${token}`;
                htmlBody = getStudentVerificationEmail(verificationLink);
                subject = "Verify Your TecBooks Account";
                break;
            }
            case 'professor-request-notification': {
                const { adminName, professorName, professorEmail, department, institutionSlug } = additionalData;
                htmlBody = getProfessorRequestNotificationEmail(
                    adminName, 
                    professorName, 
                    professorEmail, 
                    department, 
                    institutionSlug
                );
                subject = "New Professor Request - TecBooks";
                break;
            }
            // Add more email types here in the future
            default: {
                const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8322';
                const verificationLink = `${frontendUrl}/mxrep/registry/student/finalize?token=${token}`;
                htmlBody = getStudentVerificationEmail(verificationLink);
                subject = "Verify Your TecBooks Account";
            }
        }

        const info = await transporter.sendMail({
            from: `TecBooks <${process.env.GmailUser}>`,
            to: email,
            subject: subject,
            html: htmlBody,
        });
        
        console.log("[Email Service] Message sent successfully:", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (err) {
        console.error("[Email Service] Error sending email:", err);
        
        // Handle specific nodemailer errors
        if (err.code === 'EAUTH') {
            throw new DatabaseError("Email authentication failed. Please check email credentials.");
        }
        
        if (err.code === 'ECONNECTION') {
            throw new DatabaseError("Failed to connect to email server. Please try again later.");
        }

        // Re-throw if already an AppError
        if (err.statusCode) throw err;
        
        throw new DatabaseError(`Failed to send verification email: ${err.message}`, err);
    }
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