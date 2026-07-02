import styled from "styled-components"
import { useState, useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  padding: 20px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(226, 232, 240, 0.8);

  @media (max-width: 600px) {
    padding: 14px;
    border-radius: 18px;
    gap: 10px;
  }
`;

const HeadingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.05rem;
  color: #111827;
`;

const Count = styled.span`
  font-size: 0.9rem;
  color: #64748b;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid #cbd5e1;
  outline: none;
  box-sizing: border-box;
  background: #f8fafc;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Cell = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  border-left: 4px solid ${(props) => (props.isExpense ? "#dc2626" : "#16a34a")};
  background: white;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Desc = styled.span`
  font-weight: 600;
  color: #111827;
  word-break: break-word;
`;

const Meta = styled.span`
  font-size: 0.82rem;
  color: #64748b;
`;

const Amount = styled.span`
  font-weight: 700;
  color: ${(props) => (props.isExpense ? "#dc2626" : "#16a34a")};

  @media (max-width: 600px) {
    align-self: flex-end;
  }
`;

const EmptyState = styled.div`
  padding: 16px;
  border: 1px dashed #cbd5e1;
  border-radius: 14px;
  text-align: center;
  color: #64748b;
  background: #f8fafc;
`;

const TransactionCell = (props) => {
  const isExpense = props.payload?.type === "EXPENSE";

  return (
    <Cell isExpense={isExpense}>
      <Details>
        <Desc>{props.payload.desc}</Desc>
        <Meta>{isExpense ? "Expense" : "Income"}</Meta>
      </Details>
      <Amount isExpense={isExpense}>${props.payload.amount}</Amount>
    </Cell>
  )
}

const TransactionComponent = (props) => {
  const [searchText, updateSearchText] = useState("");
  const [filteredTransaction, updateTxn] = useState(props.transactions);

  const filterData = (value) => {
    const query = (value ?? "").trim().toLowerCase();

    if (!query) {
      updateTxn(props.transactions)
      return
    }

    const txn = [...props.transactions].filter((payload) =>
      (payload.desc || "").toLowerCase().includes(query)
    );

    updateTxn(txn)
  }

  useEffect(() => {
    filterData(searchText)
  }, [props.transactions, searchText])

  return (
    <Container>
      <HeadingRow>
        <Title>Transactions</Title>
        <Count>{filteredTransaction?.length || 0} items</Count>
      </HeadingRow>

      <SearchInput
        placeholder="Search transactions"
        value={searchText}
        onChange={(e) => {
          updateSearchText(e.target.value)
          filterData(e.target.value)
        }}
      />

      {filteredTransaction?.length ? (
        <List>
          {filteredTransaction.map((payload) => (
            <TransactionCell key={payload.id} payload={payload} />
          ))}
        </List>
      ) : (
        <EmptyState>No transactions yet. Add one to get started.</EmptyState>
      )}
    </Container>
  )
}

export default TransactionComponent