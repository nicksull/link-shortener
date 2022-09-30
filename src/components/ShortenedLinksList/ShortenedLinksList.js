import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const ShortenedLinksList = (props) => {
  const { links } = props;
  const [copied, setCopied] = useState(false);

  // Set state so we can hide/show the copied notification
  const copyLinkHandler = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    (links || []).length > 0 && (
      <div className='container'>
        <div className='w-full md:w-1/2 mx-auto relative px-4 py-8 md:px-10 bg-white shadow-lg rounded-2xl sm:rounded-3xl bg-opacity-60 border border-gray-200'>
          <div className='mx-auto relative'>
            <div
              className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mx-auto bg-white shadow-xl p-3 rounded text-green-600 border border-green-600 transition-all duration-300 ${
                copied ? 'z-100 opacity-100' : '-z-100 opacity-0'
              }`}
            >
              Copied
            </div>
            <ul>
              {links.map((link, index) => (
                <li
                  key={index}
                  className='flex flex-col md:flex-row justify-between items-center py-6 border border-b border-b-gray-300 last:border-b-0'
                >
                  <span className='longLink mb-3 md:mb-0'>{link.longLink}</span>
                  <div className='flex flex-col md:flex-row items-center'>
                    <a
                      href={link.shortLink}
                      className='shortLink text-blue-700 mb-3 md:mb-0'
                      target='_blank'
                    >
                      {link.shortLink}
                    </a>
                    <CopyToClipboard
                      text={link.shortLink}
                      onCopy={copyLinkHandler}
                    >
                      <button className='border-2 border-blue-500 text-blue-500 bg-blue-100 font-medium px-5 py-2 w-28 ml-4 rounded-md'>
                        Copy
                      </button>
                    </CopyToClipboard>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default ShortenedLinksList;
