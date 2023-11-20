import React from "react";
import BulkButton from "./bulkbutton";

export default function Button(props) {
  const disabled = props.resource.amount === 0 ? "disabled" : "";
  function clickEvent(e, amount) {
    e.preventDefault();
    if (disabled) return;

    if (props.click) props.click(amount);
  }

  if (!props.resource.acquired) return null;

  let x10 = null;
  let x100 = null;
  let x1000 = null;
  let x10000 = null;

  if (props.type === "sell") {
    if (props.resource.amount >= 10)
      x10 = (
        <BulkButton amount={10} click={(e) => clickEvent(e, 10)}></BulkButton>
      );

    if (props.resource.amount >= 100)
      x100 = (
        <BulkButton amount={100} click={(e) => clickEvent(e, 100)}></BulkButton>
      );

    if (props.resource.amount >= 1000)
      x1000 = (
        <BulkButton
          amount={1000}
          click={(e) => clickEvent(e, 1000)}
        ></BulkButton>
      );
    if (props.resource.amount >= 10000)
      x10000 = (
        <BulkButton
          amount={10000}
          click={(e) => clickEvent(e, 10000)}
        ></BulkButton>
      );
  } else if (props.type === "buy") {
    if (props.resource.amount / props.cost >= 10)
      x10 = (
        <BulkButton amount={10} click={(e) => clickEvent(e, 10)}></BulkButton>
      );

    if (props.resource.amount / props.cost >= 100)
      x100 = (
        <BulkButton amount={100} click={(e) => clickEvent(e, 100)}></BulkButton>
      );

    if (props.resource.amount / props.cost >= 1000)
      x1000 = (
        <BulkButton
          amount={1000}
          click={(e) => clickEvent(e, 1000)}
        ></BulkButton>
      );

    if (props.resource.amount / props.cost >= 10000)
      x10000 = (
        <BulkButton
          amount={10000}
          click={(e) => clickEvent(e, 10000)}
        ></BulkButton>
      );
  }

  return (
    <div className={disabled + " button-container"}>
      <div className="button" onClick={clickEvent}>
        {props.text}
        <div className="button-cost"> {props.cost} money</div>
      </div>
      {x10}
      {x100}
      {x1000}
      {x10000}
    </div>
  );
}
