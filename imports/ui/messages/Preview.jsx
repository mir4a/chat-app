import { Meteor } from 'meteor/meteor';
import React, { PropTypes, Component } from 'react';

import getMeta from 'lets-get-meta';

export default class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      title: '',
      description: '',
      image: '',
      error: false,
    };
  }

  componentDidMount() {
    this.getLinkData(this.props.link);
  }

  getLinkData(link) {
    this.setState({
      loading: true,
    });
    Meteor.call('remoteGet', link, (err, response) => {
      if (err) {
        this.setState({
          error: true,
        });
        throw new Error(err);
      }
      const meta = getMeta(response.content);

      console.log(meta);
      this.setState({
        loading: false,
        title: meta['og:title'] || meta['twitter:title'] || link,
        description: meta.description || meta['og:description'] || meta['twitter:description'],
        image: meta['og:image'] || meta['twitter:image'] || meta['twitter:image:src'],
      });
    });
  }

  render() {
    const {
      title,
      description,
      image,
    } = this.state;
    const { link } = this.props;
    const error = this.state.error ? 'error' : '';
    const loading = this.state.loading
      ? 'loading'
      : (
        <a href={link} target="_blank" className="preview-block">
          <h3>{title}</h3>
          <img src={image} alt={title} />
          <p>{description}</p>
        </a>
      );

    return (
      <div className={`link-preview ${error}`}>
        {loading}
      </div>
    );
  }
}

Preview.propTypes = {
  link: PropTypes.string.isRequired,
};
