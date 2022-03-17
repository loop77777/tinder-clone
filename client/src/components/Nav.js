import clrlogo from '../images/New Modern Tinder Logo White Version - 1200x800.png';
import logo from '../images/Tinder-logo.png';

const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {

  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };


  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={minimal ? logo : clrlogo} alt={'logo'} />
      </div>
      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log in
        </button>
      )}
    </nav>
  );
};

export default Nav;
