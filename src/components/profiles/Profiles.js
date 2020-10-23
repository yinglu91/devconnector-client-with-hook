import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = () => {
  const dispatch = useDispatch()
  const { profiles, loading } = useSelector(state => state.profile)

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <h1 className='large text-primary'>Developers</h1>
      
      <p className='lead'>
        <i className='fab fa-connectdevelop' /> Browse and connect with
        developers
      </p>

      <div className='profiles'>
        { profiles.length === 0 && (<h4>No profiles found...</h4>)}

        {profiles.length > 0 && (
            profiles.map(profile => (
              <ProfileItem key={profile._id} profile={profile} />
            ))
          )
        }
      </div>
    </>
  );
};

export default Profiles;

