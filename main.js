(async function () {

var rfid;
var youtube;


boardReady({board: 'Smart', device: 'BkPny', transport: 'mqtt'}, async function (board) {
  board.samplingInterval = 1000;
  rfid = getRFID(board);
  var youtubePlay, youtubeStop, youtubePause;
  await new Promise(function (resolve) {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var scptTag = document.getElementsByTagName('script')[0];
    scptTag.parentNode.insertBefore(tag, scptTag);
    window.onYouTubeIframeAPIReady = function () {
      youtube = new YT.Player('player', {
        height: '240',
        width: '96%',
        playerVars: {
          autoplay: 1,
          controls: 1
        },
        events: {
          onReady: function (evt) {
            youtube.loadVideoById({
              videoId: '-oDRzgmYHms'
            });
            resolve();
          },
          onStateChange: onPlayerStateChange
        }
      });
    };
  });
  function onPlayerStateChange(event) {
    if(event.data == youtubeStop) {
      youtubeStopCallback();
    }else if (event.data == youtubePlay) {
      youtubePlayCallback();
    }else if (event.data == youtubePause) {
      youtubePauseCallback();
    }
  };
  rfid.read();
  rfid.on("enter",async function(_uid){
    rfid._uid = _uid;
    if(rfid._uid == 'A0159E22'){
      youtube.loadVideoById(getYoutubeVideoId('s8mAqYqibcc'));
    }
    if(rfid._uid == '852FA3AC'){
      youtube.loadVideoById(getYoutubeVideoId('JXDGZUbngYg'));
    }
    if(rfid._uid == '1A316017'){
      youtube.loadVideoById(getYoutubeVideoId('i-QqAvMCwCM'));
    }
  });
  youtubeStop = 0;
  function youtubeStopCallback() {
    youtube.loadVideoById(getYoutubeVideoId('-oDRzgmYHms'));
  }
});

}());