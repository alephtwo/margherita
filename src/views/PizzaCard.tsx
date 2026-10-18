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
    <div className="grid grid-cols-[1fr_1fr_1fr_4rem] gap-2">
      <InputGroup className="border border-black bg-white/50">
        <InputGroupInput
          type="text"
          className="text-center font-mono"
          inputMode="numeric"
          value={pizza.size}
          onChange={(e) => dispatch({ action: "set-size", id: pizza.id, value: e.target.value })}
        />
      </InputGroup>
      <InputGroup className="border border-black bg-white/50">
        <InputGroupInput
          type="text"
          className="text-center font-mono"
          inputMode="numeric"
          value={pizza.price}
          onChange={(e) => dispatch({ action: "set-price", id: pizza.id, value: e.target.value })}
        />
      </InputGroup>
      <InputGroup className="border border-black bg-white/50">
        <InputGroupAddon>
          <RankingIcon rank={ranking} />
        </InputGroupAddon>
        <InputGroupInput
          type="text"
          value={pizza.calculateEfficiency()?.toFixed(4)}
          disabled
          className="text-center font-mono"
        />
      </InputGroup>
      <Button
        onClick={() => dispatch({ action: "delete-pizza", id: pizza.id })}
        variant="default"
        className="border border-black bg-red-800 hover:bg-red-700"
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
