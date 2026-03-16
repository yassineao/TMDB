import { Link } from "react-router-dom";
import '../styles/footer.css';
const Footer = () => (

    <footer>
        <div class="footer-links">
            <Link to="/popularMovies" ><span ><span className="u-nav">Popular Movies</span></span></Link>
            <Link to="/popularSerie" ><span ><span className="u-nav">Popular Series</span></span></Link>
            <Link to="/genres" ><span ><span className="u-nav">Genres</span></span></Link>
        </div>

        <p className="footer-p">© 2026 Movierito</p>
    </footer>
);

export default Footer;
