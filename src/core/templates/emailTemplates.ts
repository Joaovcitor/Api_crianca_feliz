export const emailTemplates = {
  resetPassword: (token: string) => `
    <p>Olá,</p>
    <p>Você solicitou a redefinição de senha. Clique no link abaixo para continuar:</p>
    <a href="${process.env.URL_FRONTEND}/reset-password/${token}">Redefinir senha</a>
    <p>Esse link tem duração de 1 hora!</p>
    <p>Se você não solicitou a redefinição de senha, ignore este e-mail.</p>
  `,
};
