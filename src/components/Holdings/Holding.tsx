"use client";

import Image from "next/image";
import { FormattedNumber } from "@/utils/format";
import { useFinance } from "@/context/FinanceContext";
import { Holding as HoldingType } from "@/context/FinanceContext";

interface HoldingProps {
  holding: HoldingType;
}

export default function Holding({ holding }: HoldingProps) {
  const { dispatch } = useFinance();

  function Toggle(coin: string, checked: boolean) {
    dispatch({ type: "TOGGLE_HOLDING", coin, checked });
  }

  const select = holding.selected;

  return (
    <div
      className={`flex ${
        select ? "bg-accord" : "bg-component"
      } py-3 pl-2 pr-2 lg:pl-4 items-center lg:gap-2 lg:pr-6 border-b border-[#DBE2EC]`}
    >
      <input
        checked={select}
        onChange={(e) => {
          Toggle(holding.coin, e.target.checked);
        }}
        type="checkbox"
        className="ui-checkbox"
      />
      <div className="grid grid-cols-2 lg:grid-cols-6 text-right w-full text-sm big:text-base">
        <div className="flex ml-3">
          <Image
            src={holding.logo}
            alt="Logo"
            height={35}
            width={35}
            className="h-max"
          />
          <div className="text-left ml-2 w-full">
            <p className="text-sm big:text-base font-semibold truncate w-[80%]">
              {holding.coinName}
            </p>
            <p className="text-sm text-gray-500">{holding.coin}</p>
          </div>
        </div>
        <div>
          <div className="text-sm big:text-base font-semibold truncate">
            <FormattedNumber value={holding.totalHolding} />{" "}
            {holding.coin}
          </div>
          <p className="text-xs text-muted-foreground font-semibold mt-1">
            ${" "}
            {holding.currentPrice == 0
              ? "0.00"
              : holding.currentPrice.toFixed(8).replace(/0+$/, "")}{" "}
            /{holding.coin}
          </p>
        </div>
        <div className="h-full hidden lg:flex items-center justify-end">
          <p className="text-sm big:text-base font-semibold">
            ${" "}
            <FormattedNumber
              value={holding.totalHolding * holding.currentPrice}
            />
          </p>
        </div>
        <div className="hidden lg:block">
          <div
            className={`text-sm big:text-base font-semibold ${
              holding.stcg.gain < 0 ? "text-[#F7324C]" : "text-[#00AE78]"
            }`}
          >
            $ <FormattedNumber value={holding.stcg.gain} />
          </div>
          <div className="text-xs text-muted-foreground font-semibold">
            <FormattedNumber value={holding.stcg.balance} />{" "}
            {holding.coin}
          </div>
        </div>
        <div className="hidden lg:block">
          <div
            className={`text-sm big:text-base font-semibold ${
              holding.ltcg.gain < 0 ? "text-[#F7324C]" : "text-[#00AE78]"
            }`}
          >
            $ <FormattedNumber value={holding.ltcg.gain} />
          </div>
          <div className="text-xs text-muted-foreground font-semibold">
            <FormattedNumber value={holding.ltcg.balance} />
            {holding.coin}
          </div>
        </div>
        <div className="h-full hidden lg:flex items-center justify-end">
          <p className="text-sm big:text-base font-semibold">
            {select ? (
              <>
                <FormattedNumber value={holding.totalHolding} />
                {holding.coin}
              </>
            ) : (
              "-"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
