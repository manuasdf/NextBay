"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { createAuctionAction } from "@/lib/actions/auction-actions";

interface CreateAuctionFormValues {
  title: string;
  description: string;
  startingPrice: number;
  endDate: string;
}

export function CreateAuctionForm() {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAuctionFormValues>();

  const onSubmit = (values: CreateAuctionFormValues) => {
    setServerError(null);
    startTransition(async () => {
      const result = await createAuctionAction({
        title: values.title,
        description: values.description,
        startingPrice: Number(values.startingPrice),
        endDate: values.endDate
          ? new Date(values.endDate).toISOString()
          : undefined,
      });
      if (result?.error) {
        setServerError(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
          {serverError}
        </div>
      )}

      <Field data-invalid={!!errors.title}>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input
          id="title"
          placeholder="Patek Philippe Nautilus 5711 - Stainless Steel"
          {...register("title", {
            required: "Title is required",
            maxLength: { value: 100, message: "At most 100 characters" },
          })}
        />
        <FieldError errors={[errors.title]} />
      </Field>

      <Field data-invalid={!!errors.description}>
        <FieldLabel htmlFor="description">Description</FieldLabel>
        <Textarea
          id="description"
          rows={6}
          placeholder="Describe the item: brand, condition, history, what makes it unique."
          {...register("description", {
            required: "Description is required",
          })}
        />
        <FieldError errors={[errors.description]} />
      </Field>

      <Field data-invalid={!!errors.startingPrice}>
        <FieldLabel htmlFor="startingPrice">Starting Price</FieldLabel>
        <Input
          id="startingPrice"
          type="number"
          min="0"
          step="1"
          {...register("startingPrice", {
            required: "Starting price is required",
            valueAsNumber: true,
            min: { value: 0, message: "Must be zero or more" },
          })}
        />
        <FieldError errors={[errors.startingPrice]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="endDate">End Date (optional)</FieldLabel>
        <Input id="endDate" type="datetime-local" {...register("endDate")} />
        <FieldDescription>
          Defaults to 3 days from now if left blank
        </FieldDescription>
      </Field>

      <Button type="submit" disabled={isPending} className="min-w-[200px]">
        {isPending ? "Creating..." : "Create Auction"}
      </Button>
    </form>
  );
}
