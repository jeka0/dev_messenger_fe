import { useAuth } from '../auth/useAuth.js';

function UnauthorizedRoute({ children }) {
    const { isAuth } = useAuth();

    if(isAuth === undefined) return;
    
    return !isAuth && children;
  }
  
  export default UnauthorizedRoute;