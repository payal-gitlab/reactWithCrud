import React , {useState , useEffect} from 'react';
import { connect } from 'react-redux';
import { updateapi , clearFormdata , createDataapi} from '../Redux/Actions/table';
const FormComponent = (props) => {
    const [loadform , setform] = useState({ userId:'' ,id:'' , title:'' , body:'' });
    const [err , errorState] = useState({})
    useEffect(() => {
        console.log(props.formdata)
        if(props.formdata){
            setform({userId : props.formdata[0].userId ,  id : props.formdata[0].id ,  title : props.formdata[0].title , body : props.formdata[0].body}) ; 
        }
        
    } , [props.formdata]);
    const handleChange = (e) => {
        const name = e.target.name
        setform({...loadform , [name] : e.target.value})
    }
    const handleSubmit = (e) => {
        if(handleValidation()){
            if(props.formdata){
                props.dispatch(updateapi(loadform));
            }
            else{
                props.dispatch(createDataapi(loadform));
            }
        }else{
            alert("Form has errors.")
        }
        
         e.preventDefault();
    }
    const handleFormReset = (e) => {
        props.dispatch(clearFormdata()).then(()=>{
            console.log("fgdf");
            setform({userId:'' , id:'' ,  title:'' , body:'' }) 
        });
        e.preventDefault();
    }
    const handleValidation = () => {
        let fields = loadform;
        let errors = {};
        let formIsValid = true; 
             console.log(fields["userId"])
        if(!fields["userId"]){
            formIsValid = false;
            errors["userId"] = "Cannot be empty";
         }
         
        
        if(!fields["title"]){
           formIsValid = false;
           errors["title"] = "Cannot be empty";
        }
        if(!fields["body"]){
            formIsValid = false;
            errors["body"] = "Cannot be empty";
         }
  
         console.log(fields["title"])

       errorState(errors);
       return formIsValid;
   }
    return (
        <form onSubmit={(e) => handleSubmit(e)} onReset={(e) => handleFormReset(e)}>
            <label>User Id</label><input className="form-control" type="number" name='userId' value={loadform.userId} onChange={(event) => handleChange(event)} onBlur={()=>handleValidation} />
            {err["userId"] ? <span style={{color: "red"}}>{err["userId"]}</span> : ''}
            <br/>
            <label>Title</label><input type="text" name='title' value={loadform.title} onChange={(event) => handleChange(event)} onBlur={()=>handleValidation} />
            {err["title"] ? <span style={{color: "red"}}>{err["title"]}</span> : ''}
            <br/>
            <label>Body</label><input type="text" name='body' value={loadform.body} onChange={(event) => handleChange(event)} onBlur={()=>handleValidation} />
            {err["body"] ? <span style={{color: "red"}}>{err["body"]}</span> : '' }
            <br/>
            <button type="submit">{props.formdata ? 'Update' : 'Submit'}</button>
            <button type="reset">Reset</button>
        </form>
    )
}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(FormComponent);