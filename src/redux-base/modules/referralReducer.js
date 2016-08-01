import axios from 'axios';

const SEARCH_REFERRALS = 'SEARCH_REFERRALS';

const ADD_REFERRAL = 'ADD_REFERRAL';

const UPDATE_REFERRAL = 'UPDATE_REFERRAL';

const DELETE_REFERRAL = 'DELETE_REFERRAL';

const LOAD_REFERRAL = 'LOAD_REFERRAL';
const LOAD_REFERRAL_SUCCESS = 'LOAD_REFERRAL_SUCCESS';
const LOAD_REFERRAL_FAIL = 'LOAD_REFERRAL_FAIL';

const LOAD_REFERRAL_SKILLS = 'LOAD_REFERRAL_SKILLS';
const LOAD_REFERRAL_SKILLS_SUCCESS = 'LOAD_REFERRAL_SKILLS_SUCCESS';

const UPLOAD ='UPLOAD';

const RESOURCE ='RESOURCE';
const RESOURCE_SUCCESS ='RESOURCE_SUCCESS';

const initialReferralState = {
  loaded: false,
  loading: true,
  error: null,
  items: [],
  skills: [],
  searchReferralTerm: '',
  resource: null,
  addMessage: null
};

const actionsMap = {
  [LOAD_REFERRAL]: (state) => {
    console.log('LOAD_REFERRAL  reducer 1...');
    return {
      ...state,
      loading: true
    };
  },
  [LOAD_REFERRAL_SUCCESS]: (state, action) => {
    console.log('LOAD_REFERRAL_SUCCESS reducer 1...');
    console.log(action);
    return {
      ...state,
      loading: false,
      loaded: true,
      items: action.result.data,
      error: null,
      searchReferralTerm: ''
    };
  },
  [LOAD_REFERRAL_SKILLS]: (state) => {
    console.log('LOAD_REFERRAL_SKILLS reducer 1...');
    return {
        ...state
    };
  },
  [LOAD_REFERRAL_SKILLS_SUCCESS]: (state, action) => {
    console.log('LOAD_REFERRAL_SKILLS_SUCCESS reducer 1...');
    console.log(action);
    return {
        ...state,
        skills: action.result.data
    };
  },
  [RESOURCE]: (state) => {
    console.log('RESOURCE reducer 1...');
    return {
        ...state
    };
  },
  [RESOURCE_SUCCESS]: (state, action) => {
    console.log('RESOURCE_SUCCESS reducer 1...');
    console.log(action);
    return {
        ...state,
        resource: action.result.data
    };
  },
  [LOAD_REFERRAL_FAIL]: (state, action) => {
    console.log('LOAD_REFERRAL_FAIL reducer 1...');
    return {
        ...state,
        loading: false,
        loaded: false,
        items: null,
        error: action.error.data,
        searchReferralTerm: ''
    };
  },
  [DELETE_REFERRAL]: (state, action) => {
    console.log('DELETE_REFERRAL reducer 1...');
    console.log(action);
    return {
        ...state,
        loading: false,
        loaded: true,
        items: state.items.filter(c => c.id !== action.id),
        error: null,
        searchReferralTerm: ''
    };
  },
  [SEARCH_REFERRALS]: (state, action) => {
    return {
      searchReferralTerm: action.searchReferralTerm
    }
  },
  [ADD_REFERRAL]: (state, action) => {
    console.log("ADD_REFERRAL Reducer...");
    console.log(action);
    return {
      ...state
    };
  },
  [UPDATE_REFERRAL]: (state, action) => {
    console.log("UPDATE_REFERRAL Reducer...");
    console.log(action);
    return {
      ...state
    };
  }
}

export default function referralReducer (state = initialReferralState, action) {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state

  return Object.assign({}, state, reduceFn(state, action))
}


export function searchReferrals (search) {
  console.log("searchReferrals...");
  return {
    type: SEARCH_REFERRALS,
    searchReferralTerm: search
  }
}

const ROOT_URL = 'http://localhost:8080/EnterpriseArchitecture';
const REFERRAL_URL = 'http://localhost:8080/EnterpriseArchitecture/referral';
export function load(userId) {
   console.log('LOAD_REFERRAL action...');
   const request = axios({
       method: 'get',
       url: `${REFERRAL_URL}/user/${userId}`
     });
   return {
     types: [LOAD_REFERRAL, LOAD_REFERRAL_SUCCESS, LOAD_REFERRAL_FAIL],
     promise: request
   };
 }

 export function loadRecruiterReferrals(recruiterid) {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/api/recruiter/referral/${recruiterid}`
      });
    return {
      types: [LOAD_REFERRAL, LOAD_REFERRAL_SUCCESS, LOAD_REFERRAL_FAIL],
      promise: request
    };
  }

 export function getReferral(referralid) {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/api/ref/${referralid}`
      });
    return {
      types: [LOAD_REFERRAL, LOAD_REFERRAL_SUCCESS, LOAD_REFERRAL_FAIL],
      promise: request
    };
  }

 export function loadSkills() {
   console.log('LOAD_REFERRAL_SKILLS action...');
   const request = axios({
       method: 'get',
       url: `${REFERRAL_URL}/skills`,
     });
   return {
     types: [LOAD_REFERRAL_SKILLS,LOAD_REFERRAL_SKILLS_SUCCESS],
     promise: request
   };
 }

export function deleteReferral (id) {
  console.log("deleteReferral...");
  const request = axios({
      method: 'delete',
      url: `${REFERRAL_URL}/delete/${id}`
    });
  return {
    type: DELETE_REFERRAL,
    payload: request
  }
}

export function requestUpdate(referral){
    return {
        type: [UPDATE_REFERRAL],
        payload: axios.put('http://localhost:8080/EnterpriseArchitecture/api/recruiter/referral', referral)
    }
}

export function addReferral (referral) {

  console.log("ADD_REFERRAL Action...");

  return {
    type: [ADD_REFERRAL],
    payload: axios.post('http://localhost:8080/EnterpriseArchitecture/referral/', referral)
  }
}

export function upload(file) {
    const data = new FormData();
    data.append('file', file);

    return {
        type: UPLOAD,
        payload: axios.post('http://localhost:8080/EnterpriseArchitecture/referral/upload', data)
    }
}

export function getResource(file) {
   const request = axios({
       method: 'get',
       url: `${ROOT_URL}/resources/${file}`
     });
   return {
     types: [RESOURCE, RESOURCE_SUCCESS],
     promise: request
   };
}
