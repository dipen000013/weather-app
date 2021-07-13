import { useEffect } from 'react';

export default function useRefresh(history, path, resetRoute = '/') {
  let handler;

  const refresh = () => {
    history.push(resetRoute);

    handler = setTimeout(() => history.push(path), 10);
  };

  useEffect(() => () => handler && clearTimeout(handler), [handler]);

  return refresh;
}
