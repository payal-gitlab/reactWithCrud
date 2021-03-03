import { LoadTableSuccess , LoadTableFail , LoadFormSuccess , LoadFormFail , LoadUpdateSuccess, LoadUpadteFail , CreateDataSucess, CreateDataFail} from './type';
const getapi = () => (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/posts').then((response) => {
        return response.json();
    }).then((data) => {
        data = data.slice(0,5);
        localStorage.setItem('productsList' , JSON.stringify(data));
        dispatch({
            type : LoadTableSuccess,
            payload : JSON.parse(localStorage.getItem('productsList'))
        });
        return Promise.resolve();
    }).catch((error) => {
        console.log(error);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
         dispatch({
            type : LoadTableFail,
            payload : message
        })
        return Promise.reject();
    })
}

const deleteapi = (id) => (dispatch) => {
    var existingarray = JSON.parse(localStorage.getItem('productsList'));
    var update  = existingarray.filter((data) => id !== data.id);
    // console.log(JSON.parse(getdatabyId))
    localStorage.setItem('productsList' , JSON.stringify(update));
     return dispatch({
        type : LoadTableSuccess,
        payload : JSON.parse(localStorage.getItem('productsList'))
    });
    
}

const fetchdataByIdapi = (id) => (dispatch) => {
    var existingarray = JSON.parse(localStorage.getItem('productsList'));
    var getdatabyId  = existingarray.filter((data) => id == data.id);
    // console.log(JSON.parse(getdatabyId))
    return dispatch({
        type : LoadFormSuccess,
        payload : getdatabyId
    });
    // fetch('https://jsonplaceholder.typicode.com/posts/'+id).then((response) => {
    //     return response.json();
    // }).then((data) => {
    //     console.log(data)
    //     dispatch({
    //         type : LoadFormSuccess,
    //         payload : data
    //     })
    //     return Promise.resolve();
    // }).catch((error) => {
    //     console.log(error);
    //     const message =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //      dispatch({
    //         type : LoadFormFail,
    //         payload : message
    //     })
    //     return Promise.reject();
    // })
}

const updateapi = (getdata) => (dispatch) => {
    console.log("dsfsd")
    let existingarray = JSON.parse(localStorage.getItem('productsList'));
    let update = existingarray.filter((data) => {
        if(getdata.id == data.id){ 
            data.userId = getdata.userId;
            data.id = getdata.id;
            data.title = getdata.title;
            data.body = getdata.body;
            return data
        }else{
            return data;
        }
    });
    localStorage.setItem('productsList' , JSON.stringify(update));
        dispatch({
            type : LoadTableSuccess,
            payload : JSON.parse(localStorage.getItem('productsList'))
        });
        dispatch(clearFormdata())
    return true
    // return fetch('https://jsonplaceholder.typicode.com/posts/'+data.id, {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //         id: data.id,
    //         title: data.title,
    //         body: data.body,
    //         userId: data.userId
    //     }),
    //     headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //     },
    // }).then((response) => response.json())
    // .then((json) => 
    // {
    //     dispatch({
    //         type:LoadUpdateSuccess,
    //         payload:json
    //     })
    //     return Promise.resolve();
    // }).catch((error) => {
    //     console.log(error);
    //     const message =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //      dispatch({
    //         type : LoadUpadteFail,
    //         payload : message
    //     })
    //     return Promise.reject();
    // })
}

const clearFormdata = () => (dispatch) => {
    console.log("fdgd")
        
        return new Promise((resolve, reject) => {
            dispatch({
                type : LoadFormSuccess,
                payload : null
            });
      
            return resolve()
          });
    
}

const createDataapi = (data) => (dispatch) => {
    var existingEntries = JSON.parse(localStorage.getItem("productsList"));
    data.id = existingEntries.length + 1;
    if(existingEntries == null) existingEntries = [];
    existingEntries.push(data);
    localStorage.setItem("productsList", JSON.stringify(existingEntries));
    return dispatch({
        type : LoadTableSuccess,
        payload : JSON.parse(localStorage.getItem('productsList'))
    });
    // return fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         title: data.title,
    //         body: data.body,
    //         userId: data.userId
    //     }),
    //     headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //     },
    // }).then((response) => response.json())
    // .then((json) => 
    // {
    //     console.log(json)
    //     dispatch({
    //         type:CreateDataSucess,
    //         payload:json
    //     })
    //     return Promise.resolve();
    // }).catch((error) => {
    //     console.log(error);
    //     const message =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //      dispatch({
    //         type : CreateDataFail,
    //         payload : message
    //     })
    //     return Promise.reject();
    // })
}
export { getapi , deleteapi , fetchdataByIdapi , updateapi , clearFormdata , createDataapi};