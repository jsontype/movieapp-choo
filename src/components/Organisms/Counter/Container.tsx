import React from "react";
import Counter from ".";

import { increase, decrease } from "modules/counter";
import { useDispatch, useSelector } from "react-redux";

export default function Container() {
  // state
  const count = useSelector(
    (state: any) => state.counter && state.counter.count,
  );
  // dispatch
  const dispatch = useDispatch();
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());

  return (
    <>
      <Counter count={count} onIncrease={onIncrease} onDecrease={onDecrease} />
    </>
  );
}
