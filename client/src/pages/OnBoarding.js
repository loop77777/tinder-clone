import Nav from '../components/Nav';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OnBoarding = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    show_gender: false,
    gender_identity: 'man',
    gender_interest: 'woman',
    email: '',
    url: '',
    about: '',
    matches: [],
  });

  let navigate = useNavigate();

  const handleSubmit = async e => {
    console.log('submitted');
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8000/user', {
        formData,
      });
      const success = response.status === 200;
      console.log(response);
      if (success) navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    console.log('value' + value, 'name' + name);

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(formData);

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />
            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                required={true}
                placeholder="DD"
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>
            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value="man"
                checked={formData.gender_identity === 'man'}
                onChange={handleChange}
              />
              <label htmlFor="man-gender-identity">man</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value="woman"
                checked={formData.gender_identity === 'woman'}
                onChange={handleChange}
              />
              <label htmlFor="woman-gender-identity">woman</label>
              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                value="more"
                checked={formData.gender_identity === 'more'}
                onChange={handleChange}
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>
            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
              type="checkbox"
              id="show-gender"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />
            <label>Show Me</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                value="man"
                checked={formData.gender_interest === 'man'}
                onChange={handleChange}
              />
              <label htmlFor="man-gender-interest">man</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                value="woman"
                checked={formData.gender_interest === 'woman'}
                onChange={handleChange}
              />
              <label htmlFor="woman-gender-interest">woman</label>
              <input
                id="everyone-gender-interest"
                type="radio"
                name="gender_interest"
                value="everyone"
                checked={formData.gender_interest === 'everyone'}
                onChange={handleChange}
              />
              <label htmlFor="everyone-gender-interest">Everyone</label>
            </div>
            <label htmlFor="about">About me</label>
            <input
              type="text"
              id="about"
              name="about"
              required={true}
              placeholder="I like long walks.."
              value={formData.about}
              onChange={handleChange}
            />
            <input type="submit" />
          </section>
          <section>
            {' '}
            <label htmlFor="url">Profile Profile </label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />{' '}
            <div className="photo-container">
              {formData.url && (
                <img src={formData.url} alt="profile pic preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default OnBoarding;
