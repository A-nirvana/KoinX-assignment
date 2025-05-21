// context/FinanceContext.tsx
"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Types
export interface STCG {
  balance: number;
  gain: number;
}
export interface LTCG {
  balance: number;
  gain: number;
}
export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: STCG;
  ltcg: LTCG;
  selected: boolean;
}
export interface CapitalGainsData {
  stcg: { profits: number; losses: number };
  ltcg: { profits: number; losses: number };
}

// Combined state
interface FinanceState {
  holdings: Holding[];
  capitalGains: CapitalGainsData;
  initialGains: CapitalGainsData;
  allSelected: boolean;
}

type Action =
  | { type: "SET_HOLDINGS"; payload: Holding[] }
  | { type: "TOGGLE_HOLDING"; coin: string; checked: boolean }
  | { type: "TOGGLE_ALL"; checked: boolean }
  | { type: "SET_CAPITAL_GAINS"; payload: CapitalGainsData };

const initialState: FinanceState = {
  holdings: [],
  capitalGains: { stcg: { profits: 0, losses: 0 }, ltcg: { profits: 0, losses: 0 } },
  initialGains: { stcg: { profits: 0, losses: 0 }, ltcg: { profits: 0, losses: 0 } },
  allSelected: false,
};

function financeReducer(state: FinanceState, action: Action): FinanceState {
  switch (action.type) {
    case "SET_HOLDINGS": {
      const holdingsWithFlags = action.payload.map(h =>
        h.selected === true? h: { ...h, selected: false }
      );
      return {
        ...state,
        holdings: holdingsWithFlags,
      };
    }
    case "TOGGLE_HOLDING": {
      const holdings = state.holdings.map((h) =>
        h.coin === action.coin ? { ...h, selected: action.checked } : h
      );
      const allSelected = holdings.length > 0 && holdings.every((h) => h.selected);
      const capitalGains = holdings.reduce(
        (acc, h) => {
          if (h.selected) {
            acc.stcg.profits += Math.max(0, h.stcg.gain);
            acc.stcg.losses -= Math.min(0, h.stcg.gain);
            acc.ltcg.profits += Math.max(0, h.ltcg.gain);
            acc.ltcg.losses -= Math.min(0, h.ltcg.gain);
          }
          return acc;
        },
        { stcg: { profits: 0, losses: 0 }, ltcg: { profits: 0, losses: 0 } }
      );
      return { holdings, allSelected, capitalGains, initialGains: state.initialGains };
    }
    case "TOGGLE_ALL": {
      const holdings = state.holdings.map((h) => ({ ...h, selected: action.checked }));
      const allSelected = action.checked;
      const capitalGains = holdings.reduce(
        (acc, h) => {
          if (h.selected) {
            acc.stcg.profits += Math.max(0, h.stcg.gain);
            acc.stcg.losses += Math.min(0, h.stcg.gain);
            acc.ltcg.profits += Math.max(0, h.ltcg.gain);
            acc.ltcg.losses += Math.min(0, h.ltcg.gain);
          }
          return acc;
        },
        state.initialGains
      );
      return { holdings, allSelected, capitalGains, initialGains: state.initialGains };
    }
    case "SET_CAPITAL_GAINS": {
      return { ...state, initialGains: action.payload };
    }
    default:
      return state;
  }
}

interface FinanceContextType {
  state: FinanceState;
  dispatch: React.Dispatch<Action>;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
}
