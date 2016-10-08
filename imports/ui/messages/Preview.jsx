import React, { PropTypes } from 'react';

import { generateLinkList } from '/imports/helpers/url';

export default function Preview({ links }) {
  const preview = generateLinkList(links);
  return (
    <div className="link-preview" dangerouslySetInnerHTML={{ __html: preview }} />
  );
}

Preview.propTypes = {
  links: PropTypes.arrayOf(PropTypes.string),
};
