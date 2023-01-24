import { Link } from 'react-router-dom';
import './style.sass';

export interface BannerProps {
  title: string;
  description?: string;
  image: string;
  btnLink?: string;
  btnText?: string;
}

export function Banner({
  title,
  description,
  image,
  btnLink,
  btnText,
}: BannerProps) {
  return (
    <div className="banner">
      <div className="banner-grid">
        <h1>{title}</h1>

        {description !== undefined ? <p>{description}</p> : ''}

        <Link to={btnLink ?? '/'} title={title} className="btn">
          {btnText ?? 'More info'}
        </Link>
      </div>
      <div className="banner-grid">
        <img src={image} alt={title} title={title} />
      </div>
    </div>
  );
}
