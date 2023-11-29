import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles/style.scss'
import Profile from '../Images/profile.png'

const Cards = () => {
  return (
    <div className='div3'>
      <Card style={{ width: '18rem', backgroundColor:'#7B904B', borderRadius:'30px'}}><center>
        <Card.Img variant="top" src={Profile} style={{borderColor:'white', borderRadius:'50%',borderStyle:'solid',borderWidth:'3px', height:'90px', width:'90px', marginTop:'10px'}}/></center>
        <Card.Body style={{backgroundColor:'#7B904B', borderBottomLeftRadius:'30px', borderBottomRightRadius:'30px'}}>
          <Card.Title style={{color:'white'}}><center>Card Title</center></Card.Title>
          <Card.Text style={{justifyContent:'justify', color:'white'}}>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text><center>
          <Button style={{backgroundColor:'black', color:'white',}}>Delete</Button>
          </center>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Cards