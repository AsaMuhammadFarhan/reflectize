export function getTemplateEmail({
  header,
  body,
  addons,
  hyperlink,
}: {
  header: string;
  body: string;
  addons?: string[];
  hyperlink?: { title: string; link: string };
}) {
  return `<!doctype html>
  <html lang="en-US">

  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Know Myself Better</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #ffffff;
        font-family: 'Arial', sans-serif;
        color: #000000;
      }
      .container {
        max-width: 670px;
        margin: 40px auto;
        background: #ffffff;
        border: 1px solid #000000;
        border-radius: 5px;
        padding: 30px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      h1 {
        font-size: 28px;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 15px;
      }
      a {
        color: #000000;
        text-decoration: none;
        font-weight: bold;
      }
      a:hover {
        text-decoration: underline;
      }
      .footer {
        text-align: center;
        font-size: 14px;
        margin-top: 30px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <h1>${header}</h1>
      <p>${body}</p>
      ${addons ? addons.map((addon) => `<p>${addon}</p>`).join("") : ""}
      ${
        hyperlink
          ? `<p>${hyperlink.title}</p>
           <a href="${hyperlink.link}">Click Here</a>`
          : ""
      }
      <p>Know Myself Better</p>
    </div>
    <div class="footer">
      &copy; <strong>${process.env.NEXTAUTH_URL}</strong>
    </div>
  </body>

  </html>`;
}
