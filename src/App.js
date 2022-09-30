import React, { useEffect, useState } from 'react';
import { isValidUrl } from './inc/utils';

import ShortenedLinksList from './components/ShortenedLinksList/ShortenedLinksList';

import styles from './App.module.scss';

const App = () => {
  const [userInput, setUserInput] = useState('');
  const [shortenedLinks, setShortenedLinks] = useState(
    JSON.parse(localStorage.getItem('shortenedLinks')) || []
  );
  const [isValid, setIsValid] = useState(true);

  // Update any shortened links in Local Storage
  useEffect(() => {
    localStorage.setItem('shortenedLinks', JSON.stringify(shortenedLinks));
  }, [shortenedLinks]);

  // Check Validity of input and set state
  const checkValidityHandler = () => {
    const checkValidity = isValidUrl(userInput);
    setIsValid(checkValidity);
    setTimeout(() => {
      setIsValid(true);
    }, 3000);
    return checkValidity;
  };

  // Shorten URL if we have a valid input
  const shortenLinkHandler = async () => {
    const checkValidity = checkValidityHandler(userInput);
    if (checkValidity) {
      const response = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${userInput}`
      );
      const data = await response.json();
      const shortLink = data.result.full_short_link;
      const longLink = data.result.original_link;
      setShortenedLinks((prevState) => [
        ...prevState,
        {
          shortLink: shortLink,
          longLink: longLink,
        },
      ]);
      setUserInput('');
    }
  };

  return (
    <div className='app flex flex-col items-center justify-center py-20'>
      <header className='text-center container mb-8'>
        <h1 className='font-oswald text-2xl font-bold mb-4'>
          Welcome to the most awesome link shortener
        </h1>
        <div className='text-base leading-6 sm:text-lg sm:leading-7'>
          <p>Enter a link below, we'll shorten it for you.</p>
        </div>
      </header>

      <div className='container'>
        <div className='w-full md:w-1/2 mx-auto relative p-10 bg-dark-blue shadow-lg rounded-2xl sm:rounded-3xl sm:py-20 bg-clip-padding mb-9'>
          <div className='flex flex-col md:flex-row justify-center'>
            <div className={`${styles.app__floatingLabel} md:mr-6`}>
              <input
                type='url'
                name='url'
                placeholder='Shorten your link'
                className={`w-full text-white bg-opacity-40 p-3 md:p-4 outline-none mb-8 md:mb-0 ${
                  !isValid
                    ? 'animated shakeX border border-red-900 bg-red-400'
                    : 'bg-white border-b-2 border-b-slate-400'
                }`}
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
              />
              <label htmlFor='url'>Link to shorten</label>
            </div>
            <button
              className='bg-pink px-5 py-3 rounded-md text-white hover:bg-opacity-80 transition-all duration-300'
              onClick={shortenLinkHandler}
            >
              Shorten
            </button>
          </div>
          {!isValid && <p className='text-red-700'>Please enter a valid URL</p>}
        </div>
      </div>

      <ShortenedLinksList links={shortenedLinks} />
    </div>
  );
};

export default App;
