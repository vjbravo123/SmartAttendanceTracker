// import React from 'react';
import '../../css/Students/sup.css';
import React, { useState  , useEffect} from 'react';
import backgroundImg from "../../images/3386851.jpg";
import LoadingAnimation from '../General_components/Loadinganimation';
import { useNavigate } from "react-router-dom";

export const Signup = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [subCourse, setSubCourse] = useState('');
  const navigate = useNavigate();

  const loadImage = (image) => {
    return new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });
  };

  useEffect(() => {
    const bg1 = new Image();
    bg1.src = backgroundImg;  // Replace 'your-background-image-url' with the actual URL of the background image
  
    const handleImagesLoad = () => {
      setIsLoading(false);
    };
  
    Promise.all([loadImage(bg1)])
      .then(handleImagesLoad)
      .catch((error) => {
        console.error('Image loading error:', error);
        setIsLoading(false); // In case of error, still proceed and hide loading animation
      });
  }, []);


  const renderSubCourses = () => {
    if (course === 'B.sc.') {
      return (
        <select
          id="subCourse"
          value={subCourse}
          onChange={(e) => setSubCourse(e.target.value)}
        >
          <option value="">Select Sub Course</option>
          <option value="Bsc phy Sci cs">
            Bsc phy Sci cs
          </option>
          <option value="Bsc phy Sci chem">
            Bsc phy Sci chem
          </option>
          <option value="B.sc. Hons. Electronics">Bsc Hons Electronics</option>
          <option value="B.sc. Mathematical Science">Bsc Mathematical Science</option>
        </select>
      );
    } else if (course === 'B.com') {
      return (
        <select
          id="subCourse"
          value={subCourse}
          onChange={(e) => setSubCourse(e.target.value)}
        >
          <option value="">Select Sub Course</option>
          <option value="Bcom Hons">BCom Hons</option>
        </select>
      );
    } else if (course === 'B.A.') {
      return (
        <select
          id="subCourse"
          value={subCourse}
          onChange={(e) => setSubCourse(e.target.value)}
        >
          <option value="">Select Sub Course</option>
          <option value="BA_Jrnlsm_Hons">B.A. Jrnlsm Hons</option>
          <option value="BA_Biz_Econ_Hons">B.A. Biz Econ Hons</option>
          <option value="BA_Eng_Hons">B.A. Eng Hons</option>
          <option value="BA_Pol_Sci_Hons">B.A. Pol Sci Hons</option>
          <option value="BA_OMSP_Math">B.A. (OMSP, Math)</option>
          <option value="BA_Hindi_Hons">B.A. Hindi Hons</option>
          <option value="BA_Comp_Appl_Pol_Sci">
            B.A. (Comp Appl, Pol Sci)
          </option>
          <option value="BA_Hindi_Hist">B.A. (Hindi, Hist)</option>
          <option value="BA_OMSP_Hist">B.A. (OMSP, Hist)</option>
          <option value="BA_Comp_Appl_Econ">
            B.A. (Comp Appl, Econ)
          </option>
          <option value="BA_Comp_Appl_Math">
            B.A. (Comp Appl, Math)
          </option>
          <option value="BA_Eng_Econ">B.A. (Eng, Econ)</option>
          <option value="BA_OMSP_Econ">B.A. (OMSP, Econ)</option>
          <option value="BA_Eng_Math">B.A. (Eng, Math)</option>
          <option value="BA_Eng_Hist">B.A. (Eng, Hist)</option>
          <option value="BA_Comp_Appl_Hist">
            B.A. (Comp Appl, Hist)
          </option>
          <option value="BA_OMSP_Pol_Sci">
            B.A. (OMSP, Pol Sci)
          </option>
          <option value="BA_Hindi_Math">B.A. (Hindi, Math)</option>
          <option value="BA_Hindi_Econ">B.A. (Hindi, Econ)</option>
          <option value="BA_Hindi_Pol_Sci">
            B.A. (Hindi, Pol Sci)
          </option>
          <option value="BA_Eng_Pol_Sci">
            B.A. (Eng, Pol Sci)
          </option>
        </select>
      );
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get the form data
    const formData = new FormData(event.target);

    fetch(`${process.env.REACT_APP_SERVER_URL}/submit-form`, {
      method: 'POST',
      body: JSON.stringify({ username: formData.get('username'), roll_no: formData.get('roll_no'), password: formData.get('password'), id: formData.get('id'), year: year, subCourse: subCourse }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((data) => {
        if (data.value) {
          alert("signup successful")
          navigate("/studentslogin")
        } else {
          alert("signup failed")
          console.log("false username or password")
        }
        console.log(data)
      })
      .catch(error => {
        console.log(`error happened ${error}`)
      });
  };

  return (
    <>
      {isLoading ? (
        <LoadingAnimation /> // Display the loading animation
      ) : (
    <div className="bomdy" style = { { backgroundImage:`url(${backgroundImg})`} }>
      <form onSubmit={handleSubmit}>
        <div id="login-box">
          <div className="left">
            <h1>Sign up</h1>
            <input type="text" name="username" placeholder="Username" />
            <input type="text" name="roll_no" placeholder="Roll no" />
            <input type="password" name="password" placeholder="Password" />
            <input type="text" name="id" placeholder="Id" />
          
          </div>
          <div className="rightt">

            <div style={{ marginBottom: '20px' }}>

              <label htmlFor="course">Course:</label>

              <select id="course" value={course} onChange={(e) => setCourse(e.target.value)}>
                <option value="">Select Course</option>
                <option value="B.sc.">B.sc.</option>
                <option value="B.com">B.com</option>
                <option value="B.A.">B.A.</option>
              </select>

            </div>


            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="subCourse">Sub Course:</label>
                {renderSubCourses()}
            </div>


            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="year">Year:</label>
              <input id="year" type="number" min="1" max="3" value={year} onChange={(e) => setYear(e.target.value)} />
            </div>

          </div>

        <div className='signupbtn'> <input className='subb' type="submit" name="signup_submit" value="Sign me up" /></div>
        </div>
      </form>
    </div>)}
    </>
  );
}



