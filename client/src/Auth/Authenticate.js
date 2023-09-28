import { ApiCallGet } from "../CoreModule/ApiCall";
const Authenticate = (redirect = true) => {

    return ApiCallGet('/getUser')
        .then((result) => {
            console.log(result)
            if (redirect && result.error && window.location.pathname !== '/error') {
                window.location.replace("/error");
            }
            else if (redirect && window.location.pathname !== '/login' && (result.data === undefined || result.data === '' || result.data === null) && result.data !== '/login-oric') {
                window.location.replace("/login");
            } 
            else if (redirect && window.location.pathname === '/login-oric') {
                window.location.replace("/login-oric");
            } 
            else if (result.error) {
                return undefined;
            }
            else {
                return result.data;
            }
        });

}
export default Authenticate;