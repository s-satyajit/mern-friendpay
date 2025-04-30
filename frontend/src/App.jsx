import Dashboard from "./components/dashboard/Dashboard"
import TransactionForm from "./components/TransactionForm"


function App() {

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto mb-8">
        <TransactionForm />
      </div>
      <Dashboard />
    </div>
  )
}

export default App
