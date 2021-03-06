import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import ListView from './index.view';

import { getList, remove } from 'services/users';
import { currentLayoutState } from 'utils/layout';

import Layout from 'components/Layout';

import routeUrlProvider, { USER_LIST, USER_EDIT } from 'constants/route-paths';

const List = ({ history }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
    getList().then(res => setUsers(res.data));
  };

  const editLink = userId => {
    history.push({
      pathname: routeUrlProvider.getForLink(USER_EDIT, { userId }),
      state: {
        ...currentLayoutState(history.location),
        menuSelected: USER_LIST
      }
    });
  };

  const removeItem = userId => {
    return remove(userId).then(() => fetchList());
  };

  const props = { users, editLink, removeItem };

  return (
    <Layout label="User List">
      <ListView {...props} />
    </Layout>
  );
};

List.propTypes = {
  history: PropTypes.object
};

export default List;
