"use client";

import * as React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import type { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the base props that all modal components should have
interface ModalComponentProps<TData> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: TData;
}

// Define types for different kinds of actions
type ActionHandler<TData> = (row: TData) => void;

interface BaseAction<TData> {
  label: string;
  onClick?: ActionHandler<TData>;
  shortcut?: string;
  disabled?: boolean;
}

interface StandardAction<TData> extends BaseAction<TData> {
  type: "standard";
}

interface ModalAction<TData> extends BaseAction<TData> {
  type: "modal";
  modalComponent: React.ReactElement<ModalComponentProps<TData>>;
  onOpenChange?: (open: boolean) => void;
}

interface SubMenuAction<TData> extends BaseAction<TData> {
  type: "submenu";
  items: Array<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;
  currentValue?: string;
  onValueChange?: (value: string, row: TData) => void;
}

type Action<TData> =
  | StandardAction<TData>
  | ModalAction<TData>
  | SubMenuAction<TData>;

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  actions: Action<TData>[];
}

export function DataTableRowActions<TData>({
  row,
  actions,
}: DataTableRowActionsProps<TData>) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition();
  const [activeModals, setActiveModals] = React.useState<
    Record<string, boolean>
  >({});

  // Helper to toggle modal state
  const toggleModal = (label: string, state: boolean) => {
    setActiveModals((prev) => ({
      ...prev,
      [label]: state,
    }));
  };

  // Type guard functions
  const isStandardAction = (
    action: Action<TData>
  ): action is StandardAction<TData> => action.type === "standard";

  const isModalAction = (action: Action<TData>): action is ModalAction<TData> =>
    action.type === "modal";

  const isSubMenuAction = (
    action: Action<TData>
  ): action is SubMenuAction<TData> => action.type === "submenu";

  const renderAction = (action: Action<TData>, index: number) => {
    if (isStandardAction(action)) {
      return (
        <DropdownMenuItem
          key={action.label}
          disabled={action.disabled || isUpdatePending}
          onSelect={() => action.onClick?.(row.original)}
        >
          {action.label}
          {action.shortcut && (
            <DropdownMenuShortcut>{action.shortcut}</DropdownMenuShortcut>
          )}
        </DropdownMenuItem>
      );
    }

    if (isModalAction(action)) {
      return (
        <DropdownMenuItem
          key={action.label}
          disabled={action.disabled || isUpdatePending}
          onSelect={() => toggleModal(action.label, true)}
        >
          {action.label}
          {action.shortcut && (
            <DropdownMenuShortcut>{action.shortcut}</DropdownMenuShortcut>
          )}
        </DropdownMenuItem>
      );
    }

    if (isSubMenuAction(action)) {
      return (
        <DropdownMenuSub key={action.label}>
          <DropdownMenuSubTrigger disabled={action.disabled || isUpdatePending}>
            {action.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={action.currentValue}
              onValueChange={(value) => {
                if (action.onValueChange) {
                  startUpdateTransition(() => {
                    action.onValueChange!(value, row.original);
                  });
                }
              }}
            >
              {action.items.map((item) => (
                <DropdownMenuRadioItem
                  key={item.value}
                  value={item.value}
                  className="capitalize"
                  disabled={item.disabled || isUpdatePending}
                >
                  {item.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      );
    }

    return null;
  };

  const renderSeparator = (
    currentAction: Action<TData>,
    nextAction: Action<TData> | undefined
  ) => {
    if (!nextAction) return null;

    const needsSeparator =
      currentAction.type !== nextAction.type ||
      (isStandardAction(currentAction) &&
        isStandardAction(nextAction) &&
        (currentAction.label.includes("Delete") ||
          nextAction.label.includes("Delete")));

    return needsSeparator ? (
      <DropdownMenuSeparator key={`${currentAction.label}-separator`} />
    ) : null;
  };

  return (
    <>
      {actions.filter(isModalAction).map((action) => {
        const isOpen = activeModals[action.label] || false;
        return React.cloneElement(action.modalComponent, {
          key: action.label,
          open: isOpen,
          onOpenChange: (open: boolean) => {
            toggleModal(action.label, open);
            action.onOpenChange?.(open);
          },
          data: row.original,
        });
      })}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open menu"
            variant="ghost"
            className="flex size-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="size-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {actions.map((action, index) => (
            <React.Fragment key={action.label}>
              {renderAction(action, index)}
              {renderSeparator(action, actions[index + 1])}
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
