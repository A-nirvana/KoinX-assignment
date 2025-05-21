import { Holding } from "@/context/FinanceContext"; // adjust path as needed

export const sortHoldings = (
    holdings: Holding[],
    type: 'gain' | 'price' | 'stcg' | 'ltcg' | 'totalHolding' | 'coinName' | 'totalCurrentValue',
    asc: boolean
): Holding[] => {
    return [...holdings].sort((a, b) => {
        let valA: number | string = '';
        let valB: number | string = '';

        if (type === 'gain') {
            valA = a.stcg.gain + a.ltcg.gain;
            valB = b.stcg.gain + b.ltcg.gain;
        } else if (type === 'price') {
            valA = a.currentPrice;
            valB = b.currentPrice;
        } else if (type === 'stcg') {
            valA = a.stcg.gain;
            valB = b.stcg.gain;
        }
        else if (type === 'ltcg') {
            valA = a.ltcg.gain;
            valB = b.ltcg.gain;
        }
        else if (type === 'totalHolding') {
            valA = a.totalHolding;
            valB = b.totalHolding;
        }
        else if (type === 'coinName') {
            valA = a.coinName;
            valB = b.coinName;
        }
        else if (type === 'totalCurrentValue') {
            valA = a.currentPrice * a.totalHolding;
            valB = b.currentPrice * b.totalHolding;
        }


        if (typeof valA === 'string' && typeof valB === 'string') {
            return asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else if (typeof valA === 'number' && typeof valB === 'number') {
            return asc ? valA - valB : valB - valA;
        }

        return 0;
    });
};
