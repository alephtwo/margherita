import { IconCalculator, IconCurrencyDollar, IconRuler2, IconTrash } from "@tabler/icons-react";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

import { DispatchContext } from "../contexts/DispatchContext.mts";
import { Pizza } from "../types/Pizza.mts";

interface PizzaCardProps {
  pizza: Pizza;
}

export function PizzaCard({ pizza }: PizzaCardProps): React.JSX.Element {
  const dispatch = useContext(DispatchContext);
  if (dispatch === null) {
    return <></>;
  }

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_4rem] gap-2">
      <InputGroup className="border border-black bg-white/50">
        <InputGroupInput
          type="text"
          className="font-mono"
          inputMode="numeric"
          value={pizza.size}
          onChange={(e) => dispatch({ action: "set-size", id: pizza.id, value: e.target.value })}
        />
        <InputGroupAddon>
          <IconRuler2 />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="border border-black bg-white/50">
        <InputGroupInput
          type="text"
          className="font-mono"
          inputMode="numeric"
          value={pizza.price}
          onChange={(e) => dispatch({ action: "set-price", id: pizza.id, value: e.target.value })}
        />
        <InputGroupAddon>
          <IconCurrencyDollar />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="border border-black bg-white/50">
        <InputGroupAddon>
          <IconCalculator />
        </InputGroupAddon>
        <InputGroupInput
          type="text"
          value={pizza.calculateEfficiency()?.toFixed(4)}
          disabled
          className="font-mono"
        />
        <InputGroupAddon align="inline-end">in²/$</InputGroupAddon>
      </InputGroup>
      <Button onClick={() => dispatch({ action: "delete-pizza", id: pizza.id })} variant="default">
        <IconTrash />
      </Button>
    </div>
  );
}
