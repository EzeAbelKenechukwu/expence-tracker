import styled from "styled-components"
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 14px;
  padding: 20px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(226, 232, 240, 0.8);
  backdrop-filter: blur(8px);

  @media (max-width: 600px) {
    padding: 16px;
    border-radius: 18px;
  }
`;

const BalanceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-radius: 16px;
  background: linear-gradient(135deg, #111827 0%, #4f46e5 100%);
  color: white;
  font-weight: 600;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BalanceText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BalanceLabel = styled.span`
  font-size: 0.9rem;
  opacity: 0.85;
`;

const BalanceValue = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
`;

const ActionButton = styled.button`
  background: white;
  color: #111827;
  border: none;
  padding: 10px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(17, 24, 39, 0.14);
  }
`;

const AddTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 16px;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  box-sizing: border-box;

  input {
    width: 100%;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid #cbd5e1;
    outline: none;
    box-sizing: border-box;
    background: white;
  }
`;

const RadioBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  align-items: center;

  label {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 10px;
    border-radius: 999px;
    background: white;
    border: 1px solid #e2e8f0;
    font-size: 0.95rem;
    color: #334155;
    cursor: pointer;
  }

  input {
    width: unset;
    margin: 0;
    accent-color: #4f46e5;
  }
`;

const SubmitButton = styled(ActionButton)`
  width: 100%;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 11px 14px;
  justify-content: center;
`;

const ExpenseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  width: 100%;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ExpenseBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid ${(props) => (props.isIncome ? "#bbf7d0" : "#fecaca")};
  background: ${(props) => (props.isIncome ? "#ecfdf5" : "#fef2f2")};
  color: ${(props) => (props.isIncome ? "#047857" : "#dc2626")};
  font-size: 0.95rem;
  font-weight: 600;

  span {
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

const AddTransactionView = (props) => {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("EXPENSE");

  const addTransaction = () => {
    const trimmedDesc = desc.trim();
    const numericAmount = Number(amount);

    if (!trimmedDesc || !numericAmount || numericAmount <= 0) {
      return;
    }

    props.addTransaction({
      amount: numericAmount,
      desc: trimmedDesc,
      type,
      id: Date.now(),
    })

    props.toggleAddTxn(false)
    setAmount("")
    setDesc("")
    setType("EXPENSE")
  }

  return (
    <AddTransactionContainer>
      <input
        placeholder="Amount"
        value={amount}
        type="number"
        min="0"
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <RadioBox>
        <label htmlFor="expense">
          <input
            type="radio"
            id="expense"
            name="type"
            value="EXPENSE"
            checked={type === "EXPENSE"}
            onChange={(e) => setType(e.target.value)}
          />
          Expense
        </label>
        <label htmlFor="income">
          <input
            type="radio"
            id="income"
            name="type"
            value="INCOME"
            checked={type === "INCOME"}
            onChange={(e) => setType(e.target.value)}
          />
          Income
        </label>
      </RadioBox>

      <SubmitButton onClick={addTransaction}>Add Transaction</SubmitButton>
    </AddTransactionContainer>
  )
}

const OverviewComponent = (props) => {
  const [isAddTxnVisible, toggleAddTxn] = useState(false)

  return (
    <Container>
      <BalanceBox>
        <BalanceText>
          <BalanceLabel>Current balance</BalanceLabel>
          <BalanceValue>${props.income - props.expense}</BalanceValue>
        </BalanceText>
        <ActionButton onClick={() => toggleAddTxn((prev) => !prev)}>
          {isAddTxnVisible ? "Cancel" : "Add"}
        </ActionButton>
      </BalanceBox>

      {isAddTxnVisible && (
        <AddTransactionView
          toggleAddTxn={toggleAddTxn}
          addTransaction={props.addTransaction}
        />
      )}

      <ExpenseContainer>
        <ExpenseBox isIncome={false}>
          Expense
          <span>${props.expense}</span>
        </ExpenseBox>
        <ExpenseBox isIncome={true}>
          Income
          <span>${props.income}</span>
        </ExpenseBox>
      </ExpenseContainer>
    </Container>
  )
}

export default OverviewComponent