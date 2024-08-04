import {RefObject, useCallback, useState, useEffect} from "react";
import {ShapeType, getRealShape} from "@nextui-org/react-utils";

export type ShapeResult = [ShapeType, () => void];

export function useRealShape<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [shape, setState] = useState<ShapeType>({
    width: 0,
    height: 0,
  });
  const updateShape = useCallback(() => {
    if (!ref?.current) return;

    const {width, height} = getRealShape(ref.current);

    setState({width, height});
  }, [ref]);

  useEffect(() => updateShape(), [updateShape]);

  return [shape, updateShape] as ShapeResult;
}

export type UseRealShapeReturn = ReturnType<typeof useRealShape>;
