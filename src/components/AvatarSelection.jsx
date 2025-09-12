import React from "react"; 
import { Form, Row, Col } from 'react-bootstrap';

export default function AvatarSelection({ form, handleChange }) {
  const avatars = [
  { id: "avatar1", src: "/assets/accountAvatarImages/avatar1.png"},
  { id: "avatar2", src: "/assets/accountAvatarImages/avatar2.png"},
  { id: "avatar3", src: "/assets/accountAvatarImages/avatar3.png"},
  { id: "avatar4", src: "/assets/accountAvatarImages/avatar4.png"},
  { id: "avatar5", src: "/assets/accountAvatarImages/avatar5.png"},
  { id: "avatar6", src: "/assets/accountAvatarImages/avatar6.png"},
  { id: "avatar7", src: "/assets/accountAvatarImages/avatar7.png"},
  { id: "avatar8", src: "/assets/accountAvatarImages/avatar8.png"},
];

const loadAvatar = async (req, res) => {
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');

await fetch('/api/avatar/me', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ avatarId: 'avatar2.png' }),
});

await fetch('/api/avatar/me', {
  method: ''
})

await fetch('/api/avatar/me', {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

}

return (
  <Form.Group controlId="formAvatar">
    <Form.Label>Choose your avatar</Form.Label>
    <Row>
      {avatars.map((avatar) => {
         <Col xs={4} md={2} key={avatar.id} className="text-center">
            <Form.Check
              type="radio"
              name="avatar"
              value={avatar.id}
              checked={form.avatar === avatar.id}
              onChange={handleChange}
              id={`avatar-${avatar.id}`}
              label={
                <img 
                src={avatar.src}
                alt={`Avatar ${avatar.id}`}
              />
              }
              />
         </Col>
       })}
    </Row>
  </Form.Group>
 );
}
