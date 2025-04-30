import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMoneyContext } from "@/context/MoneyContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";

const formSchema = z.object({
  friendId: z.string().min(1, "Please select a frined"),
  amount: z.coerce.number().positive("Amount must be positive"),
  direction: z.enum(["paid", "received"]),
  transactionDate: z.date({
    required_error: "Please select a date",
  }),
});

const TransactionForm = () => {
  const [open, setOpen] = useState(false);
  const { friends, addTransaction, loading } = useMoneyContext();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      friendId: "",
      amount: "",
      direction: "paid",
      transactionDate: new Date(),
    },
  });

  const onSubmit = async (values) => {
    try {
      await addTransaction({
        friend: values.friendId,
        amount: values.amount,
        direction: values.direction,
        transactionDate: values.transactionDate.toISOString(),
      });
      form.reset();
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <>
      <Card className="p-6 mt-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Update Transaction</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="transactionDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Transaction Date</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal hover:scale-[1.02] active:scale-[0.98] transition-transform"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setTimeout(() => setOpen(false), 100);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      value={field.value === 0 ? "" : field.value}
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
                      className="hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-sm hover:shadow-md"
                    >
                      Paid
                    </Button>
                    <Button
                      type="button"
                      variant={
                        field.value === "received" ? "default" : "outline"
                      }
                      onClick={() => field.onChange("received")}
                      className="hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-sm hover:shadow-md"
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
              className="w-full hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-sm hover:shadow-md"
              disabled={loading}
            >
              {loading ? "Processing..." : "Add Transaction"}
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default TransactionForm;
