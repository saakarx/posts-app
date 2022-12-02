import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { createPostInDB } from '../../utils/post';

type CreatePostProps = {
  onClose: () => void;
};

const initialValues = { title: '', body: '' };

const CreatePost: React.FC<CreatePostProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(1, 'Title should be more than 1 character')
      .required('Title is required'),
    body: Yup.string().required('Body is required')
  });

  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', closeModal);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', closeModal);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="custom-modal" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-content">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async values => {
              const res = await createPostInDB(values.title, values.body);
              if (res !== null) {
                onClose();
                navigate(0);
              }

              throw new Error('Encountered an error while creating a post');
            }}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="post-title" className="form-label">
                  Post Title
                </label>
                <Field
                  type="text"
                  placeholder="Post Title"
                  name="title"
                  className="form-control"
                  id="post-title"
                />
                <p className="form-error">
                  <ErrorMessage name="title" />
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="post-body" className="form-label">
                  Post Body
                </label>
                <Field
                  as="textarea"
                  col="20"
                  row="10"
                  placeholder="Post Body"
                  name="body"
                  className="form-control"
                  id="post-body"
                />
                <p className="form-error">
                  <ErrorMessage name="body" />
                </p>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Create Post
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
