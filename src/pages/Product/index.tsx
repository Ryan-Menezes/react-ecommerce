import { useParams } from 'react-router-dom';
import './style.sass';

export function Product() {
  const params = useParams();

  return <h1>{params.id}</h1>;
}
