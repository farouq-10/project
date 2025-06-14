import React from 'react';

export function ContactMap() {
  return (
    <div className="aspect-video rounded-xl overflow-hidden border border-purple-800/50">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977724443336!2d-122.39568388441547!3d37.78779977975559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807c23cc4ebb%3A0x1c5c707030f7a78b!2sFinancial%20District%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1647041436069!5w200!5h200"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Office Location"
      />
    </div>
  );
}