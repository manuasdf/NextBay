"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Patek Philippe Nautilus 5711 - Stainless Steel"
          {...register("title", {
            required: "Title is required",
            maxLength: { value: 100, message: "At most 100 characters" },
          })}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={6}
          placeholder="Describe the item: brand, condition, history, what makes it unique."
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="startingPrice">Starting Price</Label>
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
        {errors.startingPrice && (
          <p className="text-sm text-destructive">
            {errors.startingPrice.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="endDate">End Date (optional)</Label>
        <Input id="endDate" type="datetime-local" {...register("endDate")} />
        <p className="text-xs text-muted-foreground">
          Defaults to 3 days from now if left blank
        </p>
      </div>

      <Button type="submit" disabled={isPending} className="min-w-[200px]">
        {isPending ? "Creating..." : "Create Auction"}
      </Button>
    </form>
  );
}
