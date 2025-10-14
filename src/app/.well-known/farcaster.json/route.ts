function withValidProperties(properties: Record<string, undefined | string | string[]>) {
return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
);
}

export async function GET() {
const URL = process.env.NEXT_PUBLIC_URL as string;
return Response.json(
    {
    "accountAssociation": {
    "header": "eyJmaWQiOjEzNjYwOTUsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhiMkJkM2EyMDY1QjVFMThjQTdkOTJDYWQ5OGE5MGMxRUExNjg3QzJBIn0",
    "payload": "eyJkb21haW4iOiJwb2tlbW9uLWNhdGNoLW51LnZlcmNlbC5hcHAifQ",
    "signature": "MHgxNDM1ZjUzZmI4YWZmMTU2MjE0NDc0YzY1ZWI5ZTQ2NjlkZmZlMmI3ZmExYzdjOTdhZmFkOTQ1ZDc2MmY4N2UyNmU1OGNjOTU2NmU5Y2IwMTU3MWNlZThmOTM4NDVlZTUyNTY5ZGU5ZWI3NDMzNWZmNTcwMGUyMGQ2M2U0NTFhMzFi"
  },
  "baseBuilder": {
    "allowedAddresses": ["0xa1bf131da72bb3ac780c9b0835000a2d6f643186"] // add your Base Account address here
  },
  "miniapp": {
    "version": "1",
    "name": "Pokemon Catch",
    "homeUrl": `${URL}`,
    "iconUrl": "https://ex.co/i.png",
    "splashImageUrl": "https://ex.co/l.png",
    "splashBackgroundColor": "#000000",
    "webhookUrl": "https://ex.co/api/webhook",
    "subtitle": "Feed Your Pokemons",
    "description": "Spend time by feeding pokemons by catching berries",
    "screenshotUrls": [
      "https://ex.co/s1.png",
      "https://ex.co/s2.png",
      "https://ex.co/s3.png"
    ],
    "primaryCategory": "social",
    "tags": ["example", "miniapp", "baseapp"],
    "heroImageUrl": "https://ex.co/og.png",
    "tagline": "Play repeatedly",
    "ogTitle": "Example Mini App",
    "ogDescription": "Challenge friends in real time.",
    "ogImageUrl": "https://ex.co/og.png",
    "noindex": true
  }
}
);
}
