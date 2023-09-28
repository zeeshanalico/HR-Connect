// dateUtils.js
function getCurrentDate() {
  // const currentDate = new Date();
  // const year = currentDate.getFullYear();
  // const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  // const day = String(currentDate.getDate()).padStart(2, '0');
  // return `${year}-${month}-${day}`;
  return new Date().toISOString().split('T')[0];
}

module.exports = getCurrentDate;
