import { IconTrash } from "@tabler/icons-react";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

import { DispatchContext } from "../contexts/DispatchContext.mts";
import { Pizza } from "../types/Pizza.mts";

interface PizzaCardProps {
  pizza: Pizza;
  ranking?: number;
}

export function PizzaCard({ pizza, ranking }: PizzaCardProps): React.JSX.Element {
  const dispatch = useContext(DispatchContext);
  if (dispatch === null) {
    return <></>;
  }

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_4rem] items-center gap-2">
      <InputGroup className="rounded-none border-2 border-stone-800 bg-stone-50 shadow-[2px_2px_0px_var(--color-retro-shadow)]">
        <InputGroupInput
          type="text"
          className="font-receipt bg-transparent text-center tracking-wider text-stone-900"
          inputMode="numeric"
          value={pizza.size}
          onChange={(e) => dispatch({ action: "set-size", id: pizza.id, value: e.target.value })}
          placeholder="Size"
        />
      </InputGroup>

      <InputGroup className="rounded-none border-2 border-stone-800 bg-stone-50 shadow-[2px_2px_0px_var(--color-retro-shadow)]">
        <InputGroupInput
          type="text"
          className="font-receipt bg-transparent text-center tracking-wider text-stone-900"
          inputMode="numeric"
          value={pizza.price}
          onChange={(e) => dispatch({ action: "set-price", id: pizza.id, value: e.target.value })}
          placeholder="Price"
        />
      </InputGroup>

      <InputGroup className="rounded-none border-2 border-stone-800 bg-stone-50 shadow-[2px_2px_0px_var(--color-retro-shadow)]">
        <InputGroupAddon>
          <RankingIcon rank={ranking} />
        </InputGroupAddon>
        <InputGroupInput
          type="text"
          value={pizza.calculateEfficiency()?.toFixed(4)}
          disabled
          className="font-receipt bg-transparent text-center tracking-widest text-stone-900 disabled:opacity-100"
        />
      </InputGroup>

      <Button
        onClick={() => dispatch({ action: "delete-pizza", id: pizza.id })}
        variant="default"
        className="font-receipt rounded-none border-2 border-stone-900 bg-red-600 px-3 text-stone-50 shadow-[3px_3px_0px_var(--color-retro-shadow)] transition-none hover:bg-red-500 active:translate-y-0.5"
      >
        <IconTrash />
      </Button>
    </div>
  );
}

function RankingIcon(props: { rank?: number }): React.JSX.Element {
  switch (props.rank) {
    case 1: {
      return <span>🥇</span>;
    }
    case 2: {
      return <span>🥈</span>;
    }
    case 3: {
      return <span>🥉</span>;
    }
  }
  return <></>;
}
