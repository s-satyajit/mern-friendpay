import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMoneyContext } from "@/context/MoneyContext";
import { DonutChart } from "../ui/donut-chart";
import { calculateWeeklyAmounts, generateWeeklyBuckets } from "./helper";

const Dashboard = () => {
  const { transactions, friends } = useMoneyContext();
  const weeklyBuckets = generateWeeklyBuckets();
  const weeklyData = calculateWeeklyAmounts(
    transactions,
    friends,
    weeklyBuckets
  );

  const paidTotal = transactions
    .filter((t) => t.direction === "paid")
    .reduce((sum, t) => sum + t.amount, 0);

  const receivedTotal = transactions
    .filter((t) => t.direction === "received")
    .reduce((sum, t) => sum + t.amount, 0);

  const netAmount = receivedTotal - paidTotal;

  const chartData = [
    { name: "Received", value: receivedTotal },
    { name: "Paid", value: paidTotal },
  ];

  if (!transactions || !friends) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Financial Outlook</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Financial Outlook</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="w-full flex flex-col">
          <div className="w-auto min-w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Week</TableHead>
                  {friends.map((friend) => (
                    <TableHead key={friend._id}>
                      <div className="text-center">
                        {friend.name}
                        <div className="text-xs text-muted-foreground">
                          {friend.repaymentPeriod} days repayment
                        </div>
                      </div>
                    </TableHead>
                  ))}
                  <TableHead className="text-right">Net Total</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {weeklyData.map((week) => (
                  <TableRow key={week.label}>
                    <TableCell>
                      <div className="font-medium">Week {week.weekNumber}</div>
                      <div className="text-xs text-muted-foreground">
                        {week.label}
                      </div>
                    </TableCell>

                    {week.friendTotals.map((ft) => (
                      <TableCell key={ft.friendId}>
                        {ft.netAmount !== 0 ? (
                          <div
                            className={`text-center ${
                              ft.netAmount > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            ₹{Math.abs(ft.netAmount).toFixed(2)}
                            <div className="text-xs capitalize">
                              {ft.netAmount > 0 ? "to receive" : "to pay"}
                            </div>
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    ))}

                    <TableCell className="text-right">
                      <span
                        className={`${
                          week.weekTotal > 0
                            ? "text-green-600"
                            : week.weekTotal < 0
                            ? "text-red-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        ₹{Math.abs(week.weekTotal).toFixed(2)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>

      <div className="grid mx-6 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{chartData[1].value.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total Received
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{chartData[0].value.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                chartData[0].value > chartData[1].value
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ₹{(chartData[0].value - chartData[1].value).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mx-6">
        <CardHeader>
          <CardTitle>Net Balance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <DonutChart data={chartData} netAmount={netAmount} />
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-blue-600 rounded-full" />
              <span className="text-sm">
                Paid: ₹{chartData[1].value.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-slate-500 rounded-full" />
              <span className="text-sm">
                Received: ₹{chartData[0].value.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Card>
  );
};

export default Dashboard;
