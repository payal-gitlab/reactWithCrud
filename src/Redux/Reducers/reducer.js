import { LoadTableSuccess , LoadTableFail , LoadFormSuccess , LoadFormFail , LoadUpdateSuccess, LoadUpadteFail , CreateDataSucess, CreateDataFail} from '../Actions/type';
const initialstate = {
    resultapi : null,
    formdata : null,
    error : null
}
export const reducer = (state = initialstate , action) => {
    const type = action.type;
    console.log(action)
    switch(type){
        case LoadTableSuccess : return { ...state , resultapi : action.payload , error : false} 
        case LoadTableFail : return  {...state , message : action.payload , error : true }
        case LoadFormSuccess : return { ...state , formdata : action.payload ,  error : false} 
        case LoadFormFail : return {...state , message : action.payload , error : true }
        case LoadUpdateSuccess : {return { ...state , updatedata : action.payload ,  error : false} }
        case LoadUpadteFail : return {...state , message : action.payload , error : true }
        case CreateDataSucess : {console.log("vcx");return { ...state , finaldata : action.payload ,  error : false} }
        case CreateDataFail : return {...state , message : action.payload , error : true }
        default : return state
    }
}