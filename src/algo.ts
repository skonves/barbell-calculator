export type Loadout = {
  bar: number;
  total: number;
  plates: number[];
};

export function solve(max: number, percent: number, bar: number): Loadout {
  const roundedWeight = roundToNearestStep(max * percent, 5);

  const plates: number[] = [];

  let remainder = Math.max((roundedWeight - bar) / 2, 0);

  function forPlate(value: number) {
    const count = Math.floor(remainder / value);

    remainder -= count * value;

    for (let i = 0; i < count; i++) plates.push(value);
  }

  forPlate(45);
  forPlate(35);
  forPlate(25);
  forPlate(15);
  forPlate(10);
  forPlate(5);
  forPlate(2.5);

  const total = plates.reduce((a, b) => a + b, 0) * 2 + bar;

  return { bar, total, plates };
}

export function roundToNearestStep(value: number, step: number): number {
  return Math.round(value / step) * step;
}
