import React from 'react'
import './Contactus.css'

const Contactus = () => {
  return (
    <div>
      <div className="container">
    <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
            <form className="contact-form">
                <h2 className="text-center mb-4">Contact Us</h2>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" required/>
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" required/>
                </div>
                <div className="mb-3">
                    <label for="subject" className="form-label">Subject</label>
                    <input type="text" className="form-control" id="subject" required/>
                </div>
                <div className="mb-3">
                    <label for="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="5" required></textarea>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">Send Message</button>
                </div>
            </form>
        </div>
    </div>
</div>

    </div>
  )
}

export default Contactus