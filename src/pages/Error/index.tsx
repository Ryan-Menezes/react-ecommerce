import { ErrorResponse } from '@remix-run/router';
import { useRouteError } from 'react-router-dom';
import './style.sass';

export function Error() {
  const error = useRouteError() as ErrorResponse;

  return (
    <div className="container-error">
      <h1>{error.status}</h1>
      <p>{error.statusText}</p>
    </div>
  );
}
