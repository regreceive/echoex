import React from 'react';
import MediaQuery from 'react-responsive';

export const Mobile = props => <MediaQuery {...props} maxWidth={767} />;
export const Default = props => <MediaQuery {...props} minWidth={768} />;
