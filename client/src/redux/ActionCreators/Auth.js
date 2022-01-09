import * as api from '../api/index';

export const signIn = (email, password) => (dispatch) => {
    // dispatch(ChangeLoadingStatus(true));
  
    setTimeout(() => {
       api.signIn(email, password)
        .then((response) => {
          //   console.log(response.status);
          if (response.status === 200) {
            //   console.log("inn");
            localStorage.setItem("profile", JSON.stringify(response.data.token));
  
            // dispatch(ChangeLoadingStatus(false));
            dispatch({type: "LOGIN" , payload : response.data});
          }
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.response);
          alert(error.response.data.msg);
  
        //   dispatch(ChangeLoadingStatus(false));

        });
    }, 2000);
  };

  export const signUp = (email, password, name) => (dispatch) => {
    // dispatch(ChangeLoadingStatus(true));
  
    setTimeout(() => {
       api.signUp(email, password, name)
        .then((response) => {
          //   console.log(response.status);
          if (response.status === 200) {
            //   console.log("inn");
            localStorage.setItem("profile", JSON.stringify(response.data.token));
  
            // dispatch(ChangeLoadingStatus(false));
            dispatch({type: "LOGIN" , payload : response.data});
          }
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.response);
          alert(error.response.data.msg);
  
        //   dispatch(ChangeLoadingStatus(false));

        });
    }, 2000);
  };