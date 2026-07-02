import styled from "styled-components"
import { useState, useEffect } from "react";
import OverviewComponent from "./OverviewComponent"
import TransactionComponent from "./TransactionComponent"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: min(100%, 720px);
  max-width: 720px;
  gap: 16px;
  padding: 0 0 24px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    gap: 12px;
    padding-bottom: 16px;
  }
`;

const HomeComponent = () => {
  const [transactions, updateTransaction] = useState([])
  const [expense, updateExpense] = useState(0)
  const [income, updateIncome] = useState(0)

  const addTransaction = (payload) => {
    updateTransaction((prev) => [...prev, payload])
  }

  const calculateBalance = () => {
    let exp = 0;
    let inc = 0;

    transactions.forEach((payload) => {
      payload.type === "EXPENSE"
        ? (exp = exp + payload.amount)
        : (inc = inc + payload.amount)
    })

    updateExpense(exp)
    updateIncome(inc)
  }

  useEffect(() => calculateBalance(), [transactions])

  return (
    <Container>
      <OverviewComponent
        addTransaction={addTransaction}
        expense={expense}
        income={income}
      />
      <TransactionComponent transactions={transactions} />
    </Container>
  )
}

export default HomeComponent