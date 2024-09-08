import { useMutation } from '@apollo/client';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { DELETE_PROJECT } from '../mutations/projectQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

function DeleteProjectBtn({ projectId }) {
  const navigate = useNavigate();
  
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ GET_PROJECTS }],
  });

  return (
    <div className='d-flex ms-auto mt-5'>
      <button className='btn btn-danger m-2' onClick={deleteProject}>
        <FaTrash className='icon' />
        Delete Project
      </button>
    </div>
  );
}

export default DeleteProjectBtn;
