import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_PROJECTS } from '../queries/projectQueries.js';
import Loader from './loader';
import ProjectCard from './projectCard';

function Projects() {
  const { loading, data, error } = useQuery(GET_PROJECTS);
  if (loading) return <Loader />;
  if (!loading && error) return <h3>Something went wrong</h3>;
  return (
    <>
      {data.projects.length > 0 ? (
        <div className='row mt-4'>
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No projects</p>
      )}
    </>
  );
}

export default Projects;
