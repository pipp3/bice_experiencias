import nodemailer from "nodemailer";

export const emailForgetPassword = async (datos) => {
  const { email, nombre, token } = datos;
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  const info = await transport.sendMail({
    from: '"Bice Experiencias" <cuentas@biceexperiencias.com>',
    to: email,
    subject: "Bice Experiencias - Cambio de contraseña",
    text: "Cambia tu contraseña de Bice Experiencias",
    html: `<p>Estimado: ${nombre} hemos recibido su solicitud para cambiar su contraseña exitosamente. Haga click en el siguiente enlace para hacer el cambio efectivo:  
      </p>
      <a href="${process.env.FRONTEND_URL}/new-password/${token}">Cambiar Contraseña</a>
      <p>Si usted no solicito un cambio de contraseña, puede ignorar este mensaje.</p>
      `,
  });
  
};

