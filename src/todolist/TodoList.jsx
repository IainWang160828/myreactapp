import React from "react";
import TodoItem from "./TodoItem";
import axios from 'axios';

class TodoList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            list:[],
            inputValue:''
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.btnOnclickHandler = this.btnOnclickHandler.bind(this);
        this.handleDelete =this.handleDelete.bind(this);

    }

    componentDidMount() {
        this.getNoteList()
    }

    getNoteList = () =>{
        axios.get('http://localhost:8080/v1/getNoteList').then( res => {
            const noteMessageObj = JSON.parse(JSON.stringify(res.data));
            this.setState({
                list:noteMessageObj
            });
        })

    }

    pushNoteList = (postData) =>{
        let noteList = {"noteMessage":postData}
        axios.post("http://localhost:8080/v1/addOneNote",noteList).then(res =>{
            let currentlist = [...this.state.list]
            currentlist.push(res.data.id,res.data.noteMessage)
            this.setState({
                list: currentlist,
                inputValue:''
            })
        })
    }

    deleteOneNote = (id) =>{
        let deleteId = {"id":id}
        axios.post("http://localhost:8080/v1/deleteOneNote",deleteId).then(res =>{
            console.log(res)
        })
    }

    btnOnclickHandler(){
        this.pushNoteList(this.state.inputValue)
    }

    inputChangeHandler(e){
        this.setState({
            inputValue: e.target.value
        })
    }

    handleItemOnclick(index){
        let list = [...this.state.list];
        list.splice(index,1);
        this.setState({
            list:list
        })

    }

    handleDelete(index){
        let list = [...this.state.list];
        list.splice(index,1);
        this.setState({
            list:list
        })
        this.deleteOneNote(index)

    }


    render(){
        return(
            <div>
              <div>
                <input value={this.state.inputValue} onChange={this.inputChangeHandler}/>
                <button className='ref-btn' onClick={this.btnOnclickHandler}>add</button>
              </div>
            
              <ul>
                {
                    this.state.list.map((item, index) => {
                        return(
                        <TodoItem 
                        handleDelete = {this.handleDelete} 
                        key={index} 
                        content={item.noteMessage} 
                        index={item.id}>
                        </TodoItem>) 
                        // return <li key={index} onClick={this.handleItemOnclick.bind(this,index)}>{item}</li>
                    })
                }
              </ul>
              <div>

              </div>
            </div>
            
        );
    }      
}

export default TodoList; 
