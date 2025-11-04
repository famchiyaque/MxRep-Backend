/**
 * Account Setup Email Template
 * Sent to admins and professors when their account is created/approved
 */

export const getAccountSetupEmail = (userName, institutionName, role, setupLink) => {
  const roleDisplay = role === 'admin' ? 'Administrator' : 'Professor';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Set Up Your TecBooks Account</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f7fa;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <!-- Main Container -->
                <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    
                    <!-- Header with Logo and Brand Colors -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
                            <img src="${process.env.BACKEND_URL || 'http://localhost:3000'}/public/assets/images/tecbooks-logo.png" 
                                 alt="TecBooks Logo" 
                                 style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 12px; background-color: white; padding: 10px;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Welcome to TecBooks!</h1>
                            <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Set Up Your Account</p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hello ${userName},
                            </p>
                            
                            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Great news! Your ${roleDisplay} account for <strong>${institutionName}</strong> has been created on TecBooks.
                            </p>
                            
                            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                To complete your account setup and start using the platform, please click the button below to set your password:
                            </p>
                            
                            <!-- CTA Button -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td align="center" style="padding: 0 0 30px 0;">
                                        <a href="${setupLink}" 
                                           style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">
                                            Set Up My Account
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Info Box -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 6px; margin: 0 0 30px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="color: #1e3a8a; font-size: 14px; line-height: 1.6; margin: 0; font-weight: 600;">
                                            ⏱️ This link will expire in 2 days
                                        </p>
                                        <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 10px 0 0 0;">
                                            For security reasons, this setup link is only valid for 2 days. If it expires, please contact your institution administrator or TecBooks support.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- What's Next Section -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb; border-radius: 8px; margin: 0 0 30px 0;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <h3 style="color: #1e3a8a; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
                                            🚀 What's Next?
                                        </h3>
                                        <ol style="color: #4b5563; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                                            <li>Click the "Set Up My Account" button above</li>
                                            <li>Create a secure password for your account</li>
                                            <li>Log in and start exploring TecBooks!</li>
                                        </ol>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Alternative Link -->
                            <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
                                If the button doesn't work, copy and paste this link into your browser:
                            </p>
                            <p style="margin: 10px 0 0 0;">
                                <a href="${setupLink}" 
                                   style="color: #3b82f6; font-size: 14px; word-break: break-all; text-decoration: underline;">
                                    ${setupLink}
                                </a>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 10px 0;">
                                If you didn't request this account, please ignore this email or contact support.
                            </p>
                            <p style="color: #9ca3af; font-size: 12px; line-height: 1.6; margin: 0;">
                                © ${new Date().getFullYear()} TecBooks. All rights reserved.
                            </p>
                            <p style="color: #9ca3af; font-size: 12px; line-height: 1.6; margin: 10px 0 0 0;">
                                Educational Manufacturing Simulation Platform
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `.trim();
};

