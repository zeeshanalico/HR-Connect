import Cookies from "js-cookie";

export const BaseUrl = 'http://localhost:3002';
export const employeeId = 121;
export const start_time = "10:0:0"
export const end_time = "11:40:0"
// const jwtToken = Cookies.get('jwtToken');//jwtToken:user_id, role_id,emp_id
// export const config = {
//     headers: {
//       authorization: `Bearer ${jwtToken}`,
//     },
//     withCredentials: true
//   };
const jwtToken = localStorage.getItem('jwtToken');
console.log('JWT Token:', jwtToken); // Log the token
export const config = {
  headers: { authorization: `Bearer ${jwtToken}` },
  withCredentials: true,
};

// function increaseDateByOneDay(dateString) {
//     const currentDate = new Date(dateString);
//     currentDate.setDate(currentDate.getDate() + 1);

//     const year = currentDate.getFullYear();
//     const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
//     const day = String(currentDate.getDate()).padStart(2, '0');

//     return `${year}-${month}-${day}`;
//   }

// const jwtToken = Cookies.get('jwtToken');//jwtToken:user_id, role_id,emp_id
// if (jwtToken) {
//   console.log('token sent');
//   axios.defaults.headers.common['authorization'] = `Bearer ${jwtToken}`;
// }