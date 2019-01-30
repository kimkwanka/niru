import React from 'react';
import Helmet from 'react-helmet';
import Home from '../Home/Home';

const App = () => {

  return (
      <div className="App">
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          titleTemplate="reniru | %s"
          titleAttributes={{ itemprop: 'name', lang: 'en' }}
          meta={[
            { name: 'description', content: 'Universal fullstack boilerplate' },
          ]}
        />
        <main>
          <Home />
        </main>
      </div>
  );
};

export default App;
