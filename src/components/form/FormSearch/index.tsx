import { FaSearch } from 'react-icons/fa';
import './style.sass';

export function FormSearch() {
  return (
    <form className="search">
      <input
        type="search"
        name="search"
        placeholder="Search..."
        className="form-control"
      />

      <button type="submit" className="btn">
        <FaSearch />
      </button>
    </form>
  );
}
