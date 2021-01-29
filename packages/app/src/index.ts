import { fetchRedirect } from '@typescript-monorepo-example/url-fetch';

export async function main(url: string): Promise<void> {
  try {
    const result = await fetchRedirect(url)
    console.log()
  } catch (err) {
    console.log(err);
  }
}

main('https://some-url-with-a-redirect');