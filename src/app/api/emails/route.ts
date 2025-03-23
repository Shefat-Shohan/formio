import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { emailList, subject, emailTemplate } = body;

    // Validate input
    if (!emailList || !Array.isArray(emailList) || emailList.length === 0) {
      return Response.json({ error: "Invalid email list." }, { status: 400 });
    }
    if (!subject || typeof subject !== "string") {
      return Response.json({ error: "Invalid subject." }, { status: 400 });
    }
    if (!emailTemplate || typeof emailTemplate !== "string") {
      return Response.json(
        { error: "Invalid email template." },
        { status: 400 }
      );
    }

    // Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, 
      port: parseInt(process.env.SMTP_PORT || "587"), 
      secure: process.env.SMTP_PORT === "465", 
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS, 
      },
    });

    // Send emails in bulk
    for (const email of emailList) {
      await transporter.sendMail({
        from: `Formio <${process.env.SMTP_USER}>`,
        to: email, // Send to each recipient individually
        subject: subject,
        html: emailTemplate, // HTML template
      });
    }

    console.log("Emails sent successfully");
    return Response.json({
      success: true,
      message: "Emails sent successfully!",
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    return Response.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
