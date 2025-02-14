import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  padding: 20px;
  background-color: #f4f5f7;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 300px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
`;

const ProfileTitle = styled.h2`
  margin-bottom: 10px;
`;

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const randomId = Math.floor(Math.random() * 1000);
    try {
      const res = await axios.get(`https://picsum.photos/id/${randomId}/info`);
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile info", err);
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileImage src={profile.download_url} alt={profile.author} />
        <ProfileTitle>{profile.author}</ProfileTitle>
        <p>Image ID: {profile.id}</p>
      </ProfileCard>
    </ProfileContainer>
  );
}

export default Profile;
