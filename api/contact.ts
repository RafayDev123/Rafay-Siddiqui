type ContactPayload = {
  name?: string;
  email?: string;
  project_type?: string;
  message?: string;
  captchaToken?: string;
  company?: string;
};

type RecaptchaResponse = {
  success: boolean;
  "error-codes"?: string[];
};

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default async function handler(request: Request) {
  if (request.method !== "POST") return json({ success: false, message: "Method not allowed" }, 405);

  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!recaptchaSecret || !accessKey) {
    return json({ success: false, message: "Contact form is not configured" }, 500);
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json({ success: false, message: "Invalid request" }, 400);
  }

  if (payload.company) return json({ success: false, message: "Spam submission blocked" }, 400);
  if (!payload.name?.trim() || !payload.email?.trim() || !payload.message?.trim() || !payload.captchaToken) {
    return json({ success: false, message: "Missing required fields" }, 400);
  }

  const captchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: recaptchaSecret, response: payload.captchaToken }),
  });
  const captchaResult = (await captchaResponse.json()) as RecaptchaResponse;
  if (!captchaResponse.ok || !captchaResult.success) {
    return json({ success: false, message: "reCAPTCHA verification failed" }, 400);
  }

  const formResponse = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New project inquiry - ${payload.project_type || "General inquiry"}`,
      from_name: payload.name,
      replyto: payload.email,
      name: payload.name,
      email: payload.email,
      project_type: payload.project_type,
      message: payload.message,
    }),
  });
  const formResult = (await formResponse.json()) as Web3FormsResponse;

  if (!formResponse.ok || !formResult.success) {
    return json({ success: false, message: "Message could not be sent" }, 502);
  }

  return json({ success: true });
}
