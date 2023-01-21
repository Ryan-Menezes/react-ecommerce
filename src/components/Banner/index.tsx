import { Link } from 'react-router-dom';
import './style.sass';

export interface BannerProps {
  title: string;
  description?: string;
  btnLink?: string;
  btnText?: string;
}

export function Banner({ title, description, btnLink, btnText }: BannerProps) {
  return (
    <div className="banner">
      <div className="banner-grid">
        <h1>{title}</h1>

        {description !== undefined ? <p>{description}</p> : ''}

        <Link to={btnLink ?? '/'} className="btn">
          {btnText ?? 'More info'}
        </Link>
      </div>
      <div className="banner-grid">
        <img
          src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1671704007-AA001TM_SHOE_ANGLE_GLOBAL_MENS_TREE_FLYER_NATURAL_BLACK_BLIZZARD_83c8aac6-2da3-4261-85d0-2ca8c083dce0_600x600.png"
          alt="Shoe"
        />
      </div>
    </div>
  );
}
