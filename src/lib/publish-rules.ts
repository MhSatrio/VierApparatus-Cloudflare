/**
 * Publishing rules that the server and the browser both apply. Pure: no database or browser APIs, so it can be imported by
 * client components without pulling in server code.
 */
/** True when the article is shorter than the owner's minimum. A minimum of 0 switches the rule off. */
export const belowMinimum = (words: number, min: number): boolean => min > 0 && words < min;
