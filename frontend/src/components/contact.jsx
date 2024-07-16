import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";

var initialState = {
  from_name: "",
  email: "",
  message: "",
};
export const Contact = (props) => {
  const [{ from_name, email, message }, setState] = useState(initialState);
  const contactName = document.getElementById('contact_name')
  const contactEmail = document.getElementById('contact_email')
  const contactMessage = document.getElementById('contact_message')
  const errorMessage = document.getElementById('new_error')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
    
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(from_name, email, message);
    
    
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID2
    const userId = process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    
    if(from_name !== '' && email !== '' && message !== '') {
      emailjs
        .sendForm(serviceId, templateId, e.target, userId)
        .then(
          (result) => {
            contactName.value ='';
            contactEmail.value ='';
            contactMessage.value ='';
            errorMessage.classList.add('color-first');
            errorMessage.textContent = 'Message sent successfully ✔️'
            setTimeout(()=>{
              errorMessage.textContent= '';
            },5000)
          },
          (error) => {
            console.log(error.text);
          }
        );
    }else{
        errorMessage.textContent = "All Feilds are required."
        setTimeout(()=>{
          errorMessage.textContent= '';
        },5000)
    }
  };
  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="contact_name"
                        name="from_name"
                        className="form-control"
                        placeholder="Name"
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="contact_email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="contact_message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                  <p class="error__message" id="new_error"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className="fa fa-compass"></i> Address
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
          
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2024 NMT Document Clearings. Design by {" "}
            {/* <a href="http://www.templatewire.com" rel="nofollow">
              TemplateWire
            </a> */}
          </p>
        </div>
      </div>
    </div>
  );
};