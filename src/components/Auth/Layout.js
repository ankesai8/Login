import classes from "./Layout.module.css";
const Layout = (props) => {
  return (
    <div className={`container-fluid ${classes.blue}`}>
      <div className={`${classes.box}  ${props.className}`}>
        <div className= {`col-12 ${classes.mform} `}>
            {props.children}
        </div>
      </div>
    </div>
  );
};
export default Layout;
