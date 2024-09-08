import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { FaList, FaUser } from 'react-icons/fa';
import { ADD_CLIENT } from '../mutations/clientQueries';
import { ADD_PROJECT } from '../mutations/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function AddModal({ type }) {
  const [clientState, setClientState] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [projectState, setProjectState] = useState({
    projectName: '',
    description: '',
    clientId: '',
    status: 'new',
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const { name, email, phone } = clientState;
  const { projectName, description, clientId, status } = projectState;

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name: projectName, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (type === 'client') {
      if (name === '' || email === '' || phone === '') {
        return alert('Please fill in all fields');
      }

      addClient(name, email, phone);

      setClientState({
        name: '',
        email: '',
        phone: '',
      });
    } else if (type === 'project') {
      if (
        projectName === '' ||
        description === '' ||
        clientId === '' ||
        status === ''
      ) {
        return alert('Please fill in all fields');
      }
      addProject(projectName, description, clientId, status);
      setProjectState({
        projectName: '',
        description: '',
        clientId: '',
        status: 'new',
      });
    }
  };

  if (loading) return null;
  if (error) return 'Something went wrong';

  return (
    <>
      <button
        type='button'
        className={type === 'client' ? 'btn btn-secondary' : 'btn btn-primary'}
        data-bs-toggle='modal'
        data-bs-target={
          type === 'client' ? '#addClientModal' : '#addProjectModal'
        }
      >
        <div className='d-flex align-items-center'>
          {type === 'client' ? (
            <FaUser className='icon' />
          ) : (
            <FaList className='icon' />
          )}
          <div>{type === 'client' ? 'Add Client' : 'New Project'}</div>
        </div>
      </button>

      <div
        className='modal fade'
        id={type === 'client' ? 'addClientModal' : 'addProjectModal'}
        aria-labelledby={
          type === 'client' ? 'addClientModalLabel' : 'addProjectModalLabel'
        }
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5
                className='modal-title'
                id={
                  type === 'client'
                    ? 'addClientModalLabel'
                    : 'addProjectModalLabel'
                }
              >
                {type === 'client' ? 'Add Client' : 'New Project'}
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form onSubmit={onSubmit}>
                <div className='mb-3'>
                  <label className='form-label'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id={type === 'client' ? 'clientName' : 'projectName'}
                    value={type === 'client' ? name : projectName}
                    onChange={(e) =>
                      type === 'client'
                        ? setClientState({
                            ...clientState,
                            name: e.target.value,
                          })
                        : setProjectState({
                            ...projectState,
                            projectName: e.target.value,
                          })
                    }
                  />
                </div>
                {type === 'client' && (
                  <>
                    <div className='mb-3'>
                      <label className='form-label'>Email</label>
                      <input
                        type='email'
                        className='form-control'
                        id='email'
                        value={email}
                        onChange={(e) =>
                          setClientState({
                            ...clientState,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Phone</label>
                      <input
                        type='text'
                        className='form-control'
                        id='phone'
                        value={phone}
                        onChange={(e) =>
                          setClientState({
                            ...clientState,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </>
                )}
                {type === 'project' && (
                  <>
                    <div className='mb-3'>
                      <label className='form-label'>Description</label>
                      <textarea
                        type='text'
                        className='form-control'
                        id='description'
                        value={description}
                        onChange={(e) =>
                          setProjectState({
                            ...projectState,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Status</label>
                      <select
                        name='status'
                        id='status'
                        className='form-select'
                        value={status}
                        onChange={(e) =>
                          setProjectState({
                            ...projectState,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value='new'>Not Started</option>
                        <option value='progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                      </select>
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Client</label>
                      <select
                        name='client'
                        id='clientId'
                        className='form-select'
                        value={clientId}
                        onChange={(e) =>
                          setProjectState({
                            ...projectState,
                            clientId: e.target.value,
                          })
                        }
                      >
                        <option value=''>Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                <button
                  type='submit'
                  data-bs-dismiss='modal'
                  className={
                    type === 'client' ? 'btn btn-secondary' : 'btn btn-primary'
                  }
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
