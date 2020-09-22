import React, { Component } from 'react'
import { Button ,Table ,Input ,Container , Row, Col} from 'reactstrap';
import alertify from 'alertifyjs';

export default class Users extends Component {
    state={
        users:[
            {
                id:1,
                name:"Farid",
                job:"React",
            },
            {
                id:2,
                name:"Rufat",
                job:"Angular",
            },
            {
                id:3,
                name:"Amrah",
                job:"C#",
            },
            
        ],
        newName: "",
        newJob: ""
    }


    changeHandler = (e,id) => {
        let newUserList = [...this.state.users];
        let changedUser = newUserList.find(u => u.id === id);
        (e.target.name === "name") ? changedUser.name = e.target.value : changedUser.job = e.target.value;
        this.setState({
            users : newUserList
        });        
    }

    removeHandler = (e,index)=>{
        let newUserList = [...this.state.users];
        newUserList.splice(index, 1);
        this.setState({
            users : newUserList
        })
        alertify.success('Succesfully removed');

    }

    addUserInfoHandler = (e) =>{
    var newName;
    var newJob; 
    if(e.target.name === "newName"){
        newName = e.target.value 
        this.setState({
            newName: newName,
        })
    }else{
        newJob = e.target.value 
        this.setState({
            newJob: newJob
        })
    }


    }

    addUserHandler = () =>{
        let newId= this.state.users.length + 1;
        let newUserObject =  {id:newId,name:this.state.newName,job:this.state.newJob}
        let newUserList = [...this.state.users];
        newUserList.push(newUserObject);

        if(newUserObject.name != "" && newUserObject.job !=""){
            this.setState({
                users : newUserList,
                newName: "",
                newJob: ""
            })
            alertify.success('Succesfully added');

            
        }else{
            alertify.error('You have to field all the fields');
        }


    }


    render() {
        return (
            <div>
                    <Table>
      <thead>
        <tr>
          <th>id</th>
          <th>First Name</th>
          <th>Job</th>
          <th>Edit Name</th>
          <th>Edit Job</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
          {this.state.users.map((user,index) =>
              (
                <tr key={user.id}>
              <th scope="row">{index+1}</th>
              <td>{user.name}</td>
              <td>{user.job}</td>
              <td><Input type="text" placeholder="Chnage name" name="name" onChange={(e)=>{this.changeHandler(e,user.id)}}></Input></td>
              <td><Input type="text" placeholder="Chnage job"  name="job"  onChange={(e)=>{this.changeHandler(e,user.id)}}></Input></td>
              <td><Button color="danger" onClick={(e)=>{this.removeHandler(e,index)}}>Delete</Button></td>
              </tr>
              )
          )}
    
      </tbody>
    </Table>

    <Container>
      <Row>
    <Col xs="3">
    <Input type="text" placeholder="name" value={this.state.newName}  name="newName" onChange={this.addUserInfoHandler}></Input>
    </Col>
    <Col xs="3">
    <Input type="text" placeholder="job" value={this.state.newJob} name="newJob" onChange={this.addUserInfoHandler}></Input>
    </Col>
    <Button color="primary" onClick={this.addUserHandler}>Add new user</Button>

    </Row>
    </Container>
            </div>
        )
    }
}
