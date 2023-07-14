import React from 'react'

export default function Link() {
  const links = [
    { title: 'GitHub', url: 'https://github.com/example' },
    { title: 'Twitter', url: 'https://twitter.com/example' },
    { title: 'LinkedIn', url: 'https://linkedin.com/in/example' },
    // Add more links as needed
  ];
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">My LinkTree</h1>
        <ul className="space-y-4">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}