import axios from 'axios';

const LOAD_RECRUITERS = 'LOAD_RECRUITERS';
const LOAD_RECRUITERS_SUCCESS = 'LOAD_RECRUITERS_SUCCESS';

const ADD_CONSULTANT = 'ADD_CONSULTANT';

const initialReferralState = {
    recruiters: []
};

const actionsMap = {
  [LOAD_RECRUITERS]: (state) => {
    console.log('LOAD_RECRUITERS reducer 1...');
    return {
        ...state
    };
  },
  [LOAD_RECRUITERS_SUCCESS]: (state, action) => {
    console.log('LOAD_RECRUITERS_SUCCESS reducer 1...');
    console.log(action);
    return {
        ...state,
        recruiters: action.result.data
    };
  },
  [ADD_CONSULTANT]: (state, action) => {
    console.log("ADD_CONSULTANT Reducer...");
    console.log(action);
    return {
      ...state
    };
  }
}

export default function userReducer (state = initialReferralState, action) {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state

  return Object.assign({}, state, reduceFn(state, action))
}

const ROOT_URL = 'http://localhost:8080/EnterpriseArchitecture/api';
export function loadRecruiters() {
   console.log('LOAD_RECRUITERS action...');
   const request = axios({
       method: 'get',
       url: `${ROOT_URL}/recruiters`
     });
   return {
     types: [LOAD_RECRUITERS, LOAD_RECRUITERS_SUCCESS],
     promise: request
   };
}

export function addConsultant (consultant) {

  console.log("ADD_CONSULTANT Action...");

  return {
    type: [ADD_CONSULTANT],
    payload: axios.post('http://localhost:8080/EnterpriseArchitecture/api/consultant/add', consultant)
  }
}