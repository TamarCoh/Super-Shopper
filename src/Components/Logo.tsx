import "./Logo.css";
import logo from "../images/logo.png";
function Logo(props: any) {
  return (
    <div>
      <img src={logo} className={props.class_name} alt="homeLogo" />
    </div>
  );
}
export default Logo;
