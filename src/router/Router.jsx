import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";

const getCurrentPath = () => {
  const pathname = window.location.pathname;

  return pathname.startsWith(BASE_URL)
    ? pathname.slice(BASE_URL.length - 1) || "/"
    : pathname;
};

const useLocation = () => {
  const [pathName, setPathName] = useState(getCurrentPath());

  useEffect(() => {
    const onLocationChange = () => {
      setPathName(getCurrentPath());
    };

    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return pathName;
};

const matchPath = (path, route) => {
  const pathParts = path.split("/");
  const routeParts = route.split("/");

  if (pathParts.length !== routeParts.length) {
    return null;
  }

  const params = {};

  for (let i = 0; i < routeParts.length; i++) {
    const element = routeParts[i];

    if (element.startsWith(":")) {
      const paramName = element.slice(1);
      params[paramName] = pathParts[i];
    } else if (element !== pathParts[i]) return null;
  }

  return params;
};

const Router = ({ routes }) => {
  const pathName = useLocation();

  for (const route in routes) {
    const params = matchPath(pathName, route);

    if (params) {
      const Page = routes[route];

      return <Page params={params} />;
    }
  }

  const NotFound = routes["*"];

  return <NotFound />;
};

export default Router;
