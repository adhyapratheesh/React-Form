import { useState, useEffect } from "react";

const Form = () => {
  const [values, setValues] = useState({
    fullname: '',
    email: '',
    phoneNo: '',
    positions: '',
    portfolioUrl: '',
    exp: '',
    coverletter: ''
  });

  const [skills, setSkills] = useState([]); const [isChecked, setIsChecked] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const updatedValues = { ...values, [e.target.name]: e.target.value };
    setValues(updatedValues);
    if (formSubmitted) {
      const errors = validate(updatedValues, skills, isChecked);
      setFormErrors(errors);
      setHasErrors(Object.keys(errors).length > 0);
    }
  };

  const handleSkills = (e) => {
    let updatedSkills;
    if (e.target.checked) {
      updatedSkills = [...skills, e.target.value];
      setSkills(updatedSkills);
    }
    else {
      updatedSkills = [...skills.filter((item) => item !== e.target.value)];
      setSkills(updatedSkills);
    }
    if (formSubmitted) {
      const errors = validate(values, updatedSkills, isChecked);
      setFormErrors(errors);
      setHasErrors(Object.keys(errors).length > 0);
    }
  }

  const handleReset = () => {
    setValues({
      fullname: '',
      email: '',
      phoneNo: '',
      positions: '',
      portfolioUrl: '',
      exp: '',
      coverletter: ''
    });
    setSkills([]);
    setIsChecked(false);
    setFormErrors({});
    setIsSubmit(false);
    setHasErrors(false);
    setFormSubmitted(false);
  };

  const validate = (values, skills, isChecked) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const urlregex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w- .\/?%&=]*)?$/;
    const phoneRegex = /^[0-9]{10}$/;
    if (!values.fullname) {
      errors.fullname = "Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    else if (!regex.test(values.email)) {
      errors.email = "This is an invalid email";
    }
    if (!values.phoneNo) {
      errors.phoneNo = "Phone Number is required";
    }
    else if (!phoneRegex.test(values.phoneNo)) {
      errors.phoneNo = "This is an invalid phone number";
    }
    else if (values.phoneNo.length < 10 || values.phoneNo.length > 10) {
      errors.phoneNo = "Phone number must be 10 digits";
    }
    if (!values.positions) {
      errors.positions = "Position is required";
    }
    if (!values.exp) {
      errors.exp = "Experience is required";
    }
    if ((skills.length) < 2) {
      errors.skills = "Select atleast two skills";
    }
    if (!isChecked) {
      errors.accept = "You must accept the terms and conditions";
    }
    if (values.portfolioUrl && !urlregex.test(values.portfolioUrl)) {
      errors.portfolioUrl = "This is an invalid URL";
    }
    return errors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const errors = validate(values, skills, isChecked);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      setHasErrors(false);
      const formData = {
        ...values,
        skills: skills,
        acceptedTerms: isChecked
      };
      console.log("Form Data Submitted is : ", JSON.stringify(formData));
    } else {
      setIsSubmit(false);
      setHasErrors(true);
    }
  };


  return (
    <>
      <div className="form-container">
        <h2 className="form-title">Job Application Form</h2>
        <form className="form-wrapper" onSubmit={handleSubmit}>
          <div className="form-grid">

            <div className="form-group name-field">
              <label className="form-label required" htmlFor="Fullname" >
                Name
              </label>
              <input type="text"
                name="fullname"
                minLength={3}
                placeholder="Enter your full name"
                id="Fullname"
                value={values.fullname}
                onChange={handleChange}
                className={`form-input ${formErrors.fullname ? "error" : ""}`}
              />
              {formErrors.fullname && <p className="error-text">{formErrors.fullname}</p>}
            </div>

            <div className="form-group phone-field">
              <label className="form-label required" htmlFor="phone-no">
                Phone No
              </label>
              <input type="tel"
                name="phoneNo"
                placeholder="Enter your Phone Number"
                id="phone-no"
                value={values.phoneNo}
                onChange={handleChange}
                className={`form-input ${formErrors.phoneNo ? "error" : ""}`}
              />
              {formErrors.phoneNo && <p className="error-text">{formErrors.phoneNo}</p>}
            </div>

            <div className="form-group email-field">
              <label className="form-label required" htmlFor="email">
                Email
              </label>
              <input type="text"
                name="email"
                placeholder="Enter your Email Address"
                id="email"
                value={values.email}
                onChange={handleChange}
                className={`form-input ${formErrors.email ? "error" : ""}`}
              />
              {formErrors.email && <p className="error-text">{formErrors.email}</p>}
            </div>

            <div className="form-group position-field">
              <label className="form-label required" htmlFor="positions">
                Position Applied
              </label>
              <select id="position"
                className={`form-input ${formErrors.positions ? "error" : ""}`}
                name="positions"
                value={values.positions}
                onChange={handleChange}>
                <option value="">Select a position</option>
                <option value="frontend-developer">Frontend Developer</option>
                <option value="backend-developer">Backend Developer</option>
                <option value="fullstack-developer">Fullstack Developer</option>
              </select>
              {formErrors.positions && <p className="error-text">{formErrors.positions}</p>}
            </div>

            <div className="form-group experience-field">
              <label className="form-label required" htmlFor="experience">
                Experience
              </label>
              <div className="experience-options">
                {["fresher", "upto3yrs", "3plusYrs"].map((exp, i) => (
                  <label key={i}>
                    <input type="radio"
                      name="exp" value={exp}
                      checked={values.exp === exp}
                      onChange={handleChange}
                      className={`form-input ${formErrors.exp ? "error" : ""}`}
                    />
                    {exp === "fresher" ? "Fresher" : exp === "upto3yrs" ? "1-3 years" : "3+ years"}
                  </label>
                ))}
              </div>
              {formErrors.exp && <p className="error-text">{formErrors.exp}</p>}
            </div>

            <div className="form-group portfolio-field">
              <label className="form-label" htmlFor="portfolio-url">
                Portfolio URL
              </label>
              <input type="text"
                id="portfolio-url"
                name="portfolioUrl"
                value={values.portfolioUrl}
                className={`form-input ${formErrors.portfolioUrl ? "error" : ""}`}
                onChange={handleChange} />
              {formErrors.portfolioUrl && <p className="error-text">{formErrors.portfolioUrl}</p>}
            </div>

            <div className="form-group skills-field">
              <label className="form-label" htmlFor="skills">
                Skills
              </label>
              <div className="skills-checkboxes">
                {["html", "css", "js", "react", "nodejs", "mongoDB"].map((skill, i) => (
                  <label key={i}>
                    <input type="checkbox"
                      name="skills" value={skill}
                      checked={skills.includes(skill)}
                      onChange={handleSkills}
                    />
                    {skill.toUpperCase()}
                  </label>
                ))}
              </div>
              {formErrors.skills && <p className="error-text">{formErrors.skills}</p>}
            </div>

            <div className="form-group cover-field">
              <label className="form-label" htmlFor="cover-letter">
                Cover Letter
              </label>
              <textarea name="coverletter"
                id="cover-letter"
                maxLength={300}
                cols={40} rows={10}
                value={values.coverletter}
                className="form-input"
                onChange={handleChange}>
              </textarea>
              <div className="character-count">
                {values.coverletter.length}/300 characters
              </div>
            </div>

            <div className="form-group checkbox-group">
              <input type="checkbox" name="accept" id="acceptance"
                checked={isChecked}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setIsChecked(checked);
                  if (formSubmitted) {
                    const errors = validate(values, skills, checked);
                    setFormErrors(errors);
                    setHasErrors(Object.keys(errors).length > 0);
                  }
                }} />
              <label className="acceptance-label required" htmlFor="acceptance">
                Accept Terms & Conditions
              </label>
              {formErrors.accept && <p className="error-text">{formErrors.accept}</p>}
            </div>

            <div className="form-buttons">
              <button
                type="submit"
                disabled={formSubmitted && hasErrors}
                className={(formSubmitted && hasErrors) ? "disabled-button" : ""}
              >
                Submit
              </button>
              <button type="button" onClick={handleReset}>Reset</button>
            </div>
            {Object.keys(formErrors).length === 0 && isSubmit && (
              <p className="form-success">Form submitted successfully!</p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
export default Form;