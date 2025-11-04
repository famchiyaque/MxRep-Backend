// Mock email service for development/testing
// Use this when you don't have Gmail credentials configured

const sendMail = async (email, token, emailType = 'student-verification') => {  
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8322';
    const verificationLink = `${frontendUrl}/mxrep/registration/student/finalize?token=${token}`;
    
    console.log("\n╔════════════════════════════════════════════════════════════════╗");
    console.log("║                  📧 MOCK EMAIL SERVICE                         ║");
    console.log("╠════════════════════════════════════════════════════════════════╣");
    console.log(`║ To:      ${email.padEnd(52)}║`);
    console.log(`║ Subject: Verify Your TecBooks Account${' '.repeat(26)}║`);
    console.log(`║ Type:    ${emailType.padEnd(52)}║`);
    console.log("╠════════════════════════════════════════════════════════════════╣");
    console.log("║ 🔗 VERIFICATION LINK:                                          ║");
    console.log(`║ ${verificationLink.substring(0, 60).padEnd(60)}║`);
    if (verificationLink.length > 60) {
        console.log(`║ ${verificationLink.substring(60).padEnd(60)}║`);
    }
    console.log("╠════════════════════════════════════════════════════════════════╣");
    console.log("║ ✅ Email would be sent with beautiful HTML template           ║");
    console.log("║ 🎨 Features: Logo, Navy/Blue gradient, responsive design      ║");
    console.log("╚════════════════════════════════════════════════════════════════╝\n");
    
    return { 
        success: true, 
        messageId: `mock-${Date.now()}`,
        note: "Mock email - check console for verification link" 
    };
}

export default {
    sendMail
};

