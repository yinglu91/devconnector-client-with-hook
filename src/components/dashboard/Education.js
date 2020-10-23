import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = (props) => {
  const { education} = props;
  const dispatch = useDispatch();

  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {
            education.map(edu => (
              <tr key={edu._id}>
                <td>{edu.school}</td>
                <td className="hide-sm">{edu.degree}</td>
                <td>
                  <Moment format="YYYY/MM/DD">{moment.utc(edu.from)}</Moment> -{' '}

                  {edu.to === null && (' Now')}

                  {edu.to !== null &&  (<Moment format="YYYY/MM/DD">{moment.utc(edu.to)}</Moment>)} 
                </td>
                
                <td>
                  <button
                    onClick={() => dispatch(deleteEducation(edu._id))}
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

Education.propTypes = {
  education: PropTypes.array.isRequired
};

export default Education;
