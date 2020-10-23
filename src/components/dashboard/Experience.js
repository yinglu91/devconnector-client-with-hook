import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const Experience = (props) => {
  const { experience } = props;
  const dispatch = useDispatch();

  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {
          experience.map(exp => (
              <tr key={exp._id}>
                <td>{exp.company}</td>
                <td className="hide-sm">{exp.title}</td>
                <td>
                  <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{' '}
                  {exp.to === null ? (
                    ' Now'
                  ) : (
                    <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => dispatch(deleteExperience(exp._id)) }
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default Experience;

