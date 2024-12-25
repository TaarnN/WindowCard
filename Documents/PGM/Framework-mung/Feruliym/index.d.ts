// Customizable

declare const Additions: {
  Ffunc_Replacements_Additions: { [key: string]: string };
  Mfunc_Replacements_Additions: { [key: string]: string };
};

// Head

declare const lastRules: { value: string[] };

declare const createFRLYFunction: (
  runner: (rules: string[], params: any[]) => any
) => (...rules: string[]) => (...params: any[]) => any;

// Body

declare const Ffunc: (rules: string[], params: any[]) => any;
declare const Mfunc: (rules: string[], params: any[]) => any;
declare const Afunc: (rules: string[], params: any[]) => any;

// Export

declare const R: (v: TemplateStringsArray, ...l: any[]) => void;

declare const F: (...rules: string[]) => (...params: any[]) => any;
declare const M: (...rules: string[]) => (...params: any[]) => any;
declare const A: (...rules: string[]) => (...params: any[]) => any;

declare const expectTest: (name: string, expect: string, result: any) => void;
declare const FRLYTest: () => void;
