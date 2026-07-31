import { BASE_URL } from "../constants/baseUrl";
import { navigate } from "../router/navigate";

const Link = ({ to, children, ...rest }) => {
  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
      return;
    }

    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={`${BASE_URL}${to}`} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export default Link;
