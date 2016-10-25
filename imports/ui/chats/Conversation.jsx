import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {
  AutoSizer,
  List,
  CellMeasurer,
  defaultCellMeasurerCellSizeCache as CellSizeCache,
} from 'react-virtualized';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import log from '/lib/logger';

// API
import Chats from '/imports/api/chats';
import Messages from '/imports/api/messages';

// Components
import Message from '/imports/ui/messages/Message';
import Conversations from '/imports/ui/chats/Conversations';
import Spinner from '/imports/ui/shared/Spinner';

// Helpers
import getTime from '/imports/ui/shared/getTime';
import { getUrls } from '/imports/helpers/url';

// Column widths vary but row heights are uniform
const cellSizeCache = new CellSizeCache({
  uniformRowHeight: true,
  uniformColumnWidth: false
})


export default class Conversation extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.scrollToLastMessage();
  }

  componentDidUpdate() {
    this.scrollToLastMessage();
  }

  scrollToLastMessage() {
    const body = $('.chatBody');
    // const messagesHeight = $('.ReactVirtualized__Grid__innerScrollContainer').height();
    // body.scrollTop(messagesHeight);
  }

  onScroll({ overscanStartIndex, overscanStopIndex, startIndex, stopIndex }) {
    if (overscanStopIndex >= 199) {
      // TODO: DO the paginate shit here
    }

  }

  sendMessage() {
    let message = this.refs.textInput.getValue().trim();
    if (!message.length) return;
    let links = getUrls(message);

    Meteor.call('newMessage', {
      text: message,
      type: 'text',
      chatId: FlowRouter.current().params.chatId,
      timestamp: new Date(),
      links,
    });

    // Clear form
    this.refs.textInput.getInputNode().value = '';
    this.refs.textInput.setState({ isFocused: false, hasValue: false });
  }


  renderMessages() {
    const { messages } = this.props;
    log.debug(`here is messages (length: ${messages.length})`, {messages: messages});
    return messages.map(message => (
      <Message
        key={message._id}
        message={message}
        currentUser={this.props.currentUser}
      />
    ));
  }

  cellRenderer(params) {
    params.index = params.rowIndex

    return this.rowRenderer(params);
  }

  rowRenderer({ key, index, style }) {
    const { messages } = this.props;
    return (
      <div key={key} style={style}>
        <Message
          message={messages[index]}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }

  returnKeyHandler(event) {
    if (event.key === 'Enter'
        && !event.shiftKey
        && event.target.value.trim().length) {
      this.sendMessage();
    }
  }

  render() {
    if (_.isEmpty(this.props.chat)) return null; // this is important for page reloads
    const {
      lastMessage,
      loadingMessages,
    } = this.props.chat;
    const {
      messages,
    } = this.props;
    const time = lastMessage ? getTime(this.props.chat.lastMessage.timestamp) : '';

    const textFieldStyles = {
      display: 'block',
      marginBottom: 10,
    };

    const loadingClass = loadingMessages ? 'loading' : '';

    const cardActionsStyles = {
      borderTop: '1px solid #dddddd',
      maxHieght: '140px',
    };

    return (
      <div className={'chatLayout ' + loadingClass}>
        <Conversations />
        <div className="conversation">
          <Card className="chatWrapper">
            <CardHeader
              className="chatHeader"
              title={this.props.chat.name}
              subtitle={<b>{time}</b>}
              avatar={this.props.chat.picture}
            />
            <CardText className="chatBody">
              {/*
              * FIXME: Do something with initial message
              */}
              <div className="initialMessage" style={{display: 'none'}}>
                {this.props.chat.initialMessage}
              </div>
              <div className="message-wrapper">
                <AutoSizer>
                  {(autoSizerParams) => {
                    let mostRecentWidth, cellMeasurer, list;
                    if (mostRecentWidth && mostRecentWidth !== autoSizerParams.width) {
                      cellMeasurer.resetMeasurements()
                      list.recomputeRowHeights()
                    }

                    mostRecentWidth = autoSizerParams.width

                    return (
                      <CellMeasurer
                        cellRenderer={this.cellRenderer.bind(this)}
                        columnCount={1}
                        ref={(ref) => { cellMeasurer = ref }}
                        rowCount={messages.length}
                        width={autoSizerParams.width}
                      >
                        {( cellMeasurerParams ) => (
                          <List
                            height={autoSizerParams.height}
                            ref='List'
                            rowCount={messages.length}
                            rowHeight={cellMeasurerParams.getRowHeight}
                            rowRenderer={this.rowRenderer.bind(this)}
                            width={autoSizerParams.width}
                            onRowsRendered={this.onScroll.bind(this)}
                          />
                        )}
                      </CellMeasurer>
                  )}}
                </AutoSizer>
              </div>
            </CardText>
            <CardActions
              className="chatInput"
              style={cardActionsStyles}
            >
              <div className="message-input">
                <TextField
                  style={textFieldStyles}
                  floatingLabelText="Message"
                  hintText="type your Message and press Return"
                  fullWidth
                  multiLine
                  rows={1}
                  rowsMax={2}
                  ref="textInput"
                  onKeyUp={this.returnKeyHandler.bind(this)}
                />
              </div>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

Conversation.propTypes = {
  loadingMessages: PropTypes.bool,
  chat: PropTypes.shape({
    name: PropTypes.string,
    picture: PropTypes.string,
    lastMessage: PropTypes.shape({
      timestamp: PropTypes.instanceOf(Date),
    }),
  }).isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,

};

export default createContainer(() => {
  const chatId = FlowRouter.current().params.chatId;
  const messagesHandler = Meteor.subscribe('chatMessages', { chatId: chatId });
  const chatsHandler = Meteor.subscribe('chatList');

  return {
    loadingMessages: !(messagesHandler.ready()),
    chat: Chats.findOne(chatId) || {},
    messages: Messages.find({}, {sort: { timestamp: 1 }}).fetch(),
    currentUser: Meteor.user(),
  };
}, Conversation);
