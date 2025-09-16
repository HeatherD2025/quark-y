import React from 'react'; 
import { Form, Row, Col } from 'react-bootstrap';
import avatar1 from '../assets/accountAvatarImages/avatar1.png';
import avatar2 from '../assets/accountAvatarImages/avatar2.png';
import avatar3 from '../assets/accountAvatarImages/avatar3.png';
import avatar4 from '../assets/accountAvatarImages/avatar4.png';
import avatar5 from '../assets/accountAvatarImages/avatar5.png';
import avatar6 from '../assets/accountAvatarImages/avatar6.png';
import avatar7 from '../assets/accountAvatarImages/avatar7.png';
import avatar8 from '../assets/accountAvatarImages/avatar8.png';

const avatars = [
  { id: 'avatar1.png', src: avatar1 },
  { id: 'avatar2.png', src: avatar2 },
  { id: 'avatar3.png', src: avatar3 },
  { id: 'avatar4.png', src: avatar4 },
  { id: 'avatar5.png', src: avatar5 },
  { id: 'avatar6.png', src: avatar6 },
  { id: 'avatar7.png', src: avatar7 },
  { id: 'avatar8.png', src: avatar8 },
];

export default function AvatarSelection({ form, handleChange }) {

return (
  <Form.Group controlId='formAvatar'>
    <Form.Label>Choose your avatar</Form.Label>
    <Row>
      {avatars.map((avatar) => (
         <Col xs={4} md={2} key={avatar.id} className='text-center'>
            <Form.Check
              type='radio'
              name='avatar'
              value={avatar.id}
              checked={form.avatar === avatar.id}
              onChange={handleChange}
              id={`avatar-${avatar.id}`}
              label={
                <img 
                src={avatar.src}
                alt={`Avatar ${avatar.id}`}
                style={{
                 width: "10rem",
                 height: "10rem",
                 borderRadius: "50%",
                 objectFit: "cover",
                 border: 
                   form.avatar === avatar.id ? "3px solid #007bff" : "1px solid #ccc",
                padding: "2px",
                backgroundColor: "#fff"
                }}
              />
              }
              />
         </Col>
      ))}
    </Row>
  </Form.Group>
 );
}
