document.addEventListener('DOMContentLoaded', () => {
  const ws = new WebSocket("ws://127.0.0.1:5001/");
  const morseRawInput = document.querySelector("#morse-raw-input");
  const morseConvertedInput = document.querySelector("#morse-converted-input");

  const morseConvertTable = {
    ".-":"A", "-...":"B", "-.-.":"C", "-..":"D", ".":"E",
    "..-.":"F", "--.":"G", "....":"H", "..":"I", ".---":"J",
    "-.-":"K", ".-..":"L", "--":"M", "-.":"N", "---":"O",
    ".--.":"P", "--.-":"Q", ".-.":"R", "...":"S", "-":"T",
    "..-":"U", "...-":"V", ".--":"W", "-..-":"X", "-.--":"Y",
    "--..":"Z",
    ".----":"1", "..---":"2", "...--":"3", "....-":"4", ".....":"5",
    "-....":"6", "--...":"7", "---..":"8", "----.":"9", "-----":"0",
    "--..--":",", ".-.-.-":".", "..--..":"?", "-..-.":"/", "-....-":"-",
    "-.--.":"(", "-.--.-":")"
  };
  var signalStack = "";
  const convertMorse = (signal) => {
    var letter = "";
    if (signal === "." || signal === "-") {
      signalStack += signal;
    } else if (signal === " ") {
      if (signalStack === "") {
        letter = " ";
      } else {
        if (signalStack in morseConvertTable){
          letter = morseConvertTable[signalStack];
        } else {
          // if could not convert from morse code
          letter = "err";
        }
        signalStack = "";
      }
    } else {
      //TODO: should impl joystick input
      letter = "joy";
      signalStack = "";
    }
    return letter;
  };

  ws.onmessage = (event) => {
    console.log(event.data);
    const raw = document.createTextNode(event.data);
    morseRawInput.appendChild(raw);
    var res = convertMorse(event.data);
    var c = "";
    if (res === "") {
      // do nothing
      return;
    } else if (res === "err") {
      c = "ヾ(๑╹ヮ╹๑)ﾉ";
    } else {
      c = res;
    }
    console.log(res);
    const con = document.createTextNode(c);
    morseConvertedInput.appendChild(con);
  };
});
