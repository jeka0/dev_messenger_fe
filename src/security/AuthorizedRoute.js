import { useAuth } from '../auth/useAuth.js';

function AuthorizedRoute({ children }) {
    const { isAuth } = useAuth();

    if(isAuth === undefined) return;
    
    return isAuth && children;
  }
  
  export default AuthorizedRoute;