import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
  <div style={{ width: '100%', maxWidth: '1200px', margin: 'auto', padding: '16px', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
    <div style={{ width: '100%', maxWidth: '41.666667%', display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
      <img width={400} height={330} src="/img/Oops! 404 Error with a broken robot-rafiki.png" alt="Not Found" />
    </div>
    <div style={{ width: '100%', maxWidth: '58.333333%', textAlign: 'center', padding: '16px' }}>
      <div style={{ fontSize: '4rem', fontWeight: '500' }}>404</div>
      <div style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '1rem' }}>
        Oops. This page has gone missing.
      </div>
      <div style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>
        You may have mistyped the address or the page may have moved.
      </div>
      <Link to={'/admin'} style={{ border: '1px solid white', fontWeight: '600', borderRadius: '0.25rem', padding: '1rem', display: 'inline-block', textDecoration: 'none', color: 'white', transition: 'background-color 0.3s, color 0.3s' }} 
        onMouseEnter={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'black'; }} 
        onMouseLeave={(e) => { e.target.style.backgroundColor = ''; e.target.style.color = 'white'; }}
      >
        Go Home
      </Link>
    </div>
  </div>
</div>
  )
}

export default Error