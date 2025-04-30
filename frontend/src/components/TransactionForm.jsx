import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useMoneyContext } from "@/context/MoneyContext";

const formSchema = z.object({
  friendId: z.string().min(1, "Please select a frined"),
  amount: z.coerce.number().positive("Amount must be positive"),
  direction: z.enum(["paid", "received"]),
});

const TransactionForm = () => {
  const { friends, addTransaction, loading } = useMoneyContext();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      friendId: "",
      amount: 0,
      direction: "paid",
    },
  });

  const onSubmit = async(values) => {
    try {
        await addTransaction({
            friend: values.friendId,
            amount: values.amount,
            direction: values.direction,
        });
        form.reset();
    } catch (error) {
        console.error("Transaction failed:", error);
    }
  }

  return (
    <>
      <Card className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Update Transaction</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="friendId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Friend</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a friend" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {friends.map((friend) => (
                        <SelectItem key={friend._id} value={friend._id}>
                          {friend.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="direction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={field.value === "paid" ? "default" : "outline"}
                      onClick={() => field.onChange("paid")}
                    >
                      Paid
                    </Button>
                    <Button
                      type="button"
                      variant={
                        field.value === "received" ? "default" : "outline"
                      }
                      onClick={() => field.onChange("received")}
                    >
                      Received
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
                type="submit"
                className="w-full"
                disabled={loading}
            >{loading ? "Processing..." : "Add Transaction"}
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default TransactionForm;
