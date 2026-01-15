// Mock email service for development/testing
// Use this when you don't have Gmail credentials configured

const sendMail = async (email, token, emailType = 'student-verification', additionalData = {}) => {  
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8322';
    
    let link, subject;
    
    switch(emailType) {
        case 'student-verification':
            link = `${frontendUrl}/mxrep/registry/student/finalize?token=${token}`;
            subject = 'Verify Your TecBooks Account';
            break;
        case 'professor-request-notification':
            link = `${frontendUrl}/mxrep/${additionalData.institutionSlug}/admin-panel/inbox`;
            subject = 'New Professor Request - TecBooks';
            break;
        case 'admin-account-setup':
        case 'professor-account-setup':
            link = `${frontendUrl}/mxrep/account/setup?token=${token}`;
            subject = 'Set Up Your TecBooks Account';
            break;
        default:
            link = `${frontendUrl}/mxrep/registry/student/finalize?token=${token}`;
            subject = 'TecBooks Notification';
    }
    
    console.log("\n╔════════════════════════════════════════════════════════════════╗");
    console.log("║                  📧 MOCK EMAIL SERVICE                         ║");
    console.log("╠════════════════════════════════════════════════════════════════╣");
    console.log(`║ To:      ${email.padEnd(52)}║`);
    console.log(`║ Subject: ${subject.substring(0, 52).padEnd(52)}║`);
    console.log(`║ Type:    ${emailType.padEnd(52)}║`);
    console.log("╠════════════════════════════════════════════════════════════════╣");
    console.log("║ 🔗 LINK:                                                       ║");
    console.log(`║ ${link.substring(0, 60).padEnd(60)}║`);
    if (link.length > 60) {
        console.log(`║ ${link.substring(60, 120).padEnd(60)}║`);
    }
    if (link.length > 120) {
        console.log(`║ ${link.substring(120, 180).padEnd(60)}║`);
    }
    console.log("╠════════════════════════════════════════════════════════════════╣");
    console.log("║ ✅ Email would be sent with beautiful HTML template           ║");
    console.log("║ 🎨 Features: Logo, Navy/Blue gradient, responsive design      ║");
    console.log("╚════════════════════════════════════════════════════════════════╝\n");
    
    return { 
        success: true, 
        messageId: `mock-${Date.now()}`,
        note: "Mock email - check console for link" 
    };
}

export default {
    sendMail
};

