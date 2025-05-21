"use client";

import useSWR from "swr";
import Holding from "./Holding";
import { Holding as HoldingType, useFinance } from "@/context/FinanceContext";
import { useEffect, useState } from "react";
import { sortHoldings } from "@/utils/sort";

export default function AllHoldings() {
  const { data, isLoading, error } = useSWR(
    "/api/holdings",
    (url: string) => fetch(url).then((res) => res.json()),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const [viewAll, setViewAll] = useState(false);
  const { state, dispatch } = useFinance();

  useEffect(() => {
    if (data) dispatch({ type: "SET_HOLDINGS", payload: data });
  }, [data]);

  const [currentType, setCurrentType] = useState<
    "stcg" | "ltcg" | "totalHolding" | "coinName" | "totalCurrentValue" | null
  >(null);
  const [asc, setAsc] = useState(true);

  const sortByType = (type: typeof currentType) => {
    if (type) {
      const newAsc = type === currentType ? !asc : true;
      setCurrentType(type);
      setAsc(newAsc);
      const sorted = sortHoldings(state.holdings, type, newAsc);
      dispatch({ type: "SET_HOLDINGS", payload: sorted });
    }
  };
  const SelectAll = (checked: boolean) => {
    state.holdings.forEach((h) =>
      dispatch({ type: "TOGGLE_HOLDING", coin: h.coin, checked })
    );
  };

  const [holdings, setHoldings] = useState<HoldingType[]>([]);
  useEffect(() => {
    if (viewAll) {
      setHoldings(state.holdings);
    } else {
      if (state.holdings) setHoldings(state.holdings.slice(0, 5));
    }
  }, [state.holdings, viewAll]);

  if (error) return <p>Error loading holdings data</p>;
  if (isLoading || !holdings) return <p>Loading...</p>;
  return (
    <section className="w-full px-2 lg:px-6 py-6 bg-component mt-6 rounded-[8px] shadow-sm">
      <p className="text-lg lg:text-xl font-semibold pl-2 lg:pl-0">Holdings</p>
      <div className="flex mt-8 py-3 lg:py-1 lg:pl-4 items-center gap-2 lg:pr-6 pl-2 pr-2 bg-background rounded-[8px]">
        <input
          checked={state.allSelected}
          onChange={(e) => SelectAll(e.target.checked)}
          type="checkbox"
          className="ui-checkbox"
        />

        {/*long component cuz of all the custom buttons*/}
        <div className="grid grid-cols-2 lg:grid-cols-6 text-right w-full text-sm big:text-base">
          <button
            onClick={() => sortByType("coinName")}
            className="w-full h-full flex items-center text-left cursor-pointer ml-3"
          >
            <span className="font-semibold text-sm big:text-base">Asset</span>
            {currentType === "coinName" && (
              <span
                className={`mr-1 text-xs ${
                  asc ? "text-green-500" : "text-red-500"
                }`}
              >
                {asc ? "▲" : "▼"}
              </span>
            )}
          </button>

          <button
            onClick={() => sortByType("totalHolding")}
            className="w-full h-full flex flex-col items-end  cursor-pointer"
          >
            <div className="flex items-center">
              {currentType === "totalHolding" && (
                <span
                  className={`mr-1 text-xs ${
                    asc ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {asc ? "▲" : "▼"}
                </span>
              )}
              <span className="font-semibold text-sm big:text-base">Holdings</span>
            </div>
            <span className="text-xs font-semibold text-muted-foreground hidden lg:block">
              Current Market Rate
            </span>
          </button>

          <button
            onClick={() => sortByType("totalCurrentValue")}
            className="w-full h-full hidden lg:flex items-center justify-end  cursor-pointer"
          >
            {currentType === "totalCurrentValue" && (
              <span
                className={`mr-1 text-xs ${
                  asc ? "text-green-500" : "text-red-500"
                }`}
              >
                {asc ? "▲" : "▼"}
              </span>
            )}
            <span className="font-semibold text-sm big:text-base">Total Current Value</span>
          </button>

          <button
            onClick={() => sortByType("stcg")}
            className="w-full h-full hidden lg:flex items-center justify-end cursor-pointer"
          >
            {currentType === "stcg" && (
              <span
                className={`mr-1 text-xs ${
                  asc ? "text-green-500" : "text-red-500"
                }`}
              >
                {asc ? "▲" : "▼"}
              </span>
            )}
            <span className="font-semibold text-sm big:text-base">Short-Term</span>
          </button>

          <button
            onClick={() => sortByType("ltcg")}
            className="w-full h-full hidden lg:flex items-center justify-end  cursor-pointer"
          >
            {currentType === "ltcg" && (
              <span
                className={`mr-1 text-xs ${
                  asc ? "text-green-500" : "text-red-500"
                }`}
              >
                {asc ? "▲" : "▼"}
              </span>
            )}
            <span className="font-semibold text-sm big:text-base">Long-Term</span>
          </button>
          <div className="h-full hidden lg:flex items-center justify-end">
            <p className= "text-sm big:text-base font-semibold">Amout to Sell</p>
          </div>
        </div>
      </div>
      {holdings.map((holding: HoldingType, index: number) => (
        <Holding key={index} holding={holding} />
      ))}
      <div className="flex justify-start mt-4">
        <button
          onClick={() => setViewAll(!viewAll)}
          className="text-blue-500 hover:underline"
        >
          {viewAll ? "View Less" : "View All"}
        </button>
      </div>
    </section>
  );
}
