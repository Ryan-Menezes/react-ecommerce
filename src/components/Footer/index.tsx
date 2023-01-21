import './style.sass';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>E-commerce &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
