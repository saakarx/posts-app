import React from 'react';
import { createPortal } from 'react-dom';

type CreatePostPortalProps = {
  children: React.ReactNode;
};

const CreatePostPortal: React.FC<CreatePostPortalProps> = ({ children }) => {
  const el = document.getElementById('create-post') as HTMLElement;
  return createPortal(children, el);
};

export default CreatePostPortal;
