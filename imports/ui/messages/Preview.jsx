import { Meteor } from 'meteor/meteor';
import React, { PropTypes, Component } from 'react';

import IconLink from 'material-ui/svg-icons/content/link';

import getMeta from 'lets-get-meta';

import log from '/lib/logger';

import Spinner from '/imports/ui/shared/Spinner';

export default class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      title: '',
      description: '',
      image: '',
      bg: '#fff',
      error: false,
    };
  }

  componentDidMount() {
    this.getLinkData(this.props.link);
  }

  componentWillUnmount() {
    console.log('preview will unmount');
  }

  getLinkData(link) {
    this.setState({
      loading: true,
    });
    Meteor.call('remoteGet', link, (err, response) => {
      log.info('Get preview link', {url: link});
      if (err) {
        this.setState({
          error: true,
        });
        log.error(err);
        throw new Error(err);
      }
      const meta = getMeta(response.content);

      console.log(meta);
      // TODO: Check content type, if image then add link to src
      this.setState({
        loading: false,
        title: meta['og:title']
          || meta['twitter:title']
          || link,
        description: meta.description
          || meta['og:description']
          || meta['twitter:description'],
        bg: meta['msapplication-TileColor'],
        image: meta['og:image']
          || meta['twitter:image']
          || meta['twitter:image:src']
          || meta['msapplication-TileImage'],
      });
    });
  }

  render() {
    const {
      title,
      description,
      image,
      bg,
    } = this.state;
    const style = {
      background: bg,
    };
    const { link } = this.props;
    const error = this.state.error ? 'error' : '';
    const loading = this.state.loading
      ? (
        <span className="preview-block loading">
          <Spinner />
        </span>
        )
      : (
        <a href={link} target="_blank" style={style} className="preview-block">
          <h3>{title}</h3>
          <img src={image} alt={title} />
          <p>{description}</p>
          <IconLink className="icon-link" />
        </a>
      );
    // if (!image) return null;

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
