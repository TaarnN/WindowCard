const funcReplacement = {
  F: {
    " ": "",
    "@": "",
    "&": "",
    // comparison
    "=": "===",
    ";": "!==",
    "≠": "!==",
    "<": "<=",
    ">": ">=",
    "</=": "<=",
    ">/=": ">=",
    // logical
    ",": "&&",
    "/": "||",
    "-": "!",
    "~": "^",
  },
  M: {
    _: "",
    "@": "",
    "&": "",
    // Constants
    pi: "Math.PI",
    π: "Math.PI",
    e: "Math.E",
    ln2: "Math.LN2",
    ln10: "Math.LN10",
    log2e: "Math.LOG2E",
    log10e: "Math.LOG10E",
    root2: "Math.SQRT2",
    "root1/2": "Math.SQRT1_2",
    // Basic
    abs: "Math.abs",
    floor: "Math.floor",
    ceil: "Math.ceil",
    round: "Math.round",
    trunc: "Math.trunc",
    // Exponential & Logarithm
    exp: "Math.exp",
    ln: "Math.log",
    log: "Math.log10",
    log2: "Math.log2",
    // Power & Roots
    pow: "Math.pow",
    root: "Math.sqrt",
    "√": "Math.sqrt",
    cuberoot: "Math.cbrt",
    // Trigonometric
    sin: "Math.sin",
    cos: "Math.cos",
    tan: "Math.tan",
    asin: "Math.asin",
    acos: "Math.acos",
    atan: "Math.atan",
    atan2: "Math.atan2",
    // other
    rand: "Math.random",
    max: "Math.max",
    min: "Math.min",
    sign: "Math.sign",
    hypot: "Math.hypot",
    // parentheses & signs
    "[": "(",
    "]": ")",
    "{": "(",
    "}": ")",
    "⋅": "*",
    of: "*",
    "×": "*",
    "÷": "/",
    "%": "/100",
    mod: "%",
  },
};

const Formats = (state) => {
  const ranged = state.replace(/(\d+)\.\.\.(\d+)/g, (match, start, end) => {
    const startNum = parseInt(start, 10);
    const endNum = parseInt(end, 10);

    const rangeArray = Array.from(
      { length: endNum - startNum + 1 },
      (_, index) => startNum + index
    );
    return JSON.stringify(rangeArray);
  });
  const resultString = ranged.replace(
    /\[.*?\](?:\s*\+\s*\[.*?\])+/g, // Match concatenated array sequences
    (match) => {
      const parts = [];
      let buffer = "";
      let inString = false;
      let quoteType = "";
      let inArray = 0;

      for (let i = 0; i < match.length; i++) {
        const char = match[i];

        if (
          (char === '"' || char === "'" || char === "`") &&
          (i === 0 || match[i - 1] !== "\\")
        ) {
          if (inString && char === quoteType) {
            inString = false;
          } else if (!inString) {
            inString = true;
            quoteType = char;
          }
        }

        // Count array nesting
        if (!inString) {
          if (char === "[") inArray++;
          if (char === "]") inArray--;
        }

        // Handle `+` outside of strings and arrays
        if (
          !inString &&
          inArray === 0 &&
          char === "+" &&
          match[i - 1] !== "+" &&
          match[i + 1] !== "+"
        ) {
          if (buffer.trim()) {
            parts.push(buffer.trim());
          }
          buffer = "";
        } else {
          buffer += char;
        }
      }

      if (buffer.trim()) {
        parts.push(buffer.trim());
      }

      // Transform each part
      const transformed = parts.map((item) => {
        // Leave nested arrays as-is
        if (/^\[.*\[.*\].*\]$/.test(item)) {
          return item;
        }
        // Add spread operator for non-nested arrays
        return `...${item.trim()}`;
      });

      return `[${transformed.join(", ")}]`;
    }
  );

  return resultString;
};

export { funcReplacement, Formats };
