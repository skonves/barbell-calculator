// See: https://www.masterclass.com/articles/one-rep-max-calculator

export type ORMFunction = (input: { weight: number; reps: number }) => {
  orm: number;
};
export type ReverseORMFunction = (input: { weight: number; orm: number }) => {
  reps: number;
};

export const brzycki: ORMFunction = ({ weight, reps }) => ({
  orm: r(weight * (36 / (37 - reps))),
});

export const reverseBrzycki: ReverseORMFunction = ({ weight, orm }) => ({
  reps: r(37 - (36 * weight) / orm),
});

export const epley: ORMFunction = ({ weight, reps }) => ({
  orm: r(weight * (1 + 0.0333 * reps)),
});

export const reverseEpley: ReverseORMFunction = ({ weight, orm }) => ({
  reps: r((orm / weight - 1) / 0.0333),
});

export const lombardi: ORMFunction = ({ weight, reps }) => ({
  orm: r(weight * Math.pow(reps, 0.1)),
});

export const oconner: ORMFunction = ({ weight, reps }) => ({
  orm: r(weight * (1 + 0.025 * reps)),
});

export const reverseOconner: ReverseORMFunction = ({ weight, orm }) => ({
  reps: r((orm / weight - 1) / 0.025),
});

function r(value: number): number {
  return Math.max(Math.round(value * 1000) / 1000, 0);
}
