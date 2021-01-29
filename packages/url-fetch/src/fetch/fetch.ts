import https from 'https';
import { IncomingMessage } from 'http';

export async function fetchRedirect(url: string): Promise<string> {
  const { statusCode, headers } = await new Promise<IncomingMessage>((resolve) => {
    https.get(url, (res) => {
      resolve(res);
    });
  });

  const newUrl = headers?.location;

  if ((statusCode !== 301 && statusCode !== 302) ?? !newUrl) {
    throw new Error('Unable to get new url');
  }

  return newUrl;
}
