function useInterval(delay: number, cb: () => any) {
  React.useEffect(() => {
    const intervalID = setInterval(() => cb(), delay);
    return () => clearInterval(intervalID);
  });
}

export useInterval
