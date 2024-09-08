import React from 'react';
import AddModal from '../components/addModal';
import Projects from '../components/projects';
import Clients from '../components/clients';

function Home() {
  return (
    <>
      <div className='d-flex gap-3 mb-4'>
        <AddModal type={'client'} />
        <AddModal type={'project'} />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  );
}

export default Home;
