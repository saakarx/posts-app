import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { PostType } from '../../types.type';
import { deletePostInDB, updatePostInDB } from '../../utils/post';

import { useAuthData } from '../../context/AuthContext';

interface PostProps extends PostType {
  handlePostRemove: (postId: string) => void;
  handlePostUpdate: (
    postId: string,
    { title, body }: { title: string; body: string }
  ) => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(1, 'Title should be more than 1 character')
    .required('Title is required'),
  body: Yup.string().required('Body is required')
});

const Post: React.FC<PostProps> = ({
  id,
  body,
  title,
  handlePostRemove,
  handlePostUpdate
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const user = useAuthData();

  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        {user !== null && isEditing ? (
          <Formik
            initialValues={{ title, body }}
            validationSchema={validationSchema}
            onSubmit={async values => {
              updatePostInDB(id, { ...values })
                .then(() => {
                  handlePostUpdate(id, { ...values });
                  setIsEditing(false);
                })
                .catch(err => console.error(err));
            }}
          >
            <Form className="d-flex flex-column h-100">
              <Field
                className="card-title rounded-3 form-control"
                type="text"
                placeholder="Title"
                name="title"
              />
              <p>
                <ErrorMessage name="title" />
              </p>
              <Field
                as="textarea"
                id="post-body"
                className="card-text post-body flex-grow-1 rounded-3 form-control"
                placeholder="Body"
                name="body"
              />
              <p>
                <ErrorMessage name="body" />
              </p>
              <div className="row row-cols-2 g-3 mt-1">
                <div className="col">
                  <button
                    type="submit"
                    className="btn btn-success text-white w-100"
                  >
                    Update
                  </button>
                </div>
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-danger w-100"
                    onClick={() => setIsEditing(false)}
                  >
                    Discard
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        ) : (
          <>
            <h5 className="card-title">{title}</h5>
            <p className="card-text flex-grow-1">{body}</p>
            {user !== null && (
              <div className="row row-cols-2 g-3">
                <div className="col">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                </div>

                <div className="col">
                  <form
                    onClick={e => {
                      e.preventDefault();
                      deletePostInDB(id);
                      handlePostRemove(id);
                    }}
                  >
                    <input type="hidden" value={id} />
                    <button type="submit" className="btn btn-danger w-100">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
