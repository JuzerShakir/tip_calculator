import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [yourTip, setYourTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);

  const totalTip = bill * ((yourTip + friendTip) / 2 / 100);

  function handleReset() {
    setBill(0);
    setYourTip(0);
    setFriendTip(0);
  }

  return (
    <div>
      <Bill bill={bill} onSetBill={setBill} />

      <Tip tip={yourTip} onTip={setYourTip}>
        How did you like the tip?
      </Tip>

      <Tip tip={friendTip} onTip={setFriendTip}>
        How did your friend like the service?
      </Tip>

      {bill > 0 && (
        <>
          <ToPay bill={bill} totalTip={totalTip} />
          <ResetButton onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function Bill({ bill, onSetBill }) {
  return (
    <div>
      <span>How much was the bill?</span>
      <input
        value={bill}
        type="text"
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}

function Tip({ tip, onTip, children }) {
  return (
    <div>
      <span>{children}</span>
      <select value={tip} onChange={(e) => onTip(Number(e.target.value))}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function ToPay({ bill, totalTip }) {
  const total = bill + totalTip;

  return (
    <h1>
      You pay ${total} (${bill} + ${totalTip} tip)
    </h1>
  );
}

function ResetButton({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
