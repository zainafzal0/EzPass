const initialState = {
  data_1: "", //For Password Page Data 1 represents the EMAIL
  data_2: "", //For Password Page Data 2 represents the PASSWORD
  data_3: "",
  data_4: "",
  data_5: "",
};

const modalIndexReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RESET_DATA":
      return {
        initialState
      };
    case "CHANGE_DATA_1":
      return {
        data_1: action.data,
        data_2: state.data_2,
        data_3: state.data_3,
        data_4: state.data_4,
        data_5: state.data_5,
      };
    case "CHANGE_DATA_2":
      return {
        data_1: state.data_1,
        data_2: action.data,
        data_3: state.data_3,
        data_4: state.data_4,
        data_5: state.data_5,
      };
      case "CHANGE_DATA_3":
      return {
        data_1: state.data_1,
        data_2: state.data_2,
        data_3: action.data,
        data_4: state.data_4,
        data_5: state.data_5,
      };
      case "CHANGE_DATA_4":
      return {
        data_1: state.data_1,
        data_2: state.data_2,
        data_3: state.data_3,
        data_4: action.data,
        data_5: state.data_5,
      };
      case "CHANGE_DATA_5":
      return {
        data_1: state.data_1,
        data_2: state.data_2,
        data_3: state.data_3,
        data_4: action.data,
        data_5: state.data_5,
      };
    default:
      return state;
  }
};

export default modalIndexReducer;
