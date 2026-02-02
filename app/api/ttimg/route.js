export const runtime = "nodejs";

export async function POST(req) {
    try {
        const body = await req.json();
        const prompt = body?.prompt?.trim();

        if (!prompt) {
            return Response.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        // Use the main domain with /p/ path and .jpg extension
        const pollinationsUrl = `https://pollinations.ai/p/${encodedPrompt}.jpg?width=1024&height=1024&nologo=true&seed=${seed}`;

        // Fetch the image on the server side to avoid client-side CORS/blocking issues
        const imageRes = await fetch(pollinationsUrl);

        if (!imageRes.ok) {
            throw new Error(`Pollinations API failed with status ${imageRes.status}`);
        }

        const arrayBuffer = await imageRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString('base64');
        const imageUrl = `data:image/jpeg;base64,${base64Image}`;

        return Response.json({ imageUrl });

    } catch (error) {
        console.error("Handler Error:", error);
        return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
