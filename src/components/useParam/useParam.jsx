import { useParams } from "react-router-dom";

export const useParam = (Component) => {
  const Wrapper = (props) => {
    const useParam = useParams();
    
    return (
      <Component
        params={useParam}
        {...props}
        />
    );
  };
  
  return Wrapper;
};