"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { placeOfferAction } from "@/lib/actions/offer-actions";

interface OfferFormProps {
  auctionId: string;
  currentPrice: number;
  isAuthenticated: boolean;
  isSeller: boolean;
  isOpen: boolean;
}

interface OfferFormValues {
  amount: number;
}

export function OfferForm({
  auctionId,
  currentPrice,
  isAuthenticated,
  isSeller,
  isOpen,
}: OfferFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OfferFormValues>();

  const onSubmit = (values: OfferFormValues) => {
    setServerError(null);
    startTransition(async () => {
      const result = await placeOfferAction(auctionId, values.amount);
      if (result.error) {
        setServerError(result.error);
      } else {
        reset();
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground mb-4">Sign in to place a bid</p>
        <Button asChild className="w-full">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    );
  }

  if (isSeller) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">
          You are the seller of this auction
        </p>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">This auction has ended</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field data-invalid={!!errors.amount}>
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="amount">Your Bid</FieldLabel>
          <span className="text-xs text-muted-foreground">
            Current: ${currentPrice.toLocaleString()}
          </span>
        </div>
        <Input
          id="amount"
          type="number"
          step="1"
          placeholder={String(currentPrice + 1)}
          {...register("amount", {
            required: "Enter a bid amount",
            valueAsNumber: true,
            validate: (value) =>
              value > currentPrice ||
              `Bid must be higher than $${currentPrice.toLocaleString()}`,
          })}
        />
        <FieldError errors={[errors.amount]} />
      </Field>
      {serverError && (
        <p className="text-sm text-destructive">{serverError}</p>
      )}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Placing Bid..." : "Place Bid"}
      </Button>
    </form>
  );
}
