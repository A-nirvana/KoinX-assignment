function randomInRange(min: number, max: number, decimals = 2): number {
    const factor = Math.pow(10, decimals);
    const raw = Math.random() * (max - min) + min;
    return Math.round(raw * factor) / factor;
}

export async function GET() {
    return Response.json({
        capitalGains: {
            stcg: {
                profits: randomInRange(2000, 3000),
                losses: randomInRange(1000, 2000),
            },
            ltcg: {
                profits: randomInRange(4000, 6000),
                losses: randomInRange(2000, 4000),
            },
        },
    })
}