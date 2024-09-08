import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { GET_PROJECT } from '../queries/projectQueries';
import { useQuery } from '@apollo/client';
import Loader from '../components/loader';
import ClientInfo from '../components/clientInfo';
import DeleteProjectBtn from '../components/deleteProjectBtn';

function Project() {
  const { projectId } = useParams();
  const { loading, data, error } = useQuery(GET_PROJECT, {
    variables: { id: projectId },
  });
  if (loading) return <Loader />;
  if (error) return <p>Something went wrong</p>;
  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          <Link to={'/'} className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back
          </Link>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>
          <h5 className='mt-3'>Project Status</h5>
          <p className='lead'>{data.project.status}</p>
          <ClientInfo client={data.project.client} />
          <DeleteProjectBtn projectId={data.project.id} />
        </div>
      )}
    </>
  );
}

export default Project;
