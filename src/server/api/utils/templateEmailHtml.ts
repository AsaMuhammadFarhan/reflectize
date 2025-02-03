/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { sendEmail } from "./email";
import { getTemplateEmail } from "./templateHtml";

export async function sendCreateTicketEmail(
  email: string,
  name: string,
  ticketCode: string
) {
  const html = getTemplateEmail({
    header: "Your Ticket Has Successfully Submitted",
    body: `Thank you, ${name}! Your ticket #${ticketCode} was successfully recorded in our system.
      Please check the ticket regularly for updates or  if you need any follow up please contact our technician.`,
    hyperlink: {
      title: "Link to track your ticket:",
      link: `${process.env.NEXTAUTH_URL}/track/${ticketCode}`,
    },
  });
  const studentSubject = `Success Submit Ticket #${ticketCode}`;
  await sendEmail(email, studentSubject, html);
}

export async function sendReceiveTicketEmail(
  email: string,
  ticketCode: string
) {
  const html = getTemplateEmail({
    header: "Dear PIC,",
    body: `Your department receive ticket with ID #${ticketCode}. Please check incoming ticket regularly and follow up all your ticket accordingly.`,
  });
  const studentSubject = `New Ticket Received!`;
  await sendEmail(email, studentSubject, html);
}