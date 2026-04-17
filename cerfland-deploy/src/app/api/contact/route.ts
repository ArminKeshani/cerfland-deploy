import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  subject: z.string().min(1),
  message: z.string().min(10).max(2000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // If Resend API key is configured, send email
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || 'contact@cerfland.fr';

    if (resendKey && resendKey \!== '') {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'CerfLand Site <noreply@cerfland.fr>',
          to: [toEmail],
          subject: `[CerfLand] Nouveau message — ${data.subject}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #8B7355;">Nouveau message de ${data.name}</h2>
              <p><strong>Email:</strong> ${data.email}</p>
              ${data.company ? `<p><strong>Entreprise:</strong> ${data.company}</p>` : ''}
              <p><strong>Sujet:</strong> ${data.subject}</p>
              <hr style="border-color: #3A3A3D; margin: 20px 0;" />
              <p style="white-space: pre-wrap;">${data.message}</p>
            </div>
          `,
        }),
      });

      if (\!res.ok) {
        console.error('Resend error:', await res.text());
      }
    } else {
      // Log to console if no email service configured
      console.log('Contact form submission:', data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 });
    }
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
