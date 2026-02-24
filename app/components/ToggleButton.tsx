import { Toggle } from "radix-ui";
import { GridIcon, TableIcon } from "@radix-ui/react-icons";

interface ToggleProps {
  onPressedChange: () => void;
  pressed: boolean;
}
export function ToggleButton({ onPressedChange, pressed }: ToggleProps) {
  return (
    <Toggle.Root
      className="Toggle"
      aria-label="Toggle button"
      onPressedChange={onPressedChange}
      pressed={pressed}
    >
      <div className="border p-2 hover:bg-gray-800 transition-colors cursor-pointer">
        {pressed ? <TableIcon /> : <GridIcon />}
      </div>
    </Toggle.Root>
  );
}
