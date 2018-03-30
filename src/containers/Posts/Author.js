import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Position, Tooltip } from '@blueprintjs/core';

type Props = {
  id: number;
  users: any;
}

const Author = ({id, users}: Props) => {
  const author = users.filter(user => user.id === id)[0];
  const { name, link, company: { catchPhrase, name: companyName } } = author;
  const tetherOptions = {
    constraints:[{
      to: 'scrollParent',
      pin: true
    }, {
      to: 'window',
      attachment: 'together'
    }]
  };

  return (
    <Tooltip
      content={`${companyName} - ${catchPhrase}`}
      position={Position.TOP}
      tetherOptions={tetherOptions}
      lazy>
      <NavLink to={link}>{name}</NavLink>
    </Tooltip>
  );
};

function mapStateToProps({users}) {
  const { list } = users;

  return {
    users: list
  };
}

export default connect(mapStateToProps)(Author);
