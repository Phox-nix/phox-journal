import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { prisma } from '@/prisma';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === 'user.created') {
      const { id, email_addresses, username, first_name, last_name, image_url } = evt.data;
      await prisma.user.create({
        data: {
          id,
          email: email_addresses[0]?.email_address || `${id}@placeholder.com`,
          username: username || id,
          displayName: `${first_name || ''} ${last_name || ''}`.trim() || username || id,
          img: image_url,
        },
      });
    }

    if (eventType === 'user.updated') {
      const { id, email_addresses, username, first_name, last_name, image_url } = evt.data;
      await prisma.user.update({
        where: { id },
        data: {
          email: email_addresses[0].email_address,
          username: username || id,
          displayName: `${first_name || ''} ${last_name || ''}`.trim() || username || id,
          img: image_url,
        },
      });
    }

    if (eventType === 'user.deleted') {
      await prisma.user.delete({ where: { id } });
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response('Error', { status: 400 });
  }
}
