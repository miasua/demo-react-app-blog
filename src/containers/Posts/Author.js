import React from 'react';
import { connect } from 'react-redux';
import { Position, Tooltip } from '@blueprintjs/core';

type Props = {
  id: number;
  users: any;
}

const Author = ({id, users}: Props) => {
  const author = users.filter(user => user.id === id)[0];
  const { name, link, company: { catchPhrase, name: companyName } } = author;

  return (
    <Tooltip content={`${companyName} - ${catchPhrase}`} position={Position.RIGHT}>
      <a href={link}>{name}</a>
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
