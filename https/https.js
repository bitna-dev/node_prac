import {send} from "./request"
import {read} from "./response"

function makeRequest(url, data) {
  //요청 보내기
  req.send(url, data);
  //데이터 리턴 => 보낸 데이터를 받아 복호화한 후 보내주기
  return res.read();
}
const responseData = makeRequest("https://naver.com", "any data");
console.log(responseData);
