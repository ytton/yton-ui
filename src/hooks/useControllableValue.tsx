import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

type Props<T> = {
  value?: T;
  defaultValue?: T;
};

const isUndefined = (value: unknown) => value === undefined;
const isFunction = (value: unknown) => typeof value === 'function';

export default function useControllableValue<T>(
  defaultState: T,
  props: Props<T>
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const { value, defaultValue } = props;

  const [valueState, setValueState] = useState<T>(() => {
    if (!isUndefined(value)) {
      return value;
    } else if (!isUndefined(defaultValue)) {
      return defaultValue;
    } else {
      return defaultState;
    }
  });

  const prevValue = useRef(value);
  const firstRender = useRef(true);

  // 解决value为undefined时，组件内部不会设置state为undefined
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (value === undefined && prevValue.current !== value) {
      prevValue.current = value;
      setValueState(value!);
    }
  }, [value]);

  const state = isUndefined(value) ? valueState : value;

  const setState = useCallback(
    (newState: SetStateAction<T>) => {
      if (value === undefined) {
        setValueState(valueState => {
          const res = isFunction(newState) ? newState(valueState) : newState;
          return res;
        });
      }
    },
    [value]
  );
  return [state, setState];
}
