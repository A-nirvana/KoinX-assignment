"use client"

import { useFinance } from '@/context/FinanceContext';

export default function Harvest() {
    const { state } = useFinance();

    if (!state.capitalGains) return <p>Loading...</p>;
    const { stcg, ltcg } = {
        stcg: {
            profits: state.capitalGains.stcg.profits + state.initialGains.stcg.profits,
            losses: state.capitalGains.stcg.losses + state.initialGains.stcg.losses,
        },
        ltcg: {
            profits: state.capitalGains.ltcg.profits + state.initialGains.ltcg.profits,
            losses: state.capitalGains.ltcg.losses + state.initialGains.ltcg.losses,
        },
    };
    const netStcg = stcg.profits - stcg.losses;
    const netLtcg = ltcg.profits - ltcg.losses;
    const initStcg = state.initialGains.stcg.profits - state.initialGains.stcg.losses;
    const initLtcg = state.initialGains.ltcg.profits - state.initialGains.ltcg.losses;
    const initTotal = initStcg + initLtcg;
    const total = netStcg + netLtcg;
    const save = initTotal - total;

    return (
        <div className="flex text-white flex-col py-6 bg-gradient-to-br from-[#3C9AFF] to-[#0066FE] rounded-lg w-full lg:w-[48%] px-3 md:pl-6 md:pr-16 shadow-sm lg:h-[18.5rem]">
            <p className="text-lg md:text-xl font-semibold">After Harvesting</p>
            <div className="grid grid-cols-6 md:grid-cols-4 gap-2 w-full text-sm md:text-base gap-y-2 mt-4 md:mt-2">
                <div className="col-span-2" />
                <div className="font-medium text-right col-span-2 md:col-span-1">Short-term</div>
                <div className="font-medium text-right col-span-2 md:col-span-1">Long-term</div>

                <div className="col-span-2">Profits</div>
                <div className="text-right text-nowrap col-span-2 md:col-span-1">${stcg.profits.toLocaleString()}</div>
                <div className="text-right text-nowrap col-span-2 md:col-span-1">${ltcg.profits.toLocaleString()}</div>

                <div className="col-span-2">Losses</div>
                <div className="text-right text-nowrap col-span-2 md:col-span-1">- ${stcg.losses.toLocaleString()}</div>
                <div className="text-right text-nowrap col-span-2 md:col-span-1">- ${ltcg.losses.toLocaleString()}</div>

                <div className="col-span-2 font-medium">Net Capital Gains</div>
                <div className="font-semibold text-right text-nowrap col-span-2 md:col-span-1">${netStcg.toLocaleString()}</div>
                <div className="font-semibold text-right text-nowrap col-span-2 md:col-span-1">${netLtcg.toLocaleString()}</div>
            </div>

            <div className="flex items-center mt-6 gap-4 font-semibold">
                <p className="text-base md:text-xl text-nowrap">Effective Capital Gains: </p>
                <p className="text-lg md:text-2xl">${total.toLocaleString()}</p>
            </div>

            <div className={`mt-6 transform ${save > 0 ? 'animate-slide-in' : 'translate-x-2 opacity-0 pointer-events-none'}`}>
                <div className={` flex gap-4 ${save > 0 ? 'shine' : ''} w-max pr-3`}>
                    <p className="text-base">
                        🎉 You are going to save up to{' '}
                        <span className="font-semibold">${save.toFixed(2)}</span>
                    </p>
                </div>
            </div>
        </div>);
}
