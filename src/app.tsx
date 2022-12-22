import React, { useMemo } from 'react';

export const App: React.FC<{}> = () => {
  const randomNumber = useMemo(() => Math.random(), []);
  return (
    <>
      Hello from React!
      <h1 className="text-3xl font-bold underline">
        Random number: {randomNumber}
      </h1>
    </>
  );
};
