import React from 'react';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Layout from './Layout/Layout';

const App: React.FC = () => {
  return (
    <Layout>
      <Header title={'QR code generator'} />
      <Main />
      <Footer />
    </Layout>
  );
};

export default App;
