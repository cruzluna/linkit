// can continue adding more
// key = outer, val = inner
export const colours: Record<string, string> = {
  "#FFB1AC": "#BD3B34",
  "#C8FFCD": "#3F8441",
  "#C8EBFF": "#3F7384",
  "#FFDEAC": "#BF7A28",
  "#E9ACFF": "#9E30B0",
  "#ACFFFF": "#3092B0",
};

/// helper util to check url
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
