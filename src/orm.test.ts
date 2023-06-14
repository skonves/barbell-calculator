import {
  brzycki,
  epley,
  oconner,
  ORMFunction,
  reverseBrzycki,
  reverseEpley,
  reverseOconner,
  ReverseORMFunction,
} from './orm';

const ormFunction: [string, ORMFunction, ReverseORMFunction][] = [
  [brzycki.name, brzycki, reverseBrzycki],
  [epley.name, epley, reverseEpley],
  [oconner.name, oconner, reverseOconner],
];

const set: [number, number][] = [];

for (let weight = 225; weight <= 315; weight += 13) {
  for (let reps = 1; reps <= 20; reps++) {
    set.push([weight, reps]);
  }
}

describe.each(ormFunction)('%s', (_, func, reverseFunc) => {
  it.each(set)('%s for %s reps', (weight, reps) => {
    // ARRANGE
    const { orm } = func({ weight, reps });

    // ACT
    const result = reverseFunc({ weight, orm });

    // ASSERT
    expect(result.reps).toEqual(reps);
  });
});
