import { useEffect, useState } from "react";

const useLocation = () => {
  const [pathName, setPathName] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setPathName(window.location.pathname);
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
    } else if (element !== pathParts[i]) null;
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
