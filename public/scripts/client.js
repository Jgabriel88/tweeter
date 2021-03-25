

$(document).ready(function () {

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */

  const renderTweets = function (data) {
    $('#tweetsContainer').empty()
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let i = data.length - 1; i >= 0; i--) {
      createTweetElement(data[i]);
    }
  };


  const createTweetElement = function (tweet) {
    const milliseconds = tweet.created_at;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString();
    let $tweet = `
    <article>
    <header>
    <div class="userAvatar">
    <img src='${tweet.user.avatars}' alt='avatar'>
    <span class='userName'>${escape(tweet.user.name)}</span>
    </div>
    <span class='userId userIdOut'>${escape(tweet.user.handle)}</span>
    </header>
    <div class='tweetInnerText'>
    <p>${escape(tweet.content.text)}</p>
    </div>
    <footer>
      ${humanDateFormat}
      <div>
        <i class='fas fa-flag'></i>
        <i class='fas fa-retweet'></i>
        <i class='fas fa-heart'></i>
      </div>
    </footer>
  </article>`;

    $('#tweetsContainer').append($tweet);

    return $tweet;
  };


  const handleSubmit = function (event) {
    event.preventDefault();
    if ($('textarea').val().length > 140) {
      $('#errorMessagesExcedeed').slideDown().removeClass('exeededTweet')
      throw new Error
    }
    else if ($('textarea').val().length === 0) {
      $('#errorMessageEmpty').slideDown().removeClass('emptyTweet')
      throw new Error
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $(this).serialize()
      })
        .then(function (msg) {
          $('#errorMessageEmpty').slideUp().addClass('emptyTweet')
          $('#errorMessagesExcedeed').slideUp().addClass('exeededTweet')
          $('form').children('textarea').val('')
          loadTweets()
        })
    }
  };


  $('form').on('submit', handleSubmit);

  const loadTweets = function () {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    })
      .then(function (res) {
        renderTweets(res);
      });
  };
  loadTweets();
});
