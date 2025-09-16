import { avatarList } from "../assets/avatarData.js";

function AvatarCarousel({ form, handleChange }) {

  return (
    <>
      <div className="carouselContainer">
        <div className="banner">
          <div className="slider" style={{ "--quantity": avatarList.length }}>
            {avatarList.map((avatar, index) => (
            <div 
              className={`item ${form.avatar === avatar.id ? 'selected' : ''}`} 
              key={avatar.id}
              style={{ "--position": index + 1 }}
              onClick={() => handleChange(avatar.id)}>
              <img 
                className="img" 
                src={avatar.image} 
                alt={`Avatar ${index + 1}`} />
            </div>
            ))};
          </div>
        </div>
      </div>
    </>
  );
}

export default AvatarCarousel;
