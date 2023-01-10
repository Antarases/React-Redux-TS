import React, { useState } from 'react';
import classnames from "classnames";

import styles from "./counter-with-tests-page.module.scss";

const CounterWithTestsPage = () => {
    const [counterValue, setCounterValue] = useState(0);
    const [inputValue, setInputValue] = useState(1);

    return (
        <div>
            <h1>My Counter</h1>

            <h2 data-testid="counter" className={classnames("counter", { [styles.green]: true })}>{ counterValue }</h2>

            <button
                data-testid="subtractButton"
                onClick={() => setCounterValue(counterValue => { console.log("qwe"); return (counterValue - inputValue); })}
            >
                -
            </button>
            <input
                data-testid="input"
                className={styles.input}
                type="number"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(Number(e.target.value));
                }}
            />
            <button
                data-testid="addButton"
                name="addButton"
                onClick={() => setCounterValue(counterValue => (counterValue + inputValue))}
            >
                +
            </button>
        </div>
    );
};

export default CounterWithTestsPage;