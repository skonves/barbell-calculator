import React, { useMemo } from 'react';
import { Loadout, solve } from './algo';

import {
  BarSelector,
  BarType,
  NumberBox,
  PercentageSelector,
  useLocalStorage,
} from './components';
import { reverseBrzycki, reverseEpley } from './orm';

const barOptions: BarType[] = [
  { name: 'Olympic bar', weight: 45 },
  { name: 'Curl bar', weight: 30 },
  { name: 'Rouge DB-15', weight: 15 },
  { name: 'Rouge DB-10', weight: 10 },
];

export const App: React.FC<{}> = () => {
  const [max, setMax] = useLocalStorage<number>('max', 200);
  const [percent, setPercent] = useLocalStorage<number>('percent', 1);
  const [bar, setBar] = useLocalStorage<BarType>('bar', barOptions[0]);

  const loadout = useMemo(
    () => solve(max, percent, bar.weight),
    [max, percent, bar.weight],
  );

  const { reps } = reverseBrzycki({
    weight: loadout.total,
    orm: max,
  });

  const lowReps = Math.floor(reps);
  const highReps =
    Math.round(reps) !== Math.floor(reps) ? Math.ceil(reps) : lowReps;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto max-w-3xl">
        <NumberBox
          name="max"
          label="One rep max (ORM):"
          defaultValue={max}
          placeholder="max"
          onChange={setMax}
        />
        <PercentageSelector
          name="percent"
          defaultValue={percent}
          onChange={setPercent}
        />
        <BarSelector
          options={barOptions}
          defaultValue={bar}
          onChange={setBar}
        />
        <h1 className="mt-6 text-center text-7xl">{loadout.total}</h1>
        <h2 className="text-center text-2xl">
          <span>{Math.round((loadout.total / max) * 100)}% ORM</span>
          <span className="mx-3">&middot;</span>
          <span>
            {lowReps !== highReps ? `${lowReps}-${highReps}` : lowReps}{' '}
            {highReps === 1 ? 'rep' : 'reps'}
          </span>
        </h2>
        <LoadoutGraphic {...loadout} />
      </div>
    </div>
  );
};

type Plate = {
  weight: number;
  x: number;
  w: number;
  h: number;
  color: string;
};

export const LoadoutGraphic: React.VFC<Loadout> = (loadout) => {
  const gap = 2;

  const h = 200;
  const w = 350;

  const scale = 10;
  const iconScale = 0.4;

  const barH = 8;
  const barW = 350;

  const plateX = Math.round(w * 0.4);

  const sleeveW = 16.5;
  const sleeveH = 2;

  const collarW = 1.18;
  const collarH = 3;

  const plates = useMemo(() => {
    const results: Plate[] = [];
    let x = plateX;

    for (const plate of loadout.plates) {
      let color = 'black';
      let wRatio: number | undefined = undefined;
      let hRatio = 17.5;

      if (plate === 45) {
        wRatio = 2.36;
        color = 'blue';
      } else if (plate === 35) {
        wRatio = 1.93;
        color = 'yellow';
      } else if (plate === 25) {
        wRatio = 1.47;
        color = 'green';
      } else if (plate === 15) {
        wRatio = 1.04;
      } else if (plate === 10) {
        wRatio = 0.85;
      } else if (plate === 5) {
        wRatio = 1.04;
        hRatio = 12;
      } else if (plate === 2.5) {
        wRatio = 0.85;
        hRatio = 8;
      }

      if (typeof wRatio === 'number') {
        const step = Math.round(scale * wRatio);
        results.push({
          weight: plate,
          x,
          w: step,
          h: Math.round(scale * hRatio),
          color,
        });
        x += step + gap;
      }
    }
    return results;
  }, [loadout.plates, plateX]);

  return (
    <div>
      <div className="flex items-center justify-center">
        <svg width={w} height={h} className="mt-3">
          <rect
            x={(w - barW) / 2}
            y={(h - barH) / 2}
            width={barW - Math.round(sleeveW * scale)}
            height={barH}
            fill="#333333"
          />

          <rect
            x={plateX - gap}
            y={Math.round((h - sleeveH * scale) / 2)}
            width={Math.round(sleeveW * scale)}
            height={Math.round(sleeveH * scale)}
            fill="#333333"
          />

          <rect
            x={Math.round(plateX - collarW * scale) - gap}
            y={Math.round((h - collarH * scale) / 2)}
            width={Math.round(collarW * scale)}
            height={Math.round(collarH * scale)}
            fill="#333333"
          />

          {plates.map((plate) => (
            <rect
              x={plate.x}
              y={(h - plate.h) / 2}
              width={plate.w}
              height={plate.h}
              fill={plate.color}
              stroke="black"
              rx="3"
            />
          ))}
        </svg>
      </div>
      <div className="mt-6 flex flex-wrap gap-3 items-center justify-center">
        {plates.map((plate) => (
          <svg
            height={Math.round(plate.h * iconScale) + 4}
            width={Math.round(plate.h * iconScale) + 4}
          >
            <circle
              cx={Math.round((plate.h * iconScale) / 2) + 2}
              cy={Math.round((plate.h * iconScale) / 2) + 2}
              r={Math.round((plate.h * iconScale) / 2)}
              fill={plate.color}
              stroke="black"
            />
            <text
              x={Math.round((plate.h * iconScale) / 2) + 2}
              y={Math.round((plate.h * iconScale) / 2) + 2}
              text-anchor="middle"
              alignment-baseline="central"
              fill="white"
              stroke="black"
              strokeWidth={2.5}
              font-size={plate.h / 5}
            >
              {plate.weight}
            </text>
            <text
              x={Math.round((plate.h * iconScale) / 2) + 2}
              y={Math.round((plate.h * iconScale) / 2) + 2}
              text-anchor="middle"
              alignment-baseline="central"
              fill="white"
              stroke="transparent"
              font-size={plate.h / 5}
            >
              {plate.weight}
            </text>
          </svg>
        ))}
      </div>
    </div>
  );
};
