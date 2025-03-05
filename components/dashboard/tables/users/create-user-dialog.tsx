"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useActionState, useTransition, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { createUserAction } from "@/app/actions/user";
import { userSchema, type User } from "./users-schema";
import { CreateUserForm } from "./create-user-form";
import { CreateUserState } from "@/lib/definitions";

const initialState: CreateUserState = {
  inputs: {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  },
  message: "",
};

export function CreateUserDialog() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const [isPendingTransition, startTransition] = useTransition();
  const [state, formAction, isPendingAction] = useActionState(
    createUserAction,
    initialState
  );

  // Then use either isPendingTransition || isPendingAction for your loading state:
  const isSubmitting = isPendingTransition || isPendingAction;

  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      enabled: true,
      emailVerified: false,
    },
  });

  React.useEffect(() => {
    if (state.message) {
      // Use setTimeout to move the toast call outside the React lifecycle
      setTimeout(() => {
        if (state.errors) {
          toast.error(state.message);
        } else {
          toast.success(state.message);
          setOpen(false);
          form.reset();
        }
      }, 0);
    }
  }, [state, form]);

  function onSubmit(data: User) {
    toast.success("Not implemented yet!!!");
    // startTransition(() => {
    //   const formData = new FormData();
    //   formData.append("firstName", data.firstName);
    //   formData.append("lastName", data.lastName);
    //   formData.append("username", data.username);
    //   formData.append("email", data.email);
    //   formData.append("password", data.password || "");
    //   formData.append("enabled", String(data.enabled));

    //   // Call the action within startTransition
    //   formAction(formData);
    // });
  }

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <PlusIcon className="mr-2 size-4" aria-hidden="true" />
            New user
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create user</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new user.
            </DialogDescription>
          </DialogHeader>
          <CreateUserForm form={form} onSubmit={onSubmit}>
            <DialogFooter className="gap-2 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting && (
                  <ReloadIcon
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Create
              </Button>
            </DialogFooter>
          </CreateUserForm>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          New user
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create user</DrawerTitle>
          <DrawerDescription>
            Fill in the details below to create a new user.
          </DrawerDescription>
        </DrawerHeader>
        <CreateUserForm form={form} onSubmit={onSubmit}>
          <DrawerFooter className="gap-2 sm:space-x-0">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting && (
                <ReloadIcon
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Create
            </Button>
          </DrawerFooter>
        </CreateUserForm>
      </DrawerContent>
    </Drawer>
  );
}
