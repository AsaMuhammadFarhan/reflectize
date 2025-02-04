import { sendEmail } from "../email";
import { getTemplateEmail } from "../templateHtml";

export async function sendVerificationEmail({
  email,
  name,
  token,
  username,
}: {
  email: string;
  name: string;
  token: string;
  username: string;
}) {
  const html = getTemplateEmail({
    header: `Gunakan ${token} Sebagai Kode OTP Kamu`,
    body: `${name}, verifikasi akunmu dengan mengisi kode OTP pada halaman verifikasi! OTP akan hangus dalam 1 jam.`,
    hyperlink: {
      title: "Link halaman verifikasi",
      link: `${process.env.NEXTAUTH_URL}/verification/${username}`,
    },
  });
  const subject = `Kode OTP Know Myself Better: ${token}`;
  await sendEmail(email, subject, html);
}
