$(document).ready(function () {
  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */

  const renderTweets = function (data) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet of data) {
      createTweetElement(tweet);
    }
  };
  const createTweetElement = function (tweet) {
    const milliseconds = tweet.created_at;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString();
    let $tweet = `
    <article>
    <header>
    <img src='${tweet.user.avatars}' alt='avatar'>
    <span class='userName'>${tweet.user.name}</span>
    
    <span class='userId userIdOut'>${tweet.user.handle}</span>
    </header>
    <div class='tweetInnerText'>
      ${tweet.content.text}
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

  // renderTweets(tweets)

  const handleSubmit = function (event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(this).serialize()
    })
      .then(function (msg) {
        console.log('Data Saved: ' + msg);
      });
  };

  $('form').on('submit', handleSubmit);


  const loadTweets = function () {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/tweets'
    })
      .then(function (res) {
        renderTweets(res);
      });
  };
  loadTweets();

});
