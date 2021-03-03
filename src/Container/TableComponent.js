import React , {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { deleteapi , fetchdataByIdapi } from '../Redux/Actions/table';
const TableComponent = (props) => {
    const [post , setpost] = useState(props.resultapi);
    useEffect(() => {
        if(props.resultapi) setpost(props.resultapi);
    }, [props.resultapi])

    const handledelete = (id) => {
        props.dispatch(deleteapi(id));
    }
    const handleedit = (id) => {
        props.dispatch(fetchdataByIdapi(id));
    }
        if(props) {
            return (
                <table id="customers"> 
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>userId</th>
                            <th>title</th>
                            <th>body</th>
                        </tr>
                    </thead>
                <tbody>
                    {
                        (post) ? post.map((data , index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.id}</td>
                                    <td>{data.userId}</td>
                                    <td>{data.title}</td>
                                    <td>{data.body}</td>
                                    <td><button onClick={() => handleedit(data.id)}>Edit</button></td>
                                    <td><button onClick={() => handledelete(data.id)}>Delete</button></td>
                                </tr>            
                            )               
                        }) : ""
                    }
                </tbody>
            </table>        
            )
        } else { 
            return (
                <h4>There is no data</h4>
            )
        }
        
        
}   

const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(TableComponent);