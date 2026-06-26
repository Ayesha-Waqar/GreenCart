import React from 'react';

const Contact = () => {
  return (
    <main className="contact-page" style={{ padding: '40px 20px', fontFamily: 'Arial, sans-serif', color: '#223322' }}>
      <section className="contact-hero" style={{ maxWidth: 960, margin: '0 auto 40px', textAlign: 'center' }}>
        <p style={{ color: '#4eba74', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Contact Green Cart</p>
        <h1 style={{ fontSize: '2.8rem', margin: '16px 0', lineHeight: 1.1 }}>We&apos;re here to help you grow greener.</h1>
        <p style={{ fontSize: '1rem', lineHeight: '1.8', maxWidth: 720, margin: '0 auto' }}>
          Have a question about our products, delivery, or sustainability practices? Send us a message and our team will respond within one business day.
        </p>
      </section>

      <section className="contact-content" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="contact-form-card" style={{ background: '#f7faf2', borderRadius: 16, padding: 28, boxShadow: '0 10px 25px rgba(34, 51, 34, 0.08)' }}>
            <h2 style={{ marginBottom: 20, color: '#4eba74' }}>Send us a message</h2>
            <form className="contact-form" style={{ display: 'grid', gap: 16 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 8, color: '##4eba74', fontWeight: 600 }}>
                Name
                <input type="text" placeholder="Your name" style={{ padding: 12, borderRadius: 8, border: '1px solid #d6e5d0' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 8, color: '##4eba74', fontWeight: 600 }}>
                Email
                <input type="email" placeholder="you@example.com" style={{ padding: 12, borderRadius: 8, border: '1px solid #d6e5d0' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 8, color: '##4eba74', fontWeight: 600 }}>
                Message
                <textarea rows="6" placeholder="Tell us how we can help" style={{ padding: 12, borderRadius: 8, border: '1px solid #d6e5d0', resize: 'vertical' }} />
              </label>
              <button type="submit" style={{ padding: '14px 20px', background: '#4eba74', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}>Submit</button>
            </form>
          </div>

          <div className="contact-info-card" style={{ background: '#ffffff', borderRadius: 16, padding: 28, boxShadow: '0 10px 25px rgba(34, 51, 34, 0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ marginBottom: 20, color: '#4eba74' }}>Contact details</h2>
              <div style={{ marginBottom: 18 }}>
                <p style={{ margin: 0, fontWeight: 700 }}>Email</p>
                <p style={{ margin: '6px 0 0', color: '#4eba74' }}>support@greencart.com</p>
              </div>
              <div style={{ marginBottom: 18 }}>
                <p style={{ margin: 0, fontWeight: 700 }}>Phone</p>
                <p style={{ margin: '6px 0 0', color: '#4eba74' }}>+1 (555) 123-4567</p>
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700 }}>Address</p>
                <p style={{ margin: '6px 0 0', color: '#4eba74' }}>123 Green Cart Lane<br />Eco City, CA 94016</p>
              </div>
            </div>
            <div style={{ marginTop: 24, padding: 20, borderRadius: 14, background: '#f1f7ec' }}>
              <h3 style={{ margin: 0, color: '#4eba74' }}>Customer service hours</h3>
              <p style={{ margin: '10px 0 0', color: '#4eba74' }}>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p style={{ margin: '6px 0 0', color: '#4eba74' }}>Saturday: 9:00 AM - 2:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
