"use client";

import useSWR from "swr";
import { useFinance } from "@/context/FinanceContext";
import { useEffect } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Capital() {
  const { data, error, isLoading } = useSWR("/api/capital-gains", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { dispatch } = useFinance();

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_CAPITAL_GAINS", payload: data.capitalGains });
    }
  }, [dispatch, data]);

  if (isLoading)
    return (
      <div className="flex flex-col py-6 bg-component animate-pulse rounded-lg w-full lg:w-[48%] pl-3 md:pl-6 pr-3 md:pr-16 shadow-sm lg:h-[18.5rem]"/>
    );
  if (error) return <p>Error loading capital gains data</p>;
  const { stcg, ltcg } = data.capitalGains;
  const netStcg = stcg.profits - stcg.losses;
  const netLtcg = ltcg.profits - ltcg.losses;
  const total = netStcg + netLtcg;

  return (
    <div className="flex flex-col py-6 bg-component rounded-lg w-full lg:w-[48%] pl-3 md:pl-6 pr-3 md:pr-16 shadow-sm lg:h-[18.5rem]">
      <p className="text-lg md:text-xl font-semibold">Pre Harvesting</p>
      <div className="grid grid-cols-6 md:grid-cols-4 gap-2 w-full text-sm md:text-base gap-y-2 mt-4 md:mt-2">
        <div className="col-span-2" />
        <div className="font-medium text-right col-span-2 md:col-span-1">
          Short-term
        </div>
        <div className="font-medium text-right col-span-2 md:col-span-1">
          Long-term
        </div>

        <div className="col-span-2">Profits</div>
        <div className="text-right text-nowrap col-span-2 md:col-span-1">
          ${stcg.profits.toLocaleString()}
        </div>
        <div className="text-right text-nowrap col-span-2 md:col-span-1">
          ${ltcg.profits.toLocaleString()}
        </div>

        <div className="col-span-2">Losses</div>
        <div className="text-right text-nowrap col-span-2 md:col-span-1">
          - ${stcg.losses.toLocaleString()}
        </div>
        <div className="text-right text-nowrap col-span-2 md:col-span-1">
          - ${ltcg.losses.toLocaleString()}
        </div>

        <div className="col-span-2 font-medium">Net Capital Gains</div>
        <div className="font-semibold text-right text-nowrap col-span-2 md:col-span-1">
          ${netStcg.toLocaleString()}
        </div>
        <div className="font-semibold text-right text-nowrap col-span-2 md:col-span-1">
          ${netLtcg.toLocaleString()}
        </div>
      </div>

      <div className="flex items-center mt-6 gap-4 font-semibold">
        <p className="text-base md:text-xl text-nowrap">
          Realised Capital Gains:{" "}
        </p>
        <p className="text-lg md:text-2xl">${total.toLocaleString()}</p>
      </div>
    </div>
  );
}
