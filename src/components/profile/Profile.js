import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';

// path="/profile/:id"
const Profile = () => {
  const auth = useSelector(state => state.auth)
  const { profile } = useSelector(state => state.profile)
  const dispatch = useDispatch()

  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfileById(id));
  }, [dispatch, id]);

  if (profile === null) {
    return <Spinner />
  }

  return (
    <>
      <Link to="/profiles" className="btn btn-light">
        Back To Profiles
      </Link>

      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && (
          <Link to="/edit-profile" className="btn btn-dark">
            Edit Profile
          </Link>
        )}

      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />

        <ProfileAbout profile={profile} />

        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>

          {profile.experience.length === 0 && (<h4>No experience credentials</h4>) }

          {profile.experience.length > 0 && 
            <>
              {profile.experience.map((experience) => (
                <ProfileExperience
                  key={experience._id}
                  experience={experience}
                />
              ))}
            </>
          }
        </div>

        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>

          {profile.education.length === 0 && (<h4>No education credentials</h4>) }

          {profile.education.length > 0 && 
            <>
              {profile.education.map((education) => (
                <ProfileEducation
                  key={education._id}
                  education={education}
                />
              ))}
            </>
          }
          
        </div>

        {profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )}
      </div>
    </>
  );
};

export default Profile;

