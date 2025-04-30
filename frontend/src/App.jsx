import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "./components/dashboard/Dashboard";
import TransactionForm from "./components/TransactionForm";

function App() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Tabs defaultValue="transaction" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="transaction">New Transaction</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>

          <div className="space-y-6">
            <TabsContent
              value="transaction"
              className="mt-0 border rounded-lg p-6"
            >
              <TransactionForm />
            </TabsContent>

            <TabsContent
              value="dashboard"
              className="mt-0 border rounded-lg p-6"
            >
              <Dashboard />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
