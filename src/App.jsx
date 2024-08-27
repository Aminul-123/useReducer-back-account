import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  openAcount: false,
  deposit: 0,
  withdraw: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "open":
      return {
        ...state,
        isActive: true,
        balance: 500,
      };
    case "joma":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "withdrawMoney":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: 5000,
        balance: state.balance + action.payload,
      };
    case "payloan":
      return {
        ...state,
        balance: state.balance - action.payload,
        loan: state.loan - action.payload,
      };
    case "closeAccount":
      return {
        ...initialState,
      };
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isActive, balance, deposit, loan } = state;
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance} </p>
      <p>Loan: {loan} </p>

      <p>
        <button onClick={() => dispatch({ type: "open" })} disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "joma", payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdrawMoney", payload: 50 })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payloan", payload: 5000 })}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={balance === 0 && isActive ? false : true}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
