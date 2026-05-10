import type { ComponentProps } from "react";
import { Button } from "./Button";

type ClearDataButtonProps = Omit<ComponentProps<typeof Button>, "children" | "variant">;

export const ClearDataButton = (props: ClearDataButtonProps) => {
  return (
    <Button variant="secondary" {...props}>
      Clear data
    </Button>
  );
};
