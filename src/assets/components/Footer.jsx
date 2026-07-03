import { Button } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <div className="footer-content">
      <nav>
        <ul>
          <li>
            <a href="#audio-subtitles">Audio and Subtitles</a>
          </li>
          <li>
            <a href="#media-center">Media Center</a>
          </li>
          <li>
            <a href="#privacy">Privacy</a>
          </li>
          <li>
            <a href="#contact-us">Contact us</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#audio-description">Audio Description</a>
          </li>
          <li>
            <a href="#investor-relations">Investor Relations</a>
          </li>
          <li>
            <a href="#legal-notices">Legal Notices</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#help-center">Help Center</a>
          </li>
          <li>
            <a href="#jobs">Jobs</a>
          </li>
          <li>
            <a href="#cookie-preferences">Cookie Preferences</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#gift-cards">Gift Cards</a>
          </li>
          <li>
            <a href="#terms-of-use">Terms of Use</a>
          </li>
          <li>
            <a href="#corporate-information">Corporate Information</a>
          </li>
        </ul>
      </nav>
      <Button>Service Code</Button>
      <p>&copy; 1997-2023 Netflix, Inc.</p>
      </div>
    </footer>
  );
}

export default Footer;
