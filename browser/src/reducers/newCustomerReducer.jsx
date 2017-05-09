export const SAVE_CUSTOMER_DETAILS = 'SAVE_CUSTOMER_DETAILS';
export const SAVE_CUSTOMER_DETAILS_COMPLETE = 'SAVE_CUSTOMER_DETAILS_COMPLETE';

const intialState = {
  firstName: '',
  lastName: '',
};

export const newCustomerReducer = (state = intialState, action) => {
  switch (action.type) {
    case SAVE_CUSTOMER_DETAILS:
      return action.payload;
    default:
      return state;
  }
};
