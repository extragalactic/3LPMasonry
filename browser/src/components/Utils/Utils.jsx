// Utility functions
//

// A basic phone number formatter
function FormatPhoneNumber(phoneNum) {
  let formattedNum;
  if (phoneNum.length === 10) {
    formattedNum = `${phoneNum.substring(0, 3)}-${phoneNum.substring(3, 6)}-${phoneNum.substring(6, 10)}`;
  } else {
    formattedNum = phoneNum;
  }
  return formattedNum;
}

// Display the relevant part of the timestamp data
function FormatTimestamp(timestamp) {
  return timestamp.slice(0, timestamp.indexOf('T'));
}

export { FormatPhoneNumber, FormatTimestamp };
