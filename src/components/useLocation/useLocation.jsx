import { useLocation as hookLocation } from "react-router-dom";

export const useLocation = (Component) => {
  const Wrapper = (props) => {
    const location = hookLocation();
    
    return (
      <Component
        location={location}
        {...props}
        />
    );
  };
  
  return Wrapper;
};