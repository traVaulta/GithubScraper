import React from 'react';

export interface Props {
    avatarUrl: string;
    name: string;
    email?: string;
    url: string;
    displayed: boolean;
    toggleDisplay: () => void;
}

const UserProfileSummary = (props: Props) => (
    <>
        <div className="user-profile-summary">
            <div className="user-profile-summary user-profile-summary--title">
                <div className="title-text">User Profile Summary</div>
                <div className="minimize-icon" onClick={props.toggleDisplay}>
                    {props.displayed && <i className="fa fa-window-minimize"/>}
                    {!props.displayed && <i className="fa fa-window-maximize"/>}
                </div>
            </div>
            {props.displayed && (
                <div className="user-profile-summary user-profile-summary--content">
                    <div className="user-profile-summary user-profile-summary--avatar">
                        <img src={props.avatarUrl} alt="avatar" height={192} width={192}/>
                    </div>
                    <div className="user-profile-summary user-profile-summary--details">
                        <div className="user-profile-summary user-profile-summary--name">Username: {props.name}</div>
                        <div className="user-profile-summary user-profile-summary--email">Email: {props.email}</div>
                        <div className="user-profile-summary user-profile-summary--url">Profile URL: {props.url}</div>
                    </div>
                </div>
            )}
        </div>
    </>
);

const UserProfile = React.memo(UserProfileSummary);

export default UserProfile;
